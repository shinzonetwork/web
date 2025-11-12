'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, FileText, XCircle } from 'lucide-react';
import { formatHash } from '@/shared/utils/format-hash';
import { Separator } from '@/shared/ui/separator';
import { Card, CardContent, CardHeader, CardRow, CardTitle } from '@/shared/ui/card';
import { useTransaction } from '@/entities/tx';
import { Badge } from '@/shared/ui/badge';

export interface TransactionCardProps {
  txHash: string;
}

export const TransactionCard = ({ txHash }: TransactionCardProps) => {
  const { data: tx, isLoading } = useTransaction({ hash: txHash });

  if (!tx || !tx.hash) {
    return (
      <p className="text-center text-muted-foreground">Transaction not found.</p>
    );
  }

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  const formatGasPrice = (gasPrice: string) => {
    const gwei = Number(gasPrice) / 1e9
    return gwei.toFixed(2)
  }

  const transactionFee = (Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18;

  return (
    <main className="container mx-auto py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
          <FileText className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transaction Details</h1>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">{tx.hash}</span>
            {tx.status ? (
              <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Success
              </Badge>
            ) : (
              <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500">
                <XCircle className="mr-1 h-3 w-3" />
                Failed
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CardRow
                  title="Transaction Hash"
                  value={tx.hash}
                  copyable
                  loading={isLoading}
                >
                  {formatHash(tx.hash, 16, 12)}
                </CardRow>

                <CardRow
                  title="Status"
                  value={tx.status ? 'success' : 'failed'}
                  loading={isLoading}
                >
                  {tx.status ? (
                    <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </CardRow>

                <CardRow
                  title="Block"
                  value={tx.blockNumber}
                  link={`/blocks/${tx.blockNumber}`}
                  loading={isLoading}
                />

                <CardRow
                  title="Timestamp"
                  value={tx.block?.timestamp}
                  loading={isLoading}
                >
                  {tx.block?.timestamp && formatDistanceToNow(new Date(Number(tx.block.timestamp) * 1000), {
                    addSuffix: true,
                  })}
                </CardRow>

                <CardRow
                  title="From"
                  value={tx.from}
                  link={`/address/${tx.from}`}
                  copyable
                  loading={isLoading}
                >
                  {tx.from && formatHash(tx.from)}
                </CardRow>

                <CardRow
                  title="To"
                  value={tx.to}
                  link={`/address/${tx.to}`}
                  copyable
                  loading={isLoading}
                >
                  {tx.to && formatHash(tx.to)}
                </CardRow>

                <CardRow
                  title="Value"
                  value={tx.value}
                  loading={isLoading}
                >
                  {tx.value && `${formatValue(tx.value)} ETH`}
                </CardRow>

                <CardRow
                  title="Transaction Fee"
                  value={tx.gasUsed && tx.gasPrice ? transactionFee : null}
                  loading={isLoading}
                >
                  {transactionFee.toFixed(8)} ETH
                </CardRow>

                <CardRow
                  title="Gas Price"
                  value={tx.gasPrice}
                  loading={isLoading}
                >
                  {tx.gasPrice && `${formatGasPrice(tx.gasPrice)} Gwei`}
                </CardRow>

                <CardRow
                  title="Gas Limit"
                  value={tx.gas}
                  loading={isLoading}
                />

                <CardRow
                  title="Gas Used"
                  value={tx.gasUsed}
                  loading={isLoading}
                >
                  {tx.gasUsed && tx.gas && (
                    <>
                      {tx.gasUsed} ({((Number(tx.gasUsed) / Number(tx.gas)) * 100).toFixed(2)}%)
                    </>
                  )}
                </CardRow>

                <CardRow
                  title="Nonce"
                  value={tx.nonce}
                  loading={isLoading}
                />

                <CardRow
                  title="Position in Block"
                  value={tx.transactionIndex}
                  loading={isLoading}
                />

                <CardRow
                  title="Input Data"
                  value={tx.input}
                  loading={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Transaction Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline">Type {tx.type}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chain ID</span>
                <span className="font-medium text-foreground">{tx.chainId}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Block Hash</span>
                <Link href={`/blocks/${tx.blockNumber}`} className="font-mono text-xs text-accent hover:underline">
                  {formatHash(tx.blockHash, 8, 6)}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gas Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Fee</span>
                <span className="font-medium text-foreground">{formatGasPrice(tx.maxFeePerGas)} Gwei</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Priority</span>
                <span className="font-medium text-foreground">{formatGasPrice(tx.maxPriorityFeePerGas)} Gwei</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Effective Price</span>
                <span className="font-medium text-foreground">{formatGasPrice(tx.effectiveGasPrice)} Gwei</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background-secondary/30">
            <CardHeader>
              <CardTitle className="text-base">Transaction Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{transactionFee.toFixed(8)} ETH</div>
              <p className="mt-1 text-xs text-muted-foreground">≈ ${(transactionFee * 3500).toFixed(2)} USD</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
