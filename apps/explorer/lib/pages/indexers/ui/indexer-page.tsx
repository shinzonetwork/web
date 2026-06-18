"use client"

import { Suspense, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LIMIT, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { RegisteredIndexer, useRegisteredIndexers } from '../hook/use-registered-indexers';
import { IndexersList } from './indexers-list';
import { useCursorPagePagination } from '@/shared/cursor-pagination/hook/use-cursor-page-pagination';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  useHealthPolling,
  type HealthStatus,
} from '@/shared/health';

const INDEXERS_PAGE_PARAM = "indexersPage";
const INDEXERS_CURSOR_KEY = "registered-indexers-cursor-key";

export type IndexerWithHealth = RegisteredIndexer & {
  ip: string;
  status: HealthStatus;
};

function IndexerPageContent() {
  const [healthByKey, setHealthByKey] = useState<Map<string, HealthStatus>>(
    new Map()
  );

  const { page, queryParams, applyPaginationData, totalItems } =
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
        ip: ipFromConnectionString(indexer.connection_string),
        status: "unknown" as HealthStatus,
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

  useHealthPolling<IndexerWithHealth>({
    entries: indexers,
    resetKey: page,
    toHealthEntry: (indexer) => ({
      address: indexer.address,
      ip: indexer.ip,
    }),
    onResults: (liveDataByKey) => {
      setHealthByKey((prev) => {
        const next = new Map(prev);
        for (const [key, { status }] of liveDataByKey) {
          if (status) next.set(key, status);
        }
        return next;
      });
    },
  });

  const indexersWithHealth = useMemo(
    () =>
      indexers.map((indexer) => {
        const key = createHealthEntryKey({
          address: indexer.address,
          ip: indexer.ip,
        });
        return {
          ...indexer,
          status: healthByKey.get(key) ?? ("unknown" as HealthStatus),
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
          itemsPerPage={DEFAULT_LIMIT}
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

export const IndexerPageClient = () => (
  <Suspense fallback={null}>
    <IndexerPageContent />
  </Suspense>
);
