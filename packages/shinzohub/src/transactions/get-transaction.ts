import { getFetch } from "../internal/comet.js";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints.js";
import { buildUrl, requestJson } from "../internal/fetch.js";
import { normalizeHex, stripHexPrefix } from "../internal/hex.js";
import {
  eventSummary,
  toEvents,
  type CometEventWire,
} from "./internal.js";
import type {
  GetTransactionParameters,
  ShinzoHubCoin,
  ShinzoHubTransaction,
} from "./types.js";

interface RestMessageWire extends Record<string, unknown> {
  "@type"?: string;
}

interface RestTransactionWire {
  tx?: {
    body?: {
      messages?: RestMessageWire[];
      memo?: string;
    };
    auth_info?: {
      fee?: {
        amount?: ShinzoHubCoin[];
        gas_limit?: string;
        payer?: string;
        granter?: string;
      };
    };
    signatures?: string[];
  };
  tx_response?: {
    height?: string;
    txhash?: string;
    codespace?: string;
    code?: number;
    raw_log?: string;
    gas_wanted?: string;
    gas_used?: string;
    timestamp?: string;
    events?: CometEventWire[];
  };
}

/** Loads decoded transaction details by canonical Cosmos hash. */
export async function getTransaction(
  client: ShinzoHubQueryClient,
  parameters: GetTransactionParameters,
): Promise<ShinzoHubTransaction> {
  const hash = normalizeHex(parameters.hash, "hash", 32);
  const fetchFn = getFetch();
  const cosmosRestUrl = getRpcEndpoint(
    client,
    "cosmosRest",
    parameters.cosmosRestUrl,
  );

  const response = await requestJson<RestTransactionWire>(
    fetchFn,
    buildUrl(
      cosmosRestUrl,
      `/cosmos/tx/v1beta1/txs/${stripHexPrefix(hash).toUpperCase()}`,
    ),
  );
  if (!response.tx_response) {
    throw new Error(
      "ShinzoHub transaction response did not include tx_response.",
    );
  }

  const events = toEvents(response.tx_response.events);
  const common = eventSummary(events);
  const messages = (response.tx?.body?.messages ?? []).map((message) => {
    const { "@type": typeUrl = "", ...value } = message;
    return { typeUrl, value };
  });
  const fee = response.tx?.auth_info?.fee;

  return {
    cosmosHash: normalizeHex(
      response.tx_response.txhash ?? hash,
      "txhash",
      32,
    ),
    evmHash: common.evmHash,
    kind: common.evmHash ? "evm" : "cosmos",
    height: BigInt(response.tx_response.height ?? 0),
    index: common.transactionIndex,
    timestamp: response.tx_response.timestamp ?? null,
    success: (response.tx_response.code ?? 0) === 0,
    code: response.tx_response.code ?? 0,
    codespace: response.tx_response.codespace ?? "",
    gasWanted: BigInt(response.tx_response.gas_wanted ?? 0),
    gasUsed: BigInt(response.tx_response.gas_used ?? 0),
    actions: common.actions,
    senders: common.senders,
    recipients: common.recipients,
    transfers: common.transfers,
    fee: common.fee,
    events,
    memo: response.tx?.body?.memo ?? "",
    messages,
    feeCoins: fee?.amount ?? [],
    feePayer: fee?.payer ?? "",
    feeGranter: fee?.granter ?? "",
    gasLimit: BigInt(fee?.gas_limit ?? 0),
    signatures: response.tx?.signatures ?? [],
    rawLog: response.tx_response.raw_log ?? "",
  };
}
