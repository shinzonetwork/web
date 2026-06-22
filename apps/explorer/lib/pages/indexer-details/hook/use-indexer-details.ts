"use client";

import { RegisteredIndexer } from "@/pages/indexers/hook/use-registered-indexers";
import { useQuery } from "@tanstack/react-query";

const registeredIndexersApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_INDEXER_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/indexer/v1/indexers";

export type IndexerDetailsResponse = {
  indexer: RegisteredIndexer;
};

export async function fetchIndexerDetails(
  address: string
): Promise<IndexerDetailsResponse> {
  const response = await fetch(
    `${registeredIndexersApiEndpoint}/${address}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json() as Promise<IndexerDetailsResponse>;
}

export function useIndexerDetails(
  address: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub","indexer-details", address],
    queryFn: () => fetchIndexerDetails(address),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData
  });
}
