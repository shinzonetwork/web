import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { stringToHex, isAddress } from "viem";

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

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  if (!address || typeof address !== "string") return false;
  try {
    return isAddress(address);
  } catch {
    return false;
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    // Allow relative URLs and full URLs
    if (url.startsWith("/") || url.startsWith("#") || url.startsWith("@"))
      return true;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Sanitize string input (basic XSS prevention)
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim()
    .slice(0, 10000); // Limit length
}
