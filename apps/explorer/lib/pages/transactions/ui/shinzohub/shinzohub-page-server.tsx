'use server';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { ShinzohubTransactionsPageClient } from './shinzohub-page';

export interface TransactionsPageProps {
  searchParams: Promise<{ block?: string } & PageParamsOptions>
}

export const ShinzohubTransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const search = await searchParams;
  const blockFilter = Number(search.block);
  const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
  const pageParams = getServerPage(search);

  return <ShinzohubTransactionsPageClient block={block} pageParams={pageParams} />
};
