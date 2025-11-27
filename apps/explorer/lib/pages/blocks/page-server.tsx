'use server';

import { BlocksPageClient } from './page';
import { PageParamsOptions, getServerPage } from '@/shared/ui/pagination/get-server-page';

export interface BlocksPageProps {
  searchParams: Promise<PageParamsOptions>
}

export const BlocksPage = async ({ searchParams }: BlocksPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <BlocksPageClient pageParams={pageParams} />
};
