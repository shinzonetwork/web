import type {
  ListBlocksResult,
  ListTransactionsResult,
  ShinzoHubBlock,
  ShinzoHubEvent,
  ShinzoHubEventAttribute,
  ShinzoHubMessage,
  ShinzoHubTransaction,
  ShinzoHubTransactionFilter,
  ShinzoHubTransactionKind,
  ShinzoHubTransactionSummary,
  ShinzoHubTransfer,
} from '@shinzo/shinzohub';

type JsonSerialized<T> =
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
