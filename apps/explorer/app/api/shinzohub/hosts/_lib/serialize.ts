import type { RegisteredHost, RegisteredHostDetailsResponse, RegisteredHostsListResponse } from "@/shared/shinzohub/types";
import type { ListHostsResult, RegisteredHost as ShinzoHubRegisteredHost, RegisteredHostDetailsResult } from "@shinzo/shinzohub";

export function serializeHost(host: ShinzoHubRegisteredHost): RegisteredHost {
  return {
    address: host.address,
    did: host.did,
    connectionString: host.connectionString,
    endpointAddress: host.endpointAddress ?? "",
  };
}

export function serializeHostsList(result: ListHostsResult): RegisteredHostsListResponse {
  return {
    hosts: result.hosts.map((host) => serializeHost(host)),
    pagination: {
      next_key: result.pagination.nextKey,
      total: result.pagination.total ?? 0,
    }
  };
}

export function serializeHostDetails(host: RegisteredHost): RegisteredHostDetailsResponse {
  return {
      host: serializeHost(host),
    };
}
