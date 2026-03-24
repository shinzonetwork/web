"use client";

import { IndexerEntry, IndexerWithHealth } from "@/shared/types";
import { useCallback, useState } from "react";
import { indexerEntryKey } from "@/shared/lib";

const DEFAULT_PAGE_SIZE = 10;

export const useLoadIndexers = () => {
  const [entries, setEntries] = useState<IndexerWithHealth[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listRevision, setListRevision] = useState(0);

  const loadIndexers = useCallback(
    async (page: number, pageSize: number = DEFAULT_PAGE_SIZE) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/indexers?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error(`Failed to load entries: ${res.statusText}`);
        }

        const data = (await res.json()) as {
          entries: IndexerEntry[];
          total: number;
          totalPages: number;
          page: number;
          pageSize: number;
        };

        setTotalEntries(data.total);
        const withHealth: IndexerWithHealth[] = data.entries.map((e) => ({
          ...e,
          health: "unknown",
        }));
        setEntries(withHealth);
        setListRevision((r) => r + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateEntriesWithHealth = useCallback(
    (healthByKey: Map<string, IndexerWithHealth["health"]>) => {
      setEntries((prev) =>
        prev.map((entry) => {
          const nextHealth = healthByKey.get(indexerEntryKey(entry));
          return nextHealth ? { ...entry, health: nextHealth } : entry;
        })
      );
    },
    []
  );

  return {
    entries,
    totalEntries,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    loading,
    error,
    listRevision,
    loadIndexers,
    updateEntriesWithHealth,
  };
};
