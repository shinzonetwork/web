const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3] as const;

export interface Bech32Decoded {
  prefix: string;
  data: Uint8Array;
}

function polymod(values: readonly number[]): number {
  let checksum = 1;
  for (const value of values) {
    const top = checksum >> 25;
    checksum = ((checksum & 0x1ffffff) << 5) ^ value;
    for (let index = 0; index < GENERATORS.length; index += 1) {
      if (((top >> index) & 1) === 1) {
        checksum ^= GENERATORS[index];
      }
    }
  }
  return checksum;
}

function expandPrefix(prefix: string): number[] {
  const values: number[] = [];
  for (let index = 0; index < prefix.length; index += 1) {
    values.push(prefix.charCodeAt(index) >> 5);
  }
  values.push(0);
  for (let index = 0; index < prefix.length; index += 1) {
    values.push(prefix.charCodeAt(index) & 31);
  }
  return values;
}

function createChecksum(prefix: string, words: readonly number[]): number[] {
  const values = [...expandPrefix(prefix), ...words, 0, 0, 0, 0, 0, 0];
  const mod = polymod(values) ^ 1;
  const checksum: number[] = [];
  for (let index = 0; index < 6; index += 1) {
    checksum.push((mod >> (5 * (5 - index))) & 31);
  }
  return checksum;
}

function verifyChecksum(prefix: string, words: readonly number[]): boolean {
  return polymod([...expandPrefix(prefix), ...words]) === 1;
}

function convertBits(
  data: readonly number[],
  fromBits: number,
  toBits: number,
  pad: boolean,
): number[] {
  let value = 0;
  let bits = 0;
  const maxValue = (1 << toBits) - 1;
  const result: number[] = [];

  for (const byte of data) {
    if (!Number.isInteger(byte) || byte < 0 || byte >> fromBits !== 0) {
      throw new Error("invalid bech32 data.");
    }
    value = (value << fromBits) | byte;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((value >> bits) & maxValue);
    }
  }

  if (pad) {
    if (bits > 0) {
      result.push((value << (toBits - bits)) & maxValue);
    }
  } else if (bits >= fromBits || ((value << (toBits - bits)) & maxValue) !== 0) {
    throw new Error("invalid bech32 padding.");
  }

  return result;
}

/** Encodes bytes with a bech32 prefix. */
export function encodeBech32(prefix: string, data: Uint8Array | readonly number[]): string {
  const normalizedPrefix = prefix.toLowerCase();
  if (!normalizedPrefix || normalizedPrefix !== prefix || /[^!-~]/.test(prefix)) {
    throw new Error("bech32 prefix must be non-empty lowercase printable ASCII.");
  }

  const words = convertBits([...data], 8, 5, true);
  const checksum = createChecksum(normalizedPrefix, words);
  return `${normalizedPrefix}1${[...words, ...checksum].map((word) => CHARSET[word]).join("")}`;
}

/** Decodes a bech32 string and returns the prefix plus original bytes. */
export function decodeBech32(value: string): Bech32Decoded {
  if (value !== value.toLowerCase() && value !== value.toUpperCase()) {
    throw new Error("bech32 strings cannot mix upper and lower case.");
  }

  const normalized = value.toLowerCase();
  const separatorIndex = normalized.lastIndexOf("1");
  if (separatorIndex <= 0 || separatorIndex + 7 > normalized.length) {
    throw new Error("invalid bech32 separator or checksum.");
  }

  const prefix = normalized.slice(0, separatorIndex);
  const encodedWords = normalized.slice(separatorIndex + 1);
  const words: number[] = [];
  for (const character of encodedWords) {
    const word = CHARSET.indexOf(character);
    if (word === -1) {
      throw new Error("invalid bech32 character.");
    }
    words.push(word);
  }

  if (!verifyChecksum(prefix, words)) {
    throw new Error("invalid bech32 checksum.");
  }

  return {
    prefix,
    data: new Uint8Array(convertBits(words.slice(0, -6), 5, 8, false)),
  };
}
