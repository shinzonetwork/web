'use client';

import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { DataItem, DataList } from '@/widgets/data-list';
import { getPageLink } from "@/shared/utils/links";
import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { Hex } from 'viem';
import { formatTokenValue } from '@/shared/utils/format-token';
import { useShinzohubTransactionDetails } from '../../hook/shinzohub/use-shinzohub-transaction-details';
import { useShinzohubTransactionReceipt } from '../../hook/shinzohub/use-shinzohub-transaction-receipt';
import { useShinzohubBlockByBlocknumber } from '../../hook/shinzohub/use-shinzohub-block-by-blocknumber';
import { formatGasPrice } from '@/shared/utils/format-gasprice';
import { SHINZO_TOKEN } from '@/shared/utils/tokens';

export type ShinzohubTransactionCardProps = {
  txHash: Hex;
}

const TransactionStatus = ({ status }: { status: boolean | undefined }) => {
  if (status === undefined) {
    return null;
  }

  if (status) {
    return (
      <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-500">
        <CheckCircle2 className="mr-1 h-3 w-3"/>
        Success
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-500">
      <XCircle className="mr-1 h-3 w-3" />
      Failed
    </Badge>
  );
};

export const ShinzohubTransactionCard = ({ txHash }: ShinzohubTransactionCardProps) => {
  const { data: tx, isLoading: isTransactionLoading } = useShinzohubTransactionDetails(txHash);
  const { data: block, isLoading: isBlockLoading } = useShinzohubBlockByBlocknumber(tx?.blockNumber ?? undefined);
  const { data: receipt, isLoading: isReceiptLoading } = useShinzohubTransactionReceipt(txHash);
  const chain = useChainPathSegment();
  const isLoading = isTransactionLoading || isBlockLoading || isReceiptLoading;

  const gasPriceWei = receipt?.effectiveGasPrice ?? tx?.gasPrice;
  const transactionFee =
    receipt?.gasUsed && gasPriceWei
      ? (Number(receipt.gasUsed) * Number(gasPriceWei)) / 1e18
      : null;

  const receiptStatus =
    receipt?.status === 'success'
      ? true
      : receipt?.status === 'reverted'
        ? false
        : undefined;

  if (!isLoading && !tx) {
    return (
      <p className="text-center text-muted-foreground">Transaction not found.</p>
    );
  }

  return (
    <DataList>
      <DataItem
        title='Hash'
        value={tx?.hash}
        copyable
        loading={isLoading}
      >
        {tx?.hash}
      </DataItem>

      <DataItem
        title='Status'
        value={receipt?.status}
        loading={isLoading}
      >
        <TransactionStatus status={receiptStatus} />
      </DataItem>

      <DataItem
        title='Block'
        value={tx?.blockNumber}
        link={`${getPageLink('block', { param: tx?.blockNumber?.toString() ?? '', chain})}`}
        loading={isLoading}
      >
        {tx?.blockNumber}
      </DataItem>

      <DataItem
        title='Timestamp'
        value={block?.timestamp}
        loading={isLoading}
      >
        {block?.timestamp && (
          <>
            {formatDistanceToNow(new Date(Number(block.timestamp) * 1000), {
              addSuffix: true,
            })}
            {' '}
            ({new Date(Number(block.timestamp) * 1000).toUTCString()})
          </>
        )}
      </DataItem>

      <DataItem
        title='From'
        value={tx?.from}
        loading={isLoading}
        link={tx?.from != null ? `${getPageLink('address', { param: tx?.from, chain})}` : undefined}
      >
        {tx?.from}
      </DataItem>

      <DataItem
        title="To"
        value={tx?.to}
        loading={isLoading}
        link={tx?.to != null ? `${getPageLink('address', { param: tx?.to, chain})}` : undefined}
      >
        {tx?.to}
      </DataItem>

      <DataItem
        title="Value"
        value={tx?.value}
        loading={isLoading}
      >
        {tx?.value != null && tx.value > BigInt(0) && `${formatTokenValue(tx.value.toString(), SHINZO_TOKEN.decimals)} ${SHINZO_TOKEN.symbol}`}
      </DataItem>

      <DataItem
        title="Transaction Fee"
        value={transactionFee}
        loading={isLoading}
      >
        {transactionFee != null && `${transactionFee.toFixed(8)} ${SHINZO_TOKEN.symbol}`}
      </DataItem>

      <DataItem
        title="Gas Price"
        value={gasPriceWei}
        loading={isLoading}
      >
        {gasPriceWei != null && `${formatGasPrice(gasPriceWei.toString())} Gwei`}
      </DataItem>

      <DataItem
        title="Gas Limit"
        value={tx?.gas}
        loading={isLoading}
      />

      <DataItem
        title="Gas Used"
        value={receipt?.gasUsed}
        loading={isLoading}
      >
        {receipt?.gasUsed && tx?.gas && (
          <>
            {receipt.gasUsed} ({((Number(receipt.gasUsed) / Number(tx.gas)) * 100).toFixed(2)}%)
          </>
        )}
      </DataItem>

      <DataItem
        title="Nonce"
        value={tx?.nonce}
        loading={isLoading}
      />

      <DataItem
        title="Position in Block"
        value={tx?.transactionIndex}
        loading={isLoading}
      />

      <DataItem
        title="Input Data"
        value={tx?.input}
        loading={isLoading}
        allowWrap
        wrapAt={tx?.input && tx.input.length > 100 ? 100 : tx?.input?.length}
      >
          {tx?.input}
      </DataItem>

      <DataItem
        title='Type'
        value={tx?.type}
        loading={isLoading}
      >
        {tx?.type != null && <Badge variant='outline'>Type {tx.type}</Badge>}
      </DataItem>

      <DataItem
        title='Chain ID'
        value={tx?.chainId}
        loading={isLoading}
      />
    </DataList>
  );
}
