"use client"

import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredIndexers } from '../hook/use-registered-indexers';
import { IndexersList } from './indexers-list';

export type IndexerPageProps = {
  pageParams: PageParams;
}

export const IndexerPageClient = ({ pageParams }: IndexerPageProps) => {
  const { page } = pageParams;
  const { data, isLoading } = useRegisteredIndexers(pageParams);

  return (
    <PageLayout title='Indexers'>
      <Container
        wrapperClassName='mt-16 mb-8 border-b border-ui-border'
        className='flex items-end justify-between [&>*]:translate-y-[1px]'
      >
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all' className='min-w-16'>
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Pagination
          page={page}
          totalItems={Number(data?.pagination?.total ?? 0)}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <IndexersList />
    </PageLayout>
  );
};
