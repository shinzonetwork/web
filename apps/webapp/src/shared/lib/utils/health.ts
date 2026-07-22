import type { HostHealthData, GeneratorHealthData } from "@/shared/lib";

export const PAGE_SIZE = 5;
export const DEFAULT_PAGE_PARAMS = { page: 1, offset: 0, limit: 1 } as const;

export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type LiveDataWithKey = {
  key: string;
  data: HostHealthData | GeneratorHealthData;
};

/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function createHealthEntryKey(entry: HealthEntryKeyParams): string {
  return `${entry.address}-${entry.ip}`;
}
