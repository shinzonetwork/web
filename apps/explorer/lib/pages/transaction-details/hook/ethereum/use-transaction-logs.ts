'use client';

import { execute, graphql } from '@/shared/graphql';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { useQuery } from '@tanstack/react-query';
import { useEthereumTransaction } from './use-ethereum-transaction';

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

export const useTransactionLogs = ({ hash }: UseTransactionLogsOptions) => {
  const {data: tx} = useEthereumTransaction({ hash });
  const chain = useChainPathSegment();

  return useQuery({
    queryKey: ['ethereum', 'transaction-logs', hash],
    enabled: chain === 'ethereum' && !!hash && !!tx,
    staleTime: Infinity,
    queryFn: async () => {
      const res = await execute(TransactionLogsQuery, { hash });
      return res.Logs ?? [];
    },
  });
};
