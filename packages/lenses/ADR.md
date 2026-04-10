# ADR: AssemblyScript Library for Shinzo Lenses

## Status

Implemented

## Summary

Introduce `@shinzo/lenses` as the AssemblyScript SDK for authoring Shinzo LensVM modules.

The library standardizes:

- LensVM export generation
- document-oriented transforms over query results
- argument parsing and validation
- deterministic in-memory state for aggregation
- finalize-time output flushing
- higher-level EVM log helpers
- humane testing utilities

The goal is to make custom lenses practical to write without exposing LensVM transport details in every lens file.

## Context

A Shinzo lens is a WASM module executed inside LensVM as part of a view pipeline.

A Shinzo view needs:

- a `Query`, which defines the root collection and input document shape
- an `SDL`, which defines the final output shape after the lens pipeline
- an ordered list of lenses, where each lens receives the previous stage output

Iteration is driven by the view query root.

If the query root is `Ethereum__Mainnet__Log`, LensVM streams one log document at a time into the lens. If the root is a transaction or block collection, the lens receives transaction or block documents instead. Nested relations are part of the current document, not a second outer loop.

This means a lens is best modeled as a stateful stream processor over typed JSON documents.

## Problem

Writing raw LensVM modules directly is too low-level for routine lens development.

Without a shared SDK, each lens must reimplement:

- `alloc`, `set_param`, and `transform` exports
- transport decoding and encoding
- end-of-stream handling
- per-document JSON parsing
- args parsing
- output buffering
- aggregate flushing

This is repetitive, error-prone, and makes higher-level patterns such as decoded EVM logs and materialized aggregations harder to author and test.

## Decision

Adopt `@shinzo/lenses` as the default lens authoring library.

The library provides:

- `createLens(...)` for generic JSON-first lenses
- `createEvmLens(...)` for EVM log lenses
- `ctx.store` for deterministic in-memory aggregation state
- `row(...)`, `rows(...)`, and `skip()` for output control
- `finalize(...)` for aggregate flushes
- argument schemas and common argument helpers
- EVM ABI parsing and decoding helpers
- high-level testing helpers

The LensVM ABI remains unchanged. The SDK wraps it.

## Proposed API

### Note on AssemblyScript

The library is designed for AssemblyScript, not full TypeScript.

This affects the API surface:

- classes are preferred over plain object-heavy patterns
- TypeScript unions such as `Output | Output[] | void` are not available
- some ergonomic patterns rely on helper functions instead of reflection or advanced generic construction

As a result, the API uses explicit helpers such as `row(...)`, `rows(...)`, and `skip()`, plus class-based entities for store-backed aggregation.

### 1. Generic lenses

The primary entrypoint is:

```ts
const lens = createLens<Args, JSON.Obj>(
  transform,
  argsSchema,
  init,
  finalize,
);

export default lens;
export * from "../lib/exports";
```

Where:

- `transform(doc, ctx)` is called once per input document
- `argsSchema` parses `set_param` JSON
- `init(ctx)` runs once after args parsing
- `finalize(ctx)` runs once after EOS

Output semantics:

- `row(value)` emits one row
- `rows(values)` emits many rows
- `skip()` emits nothing

### 2. Lens context

Each transform receives:

```ts
ctx.args
ctx.rawArgs
ctx.store
ctx.warn(...)
ctx.fail(...)
```

`ctx.store` is used for aggregation and materialized-view preparation.

### 3. Deterministic store

The store API is:

```ts
const accounts = ctx.store.entity<string, Account>("Account");
```

Supported operations:

- `get(id)`
- `has(id)`
- `set(id, value)`
- `delete(id)`
- `getOrCreate(id, create)`
- `values()`

This is fully in-memory for one lens execution and is intended to support aggregate output emitted from `finalize(...)`.

### 4. Arguments and validation

The library provides a small explicit parsing layer:

- `schema.parseString(...)`
- `schema.parseJsonString(...)`
- `schema.parseInt(...)`
- `schema.parseAddress(...)`

For common cases, helper schemas are exported:

- `AbiArgs` - expects `abi` field in the arguments JSON, parsed automatically by library
- `TokenAddressArgs` - expects `tokenAddress` field, parsed and normalized as a hex string

### 5. EVM lenses

For log-driven EVM mapping, the library provides:

```ts
const lens = createEvmLens<Args, JSON.Obj>(
  transform,
  argsSchema,
  event,
  abiField,
  init,
  finalize,
  abiJson,
);
```

This wrapper:

- parses ABI once
- decodes logs against ABI events
- optionally filters by event name
- passes both the raw log and decoded event into user code

The user transform receives:

```ts
(log: EvmLogDocument, decoded: DecodedLog, ctx: LensContext<A>)
```

### 6. Testing

The testing package exports:

- `expectLens(...)`
- `expectEvmLens(...)`

This supports fixture-driven behavior tests without exposing transport vectors, raw memory handling, or LensVM internals as the normal test style.

## Why Query and SDL still matter

This library does not replace view `Query` and `SDL`. It assumes they already exist.

They remain required because:

- the query defines the source stream and available input fields
- the SDL defines the final output contract of the view
- the lens is only the transformation stage between those two boundaries

The library intentionally keeps query and SDL metadata out of the runtime API. Those concerns belong to higher-level project tooling and code generation.

## Example: Generic lens

```ts
import { JSON } from "assemblyscript-json/assembly";
import { createLens, json, row, skip } from "@shinzo/lenses";

const lens = createLens<JSON.Obj, JSON.Obj>((doc, _ctx) => {
  if (json.getString(doc, "kind") != "keep") return skip<JSON.Obj>();

  const out = json.object();
  out.set("value", json.getString(doc, "value"));
  return row(out);
});

export default lens;
export * from "@shinzo/lenses/exports";
```

## Example: EVM lens

```ts
import { JSON } from "assemblyscript-json/assembly";
import { createEvmLens, ERC20_ABI, TokenAddressArgs, TokenAddressArgValues } from "@shinzo/lenses/evm";
import { json, row, skip } from "@shinzo/lenses";

const lens = createEvmLens<TokenAddressArgValues, JSON.Obj>((log, decoded, ctx) => {
  if (log.address.toLowerCase() != ctx.args.tokenAddress) return skip<JSON.Obj>();

  const out = json.object();
  out.set("tokenAddress", ctx.args.tokenAddress);
  out.set("from", decoded.getArg("from"));
  out.set("to", decoded.getArg("to"));
  out.set("amount", decoded.getArg("value"));
  return row(out);
}, TokenAddressArgs, "Transfer", null, null, null, ERC20_ABI);

export default lens;
export * from "@shinzo/lenses/exports";
```

## EVM-specific scope

The EVM layer is intentionally a thin, reusable convenience layer on top of the generic lens runtime.

It simplifies:

- ABI parsing
- selector matching
- event-name filtering
- decoded argument access
- standard EVM argument validation

It also exports reusable helpers for:

- ABI definitions such as `ERC20_ABI`
- argument schemas such as `AbiArgs` and `TokenAddressArgs`
- low-level ABI utilities such as `parseAbi`, `decodeLog`, `decodeEvent`, `computeSelector`, and address normalization helpers

This allows lenses to focus on business logic such as:

- normalized decoded transfer rows
- per-account balances
- approvals, holders, positions, or protocol-specific aggregates

## Consequences

Positive:

- lens files become small and readable
- lens authors work at the document level instead of transport level
- stateful aggregations are supported
- EVM log mapping becomes much simpler
- tests can be written in behavior terms instead of runtime plumbing terms
- the API is a stable base for later code generation and higher-level handlers

Tradeoffs:

- the API reflects AssemblyScript constraints rather than full TypeScript ergonomics
- aggregate output still relies on explicit `finalize(...)`
- query and SDL integration is still external in stage 1
