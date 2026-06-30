import {
  normalizeShinzoAddress,
  shinzoAddressToHex,
} from "../addresses/index";

export const DEFAULT_ACCOUNT_BALANCE_DENOM = "ushinzo";
export const EMPTY_EVM_CODE_HASH =
  "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

interface AnyWire {
  "@type"?: string;
  key?: string;
}

interface AccountWire {
  "@type"?: string;
  address?: string;
  pub_key?: AnyWire | null;
  public_key?: AnyWire | null;
  account_number?: string | number;
  sequence?: string | number;
  base_account?: AccountWire | null;
  base_vesting_account?: {
    base_account?: AccountWire | null;
  } | null;
}

export interface GetAccountWireResponse {
  account?: AccountWire;
}

export interface GetEvmAccountWireResponse {
  balance?: string | number;
  code_hash?: string;
  nonce?: string | number;
}

export interface GetAccountBalanceWireResponse {
  balance?: {
    denom?: string;
    amount?: string | number;
  } | null;
}

export function normalizeAccountAddressPair(address: string): {
  shinzoAddress: string;
  hexAddress: string;
} {
  const shinzoAddress = normalizeShinzoAddress(address);
  return {
    shinzoAddress,
    hexAddress: shinzoAddressToHex(shinzoAddress),
  };
}

export function toAccount(
  wire: AccountWire,
  fallbackAddress: string,
) {
  const baseAccount =
    wire.base_account ??
    wire.base_vesting_account?.base_account ??
    wire;
  const pubKey = baseAccount.pub_key ?? baseAccount.public_key ?? null;

  return {
    address: normalizeShinzoAddress(baseAccount.address ?? fallbackAddress),
    typeUrl: wire["@type"] ?? "",
    accountNumber: String(baseAccount.account_number ?? 0),
    sequence: String(baseAccount.sequence ?? 0),
    publicKeyType: pubKey?.["@type"] ?? null,
    publicKey: pubKey?.key ?? null,
  };
}

export function toEvmAccount(
  wire: GetEvmAccountWireResponse,
  address: string,
) {
  const codeHash = (wire.code_hash ?? EMPTY_EVM_CODE_HASH).toLowerCase();

  return {
    address,
    balance: String(wire.balance ?? 0),
    codeHash,
    nonce: String(wire.nonce ?? 0),
    isContract: codeHash !== EMPTY_EVM_CODE_HASH,
  };
}

export function toAccountBalance(
  wire: GetAccountBalanceWireResponse,
  address: string,
  denom: string,
) {
  return {
    address,
    denom: wire.balance?.denom ?? denom,
    amount: String(wire.balance?.amount ?? 0),
  };
}
