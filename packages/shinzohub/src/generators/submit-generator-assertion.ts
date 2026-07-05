import {
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
} from "@cosmjs/proto-signing";
import { Secp256k1 } from "@cosmjs/crypto";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import {
  QueryAccountRequest,
  QueryAccountResponse,
} from "cosmjs-types/cosmos/auth/v1beta1/query";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import * as _m0 from "protobufjs/minimal";
import { bytesToHex, concat, type Hex, hexToBytes, keccak256 } from "viem";
import { privateKeyToAccount, sign } from "viem/accounts";
import { hexToShinzoAddress, normalizeShinzoAddress } from "../addresses/index";
import { shinzoHubDevelop } from "../chains/index";
import type {
  SubmitGeneratorAssertionParameters,
  SubmitGeneratorAssertionResult,
} from "./types";

// protobufjs uses BufferWriter when `Buffer` exists. On Cloudflare Workers
// (nodejs_compat), Buffer.utf8Write can throw:
//   The value of "length" is out of range.
// while encoding assertion txs. Force the pure JS writer instead.
const ProtobufWriter = _m0.Writer;
ProtobufWriter.create = () => new ProtobufWriter();

const PUBKEY_TYPE = "/cosmos.evm.crypto.v1.ethsecp256k1.PubKey";
const MSG_TYPE_URL = "/shinzonetwork.indexer.v1.MsgIndexerAssertion";

type MsgIndexerAssertion = {
  signer: string;
  sourceChain: string;
  sourceChainId: number;
  validatorPubkey: Uint8Array;
  assertionAuthority: Uint8Array;
  nonce: number;
  chainSpecific: Uint8Array;
  operatorAddress: string;
  payoutAddress: string;
};

const MsgIndexerAssertion = {
  encode(
    message: MsgIndexerAssertion,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") writer.uint32(10).string(message.signer);
    if (message.sourceChain !== "") {
      writer.uint32(18).string(message.sourceChain);
    }
    if (message.sourceChainId !== 0) {
      writer.uint32(24).uint64(message.sourceChainId);
    }
    if (message.validatorPubkey.length > 0) {
      writer.uint32(34).bytes(message.validatorPubkey);
    }
    if (message.assertionAuthority.length > 0) {
      writer.uint32(42).bytes(message.assertionAuthority);
    }
    if (message.nonce !== 0) writer.uint32(48).uint64(message.nonce);
    if (message.chainSpecific.length > 0) {
      writer.uint32(58).bytes(message.chainSpecific);
    }
    if (message.operatorAddress !== "") {
      writer.uint32(66).string(message.operatorAddress);
    }
    if (message.payoutAddress !== "") {
      writer.uint32(74).string(message.payoutAddress);
    }
    return writer;
  },
  fromPartial(object: MsgIndexerAssertion): MsgIndexerAssertion {
    return {
      signer: object.signer ?? "",
      sourceChain: object.sourceChain ?? "",
      sourceChainId: object.sourceChainId ?? 0,
      validatorPubkey: object.validatorPubkey ?? new Uint8Array(0),
      assertionAuthority: object.assertionAuthority ?? new Uint8Array(0),
      nonce: object.nonce ?? 0,
      chainSpecific: object.chainSpecific ?? new Uint8Array(0),
      operatorAddress: object.operatorAddress ?? "",
      payoutAddress: object.payoutAddress ?? "",
    };
  },
};

function utf8Bytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function parseHexBytes(value: string): Uint8Array {
  const trimmed = value.trim();
  if (!trimmed) return new Uint8Array(0);
  return hexToBytes(trimmed.startsWith("0x") ? (trimmed as Hex) : (`0x${trimmed}` as Hex));
}

function normalizePrivateKey(privateKey: string): `0x${string}` {
  const hex = privateKey.trim().replace(/^0x/i, "");
  return `0x${hex}`;
}

function toBytes(value: Uint8Array | Hex): Uint8Array {
  return value instanceof Uint8Array ? value : hexToBytes(value);
}

function bytesToBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function base64ToBytes(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, "base64"));
}

async function abciQuery(
  rpc: string,
  path: string,
  data: Uint8Array,
): Promise<Uint8Array> {
  const response = await fetch(
    `${rpc.replace(/\/+$/, "")}/abci_query?path=%22${encodeURIComponent(path)}%22&data=${bytesToHex(data)}`,
  );
  if (!response.ok) {
    throw new Error(`ABCI query failed with status ${response.status}.`);
  }

  const json = (await response.json()) as {
    result?: {
      response?: {
        value?: string;
        code?: number;
        log?: string;
      };
    };
    error?: { message?: string };
  };

  if (json.error?.message) {
    throw new Error(`ABCI query error: ${json.error.message}`);
  }

  const abciResponse = json.result?.response;
  const value = abciResponse?.value;
  if (!value) {
    const details = [
      abciResponse?.code !== undefined ? `code=${abciResponse.code}` : null,
      abciResponse?.log ? `log=${abciResponse.log}` : null,
    ]
      .filter(Boolean)
      .join(", ");
    throw new Error(
      details
        ? `ABCI query returned no response value (${details}).`
        : "ABCI query returned no response value.",
    );
  }

  return base64ToBytes(value);
}

async function getAccountSequence(rpc: string, address: string) {
  const bytes = await abciQuery(
    rpc,
    "/cosmos.auth.v1beta1.Query/Account",
    QueryAccountRequest.encode({ address }).finish(),
  );
  const { account } = QueryAccountResponse.decode(bytes);
  if (!account) {
    throw new Error(`Account ${address} was not found.`);
  }
  const base = BaseAccount.decode(account.value);
  return {
    accountNumber: Number(base.accountNumber),
    sequence: Number(base.sequence),
  };
}

async function broadcast(
  rpc: string,
  txBytes: Uint8Array,
): Promise<SubmitGeneratorAssertionResult> {
  const response = await fetch(rpc.replace(/\/+$/, ""), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "broadcast_tx_sync",
      params: { tx: bytesToBase64(txBytes) },
    }),
  });
  if (!response.ok) {
    throw new Error(`Broadcast failed with status ${response.status}.`);
  }

  const json = (await response.json()) as {
    result?: { hash: string; code: number; log: string };
    error?: { message?: string };
  };
  if (json.error?.message) {
    throw new Error(`Broadcast error: ${json.error.message}`);
  }
  if (!json.result) {
    throw new Error("Broadcast returned no result.");
  }

  return {
    hash: json.result.hash,
    code: json.result.code,
    log: json.result.log,
  };
}

/**
 * Signs and broadcasts a generator assertion transaction with an admin key.
 *
 * Use this from a trusted backend only — the private key must not be exposed
 * to browsers.
 */
export async function submitGeneratorAssertion(
  parameters: SubmitGeneratorAssertionParameters,
): Promise<SubmitGeneratorAssertionResult> {
  const {
    privateKey,
    rpcEndpoint,
    validatorPublicKey,
    assertionAuthority,
    sourceChain,
    sourceChainId,
    nonce,
    chainSpecific,
    operatorAddress,
    payoutAddress,
  } = parameters;

  const normalizedPrivateKey = normalizePrivateKey(privateKey);
  const account = privateKeyToAccount(normalizedPrivateKey);
  const compressedPubkey = Secp256k1.compressPubkey(
    hexToBytes(account.publicKey),
  );
  const signerAddress = hexToShinzoAddress(account.address);
  const { accountNumber, sequence } = await getAccountSequence(
    rpcEndpoint,
    signerAddress,
  );
  const pubkey = {
    typeUrl: PUBKEY_TYPE,
    value: PubKey.encode({ key: compressedPubkey }).finish(),
  };

  const normalizedNonce =
    typeof nonce === "number" ? nonce : Number.parseInt(String(nonce).trim(), 10);
  if (!Number.isFinite(normalizedNonce) || normalizedNonce <= 0) {
    throw new Error(`Invalid nonce: ${nonce}`);
  }

  const msgValue = MsgIndexerAssertion.fromPartial({
    signer: signerAddress,
    sourceChain: sourceChain.trim(),
    sourceChainId,
    validatorPubkey: parseHexBytes(validatorPublicKey),
    assertionAuthority: utf8Bytes(assertionAuthority.trim()),
    nonce: normalizedNonce,
    chainSpecific: chainSpecific.trim()
      ? utf8Bytes(chainSpecific.trim())
      : new Uint8Array(0),
    operatorAddress: normalizeShinzoAddress(operatorAddress),
    payoutAddress: normalizeShinzoAddress(payoutAddress),
  });

  const txBodyBytes = TxBody.encode(
    TxBody.fromPartial({
      messages: [
        {
          typeUrl: MSG_TYPE_URL,
          value: MsgIndexerAssertion.encode(msgValue).finish(),
        },
      ],
    }),
  ).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence }],
    [{ denom: "ushinzo", amount: "500" }],
    200000,
    undefined,
    undefined,
  );

  const signDoc = makeSignDoc(
    txBodyBytes,
    authInfoBytes,
    String(shinzoHubDevelop.id),
    accountNumber,
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
    }),
  ).finish();

  return broadcast(rpcEndpoint, txRaw);
}
