import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import { toAssertion, type GetAssertionWireResponse } from "./internal";
import type { GetAssertionParameters, GetAssertionResult } from "./types";

/**
 * Fetches generator assertions for a delegate address through the Cosmos REST gateway.
 */
export async function getAssertion(
  client: ShinzoHubQueryClient | Client,
  parameters: GetAssertionParameters,
): Promise<GetAssertionResult> {
  const address = parameters.address.trim();
  if (!address) {
    throw new Error("address cannot be empty.");
  }

  const response = await requestJson<GetAssertionWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/indexer/v1/assertions/${encodeURIComponent(address)}`,
    ),
  );

  return {
    assertions: (response.assertions ?? []).map(toAssertion),
  };
}
