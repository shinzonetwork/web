"use client";

import { useEffect, useRef } from "react";
import type { LiveData, LiveDataWithKey } from "@/shared/types";

export type HealthCheckEntry = {
  validatorAddress: string;
  ip: string;
};

type UseHealthPollingOptions<T> = {
  entries: T[];
  toHealthEntry: (entry: T) => HealthCheckEntry;
  fetchHealth: (entry: HealthCheckEntry) => Promise<LiveDataWithKey>;
  onResults: (liveDataByKey: Map<string, LiveData>) => void;
  /** Restart polling when this changes (e.g. page or list revision). */
  resetKey?: unknown;
  intervalMs?: number;
  enabled?: boolean;
};

const DEFAULT_INTERVAL_MS = 60_000;

export function useHealthPolling<T>({
  entries,
  toHealthEntry,
  fetchHealth,
  onResults,
  resetKey,
  intervalMs = DEFAULT_INTERVAL_MS,
  enabled = true,
}: UseHealthPollingOptions<T>) {
  const entriesRef = useRef(entries);
  const toHealthEntryRef = useRef(toHealthEntry);
  const fetchHealthRef = useRef(fetchHealth);
  const onResultsRef = useRef(onResults);

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    toHealthEntryRef.current = toHealthEntry;
  }, [toHealthEntry]);

  useEffect(() => {
    fetchHealthRef.current = fetchHealth;
  }, [fetchHealth]);

  useEffect(() => {
    onResultsRef.current = onResults;
  }, [onResults]);

  useEffect(() => {
    if (!enabled || entries.length === 0) return;

    let alive = true;

    const tick = async () => {
      const current = entriesRef.current;
      const checks = current.map((entry) =>
        fetchHealthRef.current(toHealthEntryRef.current(entry))
      );
      const results = await Promise.allSettled(checks);
      if (!alive) return;

      const liveDataByKey = new Map<string, LiveData>();
      for (const result of results) {
        if (result.status === "fulfilled") {
          liveDataByKey.set(result.value.key, result.value.data);
        }
      }

      onResultsRef.current(liveDataByKey);
    };

    void tick();
    const intervalId = setInterval(() => {
      void tick();
    }, intervalMs);

    return () => {
      alive = false;
      clearInterval(intervalId);
    };
  }, [enabled, entries.length, resetKey, intervalMs]);
}
