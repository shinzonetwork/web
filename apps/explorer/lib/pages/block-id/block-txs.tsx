'use client';

import { TransactionsList } from "@/pages/transactions/txns-list";
import { Container, PageLayout } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@/shared/ui/pagination';
import { useTransactions } from "@/pages/transactions/use-txs";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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
          totalItems={transactions?.totalCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};