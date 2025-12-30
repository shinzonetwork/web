"use client";

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import config from "@/shared/config";

interface AppWagmiProviderProps {
  children: ReactNode;
}

export function AppWagmiProvider({ children }: AppWagmiProviderProps) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
