'use client';

import Link from 'next/link';
import { DEFAULT_LIMIT } from '@shinzo/ui/pagination';
import { TableLayout, TableNullableCell } from '@shinzo/ui/table';
import { Badge } from '@/shared/ui/badge';
import { CopyButton } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import type { ShinzohubTransactionSummary } from '@/shared/shinzohub/types';
import { formatHash } from '@/shared/utils/format-hash';
import { formatShinzoCoin } from '@/shared/utils/format-token';
import { getPageLink } from '@/shared/utils/links';

export function ShinzohubTransactionsList({
  transactions,
  isLoading,
}: {
  transactions: ShinzohubTransactionSummary[];
  isLoading: boolean;
}) {
  return (
    <TableLayout
      isLoading={isLoading}
      loadingRowCount={DEFAULT_LIMIT}
      notFound='No transactions found.'
      gridClass='grid-cols-[1fr_90px_100px_1fr_1fr_150px_130px]'
      headings={['Hash', 'Type', 'Block', 'Sender', 'Recipient', 'Amount', 'Fee']}
      iterable={transactions}
      rowRenderer={(transaction) => {
        const sender = transaction.senders[0] ?? null;
        const recipient = transaction.recipients[0] ?? null;
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
                <div className='flex items-center gap-1'>
                  <span>{formatHash(value, 8, 6)}</span>
                  <CopyButton text={value} className='text-muted-foreground' />
                </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={recipient}>
              {(value) => (
                <div className='flex items-center gap-1'>
                  <span>{formatHash(value, 8, 6)}</span>
                  <CopyButton text={value} className='text-muted-foreground' />
                </div>
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
