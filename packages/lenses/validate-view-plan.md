# Plan: `validateView()` — Static View Validation Layer

Lightweight view-level validation that checks the consistency of a complete view definition (query + SDL + WASM lenses) **without requiring a running DefraDB instance**.

## Motivation

The current test framework (`lib/testing/`) only tests WASM modules in isolation — it loads the binary, feeds it transport-encoded inputs, and asserts on outputs. This misses a class of bugs that only surface when the full view pipeline is assembled:

- A WASM compiled with 1 memory page (64KB) panics in DefraDB's lens runtime because the data section + heap exceeds the boundary.
- A query using `transactionHash` (flat field) instead of `transaction { hash }` (relation) silently breaks the lens, which reads `log.transaction.hash`.
- An SDL missing a field the lens emits, or declaring a field the lens never outputs.

All of these were only caught by running `viewkit view test` against a live DefraDB. `validateView()` catches them in vitest, in CI, with zero infrastructure.

---

## File Structure

Three new files inside `lib/testing/`, plus re-exports from the barrel:

```
lib/testing/
  index.ts             <- existing, add re-exports
  internal.ts          <- existing, no changes
  validate.ts          <- NEW: orchestrator + query parser
  wasm-inspect.ts      <- NEW: WASM binary section parser
  sdl-parse.ts         <- NEW: SDL field extractor
```

---

## API Surface

```ts
// lib/testing/validate.ts

type ViewDefinition = {
  query: string;
  sdl: string;
  lenses: LensEntry[];
};

type LensEntry = {
  ref: LensModuleRef;          // reuse existing: string | { target?, wasmPath? }
  args?: unknown;
  testInputs?: unknown[];      // sample documents -- enables output + chain checks
};

type ValidationIssue = {
  severity: "error" | "warning";
  code: string;                // machine-readable, e.g. "WASM_LOW_MEMORY"
  message: string;
};

type ViewValidationResult = {
  ok: boolean;                 // true if zero errors (warnings are fine)
  issues: ValidationIssue[];
};

async function validateView(view: ViewDefinition): Promise<ViewValidationResult>;
```

---

## The Six Checks

### Check 1: WASM Binary Health (`wasm-inspect.ts`)

Parse the raw `.wasm` bytes without instantiation. The binary format is straightforward -- after the 8-byte magic+version header, it's a sequence of `[sectionId: u8][size: LEB128][payload]`.

```ts
type WasmInspection = {
  initialMemoryPages: number;    // section 5
  maxMemoryPages: number | null;
  dataSectionSize: number;       // section 11
  exports: string[];             // section 7
};

function inspectWasm(wasmBytes: Uint8Array): WasmInspection;
```

**What it catches:**

| Code | Severity | Condition |
|---|---|---|
| `WASM_MISSING_EXPORT` | error | Missing `alloc`, `set_param`, `transform`, or `memory` |
| `WASM_INSUFFICIENT_MEMORY` | error | `initialMemoryPages === 1` |
| `WASM_LOW_MEMORY` | warning | `initialMemoryPages < 4` |
| `WASM_INSTANTIATION_FAILED` | error | `WebAssembly.instantiate()` throws |

After structural inspection, attempt instantiation using the same import stubs from `loadLensModule()` in `internal.ts`. This catches malformed WASM that passes section parsing.

---

### Check 2: SDL Parsing (`sdl-parse.ts`)

A lightweight regex parser. The SDL in this project is always a single type definition -- no need for a full GraphQL parser.

```ts
type SdlField = { name: string; typeName: string };
type SdlType  = { name: string; fields: SdlField[] };

function parseSdl(sdl: string): SdlType;
```

**How it works:**

1. Extract type name with `/type\s+(\w+)/`
2. Extract the block between `{` and `}`
3. Parse each field as `/(\w+)\s*:\s*(\[?\w+\]?!?)/`

If parsing fails entirely: `SDL_PARSE_FAILED` error.

---

### Check 3: Output Field Coverage

**Requires `testInputs`** on at least the first lens. Skipped otherwise.

**How it works:**

1. Run the lens (or lens chain) using the existing `runLens()` from `internal.ts`
2. Collect the union of all keys across all output rows
3. Compare against SDL fields from check 2

| Code | Severity | Condition |
|---|---|---|
| `OUTPUT_FIELD_NOT_IN_SDL` | error | Lens emits a key not declared in the SDL |
| `SDL_FIELD_NOT_EMITTED` | warning | SDL declares a field no output row contained |
| `OUTPUT_TYPE_MISMATCH` | warning | SDL says `Int` but output value is a string |

---

### Check 4: Query Field Coverage

Catches the `transactionHash` vs `transaction { hash }` class of bugs.

**Query parser** (small recursive-descent, lives in `validate.ts`):

```
"Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }"
  -> { "address", "topics", "data", "blockNumber", "transaction.hash", "transaction.from", "transaction.to" }
```

**EVM required fields** -- derived from `EvmLogDocument.fromJson()` in `lib/evm/types.ts`:

```
address, topics, data, blockNumber,
transaction.hash, transaction.from, transaction.to
```

| Code | Severity | Condition |
|---|---|---|
| `QUERY_MISSING_EVM_FIELD` | error | Missing `address`, `topics`, `data`, or `blockNumber` |
| `QUERY_MISSING_EVM_RELATION` | error | `transaction` not present as a nested object |
| `QUERY_FLAT_FIELD_INSTEAD_OF_RELATION` | error | Has `transactionHash` instead of `transaction { hash }` |
| `QUERY_MISSING_TRANSACTION_FIELD` | warning | Missing `transaction.from` or `transaction.to` |

For non-EVM lenses: if `testInputs` are provided, check that every top-level key in the test input documents corresponds to a query field.

---

### Check 5: Lens Chain Validation

For views with `lenses.length > 1`. Validates that the output of lens N can feed lens N+1.

**How it works:**

1. Run `lens[0]` with its `testInputs` via `runLens()`
2. Feed output rows as input to `lens[1]`
3. Check that `lens[1]` doesn't error
4. Repeat through the chain
5. Validate the final lens's output against the SDL (reusing check 3)

| Code | Severity | Condition |
|---|---|---|
| `CHAIN_NO_TEST_DATA` | warning | Lens N produced zero rows, can't validate lens N+1 |
| `CHAIN_INCOMPATIBLE` | error | Lens N+1 errored when fed lens N's output |

Stateful lenses (e.g., `erc20-account-balances` with `ctx.store` and `finalize()`) work fine -- `runLens()` already handles the full lifecycle.

---

### Check 6: Memory Budget Estimation

Uses `WasmInspection` from check 1. Computes `dataSectionSize / (initialMemoryPages * 65536)`.

| Code | Severity | Condition |
|---|---|---|
| `WASM_MEMORY_PRESSURE` | warning | Data section uses > 50% of initial memory |
| `WASM_MEMORY_CRITICAL` | error | Data section uses > 80% of initial memory |

Current state after the `initialMemory: 4` fix:

- `erc20-transfers`: 17KB / 256KB = 6.5%
- `erc20-account-balances`: 17KB / 256KB = 6.7%
- `sdk_map`: 6.6KB / 256KB = 2.5%

---

## Implementation Order

| Step | What | Depends on |
|---|---|---|
| 1 | `wasm-inspect.ts` -- binary parser | nothing |
| 2 | `sdl-parse.ts` -- regex field extractor | nothing |
| 3 | `validate.ts` -- types, orchestrator, query parser | nothing |
| 4 | Wire checks 1+6 (WASM health + memory budget) | steps 1, 3 |
| 5 | Wire check 2 (SDL parse) | steps 2, 3 |
| 6 | Wire check 3 (output field coverage) | steps 2, 3 + `runLens` |
| 7 | Wire check 4 (query field coverage) | step 3 |
| 8 | Wire check 5 (lens chain validation) | steps 6, 7 |
| 9 | Update `index.ts` barrel exports | step 3 |
| 10 | `validate.test.ts` -- tests against real erc20-transfers | all |

Steps 1, 2, 3 are independent and can be done in parallel.

---

## Example Usage

### Passing view

```ts
import { validateView } from "@shinzo/lenses/testing";
import { erc20TransferLog, TOKEN_ARGS } from "../erc20-transfers/test-data";

test("erc20-transfers view is valid", async () => {
  const result = await validateView({
    query: "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }",
    sdl: `type ERC20Transfer @materialized(if: false) {
      tokenAddress: String
      hash: String
      from: String
      to: String
      amount: String
      blockNumber: Int
    }`,
    lenses: [{
      ref: "erc20-transfers",
      args: TOKEN_ARGS,
      testInputs: [erc20TransferLog()],
    }],
  });

  expect(result.ok).toBe(true);
  expect(result.issues).toEqual([]);
});
```

### Catching the bug from today

```ts
test("detects flat transactionHash instead of relation", async () => {
  const result = await validateView({
    query: "Ethereum__Mainnet__Log { address topics data blockNumber transactionHash }",
    sdl: "type T @materialized(if: false) { hash: String }",
    lenses: [{ ref: "erc20-transfers", args: TOKEN_ARGS }],
  });

  expect(result.ok).toBe(false);
  const codes = result.issues.map(i => i.code);
  expect(codes).toContain("QUERY_FLAT_FIELD_INSTEAD_OF_RELATION");
  expect(codes).toContain("QUERY_MISSING_EVM_RELATION");
});
```

---

## What Not to Build

- **No full GraphQL parser.** Regex + tokenizer is sufficient for the single-type SDL and simple query format used here.
- **No static WASM bytecode analysis** to infer which fields a lens reads. Field access goes through JSON library calls compiled to WASM -- tracing those statically would require a decompiler. The runtime check with test data is the practical solution.
- **No full type-system validation** beyond spot-checks. Verifying `blockNumber: 18500000` against `Int` is useful. Building a type checker is not.
- **No new dependencies** beyond what the package already has (vitest, assemblyscript).
