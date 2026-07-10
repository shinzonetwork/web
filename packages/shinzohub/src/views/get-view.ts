import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { requestJson } from "../internal/fetch";
import {
  buildGetViewUrl,
  type GetViewWireResponse,
  toView,
} from "./internal";
import type { ShinzoHubView } from "./types";

export interface GetViewParameters {
  /**
   * Deterministic ShinzoHub view address.
   */
  viewAddress: string;
  /** Include raw viewbundle bytes in `view.data`. */
  includeData?: boolean;
  /** Include parsed bundle metadata in `view.metadata`. */
  includeMetadata?: boolean;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/**
 * Fetches one registered ShinzoHub view through the Cosmos REST gateway.
 */
export async function getView(
  client: ShinzoHubQueryClient,
  parameters: GetViewParameters,
): Promise<ShinzoHubView> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<GetViewWireResponse>(
    fetchFn,
    buildGetViewUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      parameters.viewAddress,
      parameters,
    ),
  );

  if (!response.view) {
    throw new Error("ShinzoHub view response did not include a view.");
  }
  return toView(response.view);
}
