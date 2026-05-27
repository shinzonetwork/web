'use client';

import { useMemo } from 'react';
import { useShinzohubTransactions } from '../../hook/use-shinzohub-transactions';

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
  { count, refetchIntervalMs = 10_000 }: UseHomeTransactionsOptions = {},
) {
  const indexQuery = useShinzohubTransactions({ refetchIntervalMs });

  const transactions = useMemo<TransactionSummary[]>(() => {
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
      const requiredTransactions = count === undefined ? sorted : sorted.slice(0, count)
      return requiredTransactions.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to ?? null,
        value: tx.value,
        gasPrice: tx.gasPrice,
      }));
  }, [indexQuery.data?.transactions, count]);

  return {
    ...indexQuery,
    data: transactions,
  };
}
