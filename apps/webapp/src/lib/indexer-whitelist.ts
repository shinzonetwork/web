import { Hex, getAddress, isAddress } from "viem";

export const INDEXER_WHITELIST = [
  "0x6f3141bf4cbf1f5f89d12a8e02b28a1c8a923e16",
] as const;

// Normalize all whitelist addresses once for case-insensitive comparison
const normalizedWhitelist = INDEXER_WHITELIST.map((addr) =>
  getAddress(addr).toLowerCase(),
);

export const isIndexerWhitelisted = (
  address: Hex | undefined | null,
): boolean => {
  // Handle undefined or null addresses
  if (!address) {
    return false;
  }

  // Validate address format
  if (!isAddress(address)) {
    return false;
  }

  try {
    // Normalize the input address to lowercase for case-insensitive comparison
    // getAddress validates and normalizes the address format
    const normalizedAddress = getAddress(address).toLowerCase();
    return normalizedWhitelist.includes(normalizedAddress);
  } catch (error) {
    // Invalid address format
    console.error("Invalid address format:", error);
    return false;
  }
};
