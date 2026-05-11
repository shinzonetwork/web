# ENS Lenses

This directory contains an event-only ENS indexing pipeline for modern Ethereum mainnet ENS.

## How It Works

The pipeline is two-stage:

1. `event-normalizer` consumes `Ethereum__Mainnet__Log` rows and emits normalized `EnsNormalizedEvent` documents.
2. Projectors consume that normalized stream and materialize query-friendly ENS snapshots and timelines.

This keeps protocol decoding separate from higher-level state reconstruction.

## Important Types

### `EnsNormalizedEvent`

This is the internal contract between the normalizer and all projectors.

Core fields:

- identity: `eventId`, `eventType`, `domainId`, `registrationId`
- naming: `name`, `labelName`, `labelhash`, `parentId`
- actors/state: `owner`, `registrant`, `wrappedOwner`, `resolver`, `resolvedAddress`
- lifecycle: `ttl`, `expiryDate`, `cost`, `fuses`
- resolver data: `recordType`, `recordKey`, `coinType`, `value`
- provenance: `actor`, `txHash`, `blockNumber`, `logIndex`, `timestamp`

## Normalized Event Coverage

The normalizer currently covers:

- registry changes: transfer, subname owner, resolver, ttl
- `.eth` registration lifecycle: create, renew, transfer
- wrapper lifecycle: wrap, unwrap, fuse changes, expiry extension, wrapped transfer
- resolver updates: `addr`, multicoin `addr`, `text`, `name`, `contenthash`, `abi`, `pubkey`, `interface`, `authorisation`, `version`

## Materialized Data

The projectors reconstruct these datasets:

- domain snapshot: current ownership, resolver, resolved address, ttl, expiry, wrapping state, subdomain count
- registration snapshot: current `.eth` registrant, registration date, expiry, cost
- wrapped-domain snapshot: current wrapped owner, fuses, expiry
- resolver-record snapshot: current resolver-backed records per domain
- primary-name snapshot: best-effort address -> primary ENS name mapping
- event timeline: ordered normalized ENS history per domain

Important available fields across the materialized datasets:

- domain identity: `id`, `name`, `labelName`, `labelhash`, `parentId`
- ownership: `owner`, `registrant`, `wrappedOwner`
- resolver state: `resolver`, `resolvedAddress`, `recordType`, `recordKey`, `coinType`, `value`
- lifecycle: `ttl`, `expiryDate`, `registrationDate`, `cost`, `fuses`, `isWrapped`, `createdAt`
- provenance: `txHash`, `blockNumber`, `logIndex`, `timestamp`

## Assumptions

- event-only reconstruction, no `eth_call` enrichment
- modern ENS only: registry, registrar/controller, wrapper, public resolver, reverse records
- unknown sublabels can be reconstructed with deterministic hashed placeholders
- primary-name mapping is best-effort because reverse updates do not always give a perfect global preimage story

## What This Unblocks

- ENS profile pages from indexed data instead of live RPC joins
- name timelines: ownership, resolver, wrapper, and record changes
- address-centric views: primary name, owned names, wrapped names, names resolving to an address
- renewal / expiry monitoring for `.eth` portfolios
- resolver record explorers and sync tools
- security / ops watchlists for resolver flips, wrapping changes, and ownership transitions
