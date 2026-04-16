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

function resolveWasmPath(ref: LensModuleRef): string {
  if (typeof ref == "string") {
    return join(process.cwd(), ref, "lens.wasm");
  }

  if (ref.wasmPath != null && ref.wasmPath.length > 0) {
    return ref.wasmPath;
  }

  if (ref.target != null && ref.target.length > 0) {
    return join(process.cwd(), ref.target, "lens.wasm");
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
