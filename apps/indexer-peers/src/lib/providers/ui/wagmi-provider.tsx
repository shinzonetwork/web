"use client";

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import config from "@/lib/shared/config";

interface IndexerWagmiProvider {
  children: ReactNode;
}

export function IndexerWagmiProvider({ children }: IndexerWagmiProvider) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
