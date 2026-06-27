"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredGeneratorsListResponse } from "@/shared/shinzohub/types";
import {
  buildCursorPaginationSearchParams,
  type CursorPaginationParams,
} from "../../../shared/cursor-pagination/lib/pagination";

export type RegisteredGeneratorsPaginationParams = CursorPaginationParams;

export async function fetchRegisteredGenerators(
  pagination: RegisteredGeneratorsPaginationParams
): Promise<RegisteredGeneratorsListResponse> {
  const params = buildCursorPaginationSearchParams(pagination);
  const response = await fetch(`/api/shinzohub/generators?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch generators");
  }

  return response.json() as Promise<RegisteredGeneratorsListResponse>;
}

export function useRegisteredGenerators(
  pagination: RegisteredGeneratorsPaginationParams,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "registered-generators", pagination],
    queryFn: () => fetchRegisteredGenerators(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
