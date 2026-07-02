import type {
  GeneratorHealthData,
  GeneratorHealthP2P,
  GeneratorHealthPeer,
  HostHealthData,
  HostHealthP2P,
  HostHealthPeer,
} from "@/shared/lib";
import type {
  GeneratorHealthData as ShinzoHubGeneratorHealthData,
  GeneratorHealthP2P as ShinzoHubGeneratorHealthP2P,
  GeneratorHealthPeer as ShinzoHubGeneratorHealthPeer,
  HostHealthData as ShinzoHubHostHealthData,
  HostHealthP2P as ShinzoHubHostHealthP2P,
  HostHealthPeer as ShinzoHubHostHealthPeer,
} from "@shinzo/shinzohub";

function serializeHealthPeer(
  peer: ShinzoHubGeneratorHealthPeer | ShinzoHubHostHealthPeer
): GeneratorHealthPeer | HostHealthPeer {
  return {
    id: peer.id,
    addresses: [...peer.addresses],
    public_key: peer.public_key,
  };
}

function serializeHealthP2P(
  p2p: ShinzoHubGeneratorHealthP2P | ShinzoHubHostHealthP2P
): GeneratorHealthP2P | HostHealthP2P {
  return {
    enabled: p2p.enabled,
    peers: p2p.peers.map(serializeHealthPeer),
    self: serializeHealthPeer(p2p.self),
  };
}

export function serializeHealth(
  data: ShinzoHubGeneratorHealthData | ShinzoHubHostHealthData
): GeneratorHealthData | HostHealthData {
  return {
    status: data.status || "unhealthy",
    uptime: data.uptime,
    uptime_seconds: data.uptime_seconds,
    last_processed: data.last_processed,
    current_block: data.current_block,
    p2p: data.p2p ? serializeHealthP2P(data.p2p) : null,
  };
}
