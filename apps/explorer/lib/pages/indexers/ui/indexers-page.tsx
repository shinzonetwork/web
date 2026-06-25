"use client"

import { Suspense, useEffect, useMemo } from 'react';
import { DEFAULT_LIMIT, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredIndexers } from '../hook/use-registered-indexers';
import type { RegisteredIndexer } from '@/shared/shinzohub/types';
import { IndexersList } from './indexers-list';
import { useCursorPagePagination } from '@/shared/cursor-pagination/hook/use-cursor-page-pagination';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  LiveData,
  useHealthPolling,
  type HealthStatus,
} from '@/shared/health';

const INDEXERS_PAGE_PARAM = "indexersPage";
const INDEXERS_CURSOR_KEY = "registered-indexers-cursor-key";

export type IndexerWithHealth = RegisteredIndexer & Omit<LiveData, "p2p" | "uptime"> & {
  ip: string;
};

function IndexersPageContent() {
  const { page, queryParams, applyPaginationData, totalItems, limit } =
    useCursorPagePagination({
      pageParam: INDEXERS_PAGE_PARAM,
      storageKey: INDEXERS_CURSOR_KEY,
      limit: DEFAULT_LIMIT,
    });

  const { data: registeredIndexers, isPending } =
    useRegisteredIndexers(queryParams);

  const indexers: IndexerWithHealth[] = useMemo(
    () =>
      registeredIndexers?.indexers.map((indexer) => ({
        ...indexer,
        ip: ipFromConnectionString(indexer.connectionString),
        status: "unknown" as HealthStatus,
        uptime_seconds: 0,
        last_processed: "",
        current_block: 0,
      })) ?? [],
    [registeredIndexers]
  );

  const pageTotal = Number(registeredIndexers?.pagination?.total ?? 0);
  const nextKey = registeredIndexers?.pagination?.next_key;

  useEffect(() => {
    if (registeredIndexers) {
      applyPaginationData(nextKey, pageTotal);
    }
  }, [registeredIndexers, nextKey, pageTotal, applyPaginationData]);

  const healthByKey = useHealthPolling<IndexerWithHealth>({
    entries: indexers,
    resetKey: page,
    toHealthEntry: (indexer) => ({
      address: indexer.address,
      ip: indexer.ip,
    }),
  });

  const indexersWithHealth = useMemo(
    () =>
      indexers.map((indexer) => {
        const key = createHealthEntryKey({
          address: indexer.address,
          ip: indexer.ip,
        });
        const data = healthByKey.get(key);
        return {
          ...indexer,
          ...data,
          status: data?.status ?? ("unknown" as HealthStatus)
        };
      }),
    [indexers, healthByKey]
  );

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
          totalItems={totalItems}
          itemsPerPage={limit}
          pageParam={INDEXERS_PAGE_PARAM}
        />
      </Container>

      <IndexersList
        indexers={indexersWithHealth}
        indexerLoading={isPending}
      />
    </PageLayout>
  );
}

export const IndexersPageClient = () => (
  <Suspense fallback={null}>
    <IndexersPageContent />
  </Suspense>
);
