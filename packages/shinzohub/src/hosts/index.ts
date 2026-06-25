import { normalizeShinzoAddress } from "../addresses/index";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";

/** Registered ShinzoHub host returned by the Cosmos REST API. */
export interface ShinzoHubHost {
  address: string;
  did: string;
  connectionString: string;
  endpointAddress: string;
}

/** Options for loading a registered host by account address. */
export interface GetHostParameters {
  address: string;
  cosmosRestUrl?: string;
}

interface HostWire {
  address?: string;
  did?: string;
  connection_string?: string;
  endpoint_address?: string;
}

interface GetHostWireResponse {
  host?: HostWire;
}

/** Loads one registered host by Shinzo bech32 or EVM hex address. */
export async function getHost(
  client: ShinzoHubQueryClient,
  parameters: GetHostParameters,
): Promise<ShinzoHubHost> {
  const address = normalizeShinzoAddress(parameters.address);
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<GetHostWireResponse>(
    fetchFn,
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/shinzonetwork/host/v1/hosts/${encodeURIComponent(address)}`,
    ),
  );
  if (!response.host) {
    throw new Error("ShinzoHub host response did not include host.");
  }

  return {
    address: normalizeShinzoAddress(response.host.address ?? address),
    did: response.host.did ?? "",
    connectionString: response.host.connection_string ?? "",
    endpointAddress: response.host.endpoint_address ?? "",
  };
}
