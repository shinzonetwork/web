"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredGeneratorDetailsResponse } from "@/shared/shinzohub/types";

export async function fetchGeneratorDetails(
  address: string
): Promise<RegisteredGeneratorDetailsResponse> {
  const response = await fetch(
    `/api/shinzohub/generators/${encodeURIComponent(address)}`
  );
  if (!response.ok) throw new Error("Failed to fetch generator");

  return response.json() as Promise<RegisteredGeneratorDetailsResponse>;
}

export function useGeneratorDetails(
  address: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub", "generator-details", address],
    queryFn: () => fetchGeneratorDetails(address),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
