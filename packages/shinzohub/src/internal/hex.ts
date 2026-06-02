import type { Hex as ViemHex } from "viem";
import { bytesToHex as viemBytesToHex, hexToBytes as viemHexToBytes } from "viem";

export type Hex = ViemHex;
export type BytesLike = Hex | Uint8Array | readonly number[];

const HEX_RE = /^0x[0-9a-fA-F]*$/;
const BARE_HEX_RE = /^[0-9a-fA-F]*$/;

/** Returns true when `value` is a `0x`-prefixed hex string. */
export function isHex(value: string, byteLength?: number): value is Hex {
  if (!HEX_RE.test(value)) {
    return false;
  }
  const hexLength = value.length - 2;
  if (hexLength % 2 !== 0) {
    return false;
  }
  return byteLength === undefined || hexLength === byteLength * 2;
}

/** Returns true when `value` is a bare or `0x`-prefixed hex string. */
export function isHexLike(value: string, byteLength?: number): boolean {
  const normalized = /^0x/i.test(value) ? value.slice(2) : value;
  if (!BARE_HEX_RE.test(normalized) || normalized.length % 2 !== 0) {
    return false;
  }
  return byteLength === undefined || normalized.length === byteLength * 2;
}

/** Throws if `value` is not a `0x`-prefixed hex string. */
export function assertHex(value: string, name = "value", byteLength?: number): asserts value is Hex {
  if (!isHex(value, byteLength)) {
    const suffix = byteLength === undefined ? "" : ` with ${byteLength} bytes`;
    throw new Error(`${name} must be a 0x-prefixed hex string${suffix}.`);
  }
}

/** Normalizes bare or prefixed hex to lowercase `0x` form. */
export function normalizeHex(value: string, name = "value", byteLength?: number): Hex {
  const trimmed = value.trim();
  const body = /^0x/i.test(trimmed) ? trimmed.slice(2) : trimmed;
  if (!BARE_HEX_RE.test(body) || body.length % 2 !== 0) {
    throw new Error(`${name} must be hex encoded.`);
  }
  if (byteLength !== undefined && body.length !== byteLength * 2) {
    throw new Error(`${name} must be ${byteLength} bytes.`);
  }
  return `0x${body.toLowerCase()}`;
}

/** Removes the `0x` prefix from a hex string. */
export function stripHexPrefix(value: Hex): string {
  return value.slice(2);
}

/** Converts bytes to lowercase `0x` hex. */
export function bytesToHex(bytes: Uint8Array | readonly number[]): Hex {
  for (const byte of bytes) {
    if (!Number.isInteger(byte) || byte < 0 || byte > 255) {
      throw new Error("bytes must contain integers in the 0-255 range.");
    }
  }
  return viemBytesToHex(Uint8Array.from(bytes));
}

/** Converts lowercase or uppercase `0x` hex to bytes. */
export function hexToBytes(value: Hex): Uint8Array {
  assertHex(value);
  return viemHexToBytes(value);
}

/** Converts a bytes-like value to lowercase `0x` hex. */
export function bytesLikeToHex(value: BytesLike, name = "value"): Hex {
  if (typeof value === "string") {
    assertHex(value, name);
    return normalizeHex(value, name);
  }
  return bytesToHex(value);
}
