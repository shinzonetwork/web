'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPublicClient } from '@/shared/viem/client';
import type { Transaction } from 'viem';

const SHINZOHUB_TX_QUERY_KEY = ['shinzohub', 'transactions'] as const;
const SHINZOHUB_TX_STORAGE_KEY = 'shinzohub_txs_storage';
const SHINZOHUB_TX_REFETCH_INTERVAL_MS = 60_000;
const BLOCK_BATCH_SIZE = 20;

export type ShinzohubTransaction = {
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}` | null;
  value: string;
  gasPrice: string;
  blockNumber: string;
  timestamp: string;
  transactionIndex: number;
};

export type ShinzohubTransactionsStorageState = {
  lastScannedBlock: string;
  transactions: ShinzohubTransaction[];
};

function blockHasTransactions(
  entry: Transaction | `0x${string}`,
): entry is Transaction {
  return typeof entry === 'object' && entry !== null && 'hash' in entry;
}

function safeReadStorage(): ShinzohubTransactionsStorageState {
  if (typeof window === 'undefined') {
    return { lastScannedBlock: '-1', transactions: [] };
  }
  try {
    const raw = window.localStorage.getItem(SHINZOHUB_TX_STORAGE_KEY);
    if (!raw) return { lastScannedBlock: '-1', transactions: [] };
    const parsed = JSON.parse(raw) as Partial<ShinzohubTransactionsStorageState> | null;
    if (!parsed || typeof parsed.lastScannedBlock !== 'string' || !Array.isArray(parsed.transactions)) {
      return { lastScannedBlock: '-1', transactions: [] };
    }
    return {
      lastScannedBlock: parsed.lastScannedBlock,
      transactions: parsed.transactions as ShinzohubTransaction[],
    };
  } catch {
    return { lastScannedBlock: '-1', transactions: [] };
  }
}

function safeWriteStorage(state: ShinzohubTransactionsStorageState): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SHINZOHUB_TX_STORAGE_KEY, JSON.stringify(state));
}

type SyncOptions = {
  onCheckpoint?: (state: ShinzohubTransactionsStorageState) => void;
};

export async function syncShinzohubTransactions(
  options: SyncOptions = {},
): Promise<ShinzohubTransactionsStorageState> {
  const { onCheckpoint } = options;
  const publicClient = getPublicClient('shinzohub');
  const latestBlock = await publicClient.getBlockNumber({ cacheTime: 0 });

  const cached = safeReadStorage();
  let nextBlockToScan = BigInt(cached.lastScannedBlock) + BigInt(1);
  if (nextBlockToScan < BigInt(0)) {
    nextBlockToScan = BigInt(0);
  }

  // Nothing new to scan; keep cache aligned with current tip.
  if (nextBlockToScan > latestBlock) {
    const unchanged = {
      ...cached,
      lastScannedBlock: latestBlock.toString(),
    };
    safeWriteStorage(unchanged);
    onCheckpoint?.(unchanged);
    return unchanged;
  }

  const allTransactions = [...cached.transactions];
  const seenHashes = new Set<string>(allTransactions.map((tx) => tx.hash));

  let start = nextBlockToScan;
  while (start <= latestBlock) {
    const end = start + BigInt(BLOCK_BATCH_SIZE - 1);
    const batchEnd = end < latestBlock ? end : latestBlock;

    const blockNumbers: bigint[] = [];
    for (let current = start; current <= batchEnd; current += BigInt(1)) {
      blockNumbers.push(current);
    }

    const blocks = await Promise.all(
      blockNumbers.map((blockNumber) =>
        publicClient.getBlock({
          blockNumber,
          includeTransactions: true,
        }),
      ),
    );

    blocks.forEach((block) => {
      const txObjects = block.transactions.filter(blockHasTransactions);
      txObjects.forEach((tx, idx) => {
        if (!tx.hash || seenHashes.has(tx.hash)) return;
        allTransactions.push({
          hash: tx.hash,
          from: tx.from,
          to: tx.to ?? null,
          value: (tx.value ?? BigInt(0)).toString(),
          gasPrice: (tx.gasPrice ?? BigInt(0)).toString(),
          blockNumber: (block.number ?? BigInt(0)).toString(),
          timestamp: (block.timestamp ?? BigInt(0)).toString(),
          transactionIndex: Number(tx.transactionIndex ?? idx),
        });
        seenHashes.add(tx.hash);
      });
    });

    const checkpoint: ShinzohubTransactionsStorageState = {
      lastScannedBlock: batchEnd.toString(),
      transactions: allTransactions,
    };
    safeWriteStorage(checkpoint);
    onCheckpoint?.(checkpoint);
    start = batchEnd + BigInt(1);
  }

  const finalState: ShinzohubTransactionsStorageState = {
    lastScannedBlock: latestBlock.toString(),
    transactions: allTransactions,
  };
  safeWriteStorage(finalState);
  onCheckpoint?.(finalState);
  return finalState;
}

export function useShinzohubTransactions(
  { refetchIntervalMs = SHINZOHUB_TX_REFETCH_INTERVAL_MS }: { refetchIntervalMs?: number } = {},
) {
  const queryClient = useQueryClient();

  return useQuery<ShinzohubTransactionsStorageState>({
    queryKey: SHINZOHUB_TX_QUERY_KEY,
    queryFn: () =>
      syncShinzohubTransactions({
        onCheckpoint: (checkpoint) => {
          queryClient.setQueryData(SHINZOHUB_TX_QUERY_KEY, checkpoint);
        },
      }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}

