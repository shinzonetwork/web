import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const TransactionQuery = graphql(`
  query Transaction($hash: String) {
    Transaction(filter: { hash: { _eq: $hash } }, limit: 1) {
      hash
      blockNumber
      blockHash
      from
      to
      value
      gas
      gasPrice
      gasUsed
      effectiveGasPrice
      maxFeePerGas
      maxPriorityFeePerGas
      nonce
      transactionIndex
      type
      input
      chainId
      v
      r
      s
      status
      cumulativeGasUsed
    }
  }
`)

interface UseTransactionOptions {
  hash: string;
}

export const useTransaction = (options: UseTransactionOptions) => {
  const { hash } = options;

  return useQuery({
    queryKey: ['transaction', hash],
    queryFn: async () => {
      const res = await execute(TransactionQuery, { hash });
      return res.Transaction?.[0] ?? null;
    },
    enabled: !!hash,
  });
};

