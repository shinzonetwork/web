type RpcEndpointName = "cosmosRest" | "cometRpc";

/** Minimal Viem client shape required by ShinzoHub query methods. */
export interface ShinzoHubQueryClient {
  chain?: {
    rpcUrls?: Record<string, { http?: readonly string[] } | undefined>;
  } | null;
}

/** Resolves a Cosmos REST or Comet RPC endpoint from an override or chain. */
export function getRpcEndpoint(
  client: ShinzoHubQueryClient,
  name: RpcEndpointName,
  override?: string,
): string {
  const url =
    override ??
    client.chain?.rpcUrls?.[name]?.http?.[0];

  if (!url) {
    const label = name === "cosmosRest" ? "Cosmos REST" : "Comet RPC";
    throw new Error(
      `${label} URL not found. Ensure the client's chain configuration includes ${name} endpoints, or pass an explicit URL.`,
    );
  }

  return url;
}
