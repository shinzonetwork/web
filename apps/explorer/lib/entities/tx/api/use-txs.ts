import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const TransactionsQuery = graphql(`
  query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {
    txCount: _count(Transaction: {})
    Transaction(
      offset: $offset, 
      limit: $limit, 
      order: { blockNumber: DESC }
      filter: { blockNumber: { _eq: $blockNumber } }
    ) {
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

interface UseTransactionsOptions {
  offset?: number;
  limit?: number;
  blockNumber?: number;
}

export const useTransactions = (options: Partial<UseTransactionsOptions>) => {
  const { offset, limit, blockNumber } = options;

  return useQuery({
    queryKey: ['transactions', offset, limit, blockNumber],
    queryFn: async () => {
      const res = await execute(TransactionsQuery, { offset, limit, blockNumber });
      return {
        transactions: res.Transaction,
        totalCount: res.txCount,
      };
    },
  });
};

