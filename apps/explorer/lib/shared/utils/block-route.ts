/** Decimal block height only — avoids treating `0x…` hex as `Number()` (which can coerce incorrectly). */
const BLOCK_HEIGHT_RE = /^\d+$/;

export function isBlockHeightParam(value: string): boolean {
  return BLOCK_HEIGHT_RE.test(value);
}

const BLOCK_HASH_RE = /^0x[a-fA-F0-9]{64}$/;

export function parseBlockHashFromPathParam(encoded: string): string | null {
  const decoded = decodeURIComponent(encoded);
  if (!BLOCK_HASH_RE.test(decoded)) {
    return null;
  }
  return decoded.toLowerCase();
}
