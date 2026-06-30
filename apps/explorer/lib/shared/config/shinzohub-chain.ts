import { defineChain, type Chain } from 'viem';
import { shinzoHubDevelop } from '@shinzo/shinzohub';

const developRpcUrls = shinzoHubDevelop.rpcUrls as typeof shinzoHubDevelop.rpcUrls & {
  cosmosRest: { http: readonly string[] };
  cometRpc: { http: readonly string[] };
};

export function createShinzoHubChain(): Chain {
    return defineChain({
      id: shinzoHubDevelop.id,
      name: shinzoHubDevelop.name,
      nativeCurrency: {
        name: shinzoHubDevelop.nativeCurrency.name,
        symbol: shinzoHubDevelop.nativeCurrency.symbol,
        decimals: shinzoHubDevelop.nativeCurrency.decimals,
      },
      rpcUrls: {
        default: { http: [...shinzoHubDevelop.rpcUrls.default.http] },
        public: { http: [...shinzoHubDevelop.rpcUrls.default.http] },
        cosmosRest: { http: [...developRpcUrls.cosmosRest.http] },
        cometRpc: { http: [...developRpcUrls.cometRpc.http] },
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
