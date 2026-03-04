'use server';

import { DirectSecp256k1Wallet, OfflineDirectSigner, makeAuthInfoBytes, makeSignDoc, makeSignBytes } from "@cosmjs/proto-signing";
import { StargateClient, coin, AccountParser } from "@cosmjs/stargate";
import { encodeSecp256k1Signature } from "@cosmjs/amino";
import { keccak256, Secp256k1 } from "@cosmjs/crypto";
import { toBech32, fromBase64, fromHex } from "@cosmjs/encoding";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { TxRaw, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { FAUCET_PRIVATE_KEY, SHINZO_RPC } from '@/shared/envs';

const PREFIX = 'shinzo';
const DENOM  = 'ushinzo';
const AMOUNT = '1000000000000000000';
const PUBKEY_TYPE = "/cosmos.evm.crypto.v1.ethsecp256k1.PubKey";
const FEE    = { amount: [coin('10000000000000000', DENOM)], gas: 200000 };

const ethSecp256k1AccountParser: AccountParser = (any) => {
  const baseAccount = BaseAccount.decode(any.value);
  const pubkey = baseAccount.pubKey
    ? { type: PUBKEY_TYPE, value: Buffer.from(baseAccount.pubKey.value.slice(2)).toString("base64") }
    : null;
  return {
    address: baseAccount.address,
    pubkey,
    accountNumber: Number(baseAccount.accountNumber),
    sequence: Number(baseAccount.sequence),
  };
};

function ethSignerWrapper(inner: DirectSecp256k1Wallet, ethAddress: string, privkey: Uint8Array): OfflineDirectSigner {
  return {
    async getAccounts() {
      const accounts = await inner.getAccounts();
      return accounts.map((a) => ({ ...a, address: ethAddress }));
    },
    async signDirect(_signerAddress, signDoc) {
      const hashedMessage = keccak256(makeSignBytes(signDoc));
      const signature = await Secp256k1.createSignature(hashedMessage, privkey);
      const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
      const [account] = await inner.getAccounts();
      return { signed: signDoc, signature: encodeSecp256k1Signature(account.pubkey, signatureBytes) };
    },
  };
}

async function walletFromPrivkey(hexKey: string) {
  const privkey = fromHex(hexKey.replace(/^0x/, ""));
  const keypair = await Secp256k1.makeKeypair(privkey);
  const address = toBech32(PREFIX, keccak256(keypair.pubkey.slice(1)).slice(-20));

  const innerWallet = await DirectSecp256k1Wallet.fromKey(privkey, PREFIX);
  const signer = ethSignerWrapper(innerWallet, address, privkey);

  return { signer, address };
}

export const sendFaucetTokens = async (toAddress: string) => {
  const { signer, address } = await walletFromPrivkey(FAUCET_PRIVATE_KEY);
  console.log("eth_secp256k1 address:", address);

  const client = await StargateClient.connect(SHINZO_RPC, { accountParser: ethSecp256k1AccountParser });

  const balance = await client.getBalance(address, DENOM);
  console.log("Balance:", balance.amount, DENOM);

  const account = await client.getAccount(address);
  if (!account) throw new Error("Account not found on chain");
  const chainId = await client.getChainId();

  const [signerAccount] = await signer.getAccounts();
  const pubkey = { typeUrl: PUBKEY_TYPE, value: PubKey.encode({ key: signerAccount.pubkey }).finish() };

  const txBodyBytes = TxBody.encode(TxBody.fromPartial({
    messages: [{
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: MsgSend.encode(MsgSend.fromPartial({
        fromAddress: address,
        toAddress: toAddress,
        amount: [coin(AMOUNT, DENOM)],
      })).finish(),
    }],
  })).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence: account.sequence }],
    FEE.amount,
    FEE.gas,
    undefined,
    undefined,
  );

  const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, account.accountNumber);
  const { signature, signed } = await signer.signDirect(address, signDoc);

  const txRaw = TxRaw.fromPartial({
    bodyBytes: signed.bodyBytes,
    authInfoBytes: signed.authInfoBytes,
    signatures: [fromBase64(signature.signature)],
  });
  const result = await client.broadcastTx(TxRaw.encode(txRaw).finish());

  console.log("Tx hash:", result.transactionHash);
  console.log("Code:", result.code === 0 ? "SUCCESS" : `FAILED (${result.code})`);

  return result.transactionHash;
}
