import { getFetch, requestCometRpc } from "../internal/comet.js";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints.js";
import type { GetLatestBlockHeightParameters } from "./types.js";

interface StatusWire {
  sync_info?: {
    latest_block_height?: string;
  };
}

/** Reads the latest consensus block height. */
export async function getLatestBlockHeight(
  client: ShinzoHubQueryClient,
  parameters: GetLatestBlockHeightParameters = {},
): Promise<bigint> {
  const response = await requestCometRpc<StatusWire>(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", parameters.cometRpcUrl),
    "status",
  );
  return BigInt(response.sync_info?.latest_block_height ?? 0);
}
