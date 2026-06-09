import { getPublicClient } from '@/shared/viem/client';
import { useQuery } from '@tanstack/react-query';
import type { Hex, Transaction } from 'viem';

export const useShinzohubEvmTransaction = (hash?: Hex | null) => {
  return useQuery<Transaction>({
    queryKey: ['shinzohub', 'evm-transaction', hash],
    queryFn: () => {
      if (!hash) {
        throw new Error('EVM transaction hash is required');
      }
      return getPublicClient('shinzohub').getTransaction({ hash });
    },
    enabled: !!hash,
  });
};
