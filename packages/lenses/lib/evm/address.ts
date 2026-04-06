/** Returns true when `value` is a `0x`-prefixed 20-byte hexadecimal address. */
export function isAddress(value: string): bool {
  if (value.length != 42) return false;
  if (!(value.charCodeAt(0) == 48 && (value.charCodeAt(1) == 120 || value.charCodeAt(1) == 88))) {
    return false;
  }

  for (let i = 2; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const isDigit = code >= 48 && code <= 57;
    const isLowerHex = code >= 97 && code <= 102;
    const isUpperHex = code >= 65 && code <= 70;
    if (!isDigit && !isLowerHex && !isUpperHex) {
      return false;
    }
  }

  return true;
}

/** Normalizes an EVM address to lowercase for deterministic comparisons and IDs. */
export function normalizeAddress(value: string): string {
  return value.toLowerCase();
}
