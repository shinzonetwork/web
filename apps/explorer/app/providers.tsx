'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/utils/get-query-client';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
