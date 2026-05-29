'use client';

import { useMemo } from 'react';
import { useShinzohubTransactionsSync, ShinzohubTransaction } from './use-shinzohub-transactions-sync';
import { DEFAULT_LIMIT, PageParams } from '@shinzo/ui/pagination';


type UseShinzohubTransactionsOptions = {
  pageParams: PageParams;
  refetchIntervalMs?: number;
};

export function useShinzohubTransactions(
  { pageParams, refetchIntervalMs = 10_000 }: UseShinzohubTransactionsOptions = { pageParams: { page: 1, offset: 0, limit: DEFAULT_LIMIT } },
) {
  const { offset, limit } = pageParams;
  const indexQuery = useShinzohubTransactionsSync({ refetchIntervalMs });

  const transactions = useMemo<ShinzohubTransaction[]>(() => {
    const indexed = indexQuery.data?.transactions ?? [];
    if (!indexed.length) return [];
    const sorted = [...indexed]
      .sort((a, b) => {
        const blockDelta = BigInt(b.blockNumber) - BigInt(a.blockNumber);
        if (blockDelta !== BigInt(0)) {
          return blockDelta > BigInt(0) ? 1 : -1;
        }
        return b.transactionIndex - a.transactionIndex;
      })
      return sorted.slice(offset, offset + limit);

  }, [indexQuery.data?.transactions, offset, limit]);

  return {
    ...indexQuery,
    data: transactions,
    totalTransactionsCount: indexQuery.data?.transactions?.length ?? 0,
  };
}
