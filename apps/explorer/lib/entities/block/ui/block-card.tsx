'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Cable as Cube, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardRow, CardTitle } from '@/shared/ui/card';
import { useBlock } from '@/entities/block';
import { Button } from '@/shared/ui/button';

export interface BlockCardProps {
  height: number;
}

export const BlockCard = ({ height }: BlockCardProps) => {
  const { data: block, isLoading } = useBlock({ number: height });

  const formatHash = (hash: string, start = 10, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
  }

  if (!block || !block.number) {
    return (
      <p className="text-center text-muted-foreground">Block not found.</p>
    );
  }

  return (
      <main className="container mx-auto py-12">
        <Card>
          <CardHeader className="pb-8">
            <CardTitle>Block Details</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <div className="flex justify-between border-b border-light pb-4">
                <span className="text-sm text-muted-foreground">Block Height</span>
                <div className="flex items-center gap-3">
                  <Link href={`/blocks/${block.number - 1}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <span className="font-mono text-sm text-foreground">{block.number}</span>
                  <Link href={`/blocks/${block.number + 1}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <CardRow
                loading={isLoading}
                title="Timestamp"
                value={block.timestamp}
              >
                {block.timestamp && new Date(Number(block.timestamp) * 1000).toLocaleString()}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Miner"
                value={block.miner}
                copyable
                link={block.miner ? `/address/${block.miner}` : undefined}
              >
                {block.miner && formatHash(block.miner)}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Size"
                value={block.size}
              >
                {block.size && `${(Number(block.size) / 1024).toFixed(2)} KB`}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Gas Used"
                value={block.gasUsed}
              >
                {block.gasUsed && block.gasLimit && (
                  <>
                    {(Number(block.gasUsed) / 1e6).toFixed(2)}M (
                    {((Number(block.gasUsed) / Number(block.gasLimit)) * 100).toFixed(2)}%)
                  </>
                )}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Gas Limit"
                value={block.gasLimit}
              >
                {block.gasLimit && `${(Number(block.gasLimit) / 1e6).toFixed(2)}M`}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Base Fee Per Gas"
                value={block.baseFeePerGas}
              >
                {block.baseFeePerGas} Gwei
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Nonce"
                value={block.nonce}
              />

              <CardRow
                loading={isLoading}
                title="Difficulty"
                value={block.difficulty}
              />

              {block.totalDifficulty && (
                <CardRow
                  loading={isLoading}
                  title="Total Difficulty"
                  value={block.totalDifficulty}
                />
              )}

              <CardRow
                loading={isLoading}
                title="Hash"
                value={block.hash}
                copyable
              >
                {block.hash && formatHash(block.hash, 16, 12)}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="Parent Hash"
                value={block.parentHash}
                copyable
                link={block.number ? `/blocks/${block.number - 1}` : undefined}
              >
                {block.parentHash && formatHash(block.parentHash, 16, 12)}
              </CardRow>

              <CardRow
                loading={isLoading}
                title="State Root"
                value={block.stateRoot}
                copyable
              >
                {block.stateRoot && formatHash(block.stateRoot, 16, 12)}
              </CardRow>
            </div>
          </CardContent>
        </Card>
      </main>
  );
};
