"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredHostsListResponse } from "@/shared/shinzohub/types";
import {
  buildCursorPaginationSearchParams,
  type CursorPaginationParams,
  type CursorPaginationResponse,
} from "../../../shared/cursor-pagination/lib/pagination";

export type RegisteredHost = RegisteredHostsResponse["hosts"][number];

export type RegisteredHostsResponse = RegisteredHostsListResponse & {
  pagination?: CursorPaginationResponse;
};

export type RegisteredHostsPaginationParams = CursorPaginationParams;

export async function fetchRegisteredHosts(
  pagination: RegisteredHostsPaginationParams
): Promise<RegisteredHostsResponse> {
  const params = buildCursorPaginationSearchParams(pagination);
  const response = await fetch(`/api/shinzohub/hosts?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch hosts");
  }

  return response.json() as Promise<RegisteredHostsResponse>;
}

export function useRegisteredHosts(
  pagination: RegisteredHostsPaginationParams,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "registered-hosts", pagination],
    queryFn: () => fetchRegisteredHosts(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
