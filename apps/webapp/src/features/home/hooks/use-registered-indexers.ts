"use client";

import { useQuery } from "@tanstack/react-query";
import {
  buildCursorPaginationSearchParams,
  CursorPaginationResponse,
  type CursorPaginationParams,
} from "../lib/pagination";

const registeredIndexerApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_INDEXER_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/indexer/v1/indexers";

export type RegisteredIndexer = {
  address: string;
  did: string;
  connection_string: string;
  source_chain: string;
  source_chain_id: string;
};

export type RegisteredIndexersResponse = {
  indexers: RegisteredIndexer[];
  pagination?: CursorPaginationResponse;
};

export type RegisteredIndexersPaginationParams = CursorPaginationParams;

export async function fetchRegisteredIndexers(
  pagination: RegisteredIndexersPaginationParams
): Promise<RegisteredIndexersResponse> {
  const params = buildCursorPaginationSearchParams(pagination);

  const response = await fetch(
    `${registeredIndexerApiEndpoint}?${params.toString()}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json() as Promise<RegisteredIndexersResponse>;
}

export function useRegisteredIndexers(
  pagination: RegisteredIndexersPaginationParams,
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
