'use server';

import { EthereumBlocksPageClient } from './ethereum-page';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';

export interface EthereumBlocksPageProps {
  searchParams: Promise<PageParamsOptions>
}

export const EthereumBlocksPage = async ({ searchParams }: EthereumBlocksPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <EthereumBlocksPageClient pageParams={pageParams} />
};
