import type { ShinzoHubQueryClient } from "../internal/endpoints";
import { hexToBase64, normalizeHex } from "../internal/hex";
import { getBlockWire } from "./internal";
import type {
  GetBlockParameters,
  ShinzoHubBlock,
} from "./types";

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
    { hash: hexToBase64(hash) },
    parameters.cometRpcUrl,
  );
}
