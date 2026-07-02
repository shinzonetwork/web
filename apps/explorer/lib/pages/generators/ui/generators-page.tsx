"use client"

import { useMemo } from 'react';
import { DEFAULT_LIMIT, Pagination, type PageParams } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredGenerators } from '../hook/use-registered-generators';
import type { GeneratorHealthData, RegisteredGenerator } from '@/shared/shinzohub/types';
import { GeneratorsList } from './generators-list';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  type HealthStatus,
} from '@/shared/health';
import { useGeneratorHealthPolling } from '../hook/use-generator-health-polling';

export type GeneratorWithHealth = RegisteredGenerator & Omit<GeneratorHealthData, "p2p" | "uptime"> & {
  ip: string;
};

export interface GeneratorsPageClientProps {
  pageParams: PageParams;
}

export function GeneratorsPageClient({ pageParams }: GeneratorsPageClientProps) {
  const { page } = pageParams;
  const { data: registeredGenerators, isPending } = useRegisteredGenerators({ pageParams });

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
    [registeredGenerators?.generators]
  );

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
        const healthData = healthByKey.get(key);
        return {
          ...generator,
          ...healthData,
          status: healthData?.status ?? ("unknown" as HealthStatus)
        };
      }),
    [generators, healthByKey]
  );

  return (
    <PageLayout title='Generators'>
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
          totalItems={registeredGenerators?.totalGeneratorsCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <GeneratorsList
        generators={generatorsWithHealth}
        generatorLoading={isPending}
      />
    </PageLayout>
  );
}
