"use client";

import type { ReactNode } from "react";
import { IndexerWagmiProvider } from "./wagmi-provider";
import { IndexerQueryProvider } from "./query-provider";

interface ChainProvidersProps {
  children: ReactNode;
}

export function ChainProviders({ children }: ChainProvidersProps) {
  return (
    <IndexerWagmiProvider>
      <IndexerQueryProvider>{children}</IndexerQueryProvider>
    </IndexerWagmiProvider>
  );
}
