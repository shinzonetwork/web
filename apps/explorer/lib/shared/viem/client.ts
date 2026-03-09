import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { RPC_URL } from '@/shared/utils/consts';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC_URL),
});
