import type { HostHealthData, GeneratorHealthData } from "@/shared/shinzohub/types";

export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type LiveDataWithKey = { key: string; data: HostHealthData | GeneratorHealthData };
