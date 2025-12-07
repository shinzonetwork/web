"use client";

import type { ReactNode } from "react";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Shinzo } from "@/shared/config";

interface AppRainbowKitProviderProps {
  children: ReactNode;
}

export function AppRainbowKitProvider({
  children,
}: AppRainbowKitProviderProps) {
  return (
    <RainbowKitProvider
      modalSize="compact"
      theme={darkTheme({
        accentColor: "#e2e8f0",
        accentColorForeground: "#0f172b",
      })}
      initialChain={Shinzo}
    >
      {children}
    </RainbowKitProvider>
  );
}
