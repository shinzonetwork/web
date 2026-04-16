import type { WasmInspection } from "./wasm-inspect";
import { inspectWasm } from "./wasm-inspect";
import { parseSdl } from "./sdl-parse";
import type { SdlType } from "./sdl-parse";
import { instantiateModule, executeLens } from "./wasm-runtime";

// --- Types ---

export type ViewDefinition = {
  query: string;
  sdl: string;
  lenses: LensEntry[];
};

export type LensEntry = {
  wasmBytes: Uint8Array;
  args?: unknown;
  testInputs?: unknown[];
};

export type ValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type ViewValidationResult = {
  ok: boolean;
  issues: ValidationIssue[];
};

// --- Query parser ---

export function parseQueryFields(query: string): Set<string> {
  const fields = new Set<string>();
  const braceStart = query.indexOf("{");
  if (braceStart === -1) return fields;

  const tokens = tokenize(query.slice(braceStart));
  parseBlock(tokens, "", fields);
  return fields;
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  const regex = /[{}]|[\w]+/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}

function parseBlock(tokens: string[], prefix: string, fields: Set<string>): number {
  let i = 0;
  if (tokens[i] === "{") i++;

  while (i < tokens.length) {
    const token = tokens[i];
    if (token === "}") return i + 1;

    if (i + 1 < tokens.length && tokens[i + 1] === "{") {
      // Nested object — recurse
      const consumed = parseBlock(tokens.slice(i + 1), prefix + token + ".", fields);
      i += 1 + consumed;
    } else {
      fields.add(prefix + token);
      i++;
    }
  }
  return i;
}

// --- Check helpers ---

const REQUIRED_WASM_EXPORTS = ["alloc", "set_param", "transform", "memory"];

function checkWasmHealth(inspection: WasmInspection, issues: ValidationIssue[]): void {
  // Check 1: missing exports
  for (const name of REQUIRED_WASM_EXPORTS) {
    if (!inspection.exports.includes(name)) {
      issues.push({
        severity: "error",
        code: "WASM_MISSING_EXPORT",
        message: `WASM module is missing required export "${name}"`,
      });
    }
  }

  // Check 1: memory pages
  if (inspection.initialMemoryPages === 1) {
    issues.push({
      severity: "error",
      code: "WASM_INSUFFICIENT_MEMORY",
      message: `WASM module has only 1 initial memory page (64KB) — will likely OOM in DefraDB's lens runtime`,
    });
  } else if (inspection.initialMemoryPages < 4) {
    issues.push({
      severity: "warning",
      code: "WASM_LOW_MEMORY",
      message: `WASM module has ${inspection.initialMemoryPages} initial memory pages — consider increasing to at least 4`,
    });
  }

  // Check 6: memory budget estimation
  const totalMemory = inspection.initialMemoryPages * 65536;
  if (totalMemory > 0) {
    const usage = inspection.dataSectionSize / totalMemory;
    if (usage > 0.8) {
      issues.push({
        severity: "error",
        code: "WASM_MEMORY_CRITICAL",
        message: `Data section uses ${(usage * 100).toFixed(1)}% of initial memory (${inspection.dataSectionSize} / ${totalMemory} bytes)`,
      });
    } else if (usage > 0.5) {
      issues.push({
        severity: "warning",
        code: "WASM_MEMORY_PRESSURE",
        message: `Data section uses ${(usage * 100).toFixed(1)}% of initial memory (${inspection.dataSectionSize} / ${totalMemory} bytes)`,
      });
    }
  }
}

async function checkWasmInstantiation(wasmBytes: Uint8Array, issues: ValidationIssue[]): Promise<boolean> {
  try {
    await instantiateModule(wasmBytes);
    return true;
  } catch (e) {
    issues.push({
      severity: "error",
      code: "WASM_INSTANTIATION_FAILED",
      message: `WASM instantiation failed: ${e instanceof Error ? e.message : String(e)}`,
    });
    return false;
  }
}

const SDL_TYPE_MAP: Record<string, string> = {
  String: "string",
  Int: "number",
  Float: "number",
  Boolean: "boolean",
};

function checkOutputFieldCoverage(
  outputRows: unknown[],
  sdlType: SdlType,
  issues: ValidationIssue[],
): void {
  const outputKeys = new Set<string>();
  for (const row of outputRows) {
    if (row && typeof row === "object") {
      for (const key of Object.keys(row as Record<string, unknown>)) {
        outputKeys.add(key);
      }
    }
  }

  const sdlFieldNames = new Set(sdlType.fields.map((f) => f.name));

  // Lens emits a key not declared in the SDL
  for (const key of outputKeys) {
    if (!sdlFieldNames.has(key)) {
      issues.push({
        severity: "error",
        code: "OUTPUT_FIELD_NOT_IN_SDL",
        message: `Lens output contains field "${key}" not declared in SDL type "${sdlType.name}"`,
      });
    }
  }

  // SDL declares a field no output row contained
  for (const field of sdlType.fields) {
    if (!outputKeys.has(field.name)) {
      issues.push({
        severity: "warning",
        code: "SDL_FIELD_NOT_EMITTED",
        message: `SDL field "${field.name}" was not emitted by any output row`,
      });
    }
  }

  // Type spot-checks
  for (const field of sdlType.fields) {
    const expectedJsType = SDL_TYPE_MAP[field.typeName];
    if (!expectedJsType) continue;

    for (const row of outputRows) {
      if (row && typeof row === "object") {
        const value = (row as Record<string, unknown>)[field.name];
        if (value !== undefined && value !== null && typeof value !== expectedJsType) {
          issues.push({
            severity: "warning",
            code: "OUTPUT_TYPE_MISMATCH",
            message: `Field "${field.name}" is declared as ${field.typeName} in SDL but output value has type "${typeof value}"`,
          });
          break; // one warning per field is enough
        }
      }
    }
  }
}

const EVM_REQUIRED_FIELDS = ["address", "topics", "data", "blockNumber"];
const EVM_TRANSACTION_FIELDS = ["transaction.hash", "transaction.from", "transaction.to"];

function checkQueryFieldCoverage(queryFields: Set<string>, issues: ValidationIssue[]): void {
  // Check for flat transactionHash instead of nested relation
  if (queryFields.has("transactionHash")) {
    issues.push({
      severity: "error",
      code: "QUERY_FLAT_FIELD_INSTEAD_OF_RELATION",
      message: `Query uses flat field "transactionHash" — should be "transaction { hash }" (nested relation)`,
    });
  }

  // Check required EVM fields
  for (const field of EVM_REQUIRED_FIELDS) {
    if (!queryFields.has(field)) {
      issues.push({
        severity: "error",
        code: "QUERY_MISSING_EVM_FIELD",
        message: `Query is missing required EVM field "${field}"`,
      });
    }
  }

  // Check transaction relation exists
  const hasTransactionRelation = [...queryFields].some((f) => f.startsWith("transaction."));
  if (!hasTransactionRelation) {
    issues.push({
      severity: "error",
      code: "QUERY_MISSING_EVM_RELATION",
      message: `Query is missing "transaction { ... }" relation — required for EVM log processing`,
    });
  } else {
    // Check individual transaction fields
    for (const field of EVM_TRANSACTION_FIELDS) {
      if (!queryFields.has(field)) {
        issues.push({
          severity: "warning",
          code: "QUERY_MISSING_TRANSACTION_FIELD",
          message: `Query is missing transaction field "${field.split(".")[1]}"`,
        });
      }
    }
  }
}

async function runLensFromBytes(
  wasmBytes: Uint8Array,
  args: unknown,
  inputs: unknown[],
): Promise<{ rows: unknown[]; error: string | null }> {
  const exports = await instantiateModule(wasmBytes);
  const result = await executeLens(exports, args, inputs);
  return { rows: result.rows, error: result.error };
}

// --- Orchestrator ---

export async function validateView(view: ViewDefinition): Promise<ViewValidationResult> {
  const issues: ValidationIssue[] = [];

  // Check 2: SDL parsing
  const sdlType = parseSdl(view.sdl);
  if (!sdlType) {
    issues.push({
      severity: "error",
      code: "SDL_PARSE_FAILED",
      message: "Failed to parse SDL — expected a type definition with fields",
    });
  }

  // Check 4: query field coverage
  const queryFields = parseQueryFields(view.query);
  checkQueryFieldCoverage(queryFields, issues);

  // Checks 1 + 6: WASM health + memory budget for each lens
  for (const lens of view.lenses) {
    const inspection = inspectWasm(lens.wasmBytes);
    checkWasmHealth(inspection, issues);
    await checkWasmInstantiation(lens.wasmBytes, issues);
  }

  // Checks 3 + 5: output field coverage + lens chain validation (requires testInputs on first lens)
  const firstLens = view.lenses[0];
  if (firstLens?.testInputs && firstLens.testInputs.length > 0 && sdlType) {
    let currentRows: unknown[] = firstLens.testInputs;
    let chainError = false;

    for (let i = 0; i < view.lenses.length; i++) {
      const lens = view.lenses[i];
      const inputs = i === 0 ? lens.testInputs! : currentRows;

      try {
        const result = await runLensFromBytes(lens.wasmBytes, lens.args ?? {}, inputs);

        if (result.error) {
          // Check 5: chain incompatibility
          if (i > 0) {
            issues.push({
              severity: "error",
              code: "CHAIN_INCOMPATIBLE",
              message: `Lens ${i} errored when fed output from lens ${i - 1}: ${result.error}`,
            });
          }
          chainError = true;
          break;
        }

        // Check 5: chain produced no rows — can't validate next lens
        if (result.rows.length === 0 && i < view.lenses.length - 1) {
          issues.push({
            severity: "warning",
            code: "CHAIN_NO_TEST_DATA",
            message: `Lens ${i} produced zero rows — cannot validate lens ${i + 1}`,
          });
          chainError = true;
          break;
        }

        currentRows = result.rows;
      } catch (e) {
        // Check 5: lens threw during execution
        if (i > 0) {
          issues.push({
            severity: "error",
            code: "CHAIN_INCOMPATIBLE",
            message: `Lens ${i} threw when fed output from lens ${i - 1}: ${e instanceof Error ? e.message : String(e)}`,
          });
        }
        chainError = true;
        break;
      }
    }

    // Check 3: validate final output against SDL
    if (!chainError && currentRows.length > 0) {
      checkOutputFieldCoverage(currentRows, sdlType, issues);
    }
  }

  return {
    ok: issues.every((i) => i.severity !== "error"),
    issues,
  };
}
