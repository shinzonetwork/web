"use client";

import { useQuery } from "@tanstack/react-query";

const registeredIndexerApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_INDEXER_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/indexer/v1/indexers";

interface RegisteredIndexer {
  address: string;
  did: string;
  connection_string: string;
  source_chain: string;
  source_chain_id: string;
}

type IndexerResponse = {
  indexers: RegisteredIndexer[];
  pagination?: {
    total?: string | number;
    next_key?: string | null;
  };
};

type PaginationParams = {
  key?: string;
  offset?: number;
  limit?: number;
  count_total?: boolean;
};

async function fetchRegisteredIndexers(
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
    `${registeredIndexerApiEndpoint}?${params.toString()}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: IndexerResponse = await response.json();

  return data;
}

export function useRegisteredIndexers(
  pagination: PaginationParams = {},
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["registered-indexers", pagination],
    queryFn: () => fetchRegisteredIndexers(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
