'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchShinzohubTransactions,
  shinzohubTransactionsQueryKey,
} from '@/pages/transactions/hooks/shinzohub/use-shinzohub-transactions';

type UseHomeTransactionsOptions = {
  count?: number;
  refetchIntervalMs?: number;
};

export function useHomeTransactions(
  { count = 5, refetchIntervalMs = 10_000 }: UseHomeTransactionsOptions = {},
) {
  const limit = Math.max(1, count);

  return useQuery({
    queryKey: shinzohubTransactionsQueryKey({ page: 1, limit, kind: 'all' }),
    queryFn: () => fetchShinzohubTransactions({ page: 1, limit, kind: 'all' }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) => ({
      total: data.total,
      transactions: data.transactions.map((transaction) => ({
        hash: transaction.cosmosHash,
        kind: transaction.kind,
        action: transaction.actions[0] ?? transaction.kind,
        from: transaction.senders[0] ?? null,
        to: transaction.recipients[0] ?? null,
        value: transaction.transfers[0]?.amount ?? null,
      })),
    }),
  });
}
