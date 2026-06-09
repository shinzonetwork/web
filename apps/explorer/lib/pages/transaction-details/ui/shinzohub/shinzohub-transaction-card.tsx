'use client';

import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';
import { formatGwei } from 'viem';
import { Badge } from '@/shared/ui/badge';
import type { ShinzohubTransaction } from '@/shared/shinzohub/types';
import { getPageLink } from '@/shared/utils/links';
import { DataItem, DataList } from '@/widgets/data-list';
import { useShinzohubEvmTransaction } from '../../hook/shinzohub/use-shinzohub-evm-transaction';
import { useShinzohubTransactionReceipt } from '../../hook/shinzohub/use-shinzohub-transaction-receipt';

function TransactionStatus({ success }: { success?: boolean }) {
  if (success === undefined) return null;
  return success ? (
    <Badge variant='outline' className='border-green-500/50 bg-green-500/10 text-green-500'>
      <CheckCircle2 className='mr-1 h-3 w-3' />
      Success
    </Badge>
  ) : (
    <Badge variant='outline' className='border-red-500/50 bg-red-500/10 text-red-500'>
      <XCircle className='mr-1 h-3 w-3' />
      Failed
    </Badge>
  );
}

export function ShinzohubTransactionCard({
  transaction,
  isLoading,
}: {
  transaction?: ShinzohubTransaction;
  isLoading: boolean;
}) {
  const { data: evmTransaction, isLoading: isEvmLoading } =
    useShinzohubEvmTransaction(transaction?.evmHash);
  const { data: receipt, isLoading: isReceiptLoading } =
    useShinzohubTransactionReceipt(transaction?.evmHash);
  const loading =
    isLoading ||
    (!!transaction?.evmHash && (isEvmLoading || isReceiptLoading));

  if (!loading && !transaction) {
    return <p className='text-center text-muted-foreground'>Transaction not found.</p>;
  }

  const transactionFee =
    receipt?.gasUsed && receipt.effectiveGasPrice
      ? receipt.gasUsed * receipt.effectiveGasPrice
      : null;

  return (
    <DataList>
      <DataItem title='Cosmos Hash' value={transaction?.cosmosHash} copyable loading={loading} />
      <DataItem title='EVM Hash' value={transaction?.evmHash} copyable loading={loading} />
      <DataItem title='Status' value={transaction?.success} loading={loading}>
        <TransactionStatus success={transaction?.success} />
      </DataItem>
      <DataItem title='Type' value={transaction?.kind} loading={loading}>
        {transaction?.kind && <Badge variant='outline'>{transaction.kind === 'evm' ? 'EVM' : 'Cosmos'}</Badge>}
      </DataItem>
      <DataItem
        title='Block'
        value={transaction?.height}
        link={
          transaction?.height
            ? getPageLink('block', { param: transaction.height, chain: 'shinzohub' })
            : undefined
        }
        loading={loading}
      />
      <DataItem title='Timestamp' value={transaction?.timestamp} loading={loading}>
        {transaction?.timestamp && (
          <>
            {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true })}
            {' '}({new Date(transaction.timestamp).toUTCString()})
          </>
        )}
      </DataItem>
      <DataItem title='Actions' value={transaction?.actions.join(', ')} loading={loading} />
      <DataItem title='Senders' value={transaction?.senders.join(', ')} copyable={transaction?.senders.length === 1} loading={loading} />
      <DataItem title='Recipients' value={transaction?.recipients.join(', ')} copyable={transaction?.recipients.length === 1} loading={loading} />
      <DataItem title='Fee' value={transaction?.fee} loading={loading} />
      <DataItem title='Gas Wanted' value={transaction?.gasWanted} loading={loading} />
      <DataItem title='Gas Used' value={transaction?.gasUsed} loading={loading} />
      <DataItem title='Memo' value={transaction?.memo} loading={loading} allowWrap />

      {transaction?.evmHash && (
        <>
          <DataItem title='EVM From' value={evmTransaction?.from} loading={loading} />
          <DataItem title='EVM To' value={evmTransaction?.to} loading={loading} />
          <DataItem title='EVM Value' value={evmTransaction?.value?.toString()} loading={loading} />
          <DataItem title='EVM Transaction Fee' value={transactionFee?.toString()} loading={loading} />
          <DataItem title='EVM Gas Price' value={receipt?.effectiveGasPrice} loading={loading}>
            {receipt?.effectiveGasPrice != null && `${formatGwei(receipt.effectiveGasPrice)} Gwei`}
          </DataItem>
          <DataItem title='EVM Nonce' value={evmTransaction?.nonce} loading={loading} />
          <DataItem
            title='EVM Input'
            value={evmTransaction?.input}
            loading={loading}
            allowWrap
            wrapAt={100}
          />
          <DataItem title='EVM Transaction Type' value={evmTransaction?.type} loading={loading} />
        </>
      )}
    </DataList>
  );
}
