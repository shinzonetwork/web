"use client"

import { useMemo } from 'react';
import { DEFAULT_LIMIT, Pagination, type PageParams } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredHosts } from '../hook/use-registered-hosts';
import type { HostHealthData, RegisteredHost } from '@/shared/shinzohub/types';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  type HealthStatus,
} from '@/shared/health';
import { useHostHealthPolling } from '../hook/use-host-health-polling';
import { HostsList } from './hosts-list';

export type HostWithHealth = RegisteredHost & Omit<HostHealthData, "p2p" | "uptime"> & {
  ip: string;
};

export interface HostsPageClientProps {
  pageParams: PageParams;
}

export function HostsPageClient({ pageParams }: HostsPageClientProps) {
  const { page } = pageParams;
  const { data: registeredHosts, isPending } = useRegisteredHosts({ pageParams });

  const hosts: HostWithHealth[] = useMemo(
    () =>
      registeredHosts?.hosts.map((host) => ({
        ...host,
        ip: ipFromConnectionString(host.connectionString),
        status: "unknown" as HealthStatus,
        uptime_seconds: 0,
        last_processed: "",
        current_block: 0,
      })) ?? [],
    [registeredHosts]
  );  

  const healthByKey = useHostHealthPolling<HostWithHealth>({
    entries: hosts,
    resetKey: page,
    toHealthEntry: (host) => ({
      address: host.address,
      ip: host.ip,
    }),
  });

  const hostsWithHealth = useMemo(
    () =>
      hosts.map((host) => {
        const key = createHealthEntryKey({
          address: host.address,
          ip: host.ip,
        });
        const healthData = healthByKey.get(key);
        return {
          ...host,
          ...healthData,
          status: healthData?.status ?? ("unknown" as HealthStatus)
        };
      }),
    [hosts, healthByKey]
  );

  return (
    <PageLayout title='Hosts'>
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
          totalItems={registeredHosts?.totalHostsCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>

      <HostsList
        hosts={hostsWithHealth}
        hostLoading={isPending}
      />
    </PageLayout>
  );
}
