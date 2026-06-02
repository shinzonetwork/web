// hooks/useLatestBlocks.ts
'use client'

import { useEffect, useState } from 'react'
import { getPublicClient } from '@/shared/viem/client'

export type BlockSummary = {
  number: bigint
  miner: `0x${string}`
  hash: `0x${string}`
  timestamp: bigint
  transactionCount: number
}

type UseHomeBlocksOptions = {
  count?: number
}

export function useHomeBlocks({ count = 5 }: UseHomeBlocksOptions = {}) {
  const publicClient = getPublicClient('shinzohub')
    const [blocks, setBlocks] = useState<BlockSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let first = true

    const unwatch = publicClient.watchBlocks({
      includeTransactions: true, // we want tx count from block.transactions.length
      emitOnBegin: true,        // emit the current head on subscribe
      emitMissed: true,         // if any blocks were missed, emit them in order

      onBlock(block) {
        setBlocks((prev) => {
          const summary: BlockSummary = {
            number: block.number,
            miner: block.miner,
            hash: block.hash,
            timestamp: block.timestamp,
            transactionCount: block.transactions.length,
          }

          // prepend new block, dedupe by hash, sort desc, keep latest `count`
          const next = [
            summary,
            ...prev.filter((b) => b.hash !== summary.hash),
          ]
            .sort((a, b) => Number(b.number - a.number))
            .slice(0, count)

          return next
        })

        if (first) {
          setIsLoading(false)
          first = false
        }
      },

      onError(err) {
        console.error(err)
        setError(err?.message ?? 'Failed to watch blocks')
        setIsLoading(false)
      },
    })

    return () => {
      unwatch()
    }
  }, [count, publicClient])

  return { blocks, isLoading, error }
}
