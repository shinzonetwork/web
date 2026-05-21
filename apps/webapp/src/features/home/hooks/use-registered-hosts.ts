"use client";

import { useQuery } from "@tanstack/react-query";

const registeredHostsApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_HOSTS_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/host/v1/hosts";

interface RegisteredHost {
  address: string;
  did: string;
  connection_string: string;
}

type PaginationResponse = {
  total?: string | number;
  next_key?: string | null;
};

type PaginationParams = {
  key?: string;
  offset?: number;
  limit?: number;
  count_total?: boolean;
};

interface IndexerResponse {
  hosts: RegisteredHost[];
  pagination?: PaginationResponse;
}

async function fetchRegisteredHosts(
  pagination: PaginationParams
): Promise<IndexerResponse> {
  const params = new URLSearchParams();
  params.set("pagination.limit", String(pagination.limit ?? 10));
  params.set("pagination.offset", String(pagination.offset ?? 0));

  if (pagination.key) params.set("pagination.key", pagination.key);
  if (pagination.count_total !== undefined) {
    params.set("pagination.count_total", String(pagination.count_total));
  }

  const response = await fetch(
    `${registeredHostsApiEndpoint}?${params.toString()}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: IndexerResponse = await response.json();

  return data;
}

export function useRegisteredHosts(
  pagination: PaginationParams = {},
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["registered-hosts", pagination],
    queryFn: () => fetchRegisteredHosts(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
