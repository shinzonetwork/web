import { createPublicClient, http, type PublicClient } from 'viem';
import { getRpcUrlForChainPathSegment } from '@/shared/utils/consts';
import type { ChainPathSegment } from '@/shared/utils/links';
import { getChainForConfig } from '@/shared/viem/chains';

const publicClientByChain = new Map<ChainPathSegment, PublicClient>();

/**
 * Public (read-only) viem client for the explorer path segment, e.g. `ethereum` or `shinzohub`.
 * Instances are cached per segment.
 */
export function getPublicClient(chainPath: ChainPathSegment): PublicClient {
  const cached = publicClientByChain.get(chainPath);
  if (cached) {
    return cached;
  }
  const chain = getChainForConfig(chainPath);
  const url = getRpcUrlForChainPathSegment(chainPath);
  const client = createPublicClient({ chain, transport: http(url) });
  publicClientByChain.set(chainPath, client);
  return client;
}
