"use client";

import { shinzoHubTestnet } from "@shinzo/shinzohub";
import { useEffect, useState, type ReactNode } from "react";
import type { Chain } from "viem";
import { WagmiProvider, type Config } from "wagmi";
import { createWagmiConfig } from "@/shared/config";
import { fetchShinzoHubChain } from "@/shared/lib/shinzohub/resolve-chain";

interface AppWagmiProviderProps {
  children: ReactNode;
}

export function AppWagmiProvider({ children }: AppWagmiProviderProps) {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      try {
        const chain = await fetchShinzoHubChain(controller.signal);
        if (!controller.signal.aborted) {
          setConfig(createWagmiConfig(chain));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(
            "Failed to load ShinzoHub chain, using testnet fallback:",
            error
          );
          setConfig(createWagmiConfig(shinzoHubTestnet as Chain));
        }
      }
    })();

    return () => controller.abort();
  }, []);

  if (!config) {
    return null;
  }

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
