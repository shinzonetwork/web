import { defineChain, type Chain } from 'viem';
import { shinzoHubDevelop } from '@shinzo/shinzohub';

const developRpcUrls = shinzoHubDevelop.rpcUrls as typeof shinzoHubDevelop.rpcUrls & {
  cosmosRest: { http: readonly string[] };
  cometRpc: { http: readonly string[] };
};

export function createShinzoHubChain(): Chain {
    const evmRpcUrl =
      process.env.NEXT_PUBLIC_SHINZOHUB_RPC_URL ??
      shinzoHubDevelop.rpcUrls.default.http[0];
    const cosmosRestUrl =
      process.env.SHINZOHUB_COSMOS_REST_URL ??
      developRpcUrls.cosmosRest.http[0];
    const cometRpcUrl =
      process.env.SHINZOHUB_COMET_RPC_URL ?? developRpcUrls.cometRpc.http[0];

    return defineChain({
      id: shinzoHubDevelop.id,
      name: shinzoHubDevelop.name,
      nativeCurrency: {
        name: shinzoHubDevelop.nativeCurrency.name,
        symbol: shinzoHubDevelop.nativeCurrency.symbol,
        decimals: shinzoHubDevelop.nativeCurrency.decimals,
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
