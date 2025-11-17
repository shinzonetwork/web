import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { stringToHex } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility to check if a string is hex
export function isHex(value: string): boolean {
  return /^0x[0-9a-fA-F]*$/.test(value);
}

export function convertToHexIfNeeded(value: string): string {
  if (isHex(value)) {
    // Already a hex string, ensure 0x prefix
    return value.startsWith("0x") ? value : "0x" + value;
  } else {
    // Convert UTF-8 string to hex
    return stringToHex(value);
  }
}
