import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import type { GetIndexerWireResponse } from "./internal";
import { toIndexer } from "./internal";
import type { GetIndexerParameters, RegisteredIndexer } from "./types";

/**
 * Fetches one registered ShinzoHub indexer through the Cosmos REST gateway.
 */
export async function getIndexer(
  client: ShinzoHubQueryClient | Client,
  parameters: GetIndexerParameters,
): Promise<RegisteredIndexer> {
  const address = parameters.address.trim();
  if (!address) {
    throw new Error("address cannot be empty.");
  }

  const response = await requestJson<GetIndexerWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/indexer/v1/indexers/${encodeURIComponent(address)}`,
    ),
  );

  if (!response.indexer) {
    throw new Error("ShinzoHub indexer response did not include an indexer.");
  }

  return toIndexer(response.indexer);
}
