import { execute, graphql } from '@/shared/graphql';
import { PageParams } from '@shinzo/ui/pagination';
import { useQuery } from '@tanstack/react-query';

const BlockTransactionsQuery = graphql(`
  query BlockTransactions($offset: Int, $limit: Int, $blockNumber: Int) {
    BlockTransactions: Ethereum__Mainnet__Block(
      filter: { number: { _eq: $blockNumber } }
      limit: 1
    ) {
      timestamp
      transactions (offset: $offset, limit: $limit) {
        hash
        from
        to
        value
        gasPrice
      }
    }
  }
`)
const BlockTransactionsByHashQuery = graphql(`
  query BlockTransactionsByHash($offset: Int, $limit: Int, $hash: String!) {
    BlockTransactions: Ethereum__Mainnet__Block(filter: { hash: { _eq: $hash } }, limit: 1) {
      timestamp
      transactions (offset: $offset, limit: $limit) {
        hash
        from
        to
        value
        gasPrice
      }
    }
  }
`)

export type UseBlockTransactionsOptions =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams }
  | { blockHash: string; blockNumber?: never; pageParams: PageParams };

export const useBlockTransactions = (options: UseBlockTransactionsOptions) => {
  const { offset, limit } = options.pageParams;
  const blockNumber = 'blockNumber' in options ? options.blockNumber : undefined;
  const blockHash = 'blockHash' in options ? options.blockHash : undefined;

  return useQuery({
    queryKey: ['block-transactions', blockNumber ?? blockHash, blockNumber !== undefined ? 'blockNumber' : 'blockHash', offset, limit],
    enabled: blockNumber !== undefined || !!blockHash,
    staleTime: 1000 * 60,
    queryFn: async () => {
      let res;
      if (blockNumber !== undefined) {
        res = await execute(BlockTransactionsQuery, { offset, limit, blockNumber });
      } else {
        if (blockHash === undefined) {
          throw new Error(
            'useBlockTransactions: blockHash is required when blockNumber is omitted',
          );
        }
        res = await execute(BlockTransactionsByHashQuery, { offset, limit, hash: blockHash });
      }
      const blocks = res.BlockTransactions ?? [];
      const firstBlock = blocks[0];

      const transactions = firstBlock?.transactions?.filter((txn): txn is NonNullable<typeof txn> => txn !== null) ?? [];
      return { 
        transactions,
        timestamp: firstBlock?.timestamp
     } as const;
    },
  });
};
