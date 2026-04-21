import {
  ENS_DOMAIN_ENTITY_NAME,
  ENS_EVENT_ENTITY_NAME,
  ENS_PRIMARY_NAME_ENTITY_NAME,
  ENS_REGISTRATION_ENTITY_NAME,
  ENS_RESOLVER_RECORD_ENTITY_NAME,
  ENS_WRAPPED_DOMAIN_ENTITY_NAME,
} from "@/entities/lens";
import { graphqlFetch } from "@/entities/view/api/query-view";
import { getQueryClient } from "@/shared/consts/query";
import type { EnsSearchSubject } from "./ens-utils";

const ENS_QUERY_STALE_TIME_MS = 60 * 1000;
const ENS_QUERY_LIMIT = 100;

export interface EnsDomainRow {
  id: string;
  name?: string;
  labelName?: string;
  labelhash?: string;
  parentId?: string;
  owner?: string;
  registrant?: string;
  wrappedOwner?: string;
  resolver?: string;
  ttl?: string;
  resolvedAddress?: string;
  expiryDate?: string;
  subdomainCount?: number;
  createdAt?: string;
  isWrapped?: boolean;
}

export interface EnsRegistrationRow {
  id: string;
  domainId: string;
  name?: string;
  labelName?: string;
  registrant?: string;
  registrationDate?: string;
  expiryDate?: string;
  cost?: string;
}

export interface EnsWrappedDomainRow {
  id: string;
  domainId: string;
  name?: string;
  owner?: string;
  fuses?: string;
  expiryDate?: string;
}

export interface EnsResolverRecordRow {
  id: string;
  domainId: string;
  name?: string;
  resolver?: string;
  recordType?: string;
  recordKey?: string;
  coinType?: string;
  value?: string;
  blockNumber?: number;
  txHash?: string;
}

export interface EnsPrimaryNameRow {
  address: string;
  domainId: string;
  name?: string;
  resolver?: string;
  blockNumber?: number;
  txHash?: string;
}

export interface EnsEventRow {
  id: string;
  eventType: string;
  domainId: string;
  name?: string;
  owner?: string;
  registrant?: string;
  resolver?: string;
  ttl?: string;
  expiryDate?: string;
  fuses?: string;
  recordType?: string;
  recordKey?: string;
  coinType?: string;
  value?: string;
  actor?: string;
  txHash?: string;
  blockNumber?: number;
  logIndex?: number;
  timestamp?: string;
}

export interface EnsNameSearchResult {
  kind: "name";
  input: string;
  name: string;
  node: string;
  domain: EnsDomainRow | null;
  registration: EnsRegistrationRow | null;
  wrappedDomain: EnsWrappedDomainRow | null;
  records: EnsResolverRecordRow[];
  history: EnsEventRow[];
}

export interface EnsAddressSearchResult {
  kind: "address";
  input: string;
  address: string;
  reverseNode: string;
  primaryName: EnsPrimaryNameRow | null;
  reverseNameRecord: EnsResolverRecordRow | null;
  ownedDomains: EnsDomainRow[];
  registeredDomains: EnsDomainRow[];
  wrappedDomains: EnsWrappedDomainRow[];
  resolvingDomains: EnsDomainRow[];
}

export type EnsSearchResult = EnsNameSearchResult | EnsAddressSearchResult;

const graphqlString = (value: string): string => JSON.stringify(value);

const parseGraphqlEnvelope = <T>(raw: Record<string, unknown>): T => {
  const result = raw as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  if (!result.data) {
    throw new Error("Host returned no ENS data.");
  }

  return result.data;
};

const firstOrNull = <T>(items: T[] | undefined): T | null =>
  Array.isArray(items) && items.length > 0 ? items[0] : null;

export const queryEns = async (
  subject: EnsSearchSubject
): Promise<EnsSearchResult> =>
  getQueryClient().fetchQuery({
    queryKey: ["ens-search", subject.kind, subject.kind === "name" ? subject.node : subject.address],
    staleTime: ENS_QUERY_STALE_TIME_MS,
    queryFn: async () => {
      if (subject.kind === "name") {
        const query = `{
  domain: ${ENS_DOMAIN_ENTITY_NAME}(filter: { id: { _eq: ${graphqlString(subject.node)} } }, limit: 1) {
    id
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
    isWrapped
  }
  registration: ${ENS_REGISTRATION_ENTITY_NAME}(filter: { domainId: { _eq: ${graphqlString(subject.node)} } }, limit: 1) {
    id
    domainId
    name
    labelName
    registrant
    registrationDate
    expiryDate
    cost
  }
  wrappedDomain: ${ENS_WRAPPED_DOMAIN_ENTITY_NAME}(filter: { domainId: { _eq: ${graphqlString(subject.node)} } }, limit: 1) {
    id
    domainId
    name
    owner
    fuses
    expiryDate
  }
  records: ${ENS_RESOLVER_RECORD_ENTITY_NAME}(filter: { domainId: { _eq: ${graphqlString(subject.node)} } }, limit: ${ENS_QUERY_LIMIT}) {
    id
    domainId
    name
    resolver
    recordType
    recordKey
    coinType
    value
    blockNumber
    txHash
  }
  history: ${ENS_EVENT_ENTITY_NAME}(filter: { domainId: { _eq: ${graphqlString(subject.node)} } }, order: [{ blockNumber: DESC }, { logIndex: DESC }], limit: ${ENS_QUERY_LIMIT}) {
    id
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
    timestamp
  }
}`;

        const data = parseGraphqlEnvelope<{
          domain?: EnsDomainRow[];
          registration?: EnsRegistrationRow[];
          wrappedDomain?: EnsWrappedDomainRow[];
          records?: EnsResolverRecordRow[];
          history?: EnsEventRow[];
        }>(await graphqlFetch(query));

        return {
          kind: "name",
          input: subject.input,
          name: subject.name,
          node: subject.node,
          domain: firstOrNull(data.domain),
          registration: firstOrNull(data.registration),
          wrappedDomain: firstOrNull(data.wrappedDomain),
          records: data.records ?? [],
          history: data.history ?? [],
        } satisfies EnsNameSearchResult;
      }

      const query = `{
  primaryName: ${ENS_PRIMARY_NAME_ENTITY_NAME}(filter: { address: { _eq: ${graphqlString(subject.address)} } }, limit: 1) {
    address
    domainId
    name
    resolver
    blockNumber
    txHash
  }
  reverseNameRecord: ${ENS_RESOLVER_RECORD_ENTITY_NAME}(filter: { domainId: { _eq: ${graphqlString(subject.reverseNode)} }, recordType: { _eq: "name" } }, limit: 1) {
    id
    domainId
    name
    resolver
    recordType
    recordKey
    coinType
    value
    blockNumber
    txHash
  }
  ownedDomains: ${ENS_DOMAIN_ENTITY_NAME}(filter: { owner: { _eq: ${graphqlString(subject.address)} } }, limit: ${ENS_QUERY_LIMIT}) {
    id
    name
    owner
    registrant
    wrappedOwner
    resolvedAddress
    resolver
    expiryDate
    isWrapped
  }
  registeredDomains: ${ENS_DOMAIN_ENTITY_NAME}(filter: { registrant: { _eq: ${graphqlString(subject.address)} } }, limit: ${ENS_QUERY_LIMIT}) {
    id
    name
    owner
    registrant
    wrappedOwner
    resolvedAddress
    resolver
    expiryDate
    isWrapped
  }
  wrappedDomains: ${ENS_WRAPPED_DOMAIN_ENTITY_NAME}(filter: { owner: { _eq: ${graphqlString(subject.address)} } }, limit: ${ENS_QUERY_LIMIT}) {
    id
    domainId
    name
    owner
    fuses
    expiryDate
  }
  resolvingDomains: ${ENS_DOMAIN_ENTITY_NAME}(filter: { resolvedAddress: { _eq: ${graphqlString(subject.address)} } }, limit: ${ENS_QUERY_LIMIT}) {
    id
    name
    owner
    registrant
    wrappedOwner
    resolvedAddress
    resolver
    expiryDate
    isWrapped
  }
}`;

      const data = parseGraphqlEnvelope<{
        primaryName?: EnsPrimaryNameRow[];
        reverseNameRecord?: EnsResolverRecordRow[];
        ownedDomains?: EnsDomainRow[];
        registeredDomains?: EnsDomainRow[];
        wrappedDomains?: EnsWrappedDomainRow[];
        resolvingDomains?: EnsDomainRow[];
      }>(await graphqlFetch(query));

      return {
        kind: "address",
        input: subject.input,
        address: subject.address,
        reverseNode: subject.reverseNode,
        primaryName: firstOrNull(data.primaryName),
        reverseNameRecord: firstOrNull(data.reverseNameRecord),
        ownedDomains: data.ownedDomains ?? [],
        registeredDomains: data.registeredDomains ?? [],
        wrappedDomains: data.wrappedDomains ?? [],
        resolvingDomains: data.resolvingDomains ?? [],
      } satisfies EnsAddressSearchResult;
    },
  });
