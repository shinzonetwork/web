import { describe, expect, it } from "vitest";
import {
  hexToShinzoAddress,
  normalizeHexAddress,
  normalizeShinzoAddress,
  shinzoAddressToHex,
} from "./index";

describe("Shinzo address utilities", () => {
  it("converts a 20-byte EVM address to Shinzo bech32", () => {
    expect(hexToShinzoAddress("0x0000000000000000000000000000000000000000")).toBe(
      "shinzo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqcclt73",
    );
    expect(hexToShinzoAddress("000102030405060708090a0b0c0d0e0f10111213")).toBe(
      "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4",
    );
  });

  it("converts Shinzo bech32 addresses back to lowercase EVM hex", () => {
    expect(shinzoAddressToHex("shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4")).toBe(
      "0x000102030405060708090a0b0c0d0e0f10111213",
    );
  });

  it("normalizes bech32 and hex inputs to canonical Shinzo bech32", () => {
    expect(normalizeShinzoAddress(" 0X000102030405060708090A0B0C0D0E0F10111213 ")).toBe(
      "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4",
    );
    expect(normalizeShinzoAddress("SHINZO1QQQSYQCYQ5RQWZQFPG9SCRGWPUGPZYSNGDWWG4")).toBe(
      "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4",
    );
  });

  it("normalizes hex addresses without changing the address bytes", () => {
    expect(normalizeHexAddress("000102030405060708090A0B0C0D0E0F10111213")).toBe(
      "0x000102030405060708090a0b0c0d0e0f10111213",
    );
  });

  it("rejects invalid prefixes and lengths", () => {
    expect(() => shinzoAddressToHex("source1qqqsyqcyq5rqwzqfpg9scrgwpugpzysns0y44x")).toThrow(
      Error,
    );
    expect(() => normalizeShinzoAddress("0x1234")).toThrow(Error);
  });
});
