import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';
import { Hex } from 'viem';

const EthereumBlockTransactionsCountQuery = graphql(`
  query BlockTransactionsCount($blockNumber: Int) {
    BlockTransactionsCount: Ethereum__Mainnet__Block(
      filter: { number: { _eq: $blockNumber } }
      limit: 1
    ) {
      transactions (order: { transactionIndex: DESC }, limit: 1) {
        transactionIndex
      }
    }
  }
`)

const EthereumBlockTransactionsCountByHashQuery = graphql(`
  query BlockTransactionsCountByHash($blockHash: String!) {
    BlockTransactionsCount: Ethereum__Mainnet__Block(
      filter: { hash: { _eq: $blockHash } }
      limit: 1
    ) {
      transactions (order: { transactionIndex: DESC }, limit: 1) {
        transactionIndex
      }
    }
  }
`)

export type UseEthereumBlockTransactionsCountOptions = 
  | { blockNumber: number; blockHash?: never }
  | { blockHash: Hex; blockNumber?: never };


export const useEthereumBlockTransactionsCount = (options: UseEthereumBlockTransactionsCountOptions) => {
  const blockNumber = 'blockNumber' in options ? options.blockNumber : undefined;
  const blockHash = 'blockHash' in options ? options.blockHash : undefined;

  return useQuery({
    queryKey: ['ethereum', 'block-transactions-count', blockNumber ?? blockHash, blockNumber !== undefined ? 'blockNumber' : 'blockHash'],
    enabled: blockNumber !== undefined || !!blockHash,
    staleTime: 1000 * 60,
    queryFn: async () => {
      let res;
      if (blockNumber !== undefined) {
        res = await execute(EthereumBlockTransactionsCountQuery, { blockNumber });
      } else {
        if (blockHash === undefined) {
          throw new Error(
            'useEthereumBlockTransactionsCount: blockHash is required when blockNumber is omitted',
          );
        }
        res = await execute(EthereumBlockTransactionsCountByHashQuery, { blockHash });
      }
      const blocks = res.BlockTransactionsCount ?? [];
      const firstBlock = blocks[0];
      const txCount = Number(firstBlock?.transactions?.[0]?.transactionIndex) > 0 ? Number(firstBlock?.transactions?.[0]?.transactionIndex) + 1 : 0;
      return { txCount } as const;
    },
  });
};
