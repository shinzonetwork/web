"use client";

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import wagmiConfig from "@/shared/config";

interface AppWagmiProviderProps {
  children: ReactNode;
}

export function AppWagmiProvider({ children }: AppWagmiProviderProps) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
