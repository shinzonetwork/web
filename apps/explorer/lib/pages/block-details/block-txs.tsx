'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@/shared/ui/pagination';
import { useTransactionsCount } from "../transactions/use-transactions-count";
import { useBlockTransactions } from "./use-block-transactions";
import { BlockTransactionsList } from "./block-transactions-list";
export interface BlockTxsProps {
  blockNumber: number;
  pageParams: PageParams;
}

export const BlockTransactions = ({ blockNumber, pageParams }: BlockTxsProps) => {
  const { page, offset, limit } = pageParams;
  const { data: blockTransactions, isLoading: isBlockTransactionsLoading } = useBlockTransactions({ offset, limit, blockNumber });
 const { data: transactionsCount } = useTransactionsCount();

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
          totalItems={transactionsCount?.totalTransactions ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};