import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Hex } from "viem";

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
