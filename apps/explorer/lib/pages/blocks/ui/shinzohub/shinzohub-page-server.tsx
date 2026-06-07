'use server';

import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { ShinzohubBlocksPageClient } from './shinzohub-page';

export interface ShinzohubBlocksPageProps {
  searchParams: Promise<PageParamsOptions>
}

export const ShinzohubBlocksPage = async ({ searchParams }: ShinzohubBlocksPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <ShinzohubBlocksPageClient pageParams={pageParams} />
};
