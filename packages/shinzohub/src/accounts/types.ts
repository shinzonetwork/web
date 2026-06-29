/** Options for fetching one Cosmos auth account. */
export interface GetAccountParameters {
  /** Shinzo bech32, EVM hex, or bare EVM hex account address. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Cosmos auth account metadata returned by ShinzoHub. */
export interface ShinzoHubAccount {
  /** Canonical Shinzo bech32 account address. */
  address: string;
  /** Concrete protobuf Any type URL for the account. */
  typeUrl: string;
  /** Stable Cosmos auth account number. */
  accountNumber: string;
  /** Cosmos account sequence, used by Explorer as transactions count. */
  sequence: string;
  /** Concrete protobuf Any type URL for the public key, when present. */
  publicKeyType: string | null;
  /** Public key payload, when exposed by the REST gateway. */
  publicKey: string | null;
}

/** Options for fetching one EVM account view. */
export interface GetEvmAccountParameters {
  /** Shinzo bech32, EVM hex, or bare EVM hex account address. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** EVM account metadata returned by ShinzoHub. */
export interface ShinzoHubEvmAccount {
  /** Canonical lowercase EVM hex address. */
  address: string;
  /** Account balance in the EVM denomination base units. */
  balance: string;
  /** Hex encoded EVM code hash. */
  codeHash: string;
  /** EVM nonce represented as a decimal string. */
  nonce: string;
  /** True when the code hash is not the canonical empty-code hash. */
  isContract: boolean;
}

/** Options for fetching one account balance by denom. */
export interface GetAccountBalanceParameters {
  /** Shinzo bech32, EVM hex, or bare EVM hex account address. */
  address: string;
  /** Bank denom to query. Defaults to `ushinzo`. */
  denom?: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Single bank balance returned by ShinzoHub. */
export interface ShinzoHubAccountBalance {
  /** Canonical Shinzo bech32 account address. */
  address: string;
  /** Bank denom that was queried. */
  denom: string;
  /** Balance amount in base units. */
  amount: string;
}
