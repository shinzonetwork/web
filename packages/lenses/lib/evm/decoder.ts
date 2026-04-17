import { hexDecode, hexEncode, hexToDecimalString } from "../hex";

function stripHexPrefix(value: string): string {
  if (value.length >= 2 && value.charCodeAt(0) == 48 && (value.charCodeAt(1) == 120 || value.charCodeAt(1) == 88)) {
    return value.substring(2);
  }

  return value;
}

function parseDecimal(value: string): i32 {
  if (value.length == 0) return -1;

  let out: i32 = 0;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code < 48 || code > 57) return -1;
    out = out * 10 + (code - 48);
  }

  return out;
}

function parseUintBits(typeName: string): i32 {
  if (!typeName.startsWith("uint")) return 0;

  const bits = parseDecimal(typeName.substring(4));
  if (bits >= 8 && bits <= 256 && bits % 8 == 0) {
    return bits;
  }

  return 0;
}

function parseIntBits(typeName: string): i32 {
  if (!typeName.startsWith("int")) return 0;

  const bits = parseDecimal(typeName.substring(3));
  if (bits >= 8 && bits <= 256 && bits % 8 == 0) {
    return bits;
  }

  return 0;
}

function parseBytesN(typeName: string): i32 {
  if (!typeName.startsWith("bytes")) return 0;

  const suffix = typeName.substring(5);
  if (suffix.length == 0) return 0;

  const size = parseDecimal(suffix);
  if (size >= 1 && size <= 32) {
    return size;
  }

  return 0;
}

function copyRange(bytes: Uint8Array, start: i32, count: i32): Uint8Array {
  const out = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = bytes[start + i];
  }
  return out;
}

function decodeAddress(rawBytes: Uint8Array): string {
  if (rawBytes.length >= 20) {
    return "0x" + hexEncode(copyRange(rawBytes, rawBytes.length - 20, 20));
  }

  return "0x" + hexEncode(rawBytes);
}

function decodeBool(rawBytes: Uint8Array): string {
  for (let i = 0; i < rawBytes.length; i++) {
    if (rawBytes[i] != 0) {
      return "true";
    }
  }

  return "false";
}

function decodeUint(cleanHex: string): string {
  return hexToDecimalString(cleanHex);
}

function decodeInt(rawBytes: Uint8Array, bits: i32): string {
  if (rawBytes.length != 32) return "0";

  const byteWidth = bits >> 3;
  const valueBytes = copyRange(rawBytes, rawBytes.length - byteWidth, byteWidth);
  if ((valueBytes[0] & 0x80) == 0) {
    return hexToDecimalString(hexEncode(valueBytes));
  }

  const magnitudeBytes = new Uint8Array(byteWidth);
  for (let i = 0; i < byteWidth; i++) {
    magnitudeBytes[i] = <u8>~valueBytes[i];
  }

  let carry = 1;
  for (let i = byteWidth - 1; i >= 0 && carry > 0; i--) {
    const sum = <i32>magnitudeBytes[i] + carry;
    magnitudeBytes[i] = <u8>(sum & 0xff);
    carry = sum > 255 ? 1 : 0;
  }

  const magnitude = hexToDecimalString(hexEncode(magnitudeBytes));
  return magnitude == "0" ? "0" : "-" + magnitude;
}

function decodeBytes(rawBytes: Uint8Array, count: i32): string {
  if (rawBytes.length < count) {
    return "0x" + hexEncode(rawBytes);
  }

  return "0x" + hexEncode(copyRange(rawBytes, 0, count));
}

/** Decodes a single 32-byte ABI word into the Rust-parity string representation. */
export function decodeAbiWord(typeName: string, hexData: string): string {
  const clean = stripHexPrefix(hexData);
  const rawBytes = hexDecode(clean);
  if (rawBytes.length == 0) {
    return "";
  }

  if (typeName == "address") {
    return decodeAddress(rawBytes);
  }

  if (typeName == "bool") {
    return decodeBool(rawBytes);
  }

  if (typeName == "string" || typeName == "bytes") {
    return "0x" + clean;
  }

  const uintBits = parseUintBits(typeName);
  if (uintBits > 0) {
    return decodeUint(clean);
  }

  const intBits = parseIntBits(typeName);
  if (intBits > 0) {
    return decodeInt(rawBytes, intBits);
  }

  const bytesCount = parseBytesN(typeName);
  if (bytesCount > 0) {
    return decodeBytes(rawBytes, bytesCount);
  }

  return "unsupported type: " + typeName;
}
