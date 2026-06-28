"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredHostsListResponse } from "@/shared/shinzohub/types";
import { DEFAULT_LIMIT, type PageParams } from "@shinzo/ui/pagination";

type UseRegisteredHostsOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export async function fetchRegisteredHosts(params: {
  page: number;
  limit: number;
}): Promise<RegisteredHostsListResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });
  const response = await fetch(`/api/shinzohub/hosts?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch hosts");
  }

  return response.json() as Promise<RegisteredHostsListResponse>;
}

export function registeredHostsQueryKey(page: number, limit: number) {
  return ["shinzohub", "registered-hosts", page, limit] as const;
}

export function useRegisteredHosts({
  pageParams,
  refetchIntervalMs = 30_000,
}: UseRegisteredHostsOptions = {
  pageParams: { page: 1, offset: 0, limit: DEFAULT_LIMIT },
}) {
  const { page, limit } = pageParams;

  return useQuery({
    queryKey: registeredHostsQueryKey(page, limit),
    queryFn: () => fetchRegisteredHosts({ page, limit }),
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      hosts: data.hosts,
      totalHostsCount: Number(data.pagination.total ?? 0),
    }),
  });
}
