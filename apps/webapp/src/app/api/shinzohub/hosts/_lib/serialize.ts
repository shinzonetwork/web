import type {
  RegisteredHost,
  RegisteredHostDetailsResponse,
  RegisteredHostsListResponse,
  HostHealthData,
  HostHealthP2P,
  HostHealthPeer,
} from "@/shared/shinzohub/types";
import type {
  ListHostsResult,
  RegisteredHost as ShinzoHubRegisteredHost,
  HostHealthData as ShinzoHubHostHealthData,
  HostHealthP2P as ShinzoHubHostHealthP2P,
  HostHealthPeer as ShinzoHubHostHealthPeer,
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
      next_key: result.pagination.nextKey,
      total: result.pagination.total ?? 0,
    },
  };
}

export function serializeHostDetails(
  host: RegisteredHost
): RegisteredHostDetailsResponse {
  return {
    host: serializeHost(host),
  };
}

function serializeHealthPeer(peer: ShinzoHubHostHealthPeer): HostHealthPeer {
  return {
    id: peer.id,
    addresses: [...peer.addresses],
    public_key: peer.public_key,
  };
}

function serializeHealthP2P(p2p: ShinzoHubHostHealthP2P): HostHealthP2P {
  return {
    enabled: p2p.enabled,
    peers: p2p.peers.map(serializeHealthPeer),
    self: serializeHealthPeer(p2p.self),
  };
}

export function serializeHostHealth(
  data: ShinzoHubHostHealthData
): HostHealthData {
  return {
    status: data.status || "unhealthy",
    uptime: data.uptime,
    uptime_seconds: data.uptime_seconds,
    last_processed: data.last_processed,
    current_block: data.current_block,
    p2p: data.p2p ? serializeHealthP2P(data.p2p) : null,
  };
}
