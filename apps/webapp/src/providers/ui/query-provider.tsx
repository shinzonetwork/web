"use client";

import type { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface AppQueryProviderProps {
  children: ReactNode;
}

export function AppQueryProvider({ children }: AppQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
