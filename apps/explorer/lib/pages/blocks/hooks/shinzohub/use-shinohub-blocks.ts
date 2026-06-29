'use client';

import { useQuery } from '@tanstack/react-query';
import type { ShinzohubBlocksResponse } from '@/shared/shinzohub/types';
import { DEFAULT_LIMIT, PageParams } from '@shinzo/ui/pagination';

type UseShinzohubBlocksOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export async function fetchShinzohubBlocks(params: {
  page: number;
  limit: number;
}): Promise<ShinzohubBlocksResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });
  const response = await fetch(`/api/shinzohub/blocks?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Shinzohub blocks');
  }
  return response.json() as Promise<ShinzohubBlocksResponse>;
}

export function shinzohubBlocksQueryKey(page: number, limit: number) {
  return ['shinzohub', 'blocks', page, limit] as const;
}

export function useShinzohubBlocks({
  pageParams,
  refetchIntervalMs = 10_000,
}: UseShinzohubBlocksOptions = {
  pageParams: { page: 1, offset: 0, limit: DEFAULT_LIMIT },
}) {
  const { page, limit } = pageParams;
  return useQuery({
    queryKey: shinzohubBlocksQueryKey(page, limit),
    queryFn: () => fetchShinzohubBlocks({ page, limit }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) => ({
      blocks: data.blocks,
      totalBlocksCount: data.total,
    }),
  });
}
