import { buildCollectionQuery } from "./host-query";
import { getAddress } from "viem";
import {
  buildDefinitionKey,
  prefixStudioViewName,
  replaceRootTypeName,
} from "./sdl";
import type { LensArgs, LensDefinition, ResolvedLensView } from "./types";

// V2 intentionally sidesteps the already-registered V1 ENS views, which were
// deployed with a no-arg runtime initialization bug and cannot be mutated in place.
export const ENS_CORE_INDEX_PACK_KEY = "ens-core-v2";
export const ENS_EVENT_NORMALIZER_WASM_URL = "/ens-event-normalizer.wasm";
export const ENS_DOMAIN_ENTITY_NAME = prefixStudioViewName("EnsDomainV2");
export const ENS_REGISTRATION_ENTITY_NAME =
  prefixStudioViewName("EnsRegistrationV2");
export const ENS_WRAPPED_DOMAIN_ENTITY_NAME =
  prefixStudioViewName("EnsWrappedDomainV2");
export const ENS_RESOLVER_RECORD_ENTITY_NAME =
  prefixStudioViewName("EnsResolverRecordV2");
export const ENS_PRIMARY_NAME_ENTITY_NAME =
  prefixStudioViewName("EnsPrimaryNameV2");
export const ENS_EVENT_ENTITY_NAME = prefixStudioViewName("EnsEventV2");

const ENS_LOG_FILTER_ADDRESSES = [
  "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
  "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
  "0x253553366da8546fc250f225fe3d25d0c782303b",
  "0x59e16fccd424cc24e280be16e11bcd56fb0ce547",
  "0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401",
  "0xf29100983e058b709f3d539b4c765937b804ac15",
].map((address) => getAddress(address));

const ENS_LOG_QUERY = `Ethereum__Mainnet__Log(
  filter: {
    address: {
      _in: [${ENS_LOG_FILTER_ADDRESSES.map((address) => JSON.stringify(address)).join(", ")}]
    }
  }
  order: [{ blockNumber: ASC }, { logIndex: ASC }]
) {
  address
  topics
  data
  blockNumber
  logIndex
  block {
    timestamp
  }
  transaction {
    hash
    from
    to
  }
}`;

const parseNoArgs = (_args: LensArgs): LensArgs => ({});

interface EnsFixedViewConfig {
  lensKey: string;
  title: string;
  description: string;
  entityName: string;
  projectorWasmUrl: string;
  baseSdl: string;
  fields: string;
}

const createEnsFixedView = ({
  lensKey,
  title,
  description,
  entityName,
  projectorWasmUrl,
  baseSdl,
  fields,
}: EnsFixedViewConfig): LensDefinition => ({
  lensKey,
  title,
  description,
  packKey: ENS_CORE_INDEX_PACK_KEY,
  uiSupported: false,
  resultKind: "json",
  parseStoredArgs: parseNoArgs,
  resolveView: (_args): ResolvedLensView => ({
    lensKey,
    title,
    description,
    packKey: ENS_CORE_INDEX_PACK_KEY,
    entityName,
    query: ENS_LOG_QUERY,
    sdl: replaceRootTypeName(baseSdl, entityName),
    steps: [
      {
        wasmUrl: ENS_EVENT_NORMALIZER_WASM_URL,
        args: {},
      },
      {
        wasmUrl: projectorWasmUrl,
        args: {},
      },
    ],
    uiSupported: false,
    resultKind: "json",
    args: {},
    definitionKey: buildDefinitionKey(
      ENS_LOG_QUERY,
      replaceRootTypeName(baseSdl, entityName)
    ),
    buildHostQuery: (options) =>
      buildCollectionQuery(options?.entityName ?? entityName, fields, {
        limit: options?.limit,
        offset: options?.offset,
      }),
  }),
});

export const ENS_DOMAIN_V1_LENS = createEnsFixedView({
  lensKey: "ens-domain-v1",
  title: "ENS Domains V2",
  description:
    "Global ENS domain snapshot derived from registry, registrar, wrapper, and resolver events.",
  entityName: ENS_DOMAIN_ENTITY_NAME,
  projectorWasmUrl: "/ens-domain-projector.wasm",
  baseSdl: `type EnsDomainV2 @materialized(if: false) {
  id: String
  name: String
  labelName: String
  labelhash: String
  parentId: String
  owner: String
  registrant: String
  wrappedOwner: String
  resolver: String
  ttl: String
  resolvedAddress: String
  expiryDate: String
  subdomainCount: Int
  createdAt: String
  isWrapped: Boolean
}`,
  fields: `    id
    name
    labelName
    labelhash
    parentId
    owner
    registrant
    wrappedOwner
    resolver
    ttl
    resolvedAddress
    expiryDate
    subdomainCount
    createdAt
    isWrapped`,
});

export const ENS_REGISTRATION_V1_LENS = createEnsFixedView({
  lensKey: "ens-registration-v1",
  title: "ENS Registrations V2",
  description: "Current .eth registration state derived from ENS registrar events.",
  entityName: ENS_REGISTRATION_ENTITY_NAME,
  projectorWasmUrl: "/ens-registration-projector.wasm",
  baseSdl: `type EnsRegistrationV2 @materialized(if: false) {
  id: String
  domainId: String
  name: String
  labelName: String
  registrant: String
  registrationDate: String
  expiryDate: String
  cost: String
}`,
  fields: `    id
    domainId
    name
    labelName
    registrant
    registrationDate
    expiryDate
    cost`,
});

export const ENS_WRAPPED_DOMAIN_V1_LENS = createEnsFixedView({
  lensKey: "ens-wrapped-domain-v1",
  title: "ENS Wrapped Domains V2",
  description: "Current wrapped ENS domain state derived from NameWrapper events.",
  entityName: ENS_WRAPPED_DOMAIN_ENTITY_NAME,
  projectorWasmUrl: "/ens-wrapped-domain-projector.wasm",
  baseSdl: `type EnsWrappedDomainV2 @materialized(if: false) {
  id: String
  domainId: String
  name: String
  owner: String
  fuses: String
  expiryDate: String
}`,
  fields: `    id
    domainId
    name
    owner
    fuses
    expiryDate`,
});

export const ENS_RESOLVER_RECORD_V1_LENS = createEnsFixedView({
  lensKey: "ens-resolver-record-v1",
  title: "ENS Resolver Records V2",
  description:
    "Current resolver record state derived from ENS resolver events for the active resolver.",
  entityName: ENS_RESOLVER_RECORD_ENTITY_NAME,
  projectorWasmUrl: "/ens-resolver-record-projector.wasm",
  baseSdl: `type EnsResolverRecordV2 @materialized(if: false) {
  id: String
  domainId: String
  name: String
  resolver: String
  recordType: String
  recordKey: String
  coinType: String
  value: String
  blockNumber: Int
  txHash: String
}`,
  fields: `    id
    domainId
    name
    resolver
    recordType
    recordKey
    coinType
    value
    blockNumber
    txHash`,
});

export const ENS_PRIMARY_NAME_V1_LENS = createEnsFixedView({
  lensKey: "ens-primary-name-v1",
  title: "ENS Primary Names V2",
  description:
    "Best-effort address to primary-name mapping derived from reverse-name updates.",
  entityName: ENS_PRIMARY_NAME_ENTITY_NAME,
  projectorWasmUrl: "/ens-primary-name-projector.wasm",
  baseSdl: `type EnsPrimaryNameV2 @materialized(if: false) {
  address: String
  domainId: String
  name: String
  resolver: String
  blockNumber: Int
  txHash: String
}`,
  fields: `    address
    domainId
    name
    resolver
    blockNumber
    txHash`,
});

export const ENS_EVENT_V1_LENS = createEnsFixedView({
  lensKey: "ens-event-v1",
  title: "ENS Events V2",
  description:
    "Normalized ENS protocol event timeline derived from registry, registrar, wrapper, and resolver logs.",
  entityName: ENS_EVENT_ENTITY_NAME,
  projectorWasmUrl: "/ens-event-projector.wasm",
  baseSdl: `type EnsEventV2 @materialized(if: false) {
  id: String
  eventType: String
  domainId: String
  name: String
  owner: String
  registrant: String
  resolver: String
  ttl: String
  expiryDate: String
  fuses: String
  recordType: String
  recordKey: String
  coinType: String
  value: String
  actor: String
  txHash: String
  blockNumber: Int
  logIndex: Int
  timestamp: String
}`,
  fields: `    id
    eventType
    domainId
    name
    owner
    registrant
    resolver
    ttl
    expiryDate
    fuses
    recordType
    recordKey
    coinType
    value
    actor
    txHash
    blockNumber
    logIndex
    timestamp`,
});

export const ENS_CORE_PACK_LENSES = [
  ENS_DOMAIN_V1_LENS,
  ENS_REGISTRATION_V1_LENS,
  ENS_WRAPPED_DOMAIN_V1_LENS,
  ENS_RESOLVER_RECORD_V1_LENS,
  ENS_PRIMARY_NAME_V1_LENS,
  ENS_EVENT_V1_LENS,
] as const;
