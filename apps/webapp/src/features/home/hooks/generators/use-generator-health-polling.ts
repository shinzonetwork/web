"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchGeneratorHealth,
  healthQueryKey,
} from "./use-generator-health-check";
import { GeneratorHealthData } from "@/shared/lib";

type HealthCheckEntry = {
  address: string;
  ip: string;
};

type UseGeneratorHealthPollingOptions<T> = {
  entries: T[];
  toHealthEntry: (entry: T) => HealthCheckEntry;
  /** Skip polling for entries that do not meet health-check prerequisites. */
  isPollable?: (entry: T) => boolean;
  /** Restart polling when this changes (e.g. page or list revision). */
  resetKey?: unknown;
  intervalMs?: number;
  enabled?: boolean;
};

const DEFAULT_INTERVAL_MS = 60_000;

/** Polls health for many entries in parallel via React Query. */
export function useGeneratorHealthPolling<T>({
  entries,
  toHealthEntry,
  isPollable,
  resetKey,
  intervalMs = DEFAULT_INTERVAL_MS,
  enabled = true,
}: UseGeneratorHealthPollingOptions<T>): Map<string, GeneratorHealthData> {
  const healthEntries = useMemo(
    () =>
      enabled
        ? entries
            .filter((entry) => (isPollable ? isPollable(entry) : true))
            .map((entry) => toHealthEntry(entry))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, entries, isPollable, resetKey, toHealthEntry]
  );

  const queries = useQueries({
    queries: healthEntries.map((entry) => ({
      queryKey: [...healthQueryKey(entry), resetKey] as const,
      queryFn: () => fetchGeneratorHealth(entry),
      enabled: Boolean(entry.address && entry.ip),
      staleTime: 0,
      refetchInterval: intervalMs,
      refetchIntervalInBackground: true,
    })),
  });

  return useMemo(() => {
    const liveDataByKey = new Map<string, GeneratorHealthData>();
    for (const query of queries) {
      if (query.data) {
        liveDataByKey.set(query.data.key, query.data.data);
      }
    }
    return liveDataByKey;
  }, [queries]);
}
