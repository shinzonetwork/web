"use client"

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT, Pagination, usePage } from '@/shared/ui/pagination';
import { formatHash } from '@/shared/utils/format-hash';
import { useTransactions } from '@/entities/tx';
import { Container, PageLayout } from '@/widgets/layout'
import {
  TableLayout,
  TableNullableCell,
} from '@/shared/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const blockFilter = Number(searchParams.get('block'));

  const { page, offset, limit } = usePage();
  const { data: transactions, isLoading } = useTransactions({ limit, offset, blockNumber: (isNaN(blockFilter) || blockFilter === 0) ? undefined: blockFilter });

  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18
    return eth.toFixed(6)
  }

  const formatGasPrice = (gasPrice: string) => {
    const gwei = Number(gasPrice) / 1e9
    return gwei.toFixed(2)
  }

  return (
    <PageLayout title={blockFilter ? `Transactions in block #${blockFilter}` : 'Transactions'}>
      <Container wrapperClassName='mt-16 mb-8' borderB>
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all' className='min-w-16'>
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Container>

      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No transactions found.'
        headings={['Hash', 'Block', 'Age', 'From', 'To', 'Value', 'Fee']}
        iterable={transactions?.transactions ?? []}
        rowRenderer={(tx) => (
          <>
            <TableNullableCell value={tx?.hash}>
              {(value) => (
                <Link href={`/tx/${value}`} className="font-mono text-sm text-foreground hover:underline">
                  {formatHash(value, 12, 8)}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.blockNumber}>
              {(value) => (
                <Link href={`/blocks/${value}`} className="text-sm hover:underline">
                  {value}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.timestamp as string}>
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
  )
}
