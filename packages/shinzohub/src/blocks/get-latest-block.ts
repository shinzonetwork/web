import type { ShinzoHubQueryClient } from "../internal/endpoints.js";
import { getBlockWire } from "./internal.js";
import type {
  GetBlockParameters,
  ShinzoHubBlock,
} from "./types.js";

/** Loads the latest consensus block. */
export async function getLatestBlock(
  client: ShinzoHubQueryClient,
  parameters: Pick<GetBlockParameters, "cometRpcUrl"> = {},
): Promise<ShinzoHubBlock> {
  return getBlockWire(client, "block", {}, parameters.cometRpcUrl);
}
