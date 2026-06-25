"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import type { LiveData } from "../types";
import { createHealthEntryKey } from "../lib/utils";
import { fetchHealthStatus, healthQueryKey } from "./use-health-check";

export type HealthCheckEntry = {
  address: string;
  ip: string;
};

type UseHealthPollingOptions<T> = {
  entries: T[];
  toHealthEntry: (entry: T) => HealthCheckEntry;
  /** Restart polling when this changes (e.g. page or list revision). */
  resetKey?: unknown;
  intervalMs?: number;
  enabled?: boolean;
};

const DEFAULT_INTERVAL_MS = 60_000;

/** Polls health for many entries in parallel via React Query. */
export function useHealthPolling<T>({
  entries,
  toHealthEntry,
  resetKey,
  intervalMs = DEFAULT_INTERVAL_MS,
  enabled = true,
}: UseHealthPollingOptions<T>): Map<string, LiveData> {
  const healthEntries = useMemo(
    () => (enabled ? entries.map((entry) => toHealthEntry(entry)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, entries, resetKey, toHealthEntry]
  );

  const queries = useQueries({
    queries: healthEntries.map((entry) => ({
      queryKey: [...healthQueryKey(entry), resetKey] as const,
      queryFn: () => fetchHealthStatus(entry),
      enabled: Boolean(entry.address && entry.ip),
      staleTime: 0,
      refetchInterval: intervalMs,
      refetchIntervalInBackground: true,
    })),
  });

  return useMemo(() => {
    const liveDataByKey = new Map<string, LiveData>();
    for (const query of queries) {
      if (query.data) {
        liveDataByKey.set(query.data.key, query.data.data);
      }
    }
    return liveDataByKey;
  }, [queries]);
}

export function healthEntryKey(entry: HealthCheckEntry): string {
  return createHealthEntryKey(entry);
}
