'use server';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { ShinzohubTransactionsPageClient } from './shinzohub-page';
import type { ShinzohubTransactionFilter } from '@/shared/shinzohub/types';

export interface TransactionsPageProps {
  searchParams: Promise<{ block?: string; kind?: string } & PageParamsOptions>
}

export const ShinzohubTransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const search = await searchParams;
  const blockFilter = Number(search.block);
  const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
  const kind: ShinzohubTransactionFilter =
    search.kind === 'evm' ? 'evm' : 'all';
  const pageParams = getServerPage(search);

  return (
    <ShinzohubTransactionsPageClient
      block={block}
      kind={kind}
      pageParams={pageParams}
    />
  );
};
