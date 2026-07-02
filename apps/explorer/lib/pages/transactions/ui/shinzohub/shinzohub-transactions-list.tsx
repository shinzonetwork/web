'use client';

import Link from 'next/link';
import { isShinzoAddress, shinzoAddressToHex } from '@shinzo/shinzohub';
import { DEFAULT_LIMIT } from '@shinzo/ui/pagination';
import { TableCell, TableLayout, TableNullableCell } from '@shinzo/ui/table';
import { getShinzohubTransactionSubtypes } from '@/pages/transaction-details/shinzohub';
import { Badge } from '@/shared/ui/badge';
import { EmptyTableState } from '@/shared/ui/empty-table-state';
import { Typography } from '@/shared/ui/typography';
import { ShinzohubAddressLink } from '@/shared/shinzohub/address-link';
import type { ShinzohubTransactionSummary } from '@/shared/shinzohub/types';
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

function SubtypeBadges({
  transaction,
}: {
  transaction: ShinzohubTransactionSummary;
}) {
  const subtypes = getShinzohubTransactionSubtypes(transaction.events);

  if (subtypes.length === 0) {
    return '—';
  }

  return (
    <div className='flex min-w-0 flex-wrap gap-1'>
      {subtypes.map((subtype, index) => (
        <Badge
          key={`${subtype.kind}-${subtype.label}-${index}`}
          variant='outline'
        >
          {subtype.label}
        </Badge>
      ))}
    </div>
  );
}

function ParticipantAddress({
  address,
  label,
}: {
  address: string | null;
  label: 'from' | 'to';
}) {
  return (
    <div className='flex min-w-0 items-center gap-1'>
      <span className='shrink-0 text-muted-foreground'>{label}:</span>
      <ShinzohubAddressLink
        address={address}
        copyable
        fallback='—'
        className='font-mono'
      >
        {address && formatHash(address, 8, 6)}
      </ShinzohubAddressLink>
    </div>
  );
}

function ParticipantsCell({
  recipient,
  sender,
}: {
  recipient: string | null;
  sender: string | null;
}) {
  return (
    <TableCell className='min-w-0 py-2'>
      <div className='flex min-w-0 flex-col items-start gap-1'>
        <ParticipantAddress label='from' address={sender} />
        <ParticipantAddress label='to' address={recipient} />
      </div>
    </TableCell>
  );
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
      gridClass='grid-cols-[minmax(180px,1fr)_90px_minmax(150px,0.8fr)_100px_minmax(220px,1.2fr)_150px_130px]'
      headings={['Hash', 'Type', 'Subtype', 'Block', 'Participants', 'Amount', 'Fee']}
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

            <TableCell className='min-w-0 py-2'>
              <SubtypeBadges transaction={transaction} />
            </TableCell>

            <TableNullableCell value={transaction.height}>
              {(height) => (
                <Link href={getPageLink('block', { param: height, chain: 'shinzohub' })}>
                  <Typography color='accent' className='underline'>{height}</Typography>
                </Link>
              )}
            </TableNullableCell>

            <ParticipantsCell sender={sender} recipient={recipient} />

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
