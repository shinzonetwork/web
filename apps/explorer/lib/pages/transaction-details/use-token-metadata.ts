'use client';

import { useQuery } from '@tanstack/react-query';
import { type Address, getAddress } from 'viem';
import { getPublicClient } from '@/shared/viem/client';
import { useChainPathSegment } from '@/widgets/chain-path-segment/use-chain-path-segment';

const erc20MetadataAbi = [
  { type: 'function', name: 'name', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
  { type: 'function', name: 'symbol', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
  { type: 'function', name: 'decimals', inputs: [], outputs: [{ type: 'uint8' }], stateMutability: 'view' },
] as const;

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  address: Address;
}

const TRUST_WALLET_CDN = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets';

/** Builds a Trust Wallet CDN URL for a token's icon. */
export const getTokenIconUrl = (checksumAddress: string): string =>
  `${TRUST_WALLET_CDN}/${checksumAddress}/logo.png`;

/** Fetches ERC20 name, symbol, and decimals via a single multicall. */
export const useTokenMetadata = (address: string | undefined) => {
  const chain = useChainPathSegment();

  return useQuery({
    queryKey: ['token-metadata', chain, address],
    queryFn: async (): Promise<TokenMetadata | null> => {
      if (!address) return null;

      const checksumAddress = getAddress(address);
      const publicClient = getPublicClient(chain);

      const results = await publicClient.multicall({
        contracts: [
          { address: checksumAddress, abi: erc20MetadataAbi, functionName: 'name' },
          { address: checksumAddress, abi: erc20MetadataAbi, functionName: 'symbol' },
          { address: checksumAddress, abi: erc20MetadataAbi, functionName: 'decimals' },
        ],
      });

      const [nameResult, symbolResult, decimalsResult] = results;

      if (nameResult.status === 'failure' || symbolResult.status === 'failure' || decimalsResult.status === 'failure') {
        return null;
      }

      return {
        name: nameResult.result,
        symbol: symbolResult.result,
        decimals: Number(decimalsResult.result),
        address: checksumAddress,
      };
    },
    enabled: !!address,
    staleTime: Infinity,
  });
};