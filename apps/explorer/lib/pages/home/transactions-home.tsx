import { useMemo } from 'react';
import Link from 'next/link';
import { TableLayout, TableNullableCell } from '@/shared/ui/table';
import ShinzoTxnIcon from '@/shared/ui/icons/shinzo-txn.svg';
import { Typography } from '@/shared/ui/typography';
import { formatHash } from '@/shared/utils/format-hash';
import { cn } from '@/shared/utils/utils';
import { HALF_CONTAINER_CLASS } from './blocks-home';
import { useShortTransactions } from './use-short-transactions';
import { useHighlight } from './use-highlight';
import { CopyButton } from '@/shared/ui/button';

export const TransactionsHome = () => {
  const { data: transactions, isLoading } = useShortTransactions();

  const dataIds = useMemo(() => transactions
    ?.map((transaction) => transaction?.hash)
    ?.filter(Boolean), [transactions]);

  const { getHighlightClass } = useHighlight(dataIds as string[], {
    duration: 1000,
  });

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18;
    return eth.toFixed(2);
  };

  return (
    <div>
      <div className='flex'>
        <Typography variant='md' className={cn('block py-3 pl-8 lg:pl-0', HALF_CONTAINER_CLASS)}>
          / Latest Transactions
        </Typography>
        <div className='flex grow shrink' />
      </div>

      <TableLayout
        className={HALF_CONTAINER_CLASS}
        isLoading={isLoading}
        loadingRowCount={5}
        notFound="No transactions found."
        gridClass="grid-cols-[1fr_270px_150px]"
        headings={['Hash', 'From–To', 'Value']}
        hideHeader
        hideLeftSpacer
        iterable={transactions ?? []}
        rowRenderer={(tx) => {
          const highlightClass = getHighlightClass(tx?.hash);

          return (
            <>
              <TableNullableCell value={tx?.hash} className={highlightClass}>
                {(value) => (
                  <Link href={`/tx/${value}`} className="flex items-center gap-4">
                    <i className="flex items-center justify-center size-8 text-text-secondary border border-border rounded-sm">
                      <ShinzoTxnIcon className="size-4" />
                    </i>
                    <Typography color="accent" className="underline">
                      {formatHash(value)}
                    </Typography>
                  </Link>
                )}
              </TableNullableCell>

              <TableNullableCell value={tx?.from} align="center" className={highlightClass}>
                {(value) => (
                  <div className="flex flex-col gap-1">
                    {value && (
                      <div className="flex flex-row gap-2">
                        <Typography>From: </Typography>
                        <div className="flex items-center gap-1 text-sm text-foreground">
                          {formatHash(value ?? '', 8, 6)}
                          <CopyButton text={value ?? ''} className="text-muted-foreground" />
                        </div>
                     </div>
                    )}
                    {tx?.to && (
                      <div className="flex flex-row gap-2">
                        <Typography>To: </Typography>
                        <div className="flex items-center gap-1 text-sm text-foreground">
                          {formatHash(value ?? '', 8, 6)}
                          <CopyButton text={value ?? ''} className="text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </TableNullableCell>
              <TableNullableCell value={tx?.value} align="center" className={highlightClass}>
                {(value) => (
                  <div className="flex items-center gap-1 text-sm">
                    {formatValue(value)}ETH
                  </div>
                )}
              </TableNullableCell>
            </>
          )
        }}
      />

      <div className='flex'>
        <div className={cn('relative flex justify-center border-r border-b border-l border-border bg-background py-4', HALF_CONTAINER_CLASS)}>
          <Link
            href="/tx"
            className="flex items-center gap-7 text-sm text-secondary hover:underline"
          >
            <Typography color="accent" font='mono' className="underline">
              View all transactions
            </Typography>
          </Link>
        </div>
        <div className='flex grow shrink' />
      </div>
    </div>
  );
};
