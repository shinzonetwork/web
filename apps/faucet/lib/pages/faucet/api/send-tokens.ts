'use server';

import { FAUCET_PRIVATE_KEY, SHINZO_RPC } from '@/shared/envs';
import { makeAuthInfoBytes, makeSignDoc, makeSignBytes } from "@cosmjs/proto-signing";
import { keccak256, Secp256k1 } from "@cosmjs/crypto";
import { toBech32, fromHex } from "@cosmjs/encoding";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { QueryAccountRequest, QueryAccountResponse } from "cosmjs-types/cosmos/auth/v1beta1/query";
import { TxRaw, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";

const PREFIX = 'shinzo';
const DENOM  = 'ushinzo';
const AMOUNT = '1000000000000000'; // 0.001 SHN
const PUBKEY_TYPE = "/cosmos.evm.crypto.v1.ethsecp256k1.PubKey";

async function abciQuery(path: string, data: Uint8Array): Promise<Uint8Array> {
  const hex = Buffer.from(data).toString("hex");
  const res = await fetch(`${SHINZO_RPC}/abci_query?path=%22${encodeURIComponent(path)}%22&data=0x${hex}`);
  const json = await res.json() as any;
  return Buffer.from(json.result.response.value, "base64");
}

async function getChainId(): Promise<string> {
  const res = await fetch(`${SHINZO_RPC}/status`);
  const json = await res.json() as any;
  return json.result.node_info.network;
}

async function getAccount(address: string) {
  const bytes = await abciQuery("/cosmos.auth.v1beta1.Query/Account", QueryAccountRequest.encode({ address }).finish());
  const { account } = QueryAccountResponse.decode(bytes);
  const base = BaseAccount.decode(account!.value);
  return { accountNumber: Number(base.accountNumber), sequence: Number(base.sequence) };
}

async function broadcast(txBytes: Uint8Array): Promise<{ hash: string; code: number; log: string }> {
  const res = await fetch(SHINZO_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "broadcast_tx_sync", params: { tx: Buffer.from(txBytes).toString("base64") } }),
  });
  const json = await res.json() as any;
  return { hash: json.result.hash, code: json.result.code, log: json.result.log };
}

export const sendFaucetTokens = async (toAddress: string) => {
  const privkey = fromHex(FAUCET_PRIVATE_KEY.replace(/^0x/, ""));
  const keypair = await Secp256k1.makeKeypair(privkey);
  const compressedPubkey = Secp256k1.compressPubkey(keypair.pubkey);
  const address = toBech32(PREFIX, keccak256(keypair.pubkey.slice(1)).slice(-20));

  const chainId = await getChainId();
  const { accountNumber, sequence } = await getAccount(address);
  const pubkey = { typeUrl: PUBKEY_TYPE, value: PubKey.encode({ key: compressedPubkey }).finish() };
  const shinzoAddress = toAddress.startsWith(PREFIX) ? toAddress : toBech32(PREFIX, fromHex(toAddress.replace(/^0x/, "")));

  const txBodyBytes = TxBody.encode(TxBody.fromPartial({
    messages: [{
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: MsgSend.encode(MsgSend.fromPartial({
        fromAddress: address,
        toAddress: shinzoAddress,
        amount: [{ denom: DENOM, amount: AMOUNT }],
      })).finish(),
    }],
  })).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence }],
    [{ denom: DENOM, amount: "1" }],
    200000,
    undefined,
    undefined,
  );

  const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
  const sig = Secp256k1.createSignature(keccak256(makeSignBytes(signDoc)), privkey);
  const sigBytes = new Uint8Array([...sig.r(32), ...sig.s(32)]);

  const txRaw = TxRaw.encode(TxRaw.fromPartial({
    bodyBytes: txBodyBytes,
    authInfoBytes,
    signatures: [sigBytes],
  })).finish();

  const result = await broadcast(txRaw);

  return { txHash: result.hash, address: shinzoAddress };
}
