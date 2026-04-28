'use client'

import { getPublicClient } from '@/shared/viem/client'
import { useQuery } from '@tanstack/react-query'

export type BlockSummary = {
  number: bigint
  miner: `0x${string}`
  timestamp: bigint
  transactionCount: number
}

type UseHomeBlocksOptions = {
    count?: number
    refetchIntervalMs?: number
}

export async function fetchLatestBlocks(count: number = 5): Promise<BlockSummary[]> {
    // latest chain tip (disable viem blockNumber cache so polling always hits node)
    const publicClient = getPublicClient('shinzohub')
    const latestNumber = await publicClient.getBlockNumber({ cacheTime: 0 })
  
    const blockNumbers = Array.from({ length: count }, (_, i) => latestNumber - BigInt(i))
  
    const blocks = await Promise.all(
      blockNumbers.map((bn) =>
        publicClient.getBlock({
          blockNumber: bn,
          includeTransactions: true,
        })
      )
    )
  
    return blocks
      .map((b) => ({
        number: b.number,
        miner: b.miner,
        timestamp: b.timestamp,
        transactionCount: b.transactions.length,
      }))
      .sort((a, b) => Number(b.number - a.number))
  }

const HOME_BLOCKS_QUERY_NAME = 'home-blocks'
const HOME_BLOCKS_QUERY_CACHE_TIME = 10_000

export function useHomeBlocks(
    { count = 5, refetchIntervalMs = 10_000 }: UseHomeBlocksOptions = {},
  ) {
    return useQuery<BlockSummary[]>({
      queryKey: [HOME_BLOCKS_QUERY_NAME, count],
      queryFn: () => fetchLatestBlocks(count),
      refetchInterval: refetchIntervalMs,         // poll every minute
      refetchIntervalInBackground: true,          // keep polling when tab is hidden (optional)
      staleTime: HOME_BLOCKS_QUERY_CACHE_TIME,                          // mark data “fresh” for 30s (tune as needed)
    })
  }