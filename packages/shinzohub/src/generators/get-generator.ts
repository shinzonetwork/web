import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import type { GetGeneratorWireResponse } from "./internal";
import { toGenerator } from "./internal";
import type { GetGeneratorParameters, RegisteredGenerator } from "./types";

/**
 * Fetches one registered ShinzoHub generator through the Cosmos REST gateway.
 */
export async function getGenerator(
  client: ShinzoHubQueryClient | Client,
  parameters: GetGeneratorParameters,
): Promise<RegisteredGenerator> {
  const address = parameters.address.trim();
  if (!address) {
    throw new Error("address cannot be empty.");
  }

  const response = await requestJson<GetGeneratorWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/indexer/v1/indexers/${encodeURIComponent(address)}`,
    ),
  );

  if (!response.indexer) {
    throw new Error("Response did not include an Generator.");
  }

  return toGenerator(response.indexer);
}
