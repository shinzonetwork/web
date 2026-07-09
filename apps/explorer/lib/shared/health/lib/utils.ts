import { HealthEntryKeyParams } from "../types";

export const HEALTH_PORT = 8080 as const;

/** Health check URL for an IPv4. */
export function getHealthUrl(ip: string): string {
  return `http://${ip}:${HEALTH_PORT}/health`;
}

/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function createHealthEntryKey(entry: HealthEntryKeyParams): string {
  return `${entry.address}-${entry.ip}`;
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