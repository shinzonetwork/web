"use client"

import { Suspense, useEffect, useMemo } from 'react';
import { DEFAULT_LIMIT, Pagination } from '@shinzo/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container, PageLayout } from '@/widgets/layout'
import { useRegisteredHosts } from '../hook/use-registered-hosts';
import type { HostHealthData, RegisteredHost } from '@/shared/shinzohub/types';
import { useCursorPagePagination } from '@/shared/cursor-pagination/hook/use-cursor-page-pagination';
import {
  createHealthEntryKey,
  ipFromConnectionString,
  type HealthStatus,
} from '@/shared/health';
import { useHostHealthPolling } from '../hook/use-host-health-polling';
import { HostsList } from './hosts-list';

const HOSTS_PAGE_PARAM = "hostsPage";
const HOSTS_CURSOR_KEY = "registered-hosts-cursor-key";

export type HostWithHealth = RegisteredHost & Omit<HostHealthData, "p2p" | "uptime"> & {
  ip: string;
};

function HostsPageContent() {
  const { page, queryParams, applyPaginationData, totalItems, limit } =
    useCursorPagePagination({
      pageParam: HOSTS_PAGE_PARAM,
      storageKey: HOSTS_CURSOR_KEY,
      limit: DEFAULT_LIMIT,
    });

  const { data: registeredHosts, isPending } =
    useRegisteredHosts(queryParams);

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

  const pageTotal = Number(registeredHosts?.pagination?.total ?? 0);
  const nextKey = registeredHosts?.pagination?.next_key;

  useEffect(() => {
    if (registeredHosts) {
      applyPaginationData(nextKey, pageTotal);
    }
  }, [registeredHosts, nextKey, pageTotal, applyPaginationData]);

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
        const data = healthByKey.get(key);
        return {
          ...host,
          ...data,
          status: data?.status ?? ("unknown" as HealthStatus)
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
          totalItems={totalItems}
          itemsPerPage={limit}
          pageParam={HOSTS_PAGE_PARAM}
        />
      </Container>

      <HostsList
        hosts={hostsWithHealth}
        hostLoading={isPending}
      />
    </PageLayout>
  );
}

export const HostsPageClient = () => (
  <Suspense fallback={null}>
    <HostsPageContent />
  </Suspense>
);
