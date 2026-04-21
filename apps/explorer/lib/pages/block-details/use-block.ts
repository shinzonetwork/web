import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlockQuery = graphql(`
  query Block($number: Int!) {
    Block: Ethereum__Mainnet__Block(filter: { number: { _eq: $number } }, limit: 1) {
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
`);

const BlockByHashQuery = graphql(`
  query BlockByHash($hash: String!) {
    Block: Ethereum__Mainnet__Block(filter: { hash: { _eq: $hash } }, limit: 1) {
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
`);

export type UseBlockOptions =
  | { number: number; hash?: never }
  | { hash: string; number?: never };

export const useBlock = (options: UseBlockOptions) => {
  const number = 'number' in options ? options.number : undefined;
  const hash = 'hash' in options ? options.hash : undefined;

  return useQuery({
    queryKey: ['block', number ?? hash, number !== undefined ? 'number' : 'hash'],
    enabled: number !== undefined || !!hash,
    staleTime: 1000 * 60,
    queryFn: async () => {
      let res;
      if (number !== undefined) {
        res = await execute(BlockQuery, { number });
      } else {
        if (hash === undefined) {
          throw new Error('useBlock: hash is required when number is omitted');
        }
        res = await execute(BlockByHashQuery, { hash });
      }
      return res.Block?.[0] ?? null;
    },
  });
};

