"use client"

import { Suspense, useEffect, useMemo } from 'react';
import { DEFAULT_LIMIT, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredGenerators } from '../hook/use-registered-generators';
import type { GeneratorHealthData, RegisteredGenerator } from '@/shared/shinzohub/types';
import { GeneratorsList } from './generators-list';
import { useCursorPagePagination } from '@/shared/cursor-pagination/hook/use-cursor-page-pagination';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  type HealthStatus,
} from '@/shared/health';
import { useGeneratorHealthPolling } from '../hook/use-generator-health-polling';

const GENERATORS_PAGE_PARAM = "generatorsPage";
const GENERATORS_CURSOR_KEY = "registered-generators-cursor-key";

export type GeneratorWithHealth = RegisteredGenerator & Omit<GeneratorHealthData, "p2p" | "uptime"> & {
  ip: string;
};

function GeneratorsPageContent() {
  const { page, queryParams, applyPaginationData, totalItems, limit } =
    useCursorPagePagination({
      pageParam: GENERATORS_PAGE_PARAM,
      storageKey: GENERATORS_CURSOR_KEY,
      limit: DEFAULT_LIMIT,
    });

  const { data: registeredGenerators, isPending } =
    useRegisteredGenerators(queryParams);

  const generators: GeneratorWithHealth[] = useMemo(
    () =>
      registeredGenerators?.generators.map((generator) => ({
        ...generator,
        ip: ipFromConnectionString(generator.connectionString),
        status: "unknown" as HealthStatus,
        uptime_seconds: 0,
        last_processed: "",
        current_block: 0,
      })) ?? [],
    [registeredGenerators]
  );

  const pageTotal = Number(registeredGenerators?.pagination?.total ?? 0);
  const nextKey = registeredGenerators?.pagination?.next_key;

  useEffect(() => {
    if (registeredGenerators) {
      applyPaginationData(nextKey, pageTotal);
    }
  }, [registeredGenerators, nextKey, pageTotal, applyPaginationData]);

  const healthByKey = useGeneratorHealthPolling<GeneratorWithHealth>({
    entries: generators,
    resetKey: page,
    toHealthEntry: (generator) => ({
      address: generator.address,
      ip: generator.ip,
    }),
  });

  const generatorsWithHealth = useMemo(
    () =>
      generators.map((generator) => {
        const key = createHealthEntryKey({
          address: generator.address,
          ip: generator.ip,
        });
        const data = healthByKey.get(key);
        return {
          ...generator,
          ...data,
          status: data?.status ?? ("unknown" as HealthStatus)
        };
      }),
    [generators, healthByKey]
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
          pageParam={GENERATORS_PAGE_PARAM}
        />
      </Container>

      <GeneratorsList
        generators={generatorsWithHealth}
        generatorLoading={isPending}
      />
    </PageLayout>
  );
}

export const GeneratorsPageClient = () => (
  <Suspense fallback={null}>
    <GeneratorsPageContent />
  </Suspense>
);
