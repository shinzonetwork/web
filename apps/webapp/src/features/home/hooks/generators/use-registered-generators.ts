"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredGeneratorsListResponse } from "@/shared/lib";
import { type PageParams } from "@shinzo/ui/pagination";
import { DEFAULT_PAGE_PARAMS } from "../../lib/health";

type UseRegisteredGeneratorsOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export async function fetchRegisteredGenerators(params: {
  page: number;
  limit: number;
}): Promise<RegisteredGeneratorsListResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });
  const response = await fetch(
    `/api/shinzohub/generators?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch generators");
  }

  return response.json() as Promise<RegisteredGeneratorsListResponse>;
}

export function registeredGeneratorsQueryKey(page: number, limit: number) {
  return ["shinzohub", "registered-generators", page, limit] as const;
}

export function useRegisteredGenerators({
  pageParams = DEFAULT_PAGE_PARAMS,
  refetchIntervalMs = 30_000,
}: UseRegisteredGeneratorsOptions) {
  const { page, limit } = pageParams;

  return useQuery({
    queryKey: registeredGeneratorsQueryKey(page, limit),
    queryFn: () => fetchRegisteredGenerators({ page, limit }),
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      generators: data.generators,
      totalGeneratorsCount: Number(data.pagination?.total ?? 0),
    }),
  });
}
