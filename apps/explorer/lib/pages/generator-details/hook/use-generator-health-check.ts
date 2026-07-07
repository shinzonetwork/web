"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import { createHealthEntryKey, type HealthEntryKeyParams, type LiveDataWithKey } from "@/shared/health";
import { GeneratorHealthData } from "@/shared/shinzohub/types";

const UNHEALTHY_LIVE_DATA: GeneratorHealthData = {
  status: "unhealthy",
  uptime: 0,
  uptime_seconds: 0,
  last_processed: "",
  current_block: 0,
  p2p: null,
};

export const healthQueryKey = (entry: HealthEntryKeyParams): QueryKey =>
  ["health", createHealthEntryKey(entry)] as const;

export async function fetchGeneratorHealth(
  entry: HealthEntryKeyParams
): Promise<LiveDataWithKey> {
  const key = createHealthEntryKey(entry);

  try {
    const response = await fetch(
      `/api/shinzohub/generators/health?ip=${encodeURIComponent(entry.ip)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch health data for ip: ${entry.ip}`);
    }

    const data = (await response.json()) as GeneratorHealthData;
    return { key, data };
  } catch {
    return { key, data: UNHEALTHY_LIVE_DATA };
  }
}

type UseHealthCheckOptions = {
  enabled?: boolean;
  pollable?: boolean;
  refetchIntervalMs?: number;
};

/** Polls health for a single generator entry via React Query. */
export function useGeneratorHealthCheck(
  entry: HealthEntryKeyParams | null | undefined,
  { enabled = true, pollable = true, refetchIntervalMs }: UseHealthCheckOptions = {},
) {
  return useQuery({
    queryKey: healthQueryKey(entry ?? { address: "", ip: "" }),
    queryFn: () => fetchGeneratorHealth(entry ?? { address: "", ip: "" }),
    enabled: enabled && pollable && Boolean(entry?.address && entry?.ip),
    staleTime: 0,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
