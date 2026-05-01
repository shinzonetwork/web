import { getQueryClient } from "@/shared/consts/query";
import { wagmiConfig } from "@/shared/consts/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { WagmiProvider, cookieToInitialState } from "wagmi";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient();
  const initialState = cookieToInitialState(wagmiConfig, document.cookie);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
