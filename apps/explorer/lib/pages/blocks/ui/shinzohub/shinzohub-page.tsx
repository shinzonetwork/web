'use client';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Pagination, DEFAULT_LIMIT, PageParams } from '@shinzo/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs'
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { formatGasUsed } from '@/shared/utils/format-gas';
import { formatHash } from '@/shared/utils/format-hash';
import { Typography } from '@/shared/ui/typography';
import { Container, PageLayout } from '@/widgets/layout'
import {
  TableLayout,
  TableNullableCell,
} from '@shinzo/ui/table';
import { CopyButton } from "@/shared/ui/button";
import { getPageLink } from "@/shared/utils/links";
import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { useShinzohubBlocks } from "../../hooks/shinzohub/use-shinohub-blocks";
import { useShinzohubBlocksCount } from "../../hooks/shinzohub/use-shinzohub-blocks-count";

export interface ShinzohubBlocksPageClientProps {
  pageParams: PageParams;
}

export const ShinzohubBlocksPageClient = ({ pageParams }: ShinzohubBlocksPageClientProps) => {
  const { page, offset, limit } = pageParams;
  const { data: blocks, isLoading } = useShinzohubBlocks({ limit, offset });
  const { data: blocksCount } = useShinzohubBlocksCount();
  const chain = useChainPathSegment();

  return (
    <PageLayout title='Blocks'>
      <Container
        wrapperClassName='mt-16 mb-8 border-b border-ui-border'
        className='flex items-end justify-between [&>*]:translate-y-[1px]'
      >
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all' className='min-w-16'>
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Pagination
          page={page}
          totalItems={blocksCount ? Number(blocksCount) : 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No blocks found.'
        headings={['Block', 'Age', 'Transactions', 'Validator', 'Gas Used']}
        gridClass='grid-cols[repeat(5,1fr)]'
        iterable={blocks ?? []}
        rowRenderer={(block) => (
          <>
            <TableNullableCell value={block?.number}>
              {(value) => (
                <Link prefetch={false} href={`${getPageLink('block', { param: value.toString(), chain})}`} className='flex items-center gap-4'>
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
              value={block.transactionCount}
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
                <Link prefetch={false} href={`${getPageLink('address', { param: value.toString(), chain})}`} className='flex items-center gap-4'>
                  <Typography color='accent' className='underline'>
                    {formatHash(value ?? '', 8, 6)}
                  </Typography>
                  <CopyButton text={value ?? ''} className="text-muted-foreground" />  
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={[block.gasUsed, block.gasLimit]} nowrap>
              {([gasUsed, gasLimit]) => formatGasUsed(gasUsed, gasLimit)}
            </TableNullableCell>
          </>
        )}
      />
    </PageLayout>
  );
};
