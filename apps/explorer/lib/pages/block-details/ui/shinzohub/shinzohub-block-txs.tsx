'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { BlockTransactionsList } from "../block-transactions-list";
import { useShinzohubBlock } from '../../hook/shinzohub/use-shinzohub-block';

export type ShinzohubBlockTransactionsProps =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams } 
  | { blockHash: string; blockNumber?: never; pageParams: PageParams };

export const ShinzohubBlockTransactions = (options: ShinzohubBlockTransactionsProps) => {
  const { page } = options.pageParams;
  const { data: block, isLoading: isBlockLoading } = useShinzohubBlock(options?.blockNumber?.toString() ?? '');

  return (
    <>
      <BlockTransactionsList
        transactions={block?.transactions ?? []}
        timestamp={block?.timestamp ?? ''}
        isLoading={isBlockLoading}
      />
      <Container className='flex justify-between items-end'>
        <div />
        <Pagination
          page={page}
          totalItems={block?.transactions?.length ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};