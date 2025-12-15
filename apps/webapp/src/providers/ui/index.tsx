"use client";

import type { ReactNode } from "react";
import { AppWagmiProvider } from "./wagmi-provider";
import { AppQueryProvider } from "./query-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppWagmiProvider>
      <AppQueryProvider>{children}</AppQueryProvider>
    </AppWagmiProvider>
  );
}
