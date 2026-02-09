'use client';

import { TransactionsList } from "@/pages/transactions/transactions-list";
import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { useTransactions } from "@/pages/transactions/use-transactions";
import { useTransactionsCount } from "../transactions/use-transactions-count";
export interface BlockTxsProps {
  blockNumber: number;
  pageParams: PageParams;
}

export const BlockTransactions = ({ blockNumber, pageParams }: BlockTxsProps) => {
  const { page, offset, limit } = pageParams;
  const { data: transactions, isLoading } = useTransactions({
    limit,
    offset,
    blockNumber,
  });
 const { data: transactionsCount } = useTransactionsCount();

  return (
    <>
      <TransactionsList
        transactions={
          transactions?.transactions?.filter((txn): txn is NonNullable<typeof txn> => txn !== null) ?? []
        }
        isLoading={isLoading}
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