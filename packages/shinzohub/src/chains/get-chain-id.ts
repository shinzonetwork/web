import { getFetch } from "../internal/comet";
import { normalizeRpcEndpoint } from "../internal/endpoints";
import type { GetChainIdParameters } from "./types";

/** Fetches the chain ID from a CometBFT node's `/status` endpoint. */
export async function getChainId({
  cometRpcUrl,
}: GetChainIdParameters): Promise<string> {
  const response = await getFetch()(
    `${normalizeRpcEndpoint(cometRpcUrl)}/status`,
  );
  if (!response.ok) {
    throw new Error(`Comet status query failed with status ${response.status}.`);
  }

  const json = (await response.json()) as {
    result?: { node_info?: { network?: string } };
    error?: { message?: string };
  };

  if (json.error?.message) {
    throw new Error(`Comet status query error: ${json.error.message}`);
  }

  const chainId = json.result?.node_info?.network?.trim();
  if (!chainId) {
    throw new Error("Comet status query did not return a chain ID.");
  }

  return chainId;
}
