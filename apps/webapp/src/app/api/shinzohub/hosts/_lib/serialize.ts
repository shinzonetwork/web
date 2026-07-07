import type {
  RegisteredHost,
  RegisteredHostsListResponse,
} from "@/shared/lib";
import type {
  ListHostsResult,
  RegisteredHost as ShinzoHubRegisteredHost,
} from "@shinzo/shinzohub";

export function serializeHost(host: ShinzoHubRegisteredHost): RegisteredHost {
  return {
    address: host.address,
    did: host.did,
    connectionString: host.connectionString,
    endpointAddress: host.endpointAddress ?? "",
  };
}

export function serializeHostsList(
  result: ListHostsResult
): RegisteredHostsListResponse {
  return {
    hosts: result.hosts.map((host) => serializeHost(host)),
    pagination: {
      total: result.pagination.total ?? 0,
    },
  };
}

