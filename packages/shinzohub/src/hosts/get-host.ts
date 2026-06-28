import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import type { GetHostWireResponse } from "./internal";
import { toHost } from "./internal";
import type { GetHostParameters, RegisteredHost } from "./types";

/**
 * Fetches one registered ShinzoHub host through the Cosmos REST gateway.
 */
export async function getHost(
  client: ShinzoHubQueryClient | Client,
  parameters: GetHostParameters,
): Promise<RegisteredHost> {
  const address = parameters.address.trim();
  if (!address) {
    throw new Error("address cannot be empty.");
  }

  const response = await requestJson<GetHostWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/host/v1/hosts/${encodeURIComponent(address)}`,
    ),
  );

  if (!response.host) {
    throw new Error("ShinzoHub host response did not include a host.");
  }

  return toHost(response.host);
}
