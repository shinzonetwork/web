import { normalizeShinzoAddress } from "../addresses/index";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";

/** Registered ShinzoHub indexer returned by the Cosmos REST API. */
export interface ShinzoHubIndexer {
  address: string;
  did: string;
  connectionString: string;
  sourceChain: string;
  sourceChainId: bigint;
}

/** Options for loading a registered indexer by account address. */
export interface GetIndexerParameters {
  address: string;
  cosmosRestUrl?: string;
}

interface IndexerWire {
  address?: string;
  did?: string;
  connection_string?: string;
  source_chain?: string;
  source_chain_id?: string | number;
}

interface GetIndexerWireResponse {
  indexer?: IndexerWire;
}

/** Loads one registered indexer by Shinzo bech32 or EVM hex address. */
export async function getIndexer(
  client: ShinzoHubQueryClient,
  parameters: GetIndexerParameters,
): Promise<ShinzoHubIndexer> {
  const address = normalizeShinzoAddress(parameters.address);
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<GetIndexerWireResponse>(
    fetchFn,
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/indexer/v1/indexers/${encodeURIComponent(address)}`,
    ),
  );
  if (!response.indexer) {
    throw new Error("ShinzoHub indexer response did not include indexer.");
  }

  return {
    address: normalizeShinzoAddress(response.indexer.address ?? address),
    did: response.indexer.did ?? "",
    connectionString: response.indexer.connection_string ?? "",
    sourceChain: response.indexer.source_chain ?? "",
    sourceChainId: BigInt(response.indexer.source_chain_id ?? 0),
  };
}
