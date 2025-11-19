'use client';

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Cable as Cube, TrendingUp } from 'lucide-react'
import { Header } from '@/widgets/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useBlocks } from '@/entities/block';
import { useTransactions } from '@/entities/tx';
import { Skeleton } from '@/shared/ui/skeleton';

export const HomePage = () => {
  const { data: blocks, isLoading: blocksLoading } = useBlocks({ limit: 10, offset: 0 });
  const { data: txs, isLoading: txLoading } = useTransactions({ limit: 10, offset: 0 });

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  return (
    <div className="min-h-screen">
      <Header hideSearch />

      <main className="container mx-auto py-12">
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Blocks</CardTitle>
              <Cube className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              {blocksLoading ? (
                <div className='w-40 h-12'>
                  <Skeleton />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{blocks?.totalCount ?? 0}</div>
                  <p className="text-xs text-muted-foreground">Avg block time: 12.1s</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              {txLoading ? (
                <div className='w-40 h-12'>
                  <Skeleton />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{((txs?.totalCount ?? 0) / 1e6).toFixed(2)}M</div>
                  <p className="text-xs text-muted-foreground">Across all blocks</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Latest Blocks */}
          <Card className="bg-card">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Latest Blocks</CardTitle>
                <Link href="/blocks" className="flex items-center gap-1 text-sm text-secondary hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="flex flex-col gap-6">
                {blocksLoading && new Array(10).fill('').map((_, index) => (
                  <div key={index} className='w-full h-16'>
                    <Skeleton />
                  </div>
                ))}

                {(blocks?.blocks ?? []).map((block) => (
                  <div
                    key={block?.hash}
                    className="h-16 flex items-start justify-between border-b border-light pb-6 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-secondary">
                          <Cube className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <Link
                            href={`/blocks/${block?.number}`}
                            className="font-mono text-sm font-medium text-secondary hover:underline"
                          >
                            {block?.number}
                          </Link>
                          {block?.timestamp && (
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(Number(block.timestamp) * 1000), {
                                addSuffix: true,
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">0 txns</p>
                      <p className="text-xs text-muted-foreground">Miner: {formatHash(block?.miner || '', 6, 4)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Transactions */}
          <Card className="bg-card">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Latest Transactions</CardTitle>
                <Link href="/tx" className="flex items-center gap-1 text-sm text-secondary hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="flex flex-col gap-6">
                {txLoading && new Array(10).fill('').map((_, index) => (
                  <div key={index} className='w-full h-16'>
                    <Skeleton />
                  </div>
                ))}

                {(txs?.transactions ?? []).map((tx) => (
                  <div
                    key={tx?.hash}
                    className="h-16 flex items-start justify-between border-b border-light pb-6 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      {tx?.hash && (
                        <Link
                          href={`/tx/${tx?.hash}`}
                          className="block font-mono text-sm font-medium text-secondary hover:underline"
                        >
                          {formatHash(tx.hash)}
                        </Link>
                      )}

                      {!!(tx?.from && tx?.to) && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>From: {formatHash(tx.from, 6, 4)}</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>To: {formatHash(tx.to, 6, 4)}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      {tx?.value && (
                        <p className="text-sm font-medium text-foreground">{formatValue(tx.value)} ETH</p>
                      )}
                      {tx?.blockNumber && (
                        <p className="text-xs text-muted-foreground">Block {tx.blockNumber}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
};
