'use client';

import { useQuery } from '@tanstack/react-query';
import { DEFAULT_LIMIT, type PageParams } from '@shinzo/ui/pagination';
import {
  type ShinzohubTransactionsResponse,
  type ShinzohubTransactionFilter,
} from '@/shared/shinzohub/types';

type UseShinzohubTransactionsOptions = {
  pageParams: PageParams;
  kind?: ShinzohubTransactionFilter;
  block?: number;
  enabled?: boolean;
  refetchIntervalMs?: number;
};

export function shinzohubTransactionsQueryKey(params: {
  page: number;
  limit: number;
  kind: ShinzohubTransactionFilter;
  block?: number;
}) {
  return ['shinzohub', 'transactions', params.page, params.limit, params.kind, params.block] as const;
}

export async function fetchShinzohubTransactions(params: {
  page: number;
  limit: number;
  kind?: ShinzohubTransactionFilter;
  block?: number;
}): Promise<ShinzohubTransactionsResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    kind: params.kind ?? 'all',
  });
  if (params.block) {
    searchParams.set('block', String(params.block));
  }
  const response = await fetch(`/api/shinzohub/transactions?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Shinzohub transactions');
  }

  return response.json() as Promise<ShinzohubTransactionsResponse>;
}

export function useShinzohubTransactions(
  {
    pageParams,
    kind = 'all',
    block,
    enabled = true,
    refetchIntervalMs = 30_000,
  }: UseShinzohubTransactionsOptions = {
    pageParams: { page: 1, offset: 0, limit: DEFAULT_LIMIT },
  },
) {
  const { page, limit } = pageParams;

  return useQuery({
    queryKey: shinzohubTransactionsQueryKey({ page, limit, kind, block }),
    queryFn: () => fetchShinzohubTransactions({ page, limit, kind, block }),
    enabled,
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) => ({
      transactions: data.transactions,
      totalTransactionsCount: data.total,
    }),
  });
}
