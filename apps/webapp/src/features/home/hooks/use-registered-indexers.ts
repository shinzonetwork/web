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
  pagination: {
    total: number;
    next_key: string | null;
  };
};

async function fetchRegisteredIndexers(): Promise<IndexerResponse> {
  const response = await fetch(registeredIndexerApiEndpoint);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: IndexerResponse = await response.json();

  return data;
}

export function useRegisteredIndexers(intervalMs = 5000) {
  return useQuery({
    queryKey: ["registered-indexers"],
    queryFn: fetchRegisteredIndexers,
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
  });
}
