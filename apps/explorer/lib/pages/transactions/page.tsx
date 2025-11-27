"use client"

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@/shared/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { formatHash } from '@/shared/utils/format-hash';
import { Typography } from '@/shared/ui/typography';
import { Container, PageLayout } from '@/widgets/layout'
import {
  TableLayout,
  TableNullableCell,
} from '@/shared/ui/table';
import { useTransactions } from './use-txs';

export interface TransactionPageProps {
  block?: number;
  pageParams: PageParams;
}

export const TransactionsPageClient = ({ block, pageParams }: TransactionPageProps) => {
  const { page, offset, limit } = pageParams;
  const { data: transactions, isLoading } = useTransactions({
    limit,
    offset,
    blockNumber: block,
  });

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18;
    return eth.toFixed(6);
  };

  const formatGasPrice = (gasPrice: string) => {
    const gwei = Number(gasPrice) / 1e9;
    return gwei.toFixed(2);
  };

  return (
    <PageLayout title={block ? `Transactions in block #${block}` : 'Transactions'}>
      <Container borderB wrapperClassName='mt-16 mb-8' className='flex justify-between items-end'>
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all' className='min-w-16'>
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Pagination
          page={page}
          totalItems={transactions?.totalCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No transactions found.'
        gridClass='grid-cols-[1fr_100px_120px_1fr_1fr_160px_160px]'
        headings={['Hash', 'Block', 'Age', 'From', 'To', 'Value', 'Fee']}
        iterable={transactions?.transactions ?? []}
        rowRenderer={(tx) => (
          <>
            <TableNullableCell value={tx?.hash}>
              {(value) => (
                <Link href={`/tx/${value}`}>
                  <Typography color='accent' className='underline'>
                    {formatHash(value, 12, 8)}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.blockNumber}>
              {(value) => (
                <Link href={`/blocks/${value}`}>
                  <Typography color='accent' className='underline'>
                    {value}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={undefined}>
              {(value) => (
                formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.from}>
              {(value) => (
                <Link href={`/address/${value}`} className="font-mono text-sm hover:underline">
                  {formatHash(value, 8, 6)}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.to}>
              {(value) => (
                <Link href={`/address/${value}`} className="font-mono text-sm hover:underline">
                  {formatHash(value, 8, 6)}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.value}>
              {(value) => `${formatValue(value)} ETH`}
            </TableNullableCell>

            <TableNullableCell value={tx?.gasPrice}>
              {(value) => `${formatGasPrice(value)} Gwei`}
            </TableNullableCell>
          </>
        )}
      />
    </PageLayout>
  );
};
