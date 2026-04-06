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

Compiled artifacts are written to `build/<lens-name>/`.

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

## Further reading

- [API ADR](./ADR.md)
- [AssemblyScript](https://www.assemblyscript.org/)
