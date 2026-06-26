"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { createHealthEntryKey } from "@/shared/health";
import { fetchIndexerHealth, healthQueryKey } from "./use-indexer-health-check";
import { IndexerHealthData } from "@/shared/shinzohub/types";

type HealthCheckEntry = {
  address: string;
  ip: string;
};

type UseIndexerHealthPollingOptions<T> = {
  entries: T[];
  toHealthEntry: (entry: T) => HealthCheckEntry;
  /** Restart polling when this changes (e.g. page or list revision). */
  resetKey?: unknown;
  intervalMs?: number;
  enabled?: boolean;
};

const DEFAULT_INTERVAL_MS = 60_000;

/** Polls health for many entries in parallel via React Query. */
export function useIndexerHealthPolling<T>({
  entries,
  toHealthEntry,
  resetKey,
  intervalMs = DEFAULT_INTERVAL_MS,
  enabled = true,
}: UseIndexerHealthPollingOptions<T>): Map<string, IndexerHealthData> {
  const healthEntries = useMemo(
    () => (enabled ? entries.map((entry) => toHealthEntry(entry)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, entries, resetKey, toHealthEntry]
  );

  const queries = useQueries({
    queries: healthEntries.map((entry) => ({
      queryKey: [...healthQueryKey(entry), resetKey] as const,
      queryFn: () => fetchIndexerHealth(entry),
      enabled: Boolean(entry.address && entry.ip),
      staleTime: 0,
      refetchInterval: intervalMs,
      refetchIntervalInBackground: true,
    })),
  });

  return useMemo(() => {
    const liveDataByKey = new Map<string, IndexerHealthData>();
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
