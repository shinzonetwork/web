"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredHostsListResponse } from "@/shared/lib";
import { type PageParams } from "@shinzo/ui/pagination";
import { DEFAULT_PAGE_PARAMS } from "../../lib/health";

type UseRegisteredHostsOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export async function fetchRegisteredHosts(
  pageParams: PageParams
): Promise<RegisteredHostsListResponse> {
  const { page, limit, offset } = pageParams;
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    offset: String(offset),
  });
  const response = await fetch(
    `/api/shinzohub/hosts?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hosts");
  }

  return response.json() as Promise<RegisteredHostsListResponse>;
}

export function registeredHostsQueryKey(page: number, limit: number) {
  return ["shinzohub", "registered-hosts", page, limit] as const;
}

export function useRegisteredHosts({
  pageParams = DEFAULT_PAGE_PARAMS,
  refetchIntervalMs = 30_000,
}: UseRegisteredHostsOptions) {
  const { page, limit } = pageParams;

  return useQuery({
    queryKey: registeredHostsQueryKey(page, limit),
    queryFn: () => fetchRegisteredHosts(pageParams),
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      hosts: data.hosts,
      totalHostsCount: Number(data.pagination.total ?? 0),
    }),
  });
}
