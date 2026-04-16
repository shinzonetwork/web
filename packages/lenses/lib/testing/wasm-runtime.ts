export const JSON_TYPE_ID = 1;
export const EOS_TYPE_ID = 127;
export const ERROR_TYPE_ID = -1;

export type WasmExports = {
  memory: WebAssembly.Memory;
  alloc: (size: number) => number;
  set_param: (ptr: number) => number;
  transform: () => number;
  __testing_get_warnings?: () => number;
};

type Transport = { typeId: number; payload: string };

let nextQueue: Uint8Array[] = [];

function encodeTransport(typeId: number, payload: string): Uint8Array {
  const payloadBytes = new TextEncoder().encode(payload);
  const buf = new Uint8Array(1 + 4 + payloadBytes.length);
  const view = new DataView(buf.buffer);
  view.setInt8(0, typeId);
  if (typeId !== EOS_TYPE_ID) {
    view.setUint32(1, payloadBytes.length, true);
    buf.set(payloadBytes, 5);
  }
  return buf;
}

function decodeTransport(memory: WebAssembly.Memory, ptr: number): Transport {
  if (ptr === 0) {
    return { typeId: 0, payload: "" };
  }

  const view = new DataView(memory.buffer);
  const typeId = view.getInt8(ptr);
  if (typeId === 0) {
    return { typeId, payload: "" };
  }
  if (typeId === EOS_TYPE_ID) {
    return { typeId, payload: "" };
  }
  const len = view.getUint32(ptr + 1, true);
  const payloadBytes = new Uint8Array(memory.buffer, ptr + 5, len);
  return { typeId, payload: new TextDecoder().decode(payloadBytes) };
}

function writeToMemory(exports: Pick<WasmExports, "memory" | "alloc">, data: Uint8Array): number {
  const ptr = exports.alloc(data.length);
  new Uint8Array(exports.memory.buffer).set(data, ptr);
  return ptr;
}

export async function instantiateModule(wasmBytes: Uint8Array): Promise<WasmExports> {
  let memoryRef: WebAssembly.Memory;
  let allocFn: (size: number) => number;

  const compiled = await WebAssembly.compile(wasmBytes as Uint8Array<ArrayBuffer>);
  const instance = await WebAssembly.instantiate(compiled, {
    lens: {
      next(): number {
        const vec = nextQueue.length > 0 ? nextQueue.shift()! : encodeTransport(EOS_TYPE_ID, "");
        const ptr = allocFn(vec.length);
        new Uint8Array(memoryRef.buffer).set(vec, ptr);
        return ptr;
      },
    },
    env: {
      abort: () => {
        throw new Error("abort called");
      },
    },
  });

  const exports = instance.exports as unknown as WasmExports;
  memoryRef = exports.memory;
  allocFn = exports.alloc;
  return exports;
}

export async function executeLens(
  exports: WasmExports,
  args: unknown,
  inputs: unknown[],
): Promise<{ rows: unknown[]; warnings: string[]; error: string | null }> {
  const rows: unknown[] = [];
  let error: string | null = null;

  const argsPtr = writeToMemory(exports, encodeTransport(JSON_TYPE_ID, JSON.stringify(args)));
  const argsResult = decodeTransport(exports.memory, exports.set_param(argsPtr));
  if (argsResult.typeId === ERROR_TYPE_ID) {
    error = argsResult.payload;
  }

  nextQueue = inputs.map((input) => encodeTransport(JSON_TYPE_ID, JSON.stringify(input)));
  nextQueue.push(encodeTransport(EOS_TYPE_ID, ""));

  while (error == null) {
    const result = decodeTransport(exports.memory, exports.transform());
    if (result.typeId === EOS_TYPE_ID) break;
    if (result.typeId === ERROR_TYPE_ID) {
      error = result.payload;
      break;
    }
    rows.push(JSON.parse(result.payload));
  }

  const warnings = exports.__testing_get_warnings
    ? JSON.parse(decodeTransport(exports.memory, exports.__testing_get_warnings()).payload)
    : [];

  return { rows, warnings, error };
}
