import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '@/shared/graphql';

const TransactionsQuery = graphql(`
  query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {
    Transaction: Ethereum__Mainnet__Transaction(
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
      block {
        timestamp
      }
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
        transactions: res.Transaction?.filter(Boolean) as Transaction[],
      };
    },
  });
};

