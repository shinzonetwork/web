"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import {
  createHealthEntryKey,
  type HealthEntryKeyParams,
  type LiveDataWithKey,
} from "../../lib/health";
import { HostHealthData } from "@/shared/lib";

const UNHEALTHY_LIVE_DATA: HostHealthData = {
  status: "unhealthy",
  uptime: 0,
  uptime_seconds: 0,
  last_processed: "",
  current_block: 0,
  p2p: null,
};

export const healthQueryKey = (entry: HealthEntryKeyParams): QueryKey =>
  ["health", createHealthEntryKey(entry)] as const;

export async function fetchHostHealthStatus(
  entry: HealthEntryKeyParams
): Promise<LiveDataWithKey> {
  const key = createHealthEntryKey(entry);

  try {
    const response = await fetch(
      `/api/shinzohub/hosts/health?ip=${encodeURIComponent(entry.ip)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch health data for ip: ${entry.ip}`);
    }

    const data = (await response.json()) as HostHealthData;
    return { key, data };
  } catch {
    return { key, data: UNHEALTHY_LIVE_DATA };
  }
}

type UseHostHealthCheckOptions = {
  enabled?: boolean;
  refetchIntervalMs?: number;
};

/** Polls health for a single host entry via React Query. */
export function useHostHealthCheck(
  entry: HealthEntryKeyParams | null | undefined,
  { enabled = true, refetchIntervalMs }: UseHostHealthCheckOptions = {}
) {
  return useQuery({
    queryKey: healthQueryKey(entry ?? { address: "", ip: "" }),
    queryFn: () => fetchHostHealthStatus(entry ?? { address: "", ip: "" }),
    enabled: enabled && Boolean(entry?.address && entry?.ip),
    staleTime: 0,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
