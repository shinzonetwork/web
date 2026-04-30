import { type Chain } from 'viem';
import { mainnet } from 'viem/chains';
import type { ChainPathSegment } from '@/shared/utils/links';
import { getShinzoHubChain } from '../config/shinzohub-chain';

/** Resolves a viem `Chain` for the first URL segment, e.g. `ethereum` → mainnet, `shinzohub` → Shinzo. */
export function getChainForConfig(segment: ChainPathSegment): Chain {
  switch (segment) {
    case 'shinzohub':
      return getShinzoHubChain();
    case 'ethereum':
      return mainnet;
    default:
      return mainnet;
  }
}
