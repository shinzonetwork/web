import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlockQuery = graphql(`
  query Block($number: Int!) {
    Block(filter: { number: { _eq: $number } }, limit: 1) {
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

interface UseBlockOptions {
  number: number;
}

export const useBlock = (options: UseBlockOptions) => {
  const { number } = options;

  return useQuery({
    queryKey: ['block', number],
    enabled: !!number,
    staleTime: 1000 * 60,
    queryFn: async () => {
      const res = await execute(BlockQuery, { number });
      return res.Block?.[0] ?? null;
    },
  });
};

