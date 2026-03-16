'use client';

import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const TransactionLogsQuery = graphql(`
  query TransactionLogs($hash: String) {
    Logs: Ethereum__Mainnet__Log(
      filter: { transactionHash: { _eq: $hash } }
      order: [{ logIndex: ASC }]
    ) {
      logIndex
      address
      topics
      data
      transactionHash
      blockNumber
    }
  }
`);

interface UseTransactionLogsOptions {
  hash: string;
  enabled?: boolean;
}

export const useTransactionLogs = ({ hash, enabled = true }: UseTransactionLogsOptions) => {
  return useQuery({
    queryKey: ['transaction-logs', hash],
    enabled: !!hash && enabled,
    staleTime: Infinity,
    queryFn: async () => {
      const res = await execute(TransactionLogsQuery, { hash });
      return res.Logs ?? [];
    },
  });
};
