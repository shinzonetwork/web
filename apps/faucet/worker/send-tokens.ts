import { keccak256, Secp256k1 } from '@cosmjs/crypto';
import { fromHex, toBech32 } from '@cosmjs/encoding';
import { makeAuthInfoBytes, makeSignBytes, makeSignDoc } from '@cosmjs/proto-signing';
import { BaseAccount } from 'cosmjs-types/cosmos/auth/v1beta1/auth';
import {
  QueryAccountRequest,
  QueryAccountResponse,
} from 'cosmjs-types/cosmos/auth/v1beta1/query';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys';
import { TxBody, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { Buffer } from 'node:buffer';

const PREFIX = 'shinzo';
const DENOM = 'ushinzo';
const AMOUNT = '1000000000000000'; // 0.001 SHN
const PUBKEY_TYPE = '/cosmos.evm.crypto.v1.ethsecp256k1.PubKey';

interface SendFaucetTokensOptions {
  faucetPrivateKey: string;
  rpcUrl: string;
  toAddress: string;
}

interface AbciQueryResponse {
  result?: {
    response?: {
      value?: string;
    };
  };
}

interface StatusResponse {
  result?: {
    node_info?: {
      network?: string;
    };
  };
}

interface BroadcastResponse {
  result?: {
    hash?: string;
    code?: number;
    log?: string;
  };
}

async function abciQuery(
  rpcUrl: string,
  path: string,
  data: Uint8Array,
): Promise<Uint8Array> {
  const hex = Buffer.from(data).toString('hex');
  const response = await fetch(
    `${rpcUrl}/abci_query?path=%22${encodeURIComponent(path)}%22&data=0x${hex}`,
  );

  if (!response.ok) {
    throw new Error(`ABCI query failed with status ${response.status}.`);
  }

  const json = (await response.json()) as AbciQueryResponse;
  const value = json.result?.response?.value;

  if (!value) {
    throw new Error('ABCI query returned an empty account response.');
  }

  return Buffer.from(value, 'base64');
}

async function getChainId(rpcUrl: string): Promise<string> {
  const response = await fetch(`${rpcUrl}/status`);

  if (!response.ok) {
    throw new Error(`Status query failed with status ${response.status}.`);
  }

  const json = (await response.json()) as StatusResponse;
  const chainId = json.result?.node_info?.network;

  if (!chainId) {
    throw new Error('Status query returned an empty chain id.');
  }

  return chainId;
}

async function getAccount(rpcUrl: string, address: string) {
  const bytes = await abciQuery(
    rpcUrl,
    '/cosmos.auth.v1beta1.Query/Account',
    QueryAccountRequest.encode({ address }).finish(),
  );
  const { account } = QueryAccountResponse.decode(bytes);

  if (!account) {
    throw new Error(`Faucet account ${address} was not found.`);
  }

  const base = BaseAccount.decode(account.value);

  return {
    accountNumber: Number(base.accountNumber),
    sequence: Number(base.sequence),
  };
}

async function broadcast(
  rpcUrl: string,
  txBytes: Uint8Array,
): Promise<{ hash: string; code: number; log: string }> {
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'broadcast_tx_sync',
      params: { tx: Buffer.from(txBytes).toString('base64') },
    }),
  });

  if (!response.ok) {
    throw new Error(`Broadcast failed with status ${response.status}.`);
  }

  const json = (await response.json()) as BroadcastResponse;
  const hash = json.result?.hash;

  if (!hash) {
    throw new Error('Broadcast returned an empty transaction hash.');
  }

  return {
    hash,
    code: json.result?.code ?? 0,
    log: json.result?.log ?? '',
  };
}

export const sendFaucetTokens = async ({
  faucetPrivateKey,
  rpcUrl,
  toAddress,
}: SendFaucetTokensOptions) => {
  const privateKey = fromHex(faucetPrivateKey.replace(/^0x/, ''));
  const keypair = await Secp256k1.makeKeypair(privateKey);
  const compressedPubkey = Secp256k1.compressPubkey(keypair.pubkey);
  const address = toBech32(PREFIX, keccak256(keypair.pubkey.slice(1)).slice(-20));

  const chainId = await getChainId(rpcUrl);
  const { accountNumber, sequence } = await getAccount(rpcUrl, address);
  const pubkey = {
    typeUrl: PUBKEY_TYPE,
    value: PubKey.encode({ key: compressedPubkey }).finish(),
  };
  const shinzoAddress = toAddress.startsWith(PREFIX)
    ? toAddress
    : toBech32(PREFIX, fromHex(toAddress.replace(/^0x/, '')));

  const txBodyBytes = TxBody.encode(
    TxBody.fromPartial({
      messages: [
        {
          typeUrl: '/cosmos.bank.v1beta1.MsgSend',
          value: MsgSend.encode(
            MsgSend.fromPartial({
              fromAddress: address,
              toAddress: shinzoAddress,
              amount: [{ denom: DENOM, amount: AMOUNT }],
            }),
          ).finish(),
        },
      ],
    }),
  ).finish();

  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey, sequence }],
    [{ denom: DENOM, amount: '1' }],
    200000,
    undefined,
    undefined,
  );

  const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
  const signature = Secp256k1.createSignature(
    keccak256(makeSignBytes(signDoc)),
    privateKey,
  );
  const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);

  const txRaw = TxRaw.encode(
    TxRaw.fromPartial({
      bodyBytes: txBodyBytes,
      authInfoBytes,
      signatures: [signatureBytes],
    }),
  ).finish();

  const result = await broadcast(rpcUrl, txRaw);

  return { txHash: result.hash, address: shinzoAddress };
};
