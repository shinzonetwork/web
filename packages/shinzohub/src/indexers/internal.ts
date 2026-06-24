import type { RegisteredIndexer } from "./types";

export interface IndexerWire {
  address?: string;
  did?: string;
  connection_string?: string;
  source_chain?: string;
  source_chain_id?: string;
}

export interface GetIndexerWireResponse {
  indexer?: IndexerWire;
}

export function toIndexer(wire: IndexerWire): RegisteredIndexer {
  if (!wire.address) {
    throw new Error("Indexer response is missing address.");
  }
  if (!wire.did) {
    throw new Error("Indexer response is missing did.");
  }
  if (!wire.connection_string) {
    throw new Error("Indexer response is missing connection_string.");
  }
  if (!wire.source_chain) {
    throw new Error("Indexer response is missing source_chain.");
  }
  if (!wire.source_chain_id) {
    throw new Error("Indexer response is missing source_chain_id.");
  }

  return {
    address: wire.address,
    did: wire.did,
    connectionString: wire.connection_string,
    sourceChain: wire.source_chain,
    sourceChainId: wire.source_chain_id,
  };
}
