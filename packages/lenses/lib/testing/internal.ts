import { readFileSync } from "fs";
import { join } from "path";
import { instantiateModule, executeLens } from "./wasm-runtime";

export {
  JSON_TYPE_ID,
  EOS_TYPE_ID,
  ERROR_TYPE_ID,
  instantiateModule,
  executeLens,
  type WasmExports,
} from "./wasm-runtime";

export type LensModuleRef =
  | string
  | {
      target?: string;
      wasmPath?: string;
    };

type AsconfigTarget = {
  outFile?: string;
};

type Asconfig = {
  targets?: Record<string, AsconfigTarget>;
};

let cachedTargets: Record<string, AsconfigTarget> | null = null;

function getAsconfigTargets(): Record<string, AsconfigTarget> {
  if (cachedTargets != null) {
    return cachedTargets;
  }

  const asconfig = JSON.parse(
    readFileSync(join(process.cwd(), "asconfig.json"), "utf8")
  ) as Asconfig;
  cachedTargets = asconfig.targets ?? {};
  return cachedTargets;
}

function resolveTargetOutFile(targetName: string): string | null {
  const target = getAsconfigTargets()[targetName];
  if (target?.outFile == null || target.outFile.length == 0) {
    return null;
  }

  return join(process.cwd(), target.outFile);
}

function resolveWasmPath(ref: LensModuleRef): string {
  if (typeof ref == "string") {
    const directPath = join(process.cwd(), ref, "lens.wasm");

    try {
      readFileSync(directPath);
      return directPath;
    } catch {
      const targetOutFile = resolveTargetOutFile(ref);
      if (targetOutFile != null) {
        return targetOutFile;
      }
    }

    return directPath;
  }

  if (ref.wasmPath != null && ref.wasmPath.length > 0) {
    return ref.wasmPath;
  }

  if (ref.target != null && ref.target.length > 0) {
    const directPath = join(process.cwd(), ref.target, "lens.wasm");

    try {
      readFileSync(directPath);
      return directPath;
    } catch {
      const targetOutFile = resolveTargetOutFile(ref.target);
      if (targetOutFile != null) {
        return targetOutFile;
      }
    }

    return directPath;
  }

  throw new Error("expected a target name or wasmPath");
}

export function loadWasmBytes(wasmPath: string): Uint8Array {
  const buffer = readFileSync(wasmPath);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

export async function loadLensModule(ref: LensModuleRef) {
  const wasmPath = resolveWasmPath(ref);
  return instantiateModule(loadWasmBytes(wasmPath));
}

export async function runLens(ref: LensModuleRef, args: unknown, inputs: unknown[]) {
  const exports = await loadLensModule(ref);
  return executeLens(exports, args, inputs);
}
