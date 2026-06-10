import type { Address } from "viem";
import { decodeBech32, encodeBech32 } from "../internal/bech32";
import { hexToBytes, isHexLike, normalizeHex } from "../internal/hex";

type Brand<TValue, TName extends string> = TValue & { readonly __brand: TName };

const SHINZO_BECH32_PREFIX = "shinzo";
const SHINZO_ADDRESS_BYTE_LENGTH = 20;

type ShinzoAddressOptions = {
  /**
   * Bech32 account prefix to use when validating or encoding an address.
   *
   * Defaults to `shinzo`. Override this only for custom deployments or tests
   * that intentionally use a different account prefix.
   */
  prefix?: string;
};

/** Canonical Shinzo bech32 account address string. */
export type ShinzoAddress = Brand<string, "ShinzoAddress">;
/** Canonical lowercase `0x` EVM address string. */
export type HexAddress = Address;

class AddressValidationError extends Error {
  constructor(message = "Invalid Shinzo address.") {
    super(message);
    this.name = "AddressValidationError";
  }
}

interface ValidatedShinzoAddress {
  prefix: string;
  data: Uint8Array;
}

function isHexAddress(value: string): boolean {
  return isHexLike(value.trim(), SHINZO_ADDRESS_BYTE_LENGTH);
}

function validateShinzoAddress(
  value: string,
  options: ShinzoAddressOptions = {},
): ValidatedShinzoAddress {
  const expectedPrefix = options.prefix ?? SHINZO_BECH32_PREFIX;

  try {
    const decoded = decodeBech32(value.trim());
    if (decoded.prefix !== expectedPrefix) {
      throw new AddressValidationError(
        `Invalid bech32 prefix "${decoded.prefix}". Expected "${expectedPrefix}".`,
      );
    }
    if (decoded.data.length !== SHINZO_ADDRESS_BYTE_LENGTH) {
      throw new AddressValidationError(
        `Shinzo addresses must contain ${SHINZO_ADDRESS_BYTE_LENGTH} bytes.`,
      );
    }
    return decoded;
  } catch (error) {
    if (error instanceof AddressValidationError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Invalid Shinzo address.";
    throw new AddressValidationError(message);
  }
}

/** Normalizes a 20-byte EVM address to canonical lowercase hex. */
export function normalizeHexAddress(value: string): HexAddress {
  try {
    return normalizeHex(value, "address", SHINZO_ADDRESS_BYTE_LENGTH) as HexAddress;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid EVM address.";
    throw new AddressValidationError(message);
  }
}

/** Converts a 20-byte EVM address to Shinzo bech32 format. */
export function hexToShinzoAddress(value: string, options: ShinzoAddressOptions = {}): ShinzoAddress {
  const prefix = options.prefix ?? SHINZO_BECH32_PREFIX;
  const hexAddress = normalizeHexAddress(value);
  return encodeBech32(prefix, hexToBytes(hexAddress)) as ShinzoAddress;
}

/** Converts a Shinzo bech32 account address to canonical EVM hex. */
export function shinzoAddressToHex(value: string, options: ShinzoAddressOptions = {}): HexAddress {
  const decoded = validateShinzoAddress(value, options);
  return normalizeHex(
    Array.from(decoded.data, (byte) => byte.toString(16).padStart(2, "0")).join(""),
    "address",
    SHINZO_ADDRESS_BYTE_LENGTH,
  ) as HexAddress;
}

/** Normalizes either Shinzo bech32 or EVM hex to Shinzo bech32 format. */
export function normalizeShinzoAddress(value: string, options: ShinzoAddressOptions = {}): ShinzoAddress {
  const input = value.trim();
  if (!input) {
    throw new AddressValidationError("Address cannot be empty.");
  }
  if (isHexAddress(input)) {
    return hexToShinzoAddress(input, options);
  }

  const decoded = validateShinzoAddress(input, options);
  return encodeBech32(decoded.prefix, decoded.data) as ShinzoAddress;
}
