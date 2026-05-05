"use client";

import { useQuery } from "@tanstack/react-query";

const registeredHostsApiEndpoint = process.env.NEXT_PUBLIC_REGISTERED_HOSTS_API_ENDPOINT || "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/host/v1/hosts";

interface RegisteredHost {
  address: string;
  did: string;
  connection_string: string;
}

interface IndexerResponse {
  hosts: RegisteredHost[];
  pagination: {
    total: number;
    next_key: string | null;
  };
}

async function fetchRegisteredHosts(): Promise<IndexerResponse> {
  const response = await fetch(registeredHostsApiEndpoint);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: IndexerResponse = await response.json();

  return data;
}

export function useRegisteredHosts(intervalMs = 5000) {
  return useQuery({
    queryKey: ["registered-hosts"],
    queryFn: fetchRegisteredHosts,
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
  });
}
