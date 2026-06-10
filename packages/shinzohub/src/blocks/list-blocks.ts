import { getFetch, requestCometRpc } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import {
  positiveHeight,
  toBlockMeta,
  type BlockchainWire,
} from "./internal";
import type {
  ListBlocksParameters,
  ListBlocksResult,
} from "./types";

/** Lists consensus blocks within an optional inclusive height range. */
export async function listBlocks(
  client: ShinzoHubQueryClient,
  parameters: ListBlocksParameters = {},
): Promise<ListBlocksResult> {
  const minHeight =
    parameters.minHeight === undefined
      ? undefined
      : positiveHeight(parameters.minHeight, "minHeight");
  const maxHeight =
    parameters.maxHeight === undefined
      ? undefined
      : positiveHeight(parameters.maxHeight, "maxHeight");
  if (
    minHeight !== undefined &&
    maxHeight !== undefined &&
    minHeight > maxHeight
  ) {
    throw new Error("minHeight must be less than or equal to maxHeight.");
  }
  const params: Record<string, string> = {};
  if (minHeight !== undefined) {
    params.minHeight = minHeight.toString();
  }
  if (maxHeight !== undefined) {
    params.maxHeight = maxHeight.toString();
  }
  const response = await requestCometRpc<BlockchainWire>(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", parameters.cometRpcUrl),
    "blockchain",
    params,
  );

  return {
    blocks: (response.block_metas ?? []).map(toBlockMeta),
    latestHeight: BigInt(response.last_height ?? 0),
  };
}
