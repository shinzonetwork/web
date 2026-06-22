"use client";

import { type RegisteredHost } from "@/pages/hosts";
import { useQuery } from "@tanstack/react-query";

const registeredHostsApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_HOST_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/host/v1/hosts";

export type HostDetailsResponse = {
  host: RegisteredHost;
};

export async function fetchHostDetails(
  address: string
): Promise<HostDetailsResponse> {
  const response = await fetch(
    `${registeredHostsApiEndpoint}/${address}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json() as Promise<HostDetailsResponse>;
}

export function useHostDetails(
  address: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub","host-details", address],
    queryFn: () => fetchHostDetails(address),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData
  });
}
