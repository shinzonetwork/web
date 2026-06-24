"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredIndexerDetailsResponse } from "@/shared/shinzohub/types";

export async function fetchIndexerDetails(
  address: string
): Promise<RegisteredIndexerDetailsResponse> {
  const response = await fetch(
    `/api/shinzohub/indexers/${encodeURIComponent(address)}`
  );
  if (!response.ok) throw new Error("Failed to fetch indexer");

  return response.json() as Promise<RegisteredIndexerDetailsResponse>;
}

export function useIndexerDetails(
  address: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "indexer-details", address],
    queryFn: () => fetchIndexerDetails(address),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
