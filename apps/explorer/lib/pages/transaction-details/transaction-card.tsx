'use client';

import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { useTransaction } from '../../hooks/use-transaction';
import { DataItem, DataList } from '@/widgets/data-list';

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
    <DataList>
      <DataItem
        title='Transaction Hash'
        value={tx.hash}
        copyable
        loading={isLoading}
      >
        {tx.hash}
      </DataItem>

      <DataItem
        title='Status'
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
      </DataItem>

      <DataItem
        title='Block'
        value={tx.blockNumber}
        link={`/blocks/${tx.blockNumber}`}
        loading={isLoading}
      >
            {tx.blockNumber}
      </DataItem>

      <DataItem
        title='Timestamp'
        value={tx.block?.timestamp}
        loading={isLoading}
      >
        {tx.block?.timestamp && formatDistanceToNow(new Date(Number(tx.block.timestamp) * 1000), {
          addSuffix: true,
        })}
        {' '}
        ({new Date(Number(tx.block!.timestamp) * 1000).toUTCString()})
      </DataItem>

      <DataItem
        title='From'
        value={tx.from}
        link={`/address/${tx.from}`}
        copyable
        loading={isLoading}
      >
        {tx.from}
      </DataItem>

      <DataItem
        title="To"
        value={tx.to}
        link={`/address/${tx.to}`}
        copyable
        loading={isLoading}
      >
        {tx.to}
      </DataItem>

      <DataItem
        title="Value"
        value={tx.value}
        loading={isLoading}
      >
        {tx.value && `${formatValue(tx.value)} ETH`}
      </DataItem>

      <DataItem
        title="Transaction Fee"
        value={tx.gasUsed && tx.gasPrice ? transactionFee : null}
        loading={isLoading}
      >
        {transactionFee.toFixed(8)} ETH
      </DataItem>

      <DataItem
        title="Gas Price"
        value={tx.gasPrice}
        loading={isLoading}
      >
        {tx.gasPrice && `${formatGasPrice(tx.gasPrice)} Gwei`}
      </DataItem>

      <DataItem
        title="Gas Limit"
        value={tx.gas}
        loading={isLoading}
      />

      <DataItem
        title="Gas Used"
        value={tx.gasUsed}
        loading={isLoading}
      >
        {tx.gasUsed && tx.gas && (
          <>
            {tx.gasUsed} ({((Number(tx.gasUsed) / Number(tx.gas)) * 100).toFixed(2)}%)
          </>
        )}
      </DataItem>

      <DataItem
        title="Nonce"
        value={tx.nonce}
        loading={isLoading}
      />

      <DataItem
        title="Position in Block"
        value={tx.transactionIndex}
        loading={isLoading}
      />

      <DataItem
        title="Input Data"
        value={tx.input}
        loading={isLoading}
        copyable
        allowWrap
        wrapAt={tx.input && tx.input.length > 100 ? 100 : tx.input?.length}
      >
          {tx.input}
      </DataItem>

      <DataItem
        title='Type'
        value={tx.type}
        loading={isLoading}
      >
        <Badge variant='outline'>Type {tx.type}</Badge>
      </DataItem>

      <DataItem
        title='Chain ID'
        value={tx.chainId}
        loading={isLoading}
      />
    </DataList>
  );
}
