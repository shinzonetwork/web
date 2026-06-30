'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchShinzohubBlocks,
  shinzohubBlocksQueryKey,
} from '@/pages/blocks/hooks/shinzohub/use-shinohub-blocks';
import { formatProposerAddress } from '@/shared/shinzohub/utils/format-proposer-address';

export type BlockSummary = {
  number: bigint;
  miner: `0x${string}` | null;
  hash: `0x${string}`;
  timestamp: bigint;
  transactionCount: number;
};

type UseHomeBlocksOptions = {
  count?: number;
  refetchIntervalMs?: number;
};

export function useHomeBlocks(
  { count = 5, refetchIntervalMs = 10_000 }: UseHomeBlocksOptions = {},
) {
  const limit = Math.max(1, count);

  const query = useQuery({
    queryKey: shinzohubBlocksQueryKey(1, limit),
    queryFn: () => fetchShinzohubBlocks({ page: 1, limit }),
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    select: (data) =>
      data.blocks.map((block): BlockSummary => ({
        number: BigInt(block.height),
        miner: block.proposerAddress
          ? formatProposerAddress(block.proposerAddress) as `0x${string}`
          : null,
        hash: block.hash,
        timestamp: BigInt(Math.floor(new Date(block.timestamp).getTime() / 1000)),
        transactionCount: block.transactionCount,
      })),
  });

  return {
    blocks: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
  };
}
