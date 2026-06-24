"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredHostDetailsResponse } from "@/shared/shinzohub/types";

export type HostDetailsResponse = RegisteredHostDetailsResponse;

export async function fetchHostDetails(
  address: string
): Promise<HostDetailsResponse> {
  const response = await fetch(
    `/api/shinzohub/hosts/${encodeURIComponent(address)}`
  );
  if (!response.ok) throw new Error("Failed to fetch host");

  return response.json() as Promise<HostDetailsResponse>;
}

export function useHostDetails(
  address: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "host-details", address],
    queryFn: () => fetchHostDetails(address),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
