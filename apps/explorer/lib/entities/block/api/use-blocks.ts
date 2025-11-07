import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlocksQuery = graphql(`
  query Blocks {
    Block {
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

export const useBlocks = () => {
  return useQuery({
    queryKey: ['blocks'],
    queryFn: async () => {
      const res = await execute(BlocksQuery, {});
      return res.data.Block;
    },
  });
};
