"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import { LiveDataWithKey, LiveData, HealthEntryKeyParams } from "../types";
import { createHealthEntryKey } from "../lib/utils";
import {
  HEALTH_FETCH_TIMEOUT_MS,
  UNHEALTHY_LIVE_DATA,
} from "../lib/constants";
import { fetchWithTimeout } from "../lib/fetch-with-timeout";

export const healthQueryKey = (entry: HealthEntryKeyParams): QueryKey =>
  ["health", createHealthEntryKey(entry)] as const;

export async function fetchHealthStatus(
  entry: HealthEntryKeyParams
): Promise<LiveDataWithKey> {
  const key = createHealthEntryKey(entry);

  try {
    const res = await fetchWithTimeout(
      `/api/shinzohub/health?ip=${encodeURIComponent(entry.ip)}`,
      HEALTH_FETCH_TIMEOUT_MS
    );
    if (!res.ok) {
      return { key, data: UNHEALTHY_LIVE_DATA };
    }

    const data = (await res.json()) as LiveData;
    return { key, data: { ...data, status: data.status || "unhealthy" } };
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
    queryFn: () => fetchHealthStatus(entry!),
    enabled: enabled && Boolean(entry?.address && entry?.ip),
    staleTime: 0,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
