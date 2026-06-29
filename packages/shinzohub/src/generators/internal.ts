import type { RegisteredGenerator } from "./types";

export interface GeneratorWire {
  address?: string;
  did?: string;
  connection_string?: string;
  source_chain?: string;
  source_chain_id?: string;
}

export interface GetGeneratorWireResponse {
  indexer?: GeneratorWire;
}

export function toGenerator(wire: GeneratorWire): RegisteredGenerator {
  if (!wire.address) {
    throw new Error("Generator response is missing address.");
  }
  if (!wire.did) {
    throw new Error("Generator response is missing did.");
  }
  if (!wire.connection_string) {
    throw new Error("Generator response is missing connection_string.");
  }
  if (!wire.source_chain) {
    throw new Error("Generator response is missing source_chain.");
  }
  if (!wire.source_chain_id) {
    throw new Error("Generator response is missing source_chain_id.");
  }

  return {
    address: wire.address,
    did: wire.did,
    connectionString: wire.connection_string,
    sourceChain: wire.source_chain,
    sourceChainId: wire.source_chain_id,
  };
}
