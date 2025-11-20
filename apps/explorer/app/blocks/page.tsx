'use client';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { usePage, Pagination, DEFAULT_LIMIT } from "@/shared/ui/pagination"
import { formatGasUsed } from '@/shared/utils/format-gas';
import { formatHash } from '@/shared/utils/format-hash';
import { useBlocks } from '@/entities/block';
import { Container, PageLayout } from '@/widgets/layout'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/tabs';
import {
  TableLayout,
  TableCell,
  TableNullableCell,
} from '@/shared/ui/table';

export default function BlocksPage() {
  const { page, offset, limit } = usePage();
  const { data: blocks, isLoading } = useBlocks({ limit, offset });

  return (
    <PageLayout title='Blocks'>
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
        notFound='No blocks found.'
        headings={['Block', 'Age', 'Txn', 'Miner', 'Gas Used', 'Reward']}
        iterable={blocks?.blocks ?? []}
        rowRenderer={(block) => (
          <>
            <TableNullableCell value={block?.number}>
              {(value) => (
                <Link
                  href={`/blocks/${value}`}
                  className="font-mono text-sm font-medium text-foreground hover:underline"
                >
                  {value}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={block?.timestamp}>
              {(value) => formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })}
            </TableNullableCell>

            <TableNullableCell value={block?.txCount as number | null}>
              {(value) => (
                <div className="flex items-center gap-1 text-sm text-foreground">
                  {value}
                  <span className="text-muted-foreground">txns</span>
                </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={block?.miner}>
              {(value) => (
                <Link
                  href={`/address/${value}`}
                  className="font-mono text-sm hover:underline"
                >
                  {formatHash(value, 8, 6)}
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={[block?.gasUsed, block?.gasLimit]}>
              {([gasUsed, gasLimit]) => formatGasUsed(gasUsed, gasLimit)}
            </TableNullableCell>

            <TableCell>
              {(Math.random() * 0.05 + 0.01).toFixed(4)} ETH
            </TableCell>
          </>
        )}
      />
    </PageLayout>
  )
}
