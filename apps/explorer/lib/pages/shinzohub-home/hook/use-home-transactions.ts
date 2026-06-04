'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchShinzohubTransactions,
  shinzohubTransactionsQueryKey,
} from '@/pages/transactions/hooks/shinzohub/use-shinzohub-transactions';

export type TransactionSummary = {
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}` | null | undefined;
  value: string;
};

type UseHomeTransactionsOptions = {
  count?: number;
  refetchIntervalMs?: number;
};

export function useHomeTransactions(
  { count = 5, refetchIntervalMs = 10_000 }: UseHomeTransactionsOptions = {},
) {
  const limit = Math.max(1, count);

  return useQuery({
    queryKey: shinzohubTransactionsQueryKey({ offset: 0, limit }),
    queryFn: () => fetchShinzohubTransactions({ offset: 0, limit }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) =>
      data.transactions.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to ?? null,
        value: tx.value,
      })),
  });
}
