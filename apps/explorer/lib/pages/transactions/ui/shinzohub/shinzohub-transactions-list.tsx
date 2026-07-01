'use client';

import Link from 'next/link';
import { isShinzoAddress, shinzoAddressToHex } from '@shinzo/shinzohub';
import { DEFAULT_LIMIT } from '@shinzo/ui/pagination';
import { TableLayout, TableNullableCell } from '@shinzo/ui/table';
import { Badge } from '@/shared/ui/badge';
import { EmptyTableState } from '@/shared/ui/empty-table-state';
import { Typography } from '@/shared/ui/typography';
import type { ShinzohubTransactionSummary } from '@/shared/shinzohub/types';
import { ShinzohubAddressLink } from '@/shared/shinzohub/address-link';
import { formatHash } from '@/shared/utils/format-hash';
import { formatShinzoCoin } from '@/shared/utils/format-token';
import { getPageLink } from '@/shared/utils/links';

function toEvmAddress(address: string | null | undefined): string | null {
  if (!address) {
    return null;
  }

  if (!isShinzoAddress(address)) {
    return address;
  }

  try {
    return shinzoAddressToHex(address);
  } catch {
    return address;
  }
}

export function ShinzohubTransactionsList({
  emptyStateDescription = "Transactions will appear here once Shinzohub has activity.",
  emptyStateTitle = "No transactions found.",
  transactions,
  isLoading,
}: {
  emptyStateDescription?: string;
  emptyStateTitle?: string;
  transactions: ShinzohubTransactionSummary[];
  isLoading: boolean;
}) {
  return (
    <TableLayout
      isLoading={isLoading}
      loadingRowCount={DEFAULT_LIMIT}
      notFound={(
        <EmptyTableState
          variant="content"
          title={emptyStateTitle}
          description={emptyStateDescription}
        />
      )}
      gridClass='grid-cols-[1fr_90px_100px_1fr_1fr_150px_130px]'
      headings={['Hash', 'Type', 'Block', 'Sender', 'Recipient', 'Amount', 'Fee']}
      iterable={transactions}
      rowRenderer={(transaction) => {
        const sender = toEvmAddress(transaction.senders[0]);
        const recipient = toEvmAddress(transaction.recipients[0]);
        const amount = transaction.transfers[0]?.amount ?? null;

        return (
          <>
            <TableNullableCell value={transaction.cosmosHash}>
              {(hash) => (
                <Link href={getPageLink('tx', { param: hash, chain: 'shinzohub' })}>
                  <Typography color='accent' className='underline'>
                    {formatHash(hash, 12, 8)}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={transaction.kind}>
              {() => (
                <Badge variant='outline'>
                  {transaction.kind === 'evm' ? 'EVM' : 'Cosmos'}
                </Badge>
              )}
            </TableNullableCell>

            <TableNullableCell value={transaction.height}>
              {(height) => (
                <Link href={getPageLink('block', { param: height, chain: 'shinzohub' })}>
                  <Typography color='accent' className='underline'>{height}</Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={sender}>
              {(value) => (
                <ShinzohubAddressLink address={value} copyable className='font-mono'>
                  {formatHash(value, 8, 6)}
                </ShinzohubAddressLink>
              )}
            </TableNullableCell>

            <TableNullableCell value={recipient}>
              {(value) => (
                <ShinzohubAddressLink address={value} copyable className='font-mono'>
                  {formatHash(value, 8, 6)}
                </ShinzohubAddressLink>
              )}
            </TableNullableCell>

            <TableNullableCell value={amount}>
              {(value) => formatShinzoCoin(value)}
            </TableNullableCell>
            <TableNullableCell value={transaction.fee}>
              {(value) => formatShinzoCoin(value)}
            </TableNullableCell>
          </>
        );
      }}
    />
  );
}
