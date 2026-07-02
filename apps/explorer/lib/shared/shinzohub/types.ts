import type {
  HostHealthData as ShinzoHubHostHealthData,
  HostHealthP2P as ShinzoHubHostHealthP2P,
  HostHealthPeer as ShinzoHubHostHealthPeer,
  GeneratorHealthData as ShinzoHubGeneratorHealthData,
  GeneratorHealthP2P as ShinzoHubGeneratorHealthP2P,
  GeneratorHealthPeer as ShinzoHubGeneratorHealthPeer,
  ListBlocksResult,
  ListHostsResult,
  ListGeneratorsResult,
  ListTransactionsResult,
  ListValidatorsResult,
  RegisteredHost as ShinzoHubRegisteredHost,
  RegisteredHostDetailsResult,
  RegisteredGenerator as ShinzoHubRegisteredGenerator,
  RegisteredGeneratorDetailsResult,
  ShinzoHubBlock,
  ShinzoHubEvent,
  ShinzoHubEventAttribute,
  ShinzoHubMessage,
  ShinzoHubTransaction,
  ShinzoHubTransactionFilter,
  ShinzoHubTransactionKind,
  ShinzoHubTransactionSummary,
  ShinzoHubTransfer,
  ShinzoHubValidator,
} from '@shinzo/shinzohub';

export type JsonSerialized<T> =
  T extends bigint
    ? string
    : T extends readonly (infer Item)[]
      ? JsonSerialized<Item>[]
      : T extends object
        ? { -readonly [Key in keyof T]: JsonSerialized<T[Key]> }
        : T;

export type ShinzohubTransactionKind = ShinzoHubTransactionKind;
export type ShinzohubTransactionFilter = ShinzoHubTransactionFilter;
export type ShinzohubEventAttribute = JsonSerialized<ShinzoHubEventAttribute>;
export type ShinzohubEvent = JsonSerialized<ShinzoHubEvent>;
export type ShinzohubTransfer = JsonSerialized<ShinzoHubTransfer>;
export type ShinzohubTransactionSummary =
  JsonSerialized<ShinzoHubTransactionSummary>;
export type ShinzohubMessage = JsonSerialized<ShinzoHubMessage>;
export type ShinzohubTransaction = JsonSerialized<ShinzoHubTransaction>;

export type ShinzohubTransactionsResponse = Omit<
  JsonSerialized<ListTransactionsResult>,
  'total'
> & {
  total: number;
};

export type ShinzohubBlock = JsonSerialized<ShinzoHubBlock>;

export type ShinzohubBlocksResponse = JsonSerialized<ListBlocksResult> & {
  total: number;
};

export type ShinzohubValidator = JsonSerialized<ShinzoHubValidator>;

export type ShinzohubValidatorsResponse =
  JsonSerialized<ListValidatorsResult>;

export type RegisteredHost = JsonSerialized<ShinzoHubRegisteredHost>;

export type RegisteredHostsListResponse = JsonSerialized<Omit<ListHostsResult, "pagination">> & {
  pagination: {
    next_key: string | null;
    total: number;
  };
};

export type RegisteredHostDetailsResponse = JsonSerialized<RegisteredHostDetailsResult>;

export type RegisteredGenerator = JsonSerialized<ShinzoHubRegisteredGenerator>;

export type RegisteredGeneratorsListResponse = JsonSerialized<
  Omit<ListGeneratorsResult, "pagination">
> & {
  pagination: {
    next_key: string | null;
    total: number;
  };
};

export type RegisteredGeneratorDetailsResponse =
  JsonSerialized<RegisteredGeneratorDetailsResult>;

export type HostHealthData = JsonSerialized<ShinzoHubHostHealthData>;
export type HostHealthP2P = JsonSerialized<ShinzoHubHostHealthP2P>;
export type HostHealthPeer = JsonSerialized<ShinzoHubHostHealthPeer>;
export type GeneratorHealthData = JsonSerialized<ShinzoHubGeneratorHealthData>;
export type GeneratorHealthP2P = JsonSerialized<ShinzoHubGeneratorHealthP2P>;
export type GeneratorHealthPeer = JsonSerialized<ShinzoHubGeneratorHealthPeer>;

export interface ShinzohubAddressBalance {
  amount: string;
  denom: string;
}

export interface ShinzohubAddressAccount {
  exists: boolean;
  typeUrl: string | null;
  typeLabel: string;
  accountNumber: string | null;
  transactionsCount: string;
  publicKeyType: string | null;
  codeHash: string | null;
  isContract: boolean;
}

export interface ShinzohubAddressHost {
  address: string;
  did: string;
}

export interface ShinzohubAddressGenerator {
  address: string;
  did: string;
  sourceChain: string;
  sourceChainId: string;
}

export interface ShinzohubAddressView {
  name: string;
  contractAddress: string;
  creator: string;
  height: string;
  externalUrl: string;
}

export interface ShinzohubAddressCreatedViews {
  total: string | null;
  items: ShinzohubAddressView[];
}

export interface ShinzohubAddressRelatedEntities {
  host: ShinzohubAddressHost | null;
  generator: ShinzohubAddressGenerator | null;
  viewContract: ShinzohubAddressView | null;
  createdViews: ShinzohubAddressCreatedViews;
}

export interface ShinzohubAddressDetailsResponse {
  inputAddress: string;
  shinzoAddress: string;
  hexAddress: string;
  nativeBalance: ShinzohubAddressBalance;
  account: ShinzohubAddressAccount;
  related: ShinzohubAddressRelatedEntities;
}

export interface ShinzohubAddressViewsPagination {
  nextKey: string | null;
  total: string | null;
  page: number;
  limit: number;
  offset: number;
}

export interface ShinzohubAddressViewsResponse {
  inputAddress: string;
  shinzoAddress: string;
  hexAddress: string;
  views: ShinzohubAddressView[];
  pagination: ShinzohubAddressViewsPagination;
}
