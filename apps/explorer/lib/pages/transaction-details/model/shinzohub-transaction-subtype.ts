import type {
  ShinzohubEvent,
  ShinzohubEventAttribute,
} from '@/shared/shinzohub/types';
import { STUDIO_VIEW_BASE_URL } from '@/shared/utils/consts';

type AttributeMap = ReadonlyMap<string, string>;

type GeneratorEventType =
  | 'generator.generator_pending'
  | 'generator.generator_registered';
type HostEventType = 'host.host_pending' | 'host.host_registered';
type ViewEventType =
  | 'view.view_pending'
  | 'view.view_registered'
  | 'view.view_registration_failed'
  | 'view.view_registration_timed_out';

/**
 * Raw event attributes are kept in their chain-emitted snake_case shape here.
 * That makes each resolver easy to compare with actual transaction `events`
 * payloads and avoids hiding wire-level assumptions behind renamed fields.
 */
interface ViewEventAttributes {
  address: string;
  name: string;
  creator: string;
}

interface HostEventAttributes {
  address: string;
  did: string;
  msg_index: string;
}

interface GeneratorEventAttributes {
  address: string;
  did: string;
  msg_index: string;
}

interface GeneratorAssertedEventAttributes {
  signer: string;
  consensus_pub_key: string;
  delegate_address: string;
  source_chain: string;
  source_chain_id: string;
  assertion_id: string;
  msg_index: string;
}

/**
 * Semantic transaction subtype for view lifecycle transactions.
 *
 * The chain already emits the view address, name, and creator in the
 * transaction events, so the explorer can classify these synchronously from the
 * loaded transaction payload without decoding EVM logs or making view lookups.
 */
export interface ViewTransactionSubtype {
  kind: 'view';
  status: 'pending' | 'registered' | 'failed' | 'timed-out';
  label:
    | 'View pending'
    | 'View registered'
    | 'View failed'
    | 'View timed out';
  viewName?: string;
  viewAddress?: string;
  creator?: string;
  error?: string;
  externalUrl?: string;
}

/** Semantic transaction subtype for host registration lifecycle events. */
export interface HostTransactionSubtype {
  kind: 'host';
  status: 'pending' | 'registered';
  label: 'Host pending' | 'Host registered';
  address: string;
  did: string;
}

/**
 * Semantic transaction subtype for generator registration lifecycle events.
 */
export interface GeneratorRegistrationTransactionSubtype {
  kind: 'generator-registration';
  status: 'pending' | 'registered';
  label: 'Generator pending' | 'Generator registered';
  address: string;
  did: string;
}

/**
 * Semantic transaction subtype for generator assertions.
 *
 * Generator assertion events keep their source chain and signer address
 * available to the UI without coupling them to the generic sender/recipient
 * fields.
 */
export interface GeneratorAssertionTransactionSubtype {
  kind: 'generator-assertion';
  label: 'Generator assertion';
  signer: string;
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: string;
  assertionId: string;
}

export type ShinzohubTransactionSubtype =
  | ViewTransactionSubtype
  | HostTransactionSubtype
  | GeneratorRegistrationTransactionSubtype
  | GeneratorAssertionTransactionSubtype;

type TransactionSubtypeResolver = (
  event: ShinzohubEvent,
) => ShinzohubTransactionSubtype | null;

function toAttributeMap(
  attributes: readonly ShinzohubEventAttribute[],
): AttributeMap {
  return new Map(
    attributes.map((attribute) => [attribute.key, attribute.value]),
  );
}

function getRequiredAttributes<Keys extends readonly string[]>(
  attributes: AttributeMap,
  keys: Keys,
): Record<Keys[number], string> | null {
  const result = {} as Record<Keys[number], string>;

  for (const key of keys) {
    const value = attributes.get(key);
    if (!value) return null;
    result[key as Keys[number]] = value;
  }

  return result;
}

function getOptionalAttribute(
  attributes: AttributeMap,
  key: string,
): string | undefined {
  return attributes.get(key) || undefined;
}

function resolveViewSubtype(
  event: ShinzohubEvent,
): ViewTransactionSubtype | null {
  if (
    event.type !== 'view.view_pending' &&
    event.type !== 'view.view_registered' &&
    event.type !== 'view.view_registration_failed' &&
    event.type !== 'view.view_registration_timed_out'
  ) {
    return null;
  }

  const eventAttributes = toAttributeMap(event.attributes);
  const eventType = event.type as ViewEventType;
  const attributes = getRequiredAttributes(
    eventAttributes,
    ['address', 'name', 'creator'] as const,
  ) satisfies ViewEventAttributes | null;
  if (!attributes) return null;

  const status = eventType === 'view.view_pending'
    ? 'pending'
    : eventType === 'view.view_registered'
      ? 'registered'
      : eventType === 'view.view_registration_failed'
        ? 'failed'
        : 'timed-out';
  const label = status === 'pending'
    ? 'View pending'
    : status === 'registered'
      ? 'View registered'
      : status === 'failed'
        ? 'View failed'
        : 'View timed out';
  const isLinkable = status === 'pending' || status === 'registered';

  return {
    kind: 'view',
    status,
    label,
    viewName: attributes.name,
    viewAddress: attributes.address,
    creator: attributes.creator,
    error: getOptionalAttribute(eventAttributes, 'error'),
    externalUrl: isLinkable
      ? `${STUDIO_VIEW_BASE_URL}/${encodeURIComponent(attributes.address)}`
      : undefined,
  };
}

function resolveHostSubtype(
  event: ShinzohubEvent,
): HostTransactionSubtype | null {
  if (
    event.type !== 'host.host_pending' &&
    event.type !== 'host.host_registered'
  ) {
    return null;
  }

  const attributes = getRequiredAttributes(
    toAttributeMap(event.attributes),
    ['address', 'did', 'msg_index'] as const,
  ) satisfies HostEventAttributes | null;
  if (!attributes) return null;

  const eventType = event.type as HostEventType;
  const status = eventType === 'host.host_pending' ? 'pending' : 'registered';

  return {
    kind: 'host',
    status,
    label: status === 'pending' ? 'Host pending' : 'Host registered',
    address: attributes.address,
    did: attributes.did,
  };
}

function resolveGeneratorRegistrationSubtype(
  event: ShinzohubEvent,
): GeneratorRegistrationTransactionSubtype | null {
  if (
    event.type !== 'generator.generator_pending' &&
    event.type !== 'generator.generator_registered'
  ) {
    return null;
  }

  const attributes = getRequiredAttributes(
    toAttributeMap(event.attributes),
    ['address', 'did', 'msg_index'] as const,
  ) satisfies GeneratorEventAttributes | null;
  if (!attributes) return null;

  const eventType = event.type as GeneratorEventType;
  const status = eventType === 'generator.generator_pending'
    ? 'pending'
    : 'registered';

  return {
    kind: 'generator-registration',
    status,
    label: status === 'pending' ? 'Generator pending' : 'Generator registered',
    address: attributes.address,
    did: attributes.did,
  };
}

function resolveGeneratorAssertionSubtype(
  event: ShinzohubEvent,
): GeneratorAssertionTransactionSubtype | null {
  if (event.type !== 'GeneratorAsserted' && event.type !== 'IndexerAsserted') {
    return null;
  }

  const attributes = getRequiredAttributes(
    toAttributeMap(event.attributes),
    [
      'signer',
      'consensus_pub_key',
      'delegate_address',
      'source_chain',
      'source_chain_id',
      'assertion_id',
      'msg_index',
    ] as const,
  ) satisfies GeneratorAssertedEventAttributes | null;
  if (!attributes) return null;

  return {
    kind: 'generator-assertion',
    label: 'Generator assertion',
    signer: attributes.signer,
    consensusPubKey: attributes.consensus_pub_key,
    delegateAddress: attributes.delegate_address,
    sourceChain: attributes.source_chain,
    sourceChainId: attributes.source_chain_id,
    assertionId: attributes.assertion_id,
  };
}

/**
 * Add new subtype detectors here. Each resolver should return `null` when its
 * event is absent or incomplete, so the explorer never renders a partial badge
 * from malformed or future event variants.
 */
const SUBTYPE_RESOLVERS: readonly TransactionSubtypeResolver[] = [
  resolveViewSubtype,
  resolveHostSubtype,
  resolveGeneratorRegistrationSubtype,
  resolveGeneratorAssertionSubtype,
];

/**
 * Derives UI-facing transaction subtypes from the normalized ShinzoHub event
 * stream. This is intentionally event-first: the transaction details endpoint
 * already returns these events, and using them avoids extra RPC requests while
 * keeping the subtype row aligned with what the chain actually indexed.
 */
export function getShinzohubTransactionSubtypes(
  events: readonly ShinzohubEvent[] | undefined,
): ShinzohubTransactionSubtype[] {
  const subtypes: ShinzohubTransactionSubtype[] = [];

  for (const event of events ?? []) {
    for (const resolveSubtype of SUBTYPE_RESOLVERS) {
      const subtype = resolveSubtype(event);
      if (subtype) {
        subtypes.push(subtype);
        break;
      }
    }
  }

  return subtypes;
}
