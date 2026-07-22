"use client";

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { createWagmiConfig } from "@/shared/config/wagmi";

const wagmiConfig = createWagmiConfig();

interface AppWagmiProviderProps {
  children: ReactNode;
}

export function AppWagmiProvider({ children }: AppWagmiProviderProps) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
