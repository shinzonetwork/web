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

export const formatHash = (hash: string, start = 5, end = 5) => {
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
};

// Sanitize string input (basic XSS prevention)
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim()
    .slice(0, 10000); // Limit length
}

/** Returns true for dotted-decimal IPv4 addresses only. */
export function isIPv4(value: string): boolean {
  const parts = value.trim().split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const num = Number(part);
    return num >= 0 && num <= 255;
  });
}

/** Extract IPv4 from a plain IP or libp2p multiaddr connection string. */
export function ipFromConnectionString(connectionString: string): string {
  const trimmed = connectionString.trim();
  const multiaddrMatch = trimmed.match(/^\/ip4\/([^/]+)/);
  if (multiaddrMatch) return multiaddrMatch[1];
  return trimmed;
}

/** UTF-8 validator public key string → base64 (chain REST wire format). */
export function validatorPublicKeyToBase64(validatorPublicKey: string): string {
  const bytes = new TextEncoder().encode(validatorPublicKey.trim());

  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

/** Whether live health polling is supported for this generator. */
export function isGeneratorHealthPollable(generator: {
  registered: boolean;
  connectionString: string;
}): boolean {
  if (!generator.registered) return false;
  const connectionString = generator.connectionString.trim();
  if (!connectionString) return false;
  return isIPv4(ipFromConnectionString(connectionString));
}
