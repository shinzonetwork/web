'use server';

import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, coin } from '@cosmjs/stargate';
import { fromHex } from '@cosmjs/encoding';
import { SHINZO_RPC } from '@/shared/envs';

const PREFIX = 'shinzo';
const DENOM  = 'ushinzo';
const AMOUNT = '1000000000000000000';
const FEE    = { amount: [coin('10000000000000000', DENOM)], gas: '200000' };

const walletFromPrivkey = async (hexKey: string) => {
  const privkey  = fromHex(hexKey.replace(/^0x/, ''));
  const wallet   = await DirectSecp256k1Wallet.fromKey(privkey, PREFIX);
  const [account] = await wallet.getAccounts();
  return { wallet, signerAddress: account.address };
};

export const sendFaucetTokens = async (privateKey: string, toAddress: string) => {
  const { wallet, signerAddress } = await walletFromPrivkey(privateKey);
  const client = await SigningStargateClient.connectWithSigner(SHINZO_RPC, wallet);

  const result = await client.sendTokens(signerAddress, toAddress, [coin(AMOUNT, DENOM)], FEE, '');
  if (result.code !== 0) {
    throw new Error(`Transaction failed with code ${result.code}`);
  }

  return result.transactionHash;
};
