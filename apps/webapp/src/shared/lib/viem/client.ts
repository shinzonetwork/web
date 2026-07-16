import { createPublicClient, http, type PublicClient } from "viem";
import { getEVMRpcUrl } from "@/shared/lib/utils/endpoints";
import type { Chain } from "viem";
import { shinzoChain } from "@/shared/config/shinzohub";

let publicClient: PublicClient | null = null;

function createShinzoPublicClient(): PublicClient {
  const chain = shinzoChain as Chain;
  return createPublicClient({
    chain,
    transport: http(getEVMRpcUrl()),
  });
}

/** Public read-only viem client for ShinzoHub server-side queries. */
export function getShinzoPublicClient(): PublicClient {
  publicClient ??= createShinzoPublicClient();
  return publicClient;
}
