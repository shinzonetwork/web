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

interface UseEthereumTransactionsOptions {
  offset?: number;
  limit?: number;
  blockNumber?: number;
}

export type EthereumTransaction = Omit<Transaction, 'block'> & {
  timestamp: string | undefined;
};
export const useEthereumTransactions = (options: Partial<UseEthereumTransactionsOptions>) => {
  const { offset, limit, blockNumber } = options;

  return useQuery({
    queryKey: ['ethereum', 'transactions', offset, limit, blockNumber],
    queryFn: async () => {
      const res = await execute(TransactionsQuery, { offset, limit, blockNumber });
      const filteredTxns = res.Transaction?.filter(Boolean) as Transaction[];
      const mappedTxns = filteredTxns.map((txn) => ({
        ...txn,
        timestamp: txn.block?.timestamp ? txn.block.timestamp : undefined,
      }));
      return mappedTxns as EthereumTransaction[];
    },
  });
};

