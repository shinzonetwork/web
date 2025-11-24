import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlocksQuery = graphql(`
  query Blocks($offset: Int, $limit: Int) {
    blockCount: _count(Block: {})
    Block(offset: $offset, limit: $limit, order: { number: DESC }) {
      hash
      number
      timestamp
      parentHash
      difficulty
      totalDifficulty
      gasUsed
      gasLimit
      baseFeePerGas
      nonce
      miner
      size
      stateRoot
      sha3Uncles
      transactionsRoot
      receiptsRoot
      logsBloom
      extraData
      mixHash
    }
  }
`)

interface UseBlocksOptions {
  offset: number;
  limit: number;
}

export const useBlocks = (options: Partial<UseBlocksOptions>) => {
  const { offset, limit } = options;

  return useQuery({
    queryKey: ['blocks', offset, limit],
    queryFn: async () => {
      const res = await execute(BlocksQuery, { offset, limit });
      return {
        blocks: res.Block,
        totalCount: res.blockCount,
      };
    },
  });
};
