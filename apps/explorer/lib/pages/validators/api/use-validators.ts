'use client';

import { useQuery } from '@tanstack/react-query';
import type { ShinzohubValidatorsResponse } from '@/shared/shinzohub/types';

type UseValidatorsOptions = {
  refetchIntervalMs?: number;
};

export function shinzohubValidatorsQueryKey() {
  return ['shinzohub', 'validators'] as const;
}

export async function fetchShinzohubValidators(): Promise<ShinzohubValidatorsResponse> {
  const response = await fetch('/api/shinzohub/validators');

  if (!response.ok) {
    throw new Error('Failed to fetch Shinzohub validators');
  }

  return response.json() as Promise<ShinzohubValidatorsResponse>;
}

export function useValidators(
  { refetchIntervalMs = 30_000 }: UseValidatorsOptions = {},
) {
  return useQuery({
    queryKey: shinzohubValidatorsQueryKey(),
    queryFn: fetchShinzohubValidators,
    staleTime: refetchIntervalMs,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
  });
}
