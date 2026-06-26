import type {
  RegisteredIndexer,
  RegisteredIndexerDetailsResponse,
  RegisteredIndexersListResponse,
  IndexerHealthData,
  IndexerHealthP2P,
  IndexerHealthPeer,
} from "@/shared/shinzohub/types";
import type {
  ListIndexersResult,
  RegisteredIndexer as ShinzoHubRegisteredIndexer,
  IndexerHealthData as ShinzoHubIndexerHealthData,
  IndexerHealthP2P as ShinzoHubIndexerHealthP2P,
  IndexerHealthPeer as ShinzoHubIndexerHealthPeer,
} from "@shinzo/shinzohub";

export function serializeIndexer(
  indexer: ShinzoHubRegisteredIndexer,
): RegisteredIndexer {
  return {
    address: indexer.address,
    did: indexer.did,
    connectionString: indexer.connectionString,
    sourceChain: indexer.sourceChain,
    sourceChainId: indexer.sourceChainId,
  };
}

export function serializeIndexersList(
  result: ListIndexersResult,
): RegisteredIndexersListResponse {
  return {
    indexers: result.indexers.map((indexer) => serializeIndexer(indexer)),
    pagination: {
      next_key: result.pagination.nextKey,
      total: result.pagination.total ?? 0,
    },
  };
}

export function serializeIndexerDetails(
  indexer: ShinzoHubRegisteredIndexer,
): RegisteredIndexerDetailsResponse {
  return {
    indexer: serializeIndexer(indexer),
  };
}

function serializeHealthPeer(peer: ShinzoHubIndexerHealthPeer): IndexerHealthPeer {
  return {
    id: peer.id,
    addresses: [...peer.addresses],
    public_key: peer.public_key,
  };
}

function serializeHealthP2P(p2p: ShinzoHubIndexerHealthP2P): IndexerHealthP2P {
  return {
    enabled: p2p.enabled,
    peers: p2p.peers.map(serializeHealthPeer),
    self: serializeHealthPeer(p2p.self),
  };
}

export function serializeIndexerHealth(
  data: ShinzoHubIndexerHealthData,
): IndexerHealthData {
  return {
    status: data.status || "unhealthy",
    uptime: data.uptime,
    uptime_seconds: data.uptime_seconds,
    last_processed: data.last_processed,
    current_block: data.current_block,
    p2p: data.p2p ? serializeHealthP2P(data.p2p) : null,
  };
}