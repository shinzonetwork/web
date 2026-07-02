import type {
  ShinzohubEvent,
  ShinzohubEventAttribute,
} from '@/shared/shinzohub/types';
import { STUDIO_VIEW_BASE_URL } from '@/shared/utils/consts';

type AttributeMap = ReadonlyMap<string, string>;

type ViewEventType = 'view.view_pending' | 'view.view_registered';

/**
 * Raw event attributes are kept in their chain-emitted snake_case shape here.
 * That makes each resolver easy to compare with actual transaction `events`
 * payloads and avoids hiding wire-level assumptions behind renamed fields.
 */
interface ViewEventAttributes {
  view_id: string;
  contract_address: string;
  creator: string;
  msg_index: string;
}

interface IndexerAssertedEventAttributes {
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
 * The chain already emits the view id, contract address, and creator in the
 * transaction events, so the explorer can classify these synchronously from the
 * loaded transaction payload without decoding EVM logs or making view lookups.
 */
export interface ViewTransactionSubtype {
  kind: 'view';
  status: 'pending' | 'registered';
  label: 'View pending' | 'View registered';
  viewId: string;
  viewName: string;
  contractAddress: string;
  creator: string;
  externalUrl: string;
}

/**
 * Semantic transaction subtype for indexer assertions.
 *
 * `IndexerAsserted` events are not EVM-specific, so this keeps their source
 * chain and signer address available to the UI without coupling them to the
 * generic sender/recipient fields.
 */
export interface IndexerAssertionTransactionSubtype {
  kind: 'indexer-assertion';
  label: 'Indexer assertion';
  signer: string;
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: string;
  assertionId: string;
}

export type ShinzohubTransactionSubtype =
  | ViewTransactionSubtype
  | IndexerAssertionTransactionSubtype;

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

/**
 * View ids include the deployed contract address as a suffix, while Studio view
 * routes are keyed by the human-readable view name. Strip only the exact
 * address suffix and fall back to the full id if the event ever changes shape.
 */
function getViewName(viewId: string, contractAddress: string): string {
  const suffix = `_${contractAddress}`;
  if (viewId.toLowerCase().endsWith(suffix.toLowerCase())) {
    return viewId.slice(0, -suffix.length);
  }

  return viewId;
}

function resolveViewSubtype(
  event: ShinzohubEvent,
): ViewTransactionSubtype | null {
  if (
    event.type !== 'view.view_pending' &&
    event.type !== 'view.view_registered'
  ) {
    return null;
  }

  const attributes = getRequiredAttributes(
    toAttributeMap(event.attributes),
    ['view_id', 'contract_address', 'creator', 'msg_index'] as const,
  ) satisfies ViewEventAttributes | null;
  if (!attributes) return null;

  const eventType = event.type as ViewEventType;
  const status = eventType === 'view.view_pending' ? 'pending' : 'registered';
  const viewName = getViewName(
    attributes.view_id,
    attributes.contract_address,
  );

  return {
    kind: 'view',
    status,
    label: status === 'pending' ? 'View pending' : 'View registered',
    viewId: attributes.view_id,
    viewName,
    contractAddress: attributes.contract_address,
    creator: attributes.creator,
    externalUrl: `${STUDIO_VIEW_BASE_URL}/${encodeURIComponent(viewName)}`,
  };
}

function resolveIndexerAssertionSubtype(
  event: ShinzohubEvent,
): IndexerAssertionTransactionSubtype | null {
  if (event.type !== 'IndexerAsserted') {
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
  ) satisfies IndexerAssertedEventAttributes | null;
  if (!attributes) return null;

  return {
    kind: 'indexer-assertion',
    label: 'Indexer assertion',
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
  resolveIndexerAssertionSubtype,
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
