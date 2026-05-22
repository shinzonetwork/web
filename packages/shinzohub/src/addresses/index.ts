import type { Address } from "viem";
import { decodeBech32, encodeBech32 } from "../internal/bech32.js";
import { hexToBytes, isHexLike, normalizeHex } from "../internal/hex.js";

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

function isHexAddress(value: string): boolean {
  return isHexLike(value.trim(), SHINZO_ADDRESS_BYTE_LENGTH);
}

/**
 * Normalizes a 20-byte EVM address to lowercase `0x` hex.
 *
 * Use this at application boundaries when users, config files, or APIs may
 * provide mixed-case addresses or bare hex without the `0x` prefix.
 *
 * @param value - EVM address as `0x` hex or bare 40-character hex.
 * @returns Canonical lowercase `0x` EVM address.
 *
 * @example
 * ```ts
 * import { normalizeHexAddress } from "@shinzo/shinzohub";
 *
 * const address = normalizeHexAddress("018A06D78E0802DB5BC055B4527D7B481C3E9932");
 * // "0x018a06d78e0802db5bc055b4527d7b481c3e9932"
 * ```
 */
export function normalizeHexAddress(value: string): HexAddress {
  try {
    return normalizeHex(value, "address", SHINZO_ADDRESS_BYTE_LENGTH) as HexAddress;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid EVM address.";
    throw new AddressValidationError(message);
  }
}

/**
 * Converts a 20-byte EVM hex address to a Shinzo bech32 address.
 *
 * This is useful when displaying account addresses in Shinzo-native UI while
 * still receiving EVM addresses from wallets, logs, or contract calls.
 *
 * @param value - EVM address as `0x` hex or bare 40-character hex.
 * @param options - Optional bech32 prefix override. Defaults to `shinzo`.
 * @returns Shinzo bech32 address.
 *
 * @example
 * ```ts
 * import { hexToShinzoAddress } from "@shinzo/shinzohub";
 *
 * const account = hexToShinzoAddress("0x000102030405060708090a0b0c0d0e0f10111213");
 * // "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4"
 * ```
 */
export function hexToShinzoAddress(value: string, options: ShinzoAddressOptions = {}): ShinzoAddress {
  const prefix = options.prefix ?? SHINZO_BECH32_PREFIX;
  const hexAddress = normalizeHexAddress(value);
  return encodeBech32(prefix, hexToBytes(hexAddress)) as ShinzoAddress;
}

/**
 * Converts a Shinzo bech32 address to a lowercase EVM hex address.
 *
 * Use this before passing a Shinzo account address into Viem, EVM contract
 * calls, filters, or wallet transaction parameters.
 *
 * @param value - Shinzo bech32 address, such as `shinzo1...`.
 * @param options - Optional expected bech32 prefix. Defaults to `shinzo`.
 * @returns Canonical lowercase `0x` EVM address.
 *
 * @example
 * ```ts
 * import { shinzoAddressToHex } from "@shinzo/shinzohub";
 *
 * const evmAddress = shinzoAddressToHex("shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4");
 * // "0x000102030405060708090a0b0c0d0e0f10111213"
 * ```
 */
export function shinzoAddressToHex(value: string, options: ShinzoAddressOptions = {}): HexAddress {
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
    return normalizeHex(
      Array.from(decoded.data, (byte) => byte.toString(16).padStart(2, "0")).join(""),
      "address",
      SHINZO_ADDRESS_BYTE_LENGTH,
    ) as HexAddress;
  } catch (error) {
    if (error instanceof AddressValidationError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Invalid Shinzo address.";
    throw new AddressValidationError(message);
  }
}

/**
 * Normalizes a Shinzo address to bech32 format.
 *
 * Accepts either a `shinzo...` bech32 account address or a 20-byte EVM hex address.
 * Use this for UI display, form normalization, and API payloads that should
 * consistently use Shinzo-native account formatting.
 *
 * @param value - Shinzo bech32 address, `0x` EVM address, or bare EVM hex.
 * @param options - Optional bech32 prefix override. Defaults to `shinzo`.
 * @returns Canonical Shinzo bech32 address.
 *
 * @example
 * ```ts
 * import { normalizeShinzoAddress } from "@shinzo/shinzohub";
 *
 * const displayAddress = normalizeShinzoAddress(
 *   "0x000102030405060708090a0b0c0d0e0f10111213",
 * );
 * // "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4"
 * ```
 */
export function normalizeShinzoAddress(value: string, options: ShinzoAddressOptions = {}): ShinzoAddress {
  const input = value.trim();
  if (!input) {
    throw new AddressValidationError("Address cannot be empty.");
  }
  if (isHexAddress(input)) {
    return hexToShinzoAddress(input, options);
  }

  const hexAddress = shinzoAddressToHex(input, options);
  return hexToShinzoAddress(hexAddress, options);
}
