'use client';

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Pagination, DEFAULT_LIMIT, PageParams } from '@shinzo/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs'
import ShinzoFilledIcon from '@/shared/ui/icons/shinzo-filled.svg';
import { formatHash } from '@/shared/utils/format-hash';
import { Typography } from '@/shared/ui/typography';
import { EmptyTableState } from "@/shared/ui/empty-table-state";
import { Container, PageLayout } from '@/widgets/layout'
import {
  TableLayout,
  TableNullableCell,
} from '@shinzo/ui/table';
import { getPageLink } from "@/shared/utils/links";
import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { useShinzohubBlocks } from "../../hooks/shinzohub/use-shinohub-blocks";
import { formatProposerAddress } from "@/shared/shinzohub/utils/format-proposer-address";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
export interface ShinzohubBlocksPageClientProps {
  pageParams: PageParams;
}

export const ShinzohubBlocksPageClient = ({ pageParams }: ShinzohubBlocksPageClientProps) => {
  const { data, isLoading } = useShinzohubBlocks({ pageParams });
  const blocks = data?.blocks;
  const totalBlocksCount = data?.totalBlocksCount;
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
          page={pageParams.page}
          totalItems={totalBlocksCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound={(
          <EmptyTableState
            variant="content"
            title="No blocks found."
            description="Blocks will appear here as soon as they are indexed."
          />
        )}
        headings={['Block', 'Age', 'Transactions', 'Validator', 'Size']}
        gridClass='grid-cols[repeat(5,1fr)]'
        iterable={blocks ?? []}
        rowRenderer={(block) => {
          const proposer = block?.proposerAddress
            ? formatProposerAddress(block.proposerAddress)
            : null;

          return (
            <>
              <TableNullableCell value={block?.height}>
                {(value) => (
                  <Link prefetch={false} href={`${getPageLink('block', { param: value, chain})}`} className='flex items-center gap-4'>
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
                {(value) => formatDistanceToNow(new Date(value), { addSuffix: true })}
              </TableNullableCell>

              <TableNullableCell value={block?.transactionCount}>
                {(value) => (
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    {value}
                    <span className="text-muted-foreground">txns</span>
                  </div>
                )}
              </TableNullableCell>

              <TableNullableCell value={proposer} nowrap>
                {(value) => (
                  <ShinzohubAddressLink address={value} copyable className='font-mono'>
                    {formatHash(value, 8, 6)}
                  </ShinzohubAddressLink>
                )}
              </TableNullableCell>

              <TableNullableCell value={block?.size ?? null} nowrap>
                {(value) => value ? `${(Number(value) / 1024).toFixed(2)} KB` : '—'}
              </TableNullableCell>
            </>
          );
        }}
      />
    </PageLayout>
  );
};
