import { shinzoHubDevelop } from '@shinzo/shinzohub';
import type { ChainPathSegment } from '@/shared/utils/links';

export const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:9181/api/v0/graphql';
export const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_URL;
export const STUDIO_VIEW_BASE_URL = 'https://studio.shinzo.network/views';

/**
 * Public RPC URL for the explorer (Ethereum). Prefer NEXT_PUBLIC_ETHEREUM_RPC_URL; falls back
 * to legacy NEXT_PUBLIC_RPC_URL then a public mainnet endpoint.
 */
export function getRpcUrlForChainPathSegment(segment: ChainPathSegment): string {
  switch (segment) {
    case 'shinzohub':
      return (
        process.env.NEXT_PUBLIC_SHINZOHUB_RPC_URL ??
        shinzoHubDevelop.rpcUrls.default.http[0]
      );
    case 'ethereum':
      return process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ?? 'https://ethereum-rpc.publicnode.com';
    default:
      return process.env.NEXT_PUBLIC_RPC_URL ?? 'https://ethereum-rpc.publicnode.com';
  }
}
