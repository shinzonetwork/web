'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicClient } from '@/shared/viem/client';
import type { Block, Hex } from 'viem';

export type BlockSummary = {
  number: bigint;
  timestamp: bigint;
  transactionCount: number;
  miner: Hex;
  gasUsed: string;
  gasLimit: string;
};

type UseShinzohubBlocksOptions = {
  limit?: number;
  offset?: number;
  refetchIntervalMs?: number;
};

function getBlockSummary(block: Block): BlockSummary {
  if (!block.miner) {
    throw new Error('Incomplete block data');
  }

  return {
    number: block.number ?? BigInt(0),
    miner: block.miner,
    timestamp: block.timestamp ?? BigInt(0),
    transactionCount: block.transactions.length,
    gasUsed: block.gasUsed?.toString() ?? '0',
    gasLimit: block.gasLimit?.toString() ?? '0',
  };
}

async function fetchShinzohubBlocks(limit: number, offset: number): Promise<BlockSummary[]> {
  const publicClient = getPublicClient('shinzohub');
  const latestBlock = await publicClient.getBlockNumber({ cacheTime: 0 });

  const blockNumbers: bigint[] = [];
  for (let i = 0; i < limit && latestBlock - BigInt(offset + i) >= BigInt(0); i += 1) {
    blockNumbers.push(latestBlock - BigInt(offset + i));
  }

  const blocks = await Promise.all(
    blockNumbers.map((blockNumber) =>
      publicClient.getBlock({
        blockNumber,
        includeTransactions: true,
      }),
    ),
  );

  return blocks.map(getBlockSummary);
}

export function shinzohubBlocksQueryKey(limit: number, offset: number) {
  return ['shinzohub', 'blocks', limit, offset] as const;
}

export function useShinzohubBlocks({
  limit = 10,
  offset = 0,
  refetchIntervalMs = 10_000,
}: UseShinzohubBlocksOptions = {}) {
  return useQuery({
    queryKey: shinzohubBlocksQueryKey(limit, offset),
    queryFn: () => fetchShinzohubBlocks(limit, offset),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
