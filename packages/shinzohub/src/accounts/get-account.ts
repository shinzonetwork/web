import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import {
  normalizeAccountAddressPair,
  toAccount,
  type GetAccountWireResponse,
} from "./internal";
import type { GetAccountParameters, ShinzoHubAccount } from "./types";

/** Fetches one Cosmos auth account through the Cosmos REST gateway. */
export async function getAccount(
  client: ShinzoHubQueryClient | Client,
  parameters: GetAccountParameters,
): Promise<ShinzoHubAccount> {
  const { shinzoAddress } = normalizeAccountAddressPair(parameters.address);
  const response = await requestJson<GetAccountWireResponse>(
    getFetch(),
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      `/cosmos/auth/v1beta1/accounts/${encodeURIComponent(shinzoAddress)}`,
    ),
  );

  if (!response.account) {
    throw new Error("ShinzoHub account response did not include an account.");
  }

  return toAccount(response.account, shinzoAddress);
}
