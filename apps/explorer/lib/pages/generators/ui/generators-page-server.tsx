'use server';

import { PageParamsOptions, getServerPage } from '@shinzo/ui/pagination';
import { GeneratorsPageClient } from './generators-page';

export interface GeneratorsPageProps {
  searchParams: Promise<PageParamsOptions>;
}

export const GeneratorsPage = async ({ searchParams }: GeneratorsPageProps) => {
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return <GeneratorsPageClient pageParams={pageParams} />;
};
