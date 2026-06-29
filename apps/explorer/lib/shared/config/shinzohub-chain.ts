import { defineChain, type Chain } from 'viem';
import { getRpcUrlForChainPathSegment } from '@/shared/utils/consts';
import { SHINZO_TOKEN } from '../utils/tokens';

export function createShinzoHubChain(): Chain {
    const url = getRpcUrlForChainPathSegment('shinzohub');
    return defineChain({
      id: 91273002,
      name: 'Shinzo',
      nativeCurrency: SHINZO_TOKEN,
      rpcUrls: {
        default: { http: [url] },
        public: { http: [url] },
      },
    });
}
  
let shinzohubChain: Chain | null = null;
  
export function getShinzoHubChain(): Chain {
    if (!shinzohubChain) {
      shinzohubChain = createShinzoHubChain();
    }
    return shinzohubChain;
}