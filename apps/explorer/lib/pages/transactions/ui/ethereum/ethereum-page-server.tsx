'use server';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { EthereumTransactionsPageClient } from './ethereum-page';

export interface TransactionsPageProps {
  searchParams: Promise<{ block?: string } & PageParamsOptions>
}

export const EthereumTransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const search = await searchParams;
  const blockFilter = Number(search.block);
  const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
  const pageParams = getServerPage(search);

  return <EthereumTransactionsPageClient block={block} pageParams={pageParams} />
};
