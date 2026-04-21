'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { useBlockTransactions } from "./use-block-transactions";
import { BlockTransactionsList } from "./block-transactions-list";
import { useBlockTransactionsCount } from './use-block-transactions-count';

export type BlockTransactionsProps =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams } 
  | { blockHash: string; blockNumber?: never; pageParams: PageParams };

export const BlockTransactions = (options: BlockTransactionsProps) => {
  const { page } = options.pageParams;
  const { data: blockTransactions, isLoading: isBlockTransactionsLoading } = useBlockTransactions(options);
  const { data: blockTransactionsCount } = useBlockTransactionsCount(options);
  return (
    <>
      <BlockTransactionsList
        transactions={blockTransactions?.transactions ?? []}
        timestamp={blockTransactions?.timestamp ?? ''}
        isLoading={isBlockTransactionsLoading}
      />
      <Container className='flex justify-between items-end'>
        <div />
        <Pagination
          page={page}
          totalItems={blockTransactionsCount?.txCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};