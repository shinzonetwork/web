"use client"

import { useEffect } from 'react';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Container, PageLayout } from '@/widgets/layout'
import { useShinzohubTransactions } from '../../hooks/shinzohub/use-shinzohub-transactions';
import type { ShinzohubTransactionFilter } from '@/shared/shinzohub/types';
import { ShinzohubTransactionsList } from './shinzohub-transactions-list';

export type ShinzohubTransactionPageProps = {
  block?: number;
  kind: ShinzohubTransactionFilter;
  pageParams: PageParams;
}

export const ShinzohubTransactionsPageClient = ({ block, kind, pageParams }: ShinzohubTransactionPageProps) => {
  const { page } = pageParams;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data, isLoading } = useShinzohubTransactions({ pageParams, kind, block });
  const transactions = data?.transactions;
  const totalTransactionsCount = data?.totalTransactionsCount;

  useEffect(() => {
    if (searchParams.get('kind') !== 'cosmos') {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('kind', 'all');
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const setKind = (value: string) => {
    const nextKind = value as ShinzohubTransactionFilter;
    const params = new URLSearchParams(searchParams.toString());
    params.set('kind', nextKind);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PageLayout title={block ? `Transactions in block #${block}` : 'Transactions'}>
      <Container
        wrapperClassName='mt-16 mb-8 border-b border-ui-border'
        className='flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between [&>*]:translate-y-[1px]'
      >
        <Tabs value={kind} onValueChange={setKind}>
          <TabsList>
            <TabsTrigger value='all' className='min-w-16'>
              All
            </TabsTrigger>
            <TabsTrigger value='evm' className='min-w-16'>
              EVM
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Pagination
          page={page}
          totalItems={totalTransactionsCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <ShinzohubTransactionsList
        transactions={transactions ?? []}
        isLoading={isLoading}
      />
    </PageLayout>
  );
};
