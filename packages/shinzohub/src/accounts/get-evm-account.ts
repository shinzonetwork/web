import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import {
  normalizeAccountAddressPair,
  toEvmAccount,
  type GetEvmAccountWireResponse,
} from "./internal";
import type { GetEvmAccountParameters, ShinzoHubEvmAccount } from "./types";

/** Fetches one EVM account view through the Cosmos REST gateway. */
export async function getEvmAccount(
  client: ShinzoHubQueryClient | Client,
  parameters: GetEvmAccountParameters,
): Promise<ShinzoHubEvmAccount> {
  const { hexAddress } = normalizeAccountAddressPair(parameters.address);
  const response = await requestJson<GetEvmAccountWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/cosmos/evm/vm/v1/account/${encodeURIComponent(hexAddress)}`,
    ),
  );

  return toEvmAccount(response, hexAddress);
}
