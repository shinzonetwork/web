"use client";

import { useQuery } from "@tanstack/react-query";
import {
  buildCursorPaginationSearchParams,
  CursorPaginationResponse,
  type CursorPaginationParams,
} from "../../../shared/cursor-pagination/lib/pagination";

const registeredHostsApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_HOST_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/host/v1/hosts";

export type RegisteredHost = {
  address: string;
  did: string;
  connection_string: string;
  endpoint_address: string;
};

export type RegisteredHostsResponse = {
  hosts: RegisteredHost[];
  pagination?: CursorPaginationResponse;
};

export type RegisteredHostsPaginationParams = CursorPaginationParams;

export async function fetchRegisteredHosts(
  pagination: RegisteredHostsPaginationParams
): Promise<RegisteredHostsResponse> {
  const params = buildCursorPaginationSearchParams(pagination);

  const response = await fetch(
    `${registeredHostsApiEndpoint}?${params.toString()}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<RegisteredHostsResponse>;
}

export function useRegisteredHosts(
  pagination: RegisteredHostsPaginationParams,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: ["shinzohub","registered-hosts", pagination],
    queryFn: () => fetchRegisteredHosts(pagination),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData,
  });
}
