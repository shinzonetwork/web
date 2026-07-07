import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import type { GetGeneratorWireResponse } from "./internal";
import { toGenerator } from "./internal";
import type { GetGeneratorParameters, Generator } from "./types";

/**
 * Fetches one registered ShinzoHub generator through the Cosmos REST gateway.
 */
export async function getGenerator(
  client: ShinzoHubQueryClient | Client,
  parameters: GetGeneratorParameters,
): Promise<Generator> {
  const address = parameters.address.trim();
  if (!address) {
    throw new Error("Address cannot be empty.");
  }

  const response = await requestJson<GetGeneratorWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/indexer/v1/indexers/${encodeURIComponent(address)}`,
    ),
  );

  if (!response.indexer) {
    throw new Error("Response did not include a generator.");
  }

  return toGenerator(response.indexer);
}
