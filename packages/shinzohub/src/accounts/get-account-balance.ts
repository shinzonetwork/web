import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import {
  DEFAULT_ACCOUNT_BALANCE_DENOM,
  normalizeAccountAddressPair,
  toAccountBalance,
  type GetAccountBalanceWireResponse,
} from "./internal";
import type {
  GetAccountBalanceParameters,
  ShinzoHubAccountBalance,
} from "./types";

/** Fetches one bank balance by denom through the Cosmos REST gateway. */
export async function getAccountBalance(
  client: ShinzoHubQueryClient | Client,
  parameters: GetAccountBalanceParameters,
): Promise<ShinzoHubAccountBalance> {
  const { shinzoAddress } = normalizeAccountAddressPair(parameters.address);
  const denom = parameters.denom ?? DEFAULT_ACCOUNT_BALANCE_DENOM;
  const url = buildUrl(
    getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
    `/cosmos/bank/v1beta1/balances/${encodeURIComponent(shinzoAddress)}/by_denom`,
  );
  url.searchParams.set("denom", denom);

  const response = await requestJson<GetAccountBalanceWireResponse>(
    getFetch(),
    url,
  );

  return toAccountBalance(response, shinzoAddress, denom);
}
