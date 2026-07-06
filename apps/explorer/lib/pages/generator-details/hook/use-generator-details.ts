"use client";

import { useQuery } from "@tanstack/react-query";
import type { RegisteredGenerator } from "@/shared/shinzohub/types";

export async function fetchGeneratorDetails(
  address: string
): Promise<RegisteredGenerator> {
  const response = await fetch(
    `/api/shinzohub/generators/${encodeURIComponent(address)}`
  );
  if (!response.ok) throw new Error("Failed to fetch generator");

  return response.json() as Promise<RegisteredGenerator>;
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
