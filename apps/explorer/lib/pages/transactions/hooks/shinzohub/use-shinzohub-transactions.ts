'use client';

import { useQuery } from '@tanstack/react-query';
import { DEFAULT_LIMIT, type PageParams } from '@shinzo/ui/pagination';
import { ShinzohubTransactionSummary } from '@/shared/types/types';

type UseShinzohubTransactionsOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export type ShinzohubTransactionsResponse = {
  lastScannedBlock: string;
  transactions: ShinzohubTransactionSummary[];
  total: number;
};

export function shinzohubTransactionsQueryKey(params: { offset: number; limit: number }) {
  return ['shinzohub', 'transactions', params.offset, params.limit] as const;
}

export async function fetchShinzohubTransactions(params: {
  offset: number;
  limit: number;
}): Promise<ShinzohubTransactionsResponse> {
  const searchParams = new URLSearchParams({
    offset: String(params.offset),
    limit: String(params.limit),
  });
  const response = await fetch(`/api/shinzohub/transactions?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Shinzohub transactions');
  }

  return response.json() as Promise<ShinzohubTransactionsResponse>;
}

export function useShinzohubTransactions(
  {
    pageParams,
    refetchIntervalMs = 30_000,
  }: UseShinzohubTransactionsOptions = {
    pageParams: { page: 1, offset: 0, limit: DEFAULT_LIMIT },
  },
) {
  const { offset, limit } = pageParams;

  return useQuery({
    queryKey: shinzohubTransactionsQueryKey({ offset, limit }),
    queryFn: () => fetchShinzohubTransactions({ offset, limit }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) => ({
      transactions: data.transactions,
      totalTransactionsCount: data.total,
      lastScannedBlock: data.lastScannedBlock,
    }),
  });
}
