import { makeAuthInfoBytes, makeSignDoc, makeSignBytes } from "@cosmjs/proto-signing";
import { keccak256, Secp256k1 } from "@cosmjs/crypto";
import { toBech32, fromHex } from "@cosmjs/encoding";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { QueryAccountRequest, QueryAccountResponse } from "cosmjs-types/cosmos/auth/v1beta1/query";
import { TxRaw, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import * as _m0 from "protobufjs/minimal";

const PREFIX = 'shinzo';
const PUBKEY_TYPE = "/cosmos.evm.crypto.v1.ethsecp256k1.PubKey";
const MSG_TYPE_URL = "/shinzonetwork.indexer.v1.MsgIndexerAssertion";

type MsgIndexerAssertion = {
  signer: string;
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: number;
  assertionId: string;
  delegateDigest: Uint8Array;
  delegateSignature: Uint8Array;
};

type AdminIndexerAssertionOptions = Omit<MsgIndexerAssertion, "signer"> & {
  privateKey: string;
  rpcEndpoint: string;
};

const MsgIndexerAssertion = {
  encode(m: MsgIndexerAssertion, w: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (m.signer !== "") w.uint32(10).string(m.signer);
    if (m.consensusPubKey !== "") w.uint32(18).string(m.consensusPubKey);
    if (m.delegateAddress !== "") w.uint32(26).string(m.delegateAddress);
    if (m.sourceChain !== "") w.uint32(34).string(m.sourceChain);
    if (m.sourceChainId !== 0) w.uint32(40).uint64(m.sourceChainId);
    if (m.assertionId !== "") w.uint32(50).string(m.assertionId);
    if (m.delegateDigest.length !== 0) w.uint32(58).bytes(m.delegateDigest);
    if (m.delegateSignature.length !== 0) w.uint32(66).bytes(m.delegateSignature);
    return w;
  },
  fromPartial(o: MsgIndexerAssertion): MsgIndexerAssertion {
    return {
      signer: o.signer ?? "",
      consensusPubKey: o.consensusPubKey ?? "",
      delegateAddress: o.delegateAddress ?? "",
      sourceChain: o.sourceChain ?? "",
      sourceChainId: o.sourceChainId ?? 0,
      assertionId: o.assertionId ?? "",
      delegateDigest: o.delegateDigest ?? new Uint8Array(0),
      delegateSignature: o.delegateSignature ?? new Uint8Array(0),
    };
  },
};

async function abciQuery(rpc: string, path: string, data: Uint8Array): Promise<Uint8Array> {
  const hex = Buffer.from(data).toString("hex");
  const res = await fetch(`${rpc}/abci_query?path=%22${encodeURIComponent(path)}%22&data=0x${hex}`);
  const json = await res.json() as any;
  return Buffer.from(json.result.response.value, "base64");
}

async function getChainId(rpc: string): Promise<string> {
  const res = await fetch(`${rpc}/status`);
  const json = await res.json() as any;
  return json.result.node_info.network;
}

async function getAccount(rpc: string, address: string) {
  const bytes = await abciQuery(rpc, "/cosmos.auth.v1beta1.Query/Account", QueryAccountRequest.encode({ address }).finish());
  const { account } = QueryAccountResponse.decode(bytes);
  const base = BaseAccount.decode(account ? account.value : new Uint8Array(0));
  return { accountNumber: Number(base.accountNumber), sequence: Number(base.sequence) };
}

async function broadcast(rpc: string, txBytes: Uint8Array): Promise<{ hash: string; code: number; log: string }> {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "broadcast_tx_sync", params: { tx: Buffer.from(txBytes).toString("base64") } }),
  });
  const json = await res.json() as any;
  return { hash: json.result.hash, code: json.result.code, log: json.result.log };
}

export async function adminIndexerAssertion(opts: AdminIndexerAssertionOptions) {
  const { privateKey, rpcEndpoint, delegateAddress, consensusPubKey, sourceChain, sourceChainId, assertionId, delegateDigest, delegateSignature} = opts;
  const privkey = fromHex(privateKey.replace(/^0x/, ""));
  const keypair = await Secp256k1.makeKeypair(privkey);
  const compressedPubkey = Secp256k1.compressPubkey(keypair.pubkey);
  const address = toBech32(PREFIX, keccak256(keypair.pubkey.slice(1)).slice(-20));

  const chainId = await getChainId(rpcEndpoint);
  const { accountNumber, sequence } = await getAccount(rpcEndpoint, address);
  const pubkey = { typeUrl: PUBKEY_TYPE, value: PubKey.encode({ key: compressedPubkey }).finish() };
  const shinzoAddress = delegateAddress.startsWith(PREFIX) ? delegateAddress : toBech32(PREFIX, fromHex(delegateAddress.replace(/^0x/, "")));

  const msgValue = MsgIndexerAssertion.fromPartial({
    signer: address,
    consensusPubKey: consensusPubKey,
    delegateAddress: shinzoAddress,
    sourceChain: sourceChain,
    sourceChainId: sourceChainId,
    assertionId: assertionId,
    delegateDigest: delegateDigest,
    delegateSignature: delegateSignature,
  });

  const txBodyBytes = TxBody.encode(TxBody.fromPartial({
    messages: [{ typeUrl: MSG_TYPE_URL, value: MsgIndexerAssertion.encode(msgValue).finish() }],
  })).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence }],
    [{ denom: "ushinzo", amount: "500" }],
    200000,
    undefined,
    undefined,
  );

  const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
  const sig = await Secp256k1.createSignature(keccak256(makeSignBytes(signDoc)), privkey);
  const sigBytes = new Uint8Array([...sig.r(32), ...sig.s(32)]);

  const txRaw = TxRaw.encode(TxRaw.fromPartial({
    bodyBytes: txBodyBytes,
    authInfoBytes,
    signatures: [sigBytes],
  })).finish();

  return await broadcast(rpcEndpoint, txRaw);
}
