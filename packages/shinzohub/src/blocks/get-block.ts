import type { ShinzoHubQueryClient } from "../internal/endpoints.js";
import { normalizeHex, stripHexPrefix } from "../internal/hex.js";
import { getBlockWire } from "./internal.js";
import type {
  GetBlockParameters,
  ShinzoHubBlock,
} from "./types.js";

/** Loads one consensus block by height or block hash. */
export async function getBlock(
  client: ShinzoHubQueryClient,
  parameters: GetBlockParameters,
): Promise<ShinzoHubBlock> {
  if ((parameters.height === undefined) === (parameters.hash === undefined)) {
    throw new Error("Provide exactly one of height or hash.");
  }
  if (parameters.height !== undefined) {
    const height = BigInt(parameters.height);
    if (height < 1n) {
      throw new Error("height must be greater than zero.");
    }
    return getBlockWire(
      client,
      "block",
      { height: height.toString() },
      parameters.cometRpcUrl,
    );
  }

  const hash = normalizeHex(parameters.hash ?? "", "hash", 32);
  return getBlockWire(
    client,
    "block_by_hash",
    { hash: stripHexPrefix(hash).toUpperCase() },
    parameters.cometRpcUrl,
  );
}
