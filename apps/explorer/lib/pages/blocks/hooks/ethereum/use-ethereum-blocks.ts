import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const EthereumBlocksQuery = graphql(`
  query Blocks($offset: Int, $limit: Int) {
    Block: Ethereum__Mainnet__Block(offset: $offset, limit: $limit, order: { number: DESC }) {
      number
      timestamp
      gasUsed
      gasLimit
      miner
      transactions(limit: 1, order: { transactionIndex: DESC }) {
        transactionIndex
      }
    }
  }
`)

interface UseEthereumBlocksOptions {
  offset: number;
  limit: number;
}

export const useEthereumBlocks = (options: Partial<UseEthereumBlocksOptions>) => {
  const { offset, limit } = options;

  return useQuery({
    queryKey: ['ethereum', 'blocks', offset, limit],
    queryFn: async () => {
      const res = await execute(EthereumBlocksQuery, { offset, limit });
      return {
        blocks: res.Block?.filter(Boolean),
      };
    },
  });
};
