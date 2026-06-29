import type {
  RegisteredGenerator,
  RegisteredGeneratorDetailsResponse,
  RegisteredGeneratorsListResponse,
  GeneratorHealthData,
  GeneratorHealthP2P,
  GeneratorHealthPeer,
} from "@/shared/lib";
import type {
  ListGeneratorsResult,
  RegisteredGenerator as ShinzoHubRegisteredGenerator,
  GeneratorHealthData as ShinzoHubGeneratorHealthData,
  GeneratorHealthP2P as ShinzoHubGeneratorHealthP2P,
  GeneratorHealthPeer as ShinzoHubGeneratorHealthPeer,
} from "@shinzo/shinzohub";

export function serializeGenerator(
  generator: ShinzoHubRegisteredGenerator
): RegisteredGenerator {
  return {
    address: generator.address,
    did: generator.did,
    connectionString: generator.connectionString,
    sourceChain: generator.sourceChain,
    sourceChainId: generator.sourceChainId,
  };
}

export function serializeGeneratorsList(
  result: ListGeneratorsResult
): RegisteredGeneratorsListResponse {
  return {
    generators: result.generators.map((generator) =>
      serializeGenerator(generator)
    ),
    pagination: {
      total: result.pagination.total ?? 0,
    },
  };
}

export function serializeGeneratorDetails(
  generator: ShinzoHubRegisteredGenerator
): RegisteredGeneratorDetailsResponse {
  return {
    generator: serializeGenerator(generator),
  };
}

function serializeHealthPeer(
  peer: ShinzoHubGeneratorHealthPeer
): GeneratorHealthPeer {
  return {
    id: peer.id,
    addresses: [...peer.addresses],
    public_key: peer.public_key,
  };
}

function serializeHealthP2P(
  p2p: ShinzoHubGeneratorHealthP2P
): GeneratorHealthP2P {
  return {
    enabled: p2p.enabled,
    peers: p2p.peers.map(serializeHealthPeer),
    self: serializeHealthPeer(p2p.self),
  };
}

export function serializeGeneratorHealth(
  data: ShinzoHubGeneratorHealthData
): GeneratorHealthData {
  return {
    status: data.status || "unhealthy",
    uptime: data.uptime,
    uptime_seconds: data.uptime_seconds,
    last_processed: data.last_processed,
    current_block: data.current_block,
    p2p: data.p2p ? serializeHealthP2P(data.p2p) : null,
  };
}
