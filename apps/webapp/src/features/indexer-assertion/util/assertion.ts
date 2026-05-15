import {
  makeAuthInfoBytes,
  makeSignDoc,
  makeSignBytes,
} from "@cosmjs/proto-signing";
import { Secp256k1 } from "@cosmjs/crypto";
import { toBech32 } from "@cosmjs/encoding";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import {
  QueryAccountRequest,
  QueryAccountResponse,
} from "cosmjs-types/cosmos/auth/v1beta1/query";
import { TxRaw, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import * as _m0 from "protobufjs/minimal";
import { bytesToHex, concat, Hex, hexToBytes, keccak256 } from "viem";
import { privateKeyToAccount, sign } from "viem/accounts";
import { SHINZO_CHAIN_ID } from "@/shared/lib";

const PREFIX = "shinzo";
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
  encode(
    m: MsgIndexerAssertion,
    w: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (m.signer !== "") w.uint32(10).string(m.signer);
    if (m.consensusPubKey !== "") w.uint32(18).string(m.consensusPubKey);
    if (m.delegateAddress !== "") w.uint32(26).string(m.delegateAddress);
    if (m.sourceChain !== "") w.uint32(34).string(m.sourceChain);
    if (m.sourceChainId !== 0) w.uint32(40).uint64(m.sourceChainId);
    if (m.assertionId !== "") w.uint32(50).string(m.assertionId);
    if (m.delegateDigest.length !== 0) w.uint32(58).bytes(m.delegateDigest);
    if (m.delegateSignature.length !== 0) {
      w.uint32(66).bytes(m.delegateSignature);
    }
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

function normalizePrivateKey(privateKey: string): `0x${string}` {
  const hex = privateKey.trim().replace(/^0x/i, "");
  return `0x${hex}`;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function abciQuery(
  rpc: string,
  path: string,
  data: Uint8Array
): Promise<Uint8Array> {
  const res = await fetch(
    `${rpc}/abci_query?path=%22${encodeURIComponent(path)}%22&data=${bytesToHex(data)}`
  );
  const json = (await res.json()) as {
    result?: { response?: { value?: string } };
  };
  const value = json.result?.response?.value;
  if (!value) {
    throw new Error("ABCI query returned no response value.");
  }
  return base64ToBytes(value);
}

async function getAccount(rpc: string, address: string) {
  const bytes = await abciQuery(
    rpc,
    "/cosmos.auth.v1beta1.Query/Account",
    QueryAccountRequest.encode({ address }).finish()
  );
  const { account } = QueryAccountResponse.decode(bytes);
  const base = BaseAccount.decode(account ? account.value : new Uint8Array(0));
  return {
    accountNumber: Number(base.accountNumber),
    sequence: Number(base.sequence),
  };
}

async function broadcast(
  rpc: string,
  txBytes: Uint8Array
): Promise<{ hash: string; code: number; log: string }> {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "broadcast_tx_sync",
      params: { tx: bytesToBase64(txBytes) },
    }),
  });
  const json = (await res.json()) as {
    result: { hash: string; code: number; log: string };
  };
  return {
    hash: json.result.hash,
    code: json.result.code,
    log: json.result.log,
  };
}

export async function adminIndexerAssertion(
  opts: AdminIndexerAssertionOptions
) {
  const {
    privateKey,
    rpcEndpoint,
    delegateAddress,
    consensusPubKey,
    sourceChain,
    sourceChainId,
    assertionId,
    delegateDigest,
    delegateSignature,
  } = opts;
  const normalizedPrivateKey = normalizePrivateKey(privateKey);
  const account = privateKeyToAccount(normalizedPrivateKey);
  const compressedPubkey = Secp256k1.compressPubkey(
    hexToBytes(account.publicKey)
  );
  const address = toBech32(PREFIX, hexToBytes(account.address));

  const { accountNumber, sequence } = await getAccount(rpcEndpoint, address);
  const pubkey = {
    typeUrl: PUBKEY_TYPE,
    value: PubKey.encode({ key: compressedPubkey }).finish(),
  };
  const shinzoAddress = delegateAddress.startsWith(PREFIX)
    ? delegateAddress
    : toBech32(PREFIX, hexToBytes(delegateAddress as Hex));

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

  const txBodyBytes = TxBody.encode(
    TxBody.fromPartial({
      messages: [
        {
          typeUrl: MSG_TYPE_URL,
          value: MsgIndexerAssertion.encode(msgValue).finish(),
        },
      ],
    })
  ).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence }],
    [{ denom: "ushinzo", amount: "500" }],
    200000,
    undefined,
    undefined
  );

  const signDoc = makeSignDoc(
    txBodyBytes,
    authInfoBytes,
    SHINZO_CHAIN_ID.toString(),
    accountNumber
  );
  const { r, s } = await sign({
    hash: keccak256(makeSignBytes(signDoc)),
    privateKey: normalizedPrivateKey,
  });
  const sigBytes = hexToBytes(concat([r, s]));

  const txRaw = TxRaw.encode(
    TxRaw.fromPartial({
      bodyBytes: txBodyBytes,
      authInfoBytes,
      signatures: [sigBytes],
    })
  ).finish();

  return await broadcast(rpcEndpoint, txRaw);
}
