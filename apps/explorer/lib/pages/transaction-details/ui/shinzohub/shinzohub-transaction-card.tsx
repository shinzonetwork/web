'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { formatGwei } from 'viem';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { ShinzohubTransaction } from '@/shared/shinzohub/types';
import {
  formatShinzoBaseAmount,
  formatShinzoCoin,
} from '@/shared/utils/format-token';
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

function TransactionInput({
  input,
  loading,
}: {
  input?: string;
  loading: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  if (loading || !input) {
    return <DataItem title='Input' value={input} loading={loading} />;
  }

  const byteLength = Math.max(0, (input.length - 2) / 2);

  return (
    <DataItem
      title='Input'
      value={input}
      allowWrap={expanded}
      truncate={!expanded}
      childClassName={expanded ? 'flex-col items-start gap-3' : undefined}
    >
      <div className='flex min-w-0 flex-col items-start gap-3'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='px-0 text-text-accent'
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
          {expanded ? 'Hide input' : `Show input (${byteLength.toLocaleString()} bytes)`}
        </Button>
        {expanded && (
          <code className='max-w-[100ch] break-all whitespace-pre-wrap text-xs'>
            {input}
          </code>
        )}
      </div>
    </DataItem>
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
    receipt?.gasUsed != null && receipt.effectiveGasPrice != null
      ? receipt.gasUsed * receipt.effectiveGasPrice
      : null;
  const transfer = transaction?.transfers[0];
  const from = transaction?.evmHash
    ? evmTransaction?.from
    : transfer?.sender ?? transaction?.senders[0];
  const to = transaction?.evmHash
    ? evmTransaction?.to
    : transfer?.recipient ?? transaction?.recipients[0];
  const amount = transaction?.evmHash
    ? evmTransaction?.value != null
      ? formatShinzoBaseAmount(evmTransaction.value)
      : undefined
    : transfer?.amount
      ? formatShinzoCoin(transfer.amount)
      : undefined;
  const fee = transaction?.evmHash
    ? transactionFee != null
      ? formatShinzoBaseAmount(transactionFee)
      : undefined
    : transaction?.fee
      ? formatShinzoCoin(transaction.fee)
      : transaction?.fee;

  return (
    <DataList>
      <DataItem title='Status' value={transaction?.success} loading={loading}>
        <TransactionStatus success={transaction?.success} />
      </DataItem>
      <DataItem title='Type' value={transaction?.kind} loading={loading}>
        {transaction?.kind && <Badge variant='outline'>{transaction.kind === 'evm' ? 'EVM' : 'Cosmos'}</Badge>}
      </DataItem>
      <DataItem title='From' value={from} copyable loading={loading} />
      <DataItem title='To' value={to} copyable loading={loading} />
      <DataItem title='Amount' value={amount} loading={loading} />
      <DataItem title='Fee' value={fee} loading={loading} />
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
      <DataItem title='Cosmos Hash' value={transaction?.cosmosHash} copyable loading={loading} />
      {transaction?.evmHash && (
        <DataItem title='EVM Hash' value={transaction.evmHash} copyable loading={loading} />
      )}
      <DataItem title='Actions' value={transaction?.actions.join(', ')} loading={loading} />
      <DataItem title='Gas Used' value={transaction?.gasUsed} loading={loading} />
      <DataItem title='Gas Wanted' value={transaction?.gasWanted} loading={loading} />

      {transaction?.evmHash && (
        <>
          <DataItem title='Gas Price' value={receipt?.effectiveGasPrice} loading={loading}>
            {receipt?.effectiveGasPrice != null && `${formatGwei(receipt.effectiveGasPrice)} Gwei`}
          </DataItem>
          <DataItem title='Nonce' value={evmTransaction?.nonce} loading={loading} />
          <DataItem title='Transaction Type' value={evmTransaction?.type} loading={loading} />
        </>
      )}
      <DataItem title='Memo' value={transaction?.memo} loading={loading} allowWrap />
      {transaction?.evmHash && (
        <TransactionInput input={evmTransaction?.input} loading={loading} />
      )}
    </DataList>
  );
}
