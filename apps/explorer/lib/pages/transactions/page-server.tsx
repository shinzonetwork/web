'use server';

import { TransactionsPageClient } from './page';
import { PageParamsOptions, getServerPage } from '@/shared/ui/pagination/get-server-page';

export interface TransactionPageProps {
  searchParams: Promise<{ block?: string } & PageParamsOptions>
}

export const TransactionsPage = async ({ searchParams }: TransactionPageProps) => {
  const search = await searchParams;
  const blockFilter = Number(search.block);
  const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
  const pageParams = getServerPage(search);

  return <TransactionsPageClient block={block} pageParams={pageParams} />
};
