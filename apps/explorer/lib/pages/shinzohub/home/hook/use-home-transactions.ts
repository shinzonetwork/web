'use client';

import { useMemo } from 'react';
import { useShinzohubTransactionIndex } from './use-shinzohub-transaction-index';

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
  const indexQuery = useShinzohubTransactionIndex({ refetchIntervalMs });

  const transactions = useMemo<TransactionSummary[]>(() => {
    const indexed = indexQuery.data?.transactions ?? [];
    if (!indexed.length) return [];
    return [...indexed]
      .sort((a, b) => {
        const blockDelta = BigInt(b.blockNumber) - BigInt(a.blockNumber);
        if (blockDelta !== BigInt(0)) {
          return blockDelta > BigInt(0) ? 1 : -1;
        }
        return b.transactionIndex - a.transactionIndex;
      })
      .slice(0, count)
      .map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
      }));
  }, [indexQuery.data?.transactions, count]);

  return {
    ...indexQuery,
    data: transactions,
  };
}
