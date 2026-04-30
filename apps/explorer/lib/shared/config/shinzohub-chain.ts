import { defineChain, type Chain } from 'viem';
import { getRpcUrlForChainPathSegment } from '@/shared/utils/consts';

export function createShinzoHubChain(): Chain {
    const url = getRpcUrlForChainPathSegment('shinzohub');
    return defineChain({
      id: 91273002,
      name: 'Shinzo',
      nativeCurrency: { name: 'Shinzo', symbol: 'SHNZ', decimals: 18 },
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