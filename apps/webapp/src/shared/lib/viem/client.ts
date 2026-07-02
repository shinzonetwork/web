import { createPublicClient, http, type PublicClient } from "viem";
import { shinzoHub } from "@/shared/config";
import { getRpcUrl } from "@/shared/config/env";

const publicClientByChain = new Map<"shinzohub", PublicClient>();

/**
 * Public (read-only) viem client for the explorer path segment, e.g. `ethereum` or `shinzohub`.
 * Instances are cached per segment.
 */
export function getShinzoPublicClient(): PublicClient {
  const cached = publicClientByChain.get("shinzohub");
  if (cached) {
    return cached;
  }
  const client = createPublicClient({
    chain: shinzoHub,
    transport: http(getRpcUrl()),
  });
  publicClientByChain.set("shinzohub", client);
  return client;
}
