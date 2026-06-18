import { HealthEntryKeyParams } from "../types";

/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function createHealthEntryKey(entry: HealthEntryKeyParams): string {
  return `${entry.address}-${entry.ip}`;
}

/** Extract IPv4 from a plain IP or libp2p multiaddr connection string. */
export function ipFromConnectionString(connectionString: string): string {
  const trimmed = connectionString.trim();
  const multiaddrMatch = trimmed.match(/^\/ip4\/([^/]+)/);
  if (multiaddrMatch) return multiaddrMatch[1];
  return trimmed;
}