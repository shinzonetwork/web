import { defineChain, type Chain } from 'viem';
import {  shinzoHubTestnet } from '@shinzo/shinzohub';

const developRpcUrls = shinzoHubTestnet.rpcUrls as typeof shinzoHubTestnet.rpcUrls & {
  cosmosRest: { http: readonly string[] };
  cometRpc: { http: readonly string[] };
};

export function createShinzoHubChain(): Chain {
    const evmRpcUrl =
      process.env.NEXT_PUBLIC_SHINZOHUB_RPC_URL ??
      shinzoHubTestnet.rpcUrls.default.http[0];
    const cosmosRestUrl =
      process.env.SHINZOHUB_COSMOS_REST_URL ??
      developRpcUrls.cosmosRest.http[0];
    const cometRpcUrl =
      process.env.SHINZOHUB_COMET_RPC_URL ?? developRpcUrls.cometRpc.http[0];

    return defineChain({
      id: shinzoHubTestnet.id,
      name: shinzoHubTestnet.name,
      nativeCurrency: {
        name: shinzoHubTestnet.nativeCurrency.name,
        symbol: shinzoHubTestnet.nativeCurrency.symbol,
        decimals: shinzoHubTestnet.nativeCurrency.decimals,
      },
      rpcUrls: {
        default: { http: [evmRpcUrl] },
        public: { http: [evmRpcUrl] },
        cosmosRest: { http: [cosmosRestUrl] },
        cometRpc: { http: [cometRpcUrl] },
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
