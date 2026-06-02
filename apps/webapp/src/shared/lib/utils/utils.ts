import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAddress, Hex, isAddress } from "viem";
import { INDEXER_WHITELIST } from "../constants/indexer-whitelist";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: Hex | undefined | null): string {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// Sanitize string input (basic XSS prevention)
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim()
    .slice(0, 10000); // Limit length
}

/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function indexerEntryKey(entry: {
  validatorAddress: string;
  ip: string;
}): string {
  return `${entry.validatorAddress}-${entry.ip}`;
}

// Normalize all whitelist addresses once for case-insensitive comparison
export const normalizedWhitelist = INDEXER_WHITELIST.map((addr) =>
  getAddress(addr).toLowerCase()
);

export const isIndexerWhitelisted = (
  address: Hex | undefined | null
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
    if (process.env.NODE_ENV === "development") {
      console.error("Invalid address format:", error);
    }
    return false;
  }
};
