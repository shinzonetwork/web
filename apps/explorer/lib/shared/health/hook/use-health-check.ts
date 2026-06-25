"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import {
  type HealthLiveData,
} from "@shinzo/shinzohub";
import { LiveDataWithKey, HealthEntryKeyParams } from "../types";
import { createHealthEntryKey } from "../lib/utils";
import { UNHEALTHY_LIVE_DATA } from "../lib/constant";

export const healthQueryKey = (entry: HealthEntryKeyParams): QueryKey =>
  ["health", createHealthEntryKey(entry)] as const;

export async function fetchHealthStatus(
  entry: HealthEntryKeyParams
): Promise<LiveDataWithKey> {
  const key = createHealthEntryKey(entry);

  try {
    const response = await fetch(
      `/api/shinzohub/health?ip=${encodeURIComponent(entry.ip)}`,
    );
    
    if (!response.ok) throw new Error("Failed to fetch health data for ip: " + entry.ip);
    
    const data = (await response.json()) as HealthLiveData;
    return { key, data };
  } catch {
    return { key, data: UNHEALTHY_LIVE_DATA };
  }
}

type UseHealthCheckOptions = {
  enabled?: boolean;
  refetchIntervalMs?: number;
};

/** Polls health for a single host/indexer entry via React Query. */
export function useHealthCheck(
  entry: HealthEntryKeyParams | null | undefined,
  { enabled = true, refetchIntervalMs }: UseHealthCheckOptions = {}
) {
  return useQuery({
    queryKey: healthQueryKey(entry ?? { address: "", ip: "" }),
    queryFn: () => fetchHealthStatus(entry ?? { address: "", ip: "" }),
    enabled: enabled && Boolean(entry?.address && entry?.ip),
    staleTime: 0,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
