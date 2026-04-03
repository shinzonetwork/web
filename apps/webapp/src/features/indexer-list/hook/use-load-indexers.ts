"use client";

import { useQuery } from "@tanstack/react-query";
import { IndexerEntry, LiveData, LiveIndexer } from "@/shared/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { indexerEntryKey } from "@/shared/lib";

type IndexerResponse = {
  entries: IndexerEntry[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

const DEFAULT_PAGE_SIZE = 10;

export const useLoadIndexers = () => {
  const [entries, setEntries] = useState<LiveIndexer[]>([]);
  const [listRevision, setListRevision] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const query = useQuery({
    queryKey: ["indexers", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/getIndexers?page=${page}&pageSize=${pageSize}`
      );
      if (!res.ok) {
        throw new Error(`Failed to load entries: ${res.statusText}`);
      }

      return (await res.json()) as IndexerResponse;
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.data) return;
    const withHealth: LiveIndexer[] = query.data.entries.map((e) => ({
      ...e,
      health: "unknown",
    }));
    setEntries(withHealth);
    setListRevision((r) => r + 1);
  }, [query.data]);

  const loadIndexers = useCallback(
    async (nextPage: number, nextPageSize: number = DEFAULT_PAGE_SIZE) => {
      setPage(nextPage);
      setPageSize(nextPageSize);
    },
    []
  );

  const updateEntriesWithLiveData = useCallback(
    (liveDataByKey: Map<string, LiveData>) => {
      setEntries((prev) =>
        prev.map((entry) => {
          const nextLiveData = liveDataByKey.get(indexerEntryKey(entry));
          return nextLiveData ? { ...entry, ...nextLiveData } : entry;
        })
      );
    },
    []
  );

  const error = useMemo(
    () => (query.error instanceof Error ? query.error.message : null),
    [query.error]
  );

  return {
    entries,
    totalEntries: query.data?.total ?? 0,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    loading: query.isLoading || query.isFetching,
    error,
    listRevision,
    loadIndexers,
    updateEntriesWithLiveData,
  };
};
