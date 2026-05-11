"use client"

import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { TransactionsList } from './transactions-list';
import { useTransactions } from './use-transactions';
import { useTransactionsCount } from './use-transactions-count';

export interface TransactionPageProps {
  block?: number;
  pageParams: PageParams;
}

export const TransactionsPageClient = ({ block, pageParams }: TransactionPageProps) => {
  const { page, offset, limit } = pageParams;
  const { data: transactions, isLoading } = useTransactions({
    limit,
    offset,
    blockNumber: block,
  });
  const { data: transactionsCount } = useTransactionsCount();

  return (
    <PageLayout title={block ? `Transactions in block #${block}` : 'Transactions'}>
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
          totalItems={transactionsCount?.totalTransactions ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <TransactionsList
        transactions={
          transactions?.transactions?.filter((txn): txn is NonNullable<typeof txn> => txn !== null) ?? []
        }
        isLoading={isLoading}
      />
    </PageLayout>
  );
};
