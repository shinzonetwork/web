'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Cable as Cube, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { useBlock } from '@/entities/block';
import { Button } from '@/shared/ui/button';

export interface BlockCardProps {
  height: number;
}

const CopyButton = ({ text }: { text: string }) => {
  const copy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copy}>
      <Copy className="h-3 w-3"/>
    </Button>
  );
};

interface CardRowNullableProps {
  title: string;
  value?: string | number | null;
  copyable?: boolean;
  link?: string;
  loading?: boolean;
  children?: ReactNode;
}

const CardRowNullable = ({
  title,
  value,
  copyable = false,
  link,
  loading = false,
  children
}: CardRowNullableProps) => {
  if (loading) {
    return (
      <div className="flex justify-between border-b border-light pb-4">
        <div className="h-5 w-32">
          <Skeleton />
        </div>
        <div className="h-5 w-48">
          <Skeleton />
        </div>
      </div>
    );
  }

  const isValueNull = typeof value === 'undefined' || value == null;
  const displayValue = isValueNull ? '—' : children || value;

  return (
    <div className="flex justify-between border-b border-light pb-4">
      <span className="text-sm text-muted-foreground">{title}</span>
      <div className="flex items-center gap-2">
        {link && !isValueNull ? (
          <Link href={link} className="font-mono text-sm text-foreground hover:underline">
            {displayValue}
          </Link>
        ) : (
          <span className="text-sm text-foreground">{displayValue}</span>
        )}
        {copyable && !isValueNull && typeof value === 'string' && <CopyButton text={value} />}
      </div>
    </div>
  );
};

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
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-secondary">
            <Cube className="h-6 w-6 text-foreground" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Block <span className='text-accent'>#{block.number}</span>
            </h1>
            {block.timestamp && (
              <p className="text-muted-foreground">
                {formatDistanceToNow(new Date(Number(block.timestamp) * 1000), { addSuffix: true })}
              </p>
            )}
          </div>
        </div>

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

              <CardRowNullable
                loading={isLoading}
                title="Timestamp"
                value={block.timestamp}
              >
                {block.timestamp && new Date(Number(block.timestamp) * 1000).toLocaleString()}
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Miner"
                value={block.miner}
                copyable
                link={block.miner ? `/address/${block.miner}` : undefined}
              >
                {block.miner && formatHash(block.miner)}
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Size"
                value={block.size}
              >
                {block.size && `${(Number(block.size) / 1024).toFixed(2)} KB`}
              </CardRowNullable>

              <CardRowNullable
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
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Gas Limit"
                value={block.gasLimit}
              >
                {block.gasLimit && `${(Number(block.gasLimit) / 1e6).toFixed(2)}M`}
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Base Fee Per Gas"
                value={block.baseFeePerGas}
              >
                {block.baseFeePerGas} Gwei
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Nonce"
                value={block.nonce}
              />

              <CardRowNullable
                loading={isLoading}
                title="Difficulty"
                value={block.difficulty}
              />

              {block.totalDifficulty && (
                <CardRowNullable
                  loading={isLoading}
                  title="Total Difficulty"
                  value={block.totalDifficulty}
                />
              )}

              <CardRowNullable
                loading={isLoading}
                title="Hash"
                value={block.hash}
                copyable
              >
                {block.hash && formatHash(block.hash, 16, 12)}
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="Parent Hash"
                value={block.parentHash}
                copyable
                link={block.number ? `/blocks/${block.number - 1}` : undefined}
              >
                {block.parentHash && formatHash(block.parentHash, 16, 12)}
              </CardRowNullable>

              <CardRowNullable
                loading={isLoading}
                title="State Root"
                value={block.stateRoot}
                copyable
              >
                {block.stateRoot && formatHash(block.stateRoot, 16, 12)}
              </CardRowNullable>
            </div>
          </CardContent>
        </Card>
      </main>
  );
};
