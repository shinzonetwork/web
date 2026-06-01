import { execute, graphql } from '@/shared/graphql';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { useQuery } from '@tanstack/react-query';

const TransactionQuery = graphql(`
  query Transaction($hash: String) {
    Transaction: Ethereum__Mainnet__Transaction(filter: { hash: { _eq: $hash } }, limit: 1) {
      _docID
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
      block {
        timestamp
      }
    }
  }
`)

interface UseEthereumTransactionOptions {
  hash: string;
}

export const useEthereumTransaction = (options: UseEthereumTransactionOptions) => {
  const { hash } = options;
  const chain = useChainPathSegment();

  return useQuery({
    queryKey: ['ethereum', 'transaction', hash],
    queryFn: async () => {
      const res = await execute(TransactionQuery, { hash });
      return res.Transaction?.[0] ?? null;
    },
    enabled: chain === 'ethereum' && !!hash,
  });
};

