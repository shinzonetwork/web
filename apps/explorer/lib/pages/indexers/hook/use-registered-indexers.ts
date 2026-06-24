"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredIndexersListResponse } from "@/shared/shinzohub/types";
import {
  buildCursorPaginationSearchParams,
  type CursorPaginationParams,
} from "../../../shared/cursor-pagination/lib/pagination";

export type RegisteredIndexersPaginationParams = CursorPaginationParams;

export async function fetchRegisteredIndexers(
  pagination: RegisteredIndexersPaginationParams
): Promise<RegisteredIndexersListResponse> {
  const params = buildCursorPaginationSearchParams(pagination);
  const response = await fetch(`/api/shinzohub/indexers?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch indexers");
  }

  return response.json() as Promise<RegisteredIndexersListResponse>;
}

export function useRegisteredIndexers(
  pagination: RegisteredIndexersPaginationParams,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "registered-indexers", pagination],
    queryFn: () => fetchRegisteredIndexers(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
