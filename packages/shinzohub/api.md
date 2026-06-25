# API reference

`@shinzo/shinzohub` provides Viem-compatible functions for ShinzoHub views,
transactions, blocks, addresses, and chain configuration.

Install it with its Viem peer dependencies:

```bash
pnpm add @shinzo/shinzohub viem abitype
```

Pass an existing Viem client as the first argument. Read methods work with a
public client; `createView` requires a wallet-capable client. The supplied
`shinzoHubLocal` and `shinzoHubDevelop` chains include EVM, Cosmos REST, and
Comet RPC endpoints. Other chains may require explicit endpoint overrides.

For smaller bundles, prefer standalone functions from focused package
subpaths:

```ts
import { listTransactions } from "@shinzo/shinzohub/transactions";
import { listBlocks } from "@shinzo/shinzohub/blocks";

const transactions = await listTransactions(publicClient, { kind: "all" });
const blocks = await listBlocks(publicClient);
```

Client extension is more convenient, but imports the combined action bundle.
Use it when your bundler's tree shaking is known to remove unused code:

```ts
import { createPublicClient, http } from "viem";
import { shinzoHubActions, shinzoHubDevelop } from "@shinzo/shinzohub";

const client = createPublicClient({
  chain: shinzoHubDevelop,
  transport: http(),
}).extend(shinzoHubActions);

const transactions = await client.listTransactions({ kind: "all" });
```

Responses contain native `bigint` values. Convert them before JSON
serialization, for example with `String(value)`.

Every query function performs exactly one REST or Comet RPC request. Compose
multiple functions in application code when you need fallback or enrichment.

## Hosts And Indexers

Import `getHost` from `@shinzo/shinzohub/hosts` and `getIndexer` from
`@shinzo/shinzohub/indexers`, or import either action from the package root.
Both actions accept a Shinzo bech32 address or a 20-byte EVM hex address and
perform one Cosmos REST request.

```ts
const host = await getHost(client, { address: "0x1234..." });
const indexer = await getIndexer(client, { address: "shinzo1..." });
```

`getHost` returns the canonical account address, DID, connection string, and
GraphQL endpoint. `getIndexer` returns the canonical account address, DID,
connection string, source chain, and source-chain ID.

## Clients

### `shinzoHubActions`

Creates a ShinzoHub action bundle for `client.extend(...)`.

- Parameters
  - `client`: existing Viem public or wallet client.
- Added methods
  - `countViews`
  - `createView`
  - `getView`
  - `listViews`
  - `listTransactions`
  - `getShinzoHubTransaction`: Cosmos-hash details via `getTransaction`.
  - `findShinzoHubTransactionByEvmHash`: EVM-hash lookup via
    `findTransactionByEvmHash`.
  - `listBlocks`
  - `getLatestShinzoHubBlock`: extended-client name for `getLatestBlock`.
  - `getLatestShinzoHubBlockHeight`: extended-client name for
    `getLatestBlockHeight`.
  - `getShinzoHubBlock`: extended-client name for `getBlock`.
  - `getShinzoHubBlockTimestamp`: extended-client name for
    `getBlockTimestamp`.
  - `getHost`
  - `getIndexer`

Example result:

```ts
const client = publicClient.extend(shinzoHubActions);
await client.listBlocks({ minHeight: 100, maxHeight: 109 });
```

### `createShinzoHubClient`

Convenience wrapper around `client.extend(shinzoHubActions)`.

- Parameters
  - `client`: existing Viem public or wallet client.

Example result:

```ts
const client = createShinzoHubClient(publicClient);
await client.countViews();
```

## Views

Import from `@shinzo/shinzohub/views` or the package root.

### `listViews`

Lists registered views with pagination, content inclusion, and metadata
filters.

- Parameters
  - `client`: Viem client whose chain contains `rpcUrls.cosmosRest`, unless
    `cosmosRestUrl` is supplied.
  - `parameters` optional
    - `limit`: page size as `number | bigint | string`.
    - `offset`: numeric pagination offset as `number | bigint | string`.
    - `pageKey`: opaque `pagination.nextKey` from the previous response.
    - `countTotal`: request the total count.
    - `reverse`: request reverse registration order.
    - `includeData`: include raw viewbundle data.
    - `sinceBlock`: minimum registration height.
    - `includeMetadata`: include parsed viewbundle metadata.
    - `name`: case-insensitive view name substring.
    - `creator`: exact creator address.
    - `metadataRootType`: exact metadata root type.
    - `metadataLensHash`: required lens hash.
    - `metadataQueryContains`: text required in the metadata query.
    - `metadataSdlContains`: text required in the metadata SDL.
    - `metadataLensArgsContains`: text required in serialized lens arguments.
    - `cosmosRestUrl`: Cosmos REST endpoint override.

Example response:

```ts
{
  views: [{
    name: "Erc20Transfers",
    creator: "shinzo1...",
    contractAddress: "0x018a06d78e0802db5bc055b4527d7b481c3e9932",
    data: null,
    height: 1715911n,
    metadata: {
      query: "Ethereum__Mainnet__Log { address topics data }",
      sdl: "type Erc20Transfer { ... }",
      rootType: "Erc20Transfer",
      lenses: [{ id: 1, args: "{}", hash: "..." }],
      parseError: "",
    },
  }],
  pagination: {
    nextKey: null,
    total: 42n, // null unless requested and returned
  },
}
```

### `getView`

- Parameters
  - `client`: Viem client with a Cosmos REST endpoint.
  - `parameters`
    - `address` required: EVM hex, bare 20-byte hex, or Shinzo bech32 view
      address.
    - `includeData`: include raw viewbundle data.
    - `includeMetadata`: include parsed viewbundle metadata.
    - `cosmosRestUrl`: Cosmos REST endpoint override.

Example response:

```ts
{
  name: "Erc20Transfers",
  creator: "shinzo1...",
  contractAddress: "0x018a06d78e0802db5bc055b4527d7b481c3e9932",
  data: null,
  height: 1715911n,
  metadata: null,
}
```

### `countViews`

- Parameters
  - `client`: Viem client with a Cosmos REST endpoint.
  - `parameters` optional
    - `cosmosRestUrl`: Cosmos REST endpoint override.

Example response:

```ts
42n
```

### `createView`

Registers raw viewbundle bytes through the ViewRegistry precompile.

- Parameters
  - `client`: wallet-capable Viem client.
  - `parameters`
    - `bundle` required: `0x` hex, `Uint8Array`, or `readonly number[]`.
    - `pricing`: optional EVM hex or Shinzo bech32 pricing-contract address.
      When supplied, registration uses `registerWithPricing`.
    - `account`: optional Viem `Account | Address`; otherwise the client's
      account is used.

Example response:

```ts
"0xd19c997a42bd50d5a0dfb85415fbac011786185f77c2150c38b24300da78a293"
```

### `getCreatedViewAddress`

Decodes the created View contract address from a confirmed ViewRegistry
transaction receipt.

- Parameters
  - `receipt`: Viem `TransactionReceipt` returned after `createView`.

Example response:

```ts
"0x018a06d78e0802db5bc055b4527d7b481c3e9932"
```

Throws when the receipt has no decodable `ViewCreated` event from the
ViewRegistry.

## Transactions

Import from `@shinzo/shinzohub/transactions` or the package root.

`cosmosHash` is the canonical chain transaction hash. EVM transactions also
have an `evmHash`. A transaction with `kind: "cosmos"` is a native,
non-EVM transaction.

### `listTransactions`

Runs one paginated Comet `tx_search` request.

- Parameters
  - `client`: Viem client whose chain contains `rpcUrls.cometRpc`, unless
    `cometRpcUrl` is supplied.
  - `parameters` optional
    - `page`: positive integer; defaults to `1`.
    - `limit`: positive integer; defaults to `20`, maximum `100`.
    - `order`: `"asc" | "desc"`; defaults to `"desc"`.
    - `kind`: `"all" | "evm"`; defaults to `"all"`. Native Cosmos
      transactions remain present in `"all"` results.
    - `blockHeight`: positive `number | bigint | string` to restrict results
      to one block.
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
{
  transactions: [{
    cosmosHash: "0xd281802a158a199c2a43719d77059ec3b28812d9718ad825533e79bba294650b",
    evmHash: "0xd19c997a42bd50d5a0dfb85415fbac011786185f77c2150c38b24300da78a293",
    kind: "evm",
    height: 1715908n,
    index: 0,
    success: true,
    code: 0,
    codespace: "",
    gasWanted: 1654365n,
    gasUsed: 1654365n,
    actions: ["/cosmos.evm.vm.v1.MsgEthereumTx"],
    senders: ["shinzo1...", "0x1aa1..."],
    recipients: ["0x0000000000000000000000000000000000000210"],
    transfers: [],
    fee: "",
    events: [{
      type: "ethereum_tx",
      attributes: [{
        key: "ethereumTxHash",
        value: "0xd19c...",
        index: true,
      }],
    }],
  }],
  total: 178n,
}
```

### `getTransaction`

Returns decoded Cosmos REST details by canonical Cosmos hash.

- Parameters
  - `client`: Viem client with a Cosmos REST endpoint.
  - `parameters`
    - `hash` required: 32-byte Cosmos transaction hash.
    - `cosmosRestUrl`: Cosmos REST endpoint override.

Example response:

```ts
{
  cosmosHash: "0xa1df678d2f7afbcbca36a66c9fdeb1ed28b30087e660c742babe48412cbc2795",
  evmHash: null,
  kind: "cosmos",
  height: 1715911n,
  index: 0,
  timestamp: "2026-06-04T21:27:39.275864228Z",
  success: true,
  code: 0,
  codespace: "",
  gasWanted: 1302259n,
  gasUsed: 1184936n,
  actions: [
    "/ibc.core.client.v1.MsgUpdateClient",
    "/ibc.core.channel.v1.MsgAcknowledgement",
  ],
  senders: ["shinzo1..."],
  recipients: ["shinzo1..."],
  transfers: [{
    sender: "shinzo1...",
    recipient: "shinzo1...",
    amount: "32557ushinzo",
  }],
  fee: "32557ushinzo",
  events: [{ type: "message", attributes: [] }],
  memo: "",
  messages: [{
    typeUrl: "/ibc.core.client.v1.MsgUpdateClient",
    value: { client_id: "07-tendermint-0" },
  }],
  feeCoins: [{ denom: "ushinzo", amount: "32557" }],
  feePayer: "",
  feeGranter: "",
  gasLimit: 1302259n,
  signatures: ["..."],
  rawLog: "",
}
```

### `findTransactionByEvmHash`

Runs one Comet `tx_search` request and returns the matching normalized
transaction summary, or `null`.

- Parameters
  - `client`: Viem client with a Comet RPC endpoint.
  - `parameters`
    - `hash` required: 32-byte EVM transaction hash.
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
{
  cosmosHash: "0xd281802a158a199c2a43719d77059ec3b28812d9718ad825533e79bba294650b",
  evmHash: "0xd19c997a42bd50d5a0dfb85415fbac011786185f77c2150c38b24300da78a293",
  kind: "evm",
  height: 1715908n,
  index: 0,
  success: true,
  code: 0,
  codespace: "",
  gasWanted: 1654365n,
  gasUsed: 1654365n,
  actions: ["/cosmos.evm.vm.v1.MsgEthereumTx"],
  senders: ["shinzo1...", "0x1aa1..."],
  recipients: ["0x0000000000000000000000000000000000000210"],
  transfers: [],
  fee: "",
  events: [],
}
```

To load full details from an EVM hash, call this method and then pass its
`cosmosHash` to `getTransaction`.

## Blocks

Import from `@shinzo/shinzohub/blocks` or the package root.

### `listBlocks`

Runs one Comet `blockchain` request for an optional inclusive height range.

- Parameters
  - `client`: Viem client whose chain contains `rpcUrls.cometRpc`, unless
    `cometRpcUrl` is supplied.
  - `parameters` optional
    - `minHeight`: positive inclusive lower height.
    - `maxHeight`: positive inclusive upper height.
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
{
  blocks: [{
    hash: "0xd51bf7b22d1e494a6cec356026840dd0b8b18728fff874e3f815b868a900d6e1",
    parentHash: "0x07463b432a44296988375e74775c12bc087c581e6f6bd4f2586c7c02957a19e7",
    height: 1715911n,
    timestamp: "2026-06-04T21:27:39.275864228Z",
    chainId: "91273002",
    proposerAddress: "A852CB745D33C37C4837546B2F4D243AE4901EB2",
    transactionCount: 1,
    size: 804n,
    lastCommitHash: "0x...",
    dataHash: "0x...",
    validatorsHash: "0x...",
    nextValidatorsHash: "0x...",
    consensusHash: "0x...",
    appHash: "0x...",
    lastResultsHash: "0x...",
    evidenceHash: "0x...",
  }],
  latestHeight: 2003690n,
}
```

### `getLatestBlock`

- Parameters
  - `client`: Viem client with a Comet RPC endpoint.
  - `parameters` optional
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
{
  hash: "0x...",
  parentHash: "0x...",
  height: 2003690n,
  timestamp: "2026-06-09T13:00:00Z",
  chainId: "91273002",
  proposerAddress: "E89750B9...",
  transactionCount: 0,
  size: null,
  lastCommitHash: "0x...",
  dataHash: null,
  validatorsHash: "0x...",
  nextValidatorsHash: "0x...",
  consensusHash: "0x...",
  appHash: "0x...",
  lastResultsHash: "0x...",
  evidenceHash: "0x...",
}
```

### `getLatestBlockHeight`

Runs one Comet `status` request.

- Parameters
  - `client`: Viem client with a Comet RPC endpoint.
  - `parameters` optional
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
2003690n
```

### `getBlockTimestamp`

Runs one Comet `header` request.

- Parameters
  - `client`: Viem client with a Comet RPC endpoint.
  - `parameters`
    - `height` required: positive `number | bigint | string`.
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
"2026-06-04T21:27:39.275864228Z"
```

### `getBlock`

Fetches one block by height or hash.

- Parameters
  - `client`: Viem client with a Comet RPC endpoint.
  - `parameters`
    - `height`: positive `number | bigint | string`.
    - `hash`: 32-byte block hash.
    - Supply exactly one of `height` or `hash`.
    - `cometRpcUrl`: Comet RPC endpoint override.

Example response:

```ts
{
  hash: "0xd51bf7b22d1e494a6cec356026840dd0b8b18728fff874e3f815b868a900d6e1",
  parentHash: "0x07463b432a44296988375e74775c12bc087c581e6f6bd4f2586c7c02957a19e7",
  height: 1715911n,
  timestamp: "2026-06-04T21:27:39.275864228Z",
  chainId: "91273002",
  proposerAddress: "A852CB745D33C37C4837546B2F4D243AE4901EB2",
  transactionCount: 1,
  size: null,
  lastCommitHash: "0x...",
  dataHash: "0x...",
  validatorsHash: "0x...",
  nextValidatorsHash: "0x...",
  consensusHash: "0x...",
  appHash: "0x...",
  lastResultsHash: "0x...",
  evidenceHash: "0x...",
}
```

`size` is available in `listBlocks` results and is `null` for direct block
lookups.

## Addresses

Import from `@shinzo/shinzohub/addresses` or the package root. All functions
validate that addresses contain exactly 20 bytes.

### `normalizeHexAddress`

- Parameters
  - `value`: `0x`-prefixed or bare EVM hex address.

Example response:

```ts
"0x018a06d78e0802db5bc055b4527d7b481c3e9932"
```

### `hexToShinzoAddress`

- Parameters
  - `value`: `0x`-prefixed or bare EVM hex address.
  - `options` optional
    - `prefix`: bech32 prefix; defaults to `"shinzo"`.

Example response:

```ts
"shinzo1..."
```

### `shinzoAddressToHex`

- Parameters
  - `value`: Shinzo bech32 address.
  - `options` optional
    - `prefix`: expected bech32 prefix; defaults to `"shinzo"`.

Example response:

```ts
"0x018a06d78e0802db5bc055b4527d7b481c3e9932"
```

### `normalizeShinzoAddress`

Accepts hex or bech32 and returns canonical bech32.

- Parameters
  - `value`: Shinzo bech32, `0x`-prefixed hex, or bare EVM hex address.
  - `options` optional
    - `prefix`: expected/output bech32 prefix; defaults to `"shinzo"`.

Example response:

```ts
"shinzo1..."
```

## Chains

Import from `@shinzo/shinzohub/chains` or the package root.

### Chain exports

- `shinzoHubLocal`: chain ID `91273002`; local EVM, Cosmos REST, and Comet RPC
  endpoints.
- `shinzoHubDevelop`: chain ID `91273002`; shared develop EVM, Cosmos REST,
  and Comet RPC endpoints.
- `shinzoHubDevnet`: chain ID `91273002`; public devnet EVM endpoint only.
- `shinzoHubTestnet`: chain ID `91273001`; endpoint placeholders are empty.
- `shinzoHubMainnet`: chain ID `91273000`; endpoint placeholders are empty.
- `shinzoHubChains`: the definitions above keyed by `local`, `develop`,
  `devnet`, `testnet`, and `mainnet`.

Example:

```ts
const publicClient = createPublicClient({
  chain: shinzoHubChains.develop,
  transport: http(),
});
```

## ViewRegistry

Import from `@shinzo/shinzohub/views` or the package root.

### `viewRegistryAddress`

ViewRegistry precompile address:

```ts
"0x0000000000000000000000000000000000000210"
```

### `viewRegistryAbi`

Viem-compatible ABI containing:

- `register(bytes)`
- `registerWithPricing(bytes,address)`
- `getView(address)`
- `ViewCreated(address,address,string)`

Use it for custom Viem contract calls, simulations, filters, or event
decoding when the high-level view functions are insufficient.
