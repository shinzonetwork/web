'use client';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Pagination, DEFAULT_LIMIT, PageParams } from '@shinzo/ui/pagination'
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { formatGasUsed } from '@/shared/utils/format-gas';
import { formatHash } from '@/shared/utils/format-hash';
import { Typography } from '@/shared/ui/typography';
import { Container, PageLayout } from '@/widgets/layout'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/tabs';
import {
  TableLayout,
  TableNullableCell,
} from '@shinzo/ui/table';
import { useBlocks } from './use-blocks';
import { CopyButton } from "@/shared/ui/button";
import { useBlocksCount } from "./use-blocks-count";

export interface BlocksPageClientProps {
  pageParams: PageParams;
}

export const BlocksPageClient = ({ pageParams }: BlocksPageClientProps) => {
  const { page, offset, limit } = pageParams;
  const { data: blocks, isLoading } = useBlocks({ limit, offset });
  const { data: blocksCount } = useBlocksCount();

  return (
    <PageLayout title='Blocks'>
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
          totalItems={blocksCount?.totalBlocks ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No blocks found.'
        headings={['Block', 'Age', 'Transactions', 'Validator', 'Gas Used']}
        gridClass='grid-cols[repeat(5,1fr)]'
        iterable={blocks?.blocks ?? []}
        rowRenderer={(block) => (
          <>
            <TableNullableCell value={block?.number}>
              {(value) => (
                <Link href={`/blocks/${value}`} className='flex items-center gap-4'>
                  <i className='flex items-center justify-center size-8 text-text-secondary border border-border rounded-sm'>
                    <ShinzoFilledIcon className='size-4' />
                  </i>
                  <Typography color='accent' className='underline'>
                    {value}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={block?.timestamp} nowrap>
              {(value) => formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })}
            </TableNullableCell>

            <TableNullableCell 
              value={block?.transactions?.[0]?.transactionIndex != null
                ? block.transactions[0].transactionIndex + 1
                : 0}
            >
              {(value) => (
                <div className="flex items-center gap-1 text-sm text-foreground">
                  {value}
                  <span className="text-muted-foreground">txns</span>
                </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={block?.miner} nowrap>
              {(value) => (
                <div className="flex items-center gap-1 text-sm text-foreground">
                  {formatHash(value ?? '', 8, 6)}
                  <CopyButton text={value ?? ''} className="text-muted-foreground" />
                </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={[block?.gasUsed, block?.gasLimit]} nowrap>
              {([gasUsed, gasLimit]) => formatGasUsed(gasUsed, gasLimit)}
            </TableNullableCell>
          </>
        )}
      />
    </PageLayout>
  );
};
