import type {
  HostHealthData as ShinzoHubHostHealthData,
  HostHealthP2P as ShinzoHubHostHealthP2P,
  HostHealthPeer as ShinzoHubHostHealthPeer,
  GeneratorHealthData as ShinzoHubGeneratorHealthData,
  GeneratorHealthP2P as ShinzoHubGeneratorHealthP2P,
  GeneratorHealthPeer as ShinzoHubGeneratorHealthPeer,
  ListHostsResult,
  ListGeneratorsResult,
  RegisteredHost as ShinzoHubRegisteredHost,
  RegisteredHostDetailsResult,
  RegisteredGenerator as ShinzoHubRegisteredGenerator,
  RegisteredGeneratorDetailsResult,
} from "@shinzo/shinzohub";

export type JsonSerialized<T> = T extends bigint
  ? string
  : T extends readonly (infer Item)[]
    ? JsonSerialized<Item>[]
    : T extends object
      ? { -readonly [Key in keyof T]: JsonSerialized<T[Key]> }
      : T;

export type RegisteredHost = JsonSerialized<ShinzoHubRegisteredHost>;

export type RegisteredHostsListResponse = JsonSerialized<
  Omit<ListHostsResult, "pagination">
> & {
  pagination: {
    next_key: string | null;
    total: number;
  };
};

export type RegisteredHostDetailsResponse =
  JsonSerialized<RegisteredHostDetailsResult>;

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
