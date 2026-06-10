'use server';
import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { IndexerPageClient } from './indexer-page';

export interface IndexerPageProps {
  searchParams: Promise<PageParamsOptions>
}

export const IndexerPage = async ({ searchParams }: IndexerPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <IndexerPageClient pageParams={pageParams} />
};
