import { HealthEntryKeyParams } from "../types";

export const HEALTH_PORT = 443 as const;

/** Health check URL for an IPv4. */
export function getHealthUrl(ip: string): string {
  return `http://${ip}:${HEALTH_PORT}/health`;
}

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