import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";

export interface CountViewsParameters {
  /**
   * Override the chain's configured Cosmos REST endpoint.
   */
  cosmosRestUrl?: string;
}

interface CountViewsWireResponse {
  count?: string | number;
}

/**
 * Counts registered ShinzoHub views through the Cosmos REST gateway.
 */
export async function countViews(
  client: ShinzoHubQueryClient,
  parameters?: CountViewsParameters,
): Promise<bigint> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<CountViewsWireResponse>(
    fetchFn,
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters?.cosmosRestUrl),
      "/shinzonetwork/view/v1/view_count",
    ),
  );

  return BigInt(response.count ?? 0);
}
