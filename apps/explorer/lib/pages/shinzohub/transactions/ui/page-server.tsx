'use server';

import { TransactionsPageClient } from './page';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';

export interface TransactionsPageProps {
  searchParams: Promise<{ block?: string } & PageParamsOptions>
}

export const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const search = await searchParams;
  const blockFilter = Number(search.block);
  const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
  const pageParams = getServerPage(search);

  return <TransactionsPageClient block={block} pageParams={pageParams} />
};
