export type WasmInspection = {
  initialMemoryPages: number;
  maxMemoryPages: number | null;
  dataSectionSize: number;
  exports: string[];
};

function readLEB128(bytes: Uint8Array, offset: number): { value: number; bytesRead: number } {
  let result = 0;
  let shift = 0;
  let bytesRead = 0;
  let byte: number;
  do {
    byte = bytes[offset + bytesRead];
    result |= (byte & 0x7f) << shift;
    shift += 7;
    bytesRead++;
  } while (byte & 0x80);
  return { value: result, bytesRead };
}

export function inspectWasm(wasmBytes: Uint8Array): WasmInspection {
  if (wasmBytes.length < 8) {
    throw new Error("Invalid WASM: too short");
  }
  if (
    wasmBytes[0] !== 0x00 ||
    wasmBytes[1] !== 0x61 ||
    wasmBytes[2] !== 0x73 ||
    wasmBytes[3] !== 0x6d
  ) {
    throw new Error("Invalid WASM: bad magic number");
  }

  let initialMemoryPages = 0;
  let maxMemoryPages: number | null = null;
  let dataSectionSize = 0;
  const exports: string[] = [];

  let offset = 8;
  while (offset < wasmBytes.length) {
    const sectionId = wasmBytes[offset++];
    const { value: sectionSize, bytesRead } = readLEB128(wasmBytes, offset);
    offset += bytesRead;
    const sectionEnd = offset + sectionSize;

    if (sectionId === 5) {
      // Memory section
      const { value: _count, bytesRead: cb } = readLEB128(wasmBytes, offset);
      let pos = offset + cb;
      if (_count > 0) {
        const { value: flags, bytesRead: fb } = readLEB128(wasmBytes, pos);
        pos += fb;
        const { value: initial, bytesRead: ib } = readLEB128(wasmBytes, pos);
        pos += ib;
        initialMemoryPages = initial;
        if (flags & 1) {
          const { value: max } = readLEB128(wasmBytes, pos);
          maxMemoryPages = max;
        }
      }
    } else if (sectionId === 7) {
      // Export section
      const { value: count, bytesRead: cb } = readLEB128(wasmBytes, offset);
      let pos = offset + cb;
      for (let i = 0; i < count; i++) {
        const { value: nameLen, bytesRead: nb } = readLEB128(wasmBytes, pos);
        pos += nb;
        const name = new TextDecoder().decode(wasmBytes.slice(pos, pos + nameLen));
        pos += nameLen;
        pos++; // skip kind byte
        const { bytesRead: idxBytes } = readLEB128(wasmBytes, pos);
        pos += idxBytes;
        exports.push(name);
      }
    } else if (sectionId === 11) {
      // Data section — record total payload size
      dataSectionSize = sectionSize;
    }

    offset = sectionEnd;
  }

  return { initialMemoryPages, maxMemoryPages, dataSectionSize, exports };
}
