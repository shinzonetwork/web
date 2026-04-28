'use client';

import { getPublicClient } from '@/shared/viem/client';
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from 'viem';

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

function isFullTransaction(
  entry: Transaction | `0x${string}`,
): entry is Transaction {
  return typeof entry === 'object' && entry !== null && 'hash' in entry;
}

/**
 * Collects the most recent `count` transactions by walking backward from the chain tip.
 */
export async function fetchLatestTransactions(
  count: number = 5,
): Promise<TransactionSummary[]> {
  const publicClient = getPublicClient('shinzohub');
  const latestNumber = await publicClient.getBlockNumber({ cacheTime: 0 });

  const collected: TransactionSummary[] = [];
  const maxBlocksToScan = BigInt(128);
  let bn = latestNumber;
  while (
    collected.length < count
    && latestNumber - bn < maxBlocksToScan
  ) {
    const block = await publicClient.getBlock({
      blockNumber: bn,
      includeTransactions: true,
    });

    const txObjects = block.transactions.filter(isFullTransaction);

    for (let i = txObjects.length - 1; i >= 0 && collected.length < count; i -= 1) {
      const tx = txObjects[i];
      if (!tx.hash) continue;
      collected.push({
        hash: tx.hash,
        from: tx.from,
        to: tx.to ?? null,
        value: (tx.value ?? BigInt(0)).toString(),
      });
    }

    if (bn === BigInt(0)) break;
    bn -= BigInt(1);
  }

  return collected;
}

const HOME_TRANSACTIONS_QUERY_NAME = 'home-transactions';
const HOME_TRANSACTIONS_QUERY_CACHE_TIME = 10_000;

export function useHomeTransactions(
  { count = 5, refetchIntervalMs = 10_000 }: UseHomeTransactionsOptions = {},
) {
  return useQuery<TransactionSummary[]>({
    queryKey: [HOME_TRANSACTIONS_QUERY_NAME, count],
    queryFn: () => fetchLatestTransactions(count),
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    staleTime: HOME_TRANSACTIONS_QUERY_CACHE_TIME,
  });
}
