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
  Generator as ShinzoHubGenerator,
  GeneratorDetailsResult,
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
    total: number;
  };
};

export type RegisteredHostDetailsResponse =
  JsonSerialized<RegisteredHostDetailsResult>;

export type Generator = JsonSerialized<ShinzoHubGenerator>;

export type GeneratorsListResponse = JsonSerialized<
  Omit<ListGeneratorsResult, "pagination">
> & {
  pagination: {
    total: number;
  };
};

export type GeneratorDetailsResponse = JsonSerialized<GeneratorDetailsResult>;

export type HostHealthData = JsonSerialized<ShinzoHubHostHealthData>;
export type HostHealthP2P = JsonSerialized<ShinzoHubHostHealthP2P>;
export type HostHealthPeer = JsonSerialized<ShinzoHubHostHealthPeer>;
export type GeneratorHealthData = JsonSerialized<ShinzoHubGeneratorHealthData>;
export type GeneratorHealthP2P = JsonSerialized<ShinzoHubGeneratorHealthP2P>;
export type GeneratorHealthPeer = JsonSerialized<ShinzoHubGeneratorHealthPeer>;
