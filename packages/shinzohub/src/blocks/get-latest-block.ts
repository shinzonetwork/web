import type { ShinzoHubQueryClient } from "../internal/endpoints";
import { getBlockWire } from "./internal";
import type {
  GetBlockParameters,
  ShinzoHubBlock,
} from "./types";

/** Loads the latest consensus block. */
export async function getLatestBlock(
  client: ShinzoHubQueryClient,
  parameters: Pick<GetBlockParameters, "cometRpcUrl"> = {},
): Promise<ShinzoHubBlock> {
  return getBlockWire(client, "block", {}, parameters.cometRpcUrl);
}
