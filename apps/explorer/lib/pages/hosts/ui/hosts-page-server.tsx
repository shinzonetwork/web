'use server';

import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { HostsPageClient } from './hosts-page';

export interface HostsPageProps {
  searchParams: Promise<PageParamsOptions>;
}

export const HostsPage = async ({ searchParams }: HostsPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <HostsPageClient pageParams={pageParams} />;
};
