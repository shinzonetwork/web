"use client"

import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { TransactionsList } from './transactions-list';
import { useTransactions } from '../hook/use-transcations';

export interface TransactionPageProps {
  block?: number;
  pageParams: PageParams;
}

export const TransactionsPageClient = ({ pageParams }: TransactionPageProps) => {
  const { page } = pageParams;
  const { data: transactions, totalTransactionsCount, isLoading } = useTransactions({
    refetchIntervalMs: 10_000,
    pageParams,
  });

  return (
    <PageLayout title='Transactions'>
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
          totalItems={totalTransactionsCount}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TransactionsList
        transactions={transactions}
        isLoading={isLoading}
      />
    </PageLayout>
  );
};
