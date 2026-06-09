import { getFetch, requestCometRpc } from "../internal/comet.js";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints.js";
import { positiveHeight } from "./internal.js";
import type { GetBlockTimestampParameters } from "./types.js";

interface HeaderWire {
  header?: {
    time?: string;
  };
}

/** Reads a block's consensus timestamp by height. */
export async function getBlockTimestamp(
  client: ShinzoHubQueryClient,
  parameters: GetBlockTimestampParameters,
): Promise<string> {
  const height = positiveHeight(parameters.height, "height");
  const response = await requestCometRpc<HeaderWire>(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", parameters.cometRpcUrl),
    "header",
    { height: height.toString() },
  );
  if (!response.header?.time) {
    throw new Error("ShinzoHub header response did not include a timestamp.");
  }
  return response.header.time;
}
