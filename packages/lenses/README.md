# Shinzo Lenses

`@shinzo/lenses` is the AssemblyScript SDK for authoring Shinzo LensVM modules.

A Shinzo lens is a WASM transform that runs inside a view pipeline. The view `Query` defines the input stream, the `SDL` defines the final output contract, and the lens applies business logic between those two boundaries. The SDK exists to make that transform layer practical to write in AssemblyScript without repeating raw LensVM plumbing in every module.

The best description of the API and its design decisions is the [ADR](./ADR.md).

## Running locally

From this package:

```bash
pnpm install
pnpm test
```

This builds the example lenses and runs the package test suite.

Compiled artifacts are written to `<lens-name>/lens.wasm`.

## Writing lenses

The package exposes two authoring styles:

- generic JSON-first lenses with `createLens(...)`
- EVM log lenses with `createEvmLens(...)`

Lens entrypoints export the created lens as default and re-export the shared LensVM symbols from `@shinzo/lenses/exports`.

### Generic lens

Use `createLens(...)` when the input stream is already in the shape you want to process.

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

The runtime:

- parses each input document as JSON
- calls `transform(doc, ctx)` once per document
- buffers rows returned from `row(...)` or `rows(...)`
- calls `finalize(ctx)` once after end-of-stream when provided

### EVM log lens

Use `createEvmLens(...)` when the query root is EVM logs and the lens should decode ABI events before applying its own mapping logic.

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

The EVM layer handles:

- ABI parsing
- selector matching
- optional event-name filtering
- decoded argument access through `decoded.getArg(...)`

Supported decoded ABI word types:

- `uintN` for `N` in `8..256` step `8`, emitted as decimal strings
- `intN` for `N` in `8..256` step `8`, emitted as signed decimal strings
- `address`, `bool`, and `bytesN` for `N` in `1..32`
- `string` and `bytes`, emitted as raw `0x...` slot values

Still out of scope:

- arrays, tuples, and other unsupported ABI shapes remain `"unsupported type: ..."`
- full dynamic tail decoding for `string` and `bytes` is not implemented
- the current SDK surface covers EVM logs only; transaction-input decoding is a future extension

## Existing examples

- [ERC-20 Transfers](./erc20-transfers)
- [ERC-20 Account Balances](./erc20-account-balances)

## Testing

The package also exports high-level test helpers from `@shinzo/lenses/testing`.

The intended style is behavior-first:

```ts
const result = await expectEvmLens("erc20-transfers")
  .withTokenAddress("0xdac17f958d2ee523a2206206994597c13d831ec7")
  .withLog(sampleLog)
  .run();

result.expectNoError().expectSingleRow(expectedRow);
```

This keeps normal lens tests focused on inputs and outputs rather than transport vectors or raw WASM memory.

## View validation

The package provides `validateView()` — a static validation layer that checks the consistency of a complete view definition (query + SDL + WASM lenses) without requiring a running DefraDB instance. It's available from two entry points:

- `@shinzo/lenses/testing` — Node.js, includes `loadWasmBytes()` for reading `.wasm` files from disk
- `@shinzo/lenses/validate` — browser-safe, no Node.js dependencies

### Usage in Node.js / vitest

```ts
import { validateView, loadWasmBytes } from "@shinzo/lenses/testing";
import { join } from "node:path";

const wasmBytes = loadWasmBytes(join(process.cwd(), "erc20-transfers/lens.wasm"));

const result = await validateView({
  query: "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }",
  sdl: `type ERC20Transfer @materialized(if: false) {
    tokenAddress: String
    hash: String
    from: String
    to: String
    amount: String
    blockNumber: Int
  }`,
  lenses: [{
    wasmBytes,
    args: { tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
    testInputs: [sampleLog],  // optional — enables output field checks
  }],
});

if (!result.ok) {
  console.error("Validation failed:", result.issues);
}
```

### Usage in browser

```ts
import { validateView } from "@shinzo/lenses/validate";

const wasmBytes = new Uint8Array(
  await fetch("/erc20-transfers.wasm").then((r) => r.arrayBuffer())
);

const result = await validateView({
  query: "...",
  sdl: "...",
  lenses: [{ wasmBytes }],
});
```

### Validation codes

`validateView()` returns a `ViewValidationResult` with `ok: boolean` and an `issues` array. Each issue has a `severity` ("error" or "warning"), a machine-readable `code`, and a human-readable `message`. Errors prevent deployment; warnings are informational.

#### WASM binary health (Check 1)

| Code | Severity | Description |
|---|---|---|
| `WASM_MISSING_EXPORT` | error | WASM module is missing a required export (`alloc`, `set_param`, `transform`, or `memory`). The binary was not compiled with the Shinzo LensVM SDK. |
| `WASM_INSUFFICIENT_MEMORY` | error | WASM has only 1 initial memory page (64KB). Will OOM in DefraDB's lens runtime. Set `initialMemory` to at least 4 in `asconfig.json`. |
| `WASM_LOW_MEMORY` | warning | WASM has fewer than 4 initial memory pages. May work but leaves little headroom for heap growth. |
| `WASM_INSTANTIATION_FAILED` | error | `WebAssembly.instantiate()` threw. The binary is malformed or has unsatisfied imports. |

#### SDL parsing (Check 2)

| Code | Severity | Description |
|---|---|---|
| `SDL_PARSE_FAILED` | error | Could not extract a type name and field list from the SDL string. Check that the SDL contains a valid `type Name { ... }` definition. |

#### Output field coverage (Check 3)

Requires `testInputs` on the first lens. Skipped if not provided.

| Code | Severity | Description |
|---|---|---|
| `OUTPUT_FIELD_NOT_IN_SDL` | error | The lens output contains a field not declared in the SDL. The host will reject or silently drop it. |
| `SDL_FIELD_NOT_EMITTED` | warning | The SDL declares a field that no output row produced. The field will always be null at query time. |
| `OUTPUT_TYPE_MISMATCH` | warning | An output value's JS type doesn't match the SDL type (e.g., SDL says `Int` but the value is a string). |

#### Query field coverage (Check 4)

| Code | Severity | Description |
|---|---|---|
| `QUERY_MISSING_EVM_FIELD` | error | A required EVM log field (`address`, `topics`, `data`, or `blockNumber`) is missing from the query. |
| `QUERY_MISSING_EVM_RELATION` | error | The query has no `transaction { ... }` nested object. EVM lenses need `log.transaction.hash` etc. |
| `QUERY_FLAT_FIELD_INSTEAD_OF_RELATION` | error | The query uses `transactionHash` as a flat field instead of `transaction { hash }`. The lens reads from `log.transaction.hash` and will break. |
| `QUERY_MISSING_TRANSACTION_FIELD` | warning | A transaction sub-field (`from` or `to`) is missing. The lens may work but will see empty strings for the missing fields. |

#### Lens chain validation (Check 5)

Only runs when `testInputs` are provided and there are multiple lenses.

| Code | Severity | Description |
|---|---|---|
| `CHAIN_INCOMPATIBLE` | error | Lens N+1 errored when fed the output of lens N. The lenses are not compatible in sequence. |
| `CHAIN_NO_TEST_DATA` | warning | Lens N produced zero output rows, so lens N+1 could not be validated. |

#### Memory budget estimation (Check 6)

| Code | Severity | Description |
|---|---|---|
| `WASM_MEMORY_CRITICAL` | error | The data section uses more than 80% of initial memory. The lens will likely OOM under real workloads. |
| `WASM_MEMORY_PRESSURE` | warning | The data section uses more than 50% of initial memory. The lens may OOM with large documents. |

## Further reading

- [API ADR](./ADR.md)
- [AssemblyScript](https://www.assemblyscript.org/)
