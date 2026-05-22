# @shinzo/shinzohub

Viem-first TypeScript client actions for ShinzoHub.

This package intentionally keeps the public API small:

- query registered views
- create a view from a viewbundle
- convert Shinzo and EVM address formats
- reuse ShinzoHub Viem chain definitions

## Usage

```ts
import { createPublicClient, createWalletClient, http } from "viem";
import {
  createShinzoHubClient,
  shinzoHubActions,
  shinzoHubDevelop,
} from "@shinzo/shinzohub";

const publicClient = createPublicClient({
  chain: shinzoHubDevelop,
  transport: http(),
}).extend(shinzoHubActions);

const views = await publicClient.listViews({
  limit: 25,
  includeMetadata: true,
});

const view = await publicClient.getView({
  address: views.views[0].contractAddress,
});
```

Create a view with a wallet client:

```ts
const walletClient = createShinzoHubClient(
  createWalletClient({
    account: "0x1234567890AbcdEF1234567890aBcdef12345678",
    chain: shinzoHubDevelop,
    transport: http(),
  }),
);

const hash = await walletClient.createView({
  bundle: "0x68656c6c6f",
});
```

Use a custom pricing contract by passing `pricing`:

```ts
const hash = await walletClient.createView({
  bundle: "0x68656c6c6f",
  pricing: "0x0000000000000000000000000000000000000000",
});
```

Power users can import `viewRegistryAbi` and `viewRegistryAddress` and call Viem directly for lower-level contract reads or log decoding.

## Roadmap

Checked items are covered by the current public SDK. Unchecked items are
ShinzoHub protocol surface area that should be considered in future passes.

### Client And Chains

- [x] Decorate an existing Viem client with `createShinzoHubClient`.
- [x] Use modular Viem actions with `shinzoHubActions`.
- [x] Export the local Viem chain definition as `shinzoHubLocal`.
- [x] Export the develop Viem chain definition as `shinzoHubDevelop`.
- [x] Export the devnet Viem chain definition as `shinzoHubDevnet`.
- [x] Export the testnet Viem chain definition as `shinzoHubTestnet`.
- [x] Export the mainnet Viem chain definition as `shinzoHubMainnet`.
- [x] Export known chain mappings as `shinzoHubChains`.
- [x] Keep package subpaths limited to `@shinzo/shinzohub`, `@shinzo/shinzohub/views`, `@shinzo/shinzohub/addresses`, and `@shinzo/shinzohub/chains`.
- [x] Keep `./internal`, URL builders, calldata builders, event selectors, and payload normalizers out of public package exports.

### ViewRegistry Precompile

- [x] Cover the ViewRegistry precompile address with `viewRegistryAddress`.
- [x] Cover the ViewRegistry ABI with `viewRegistryAbi`.
- [x] Cover `register(bytes)` with `createView({ bundle })`.
- [x] Cover `registerWithPricing(bytes,address)` with `createView({ bundle, pricing })`.
- [x] Cover `ViewCreated(address,address,string)` through `viewRegistryAbi` for Viem log decoding.
- [ ] Add an ergonomic read helper for `getView(address)` if apps need direct ViewRegistry creator reads.
- [ ] Add dedicated ViewRegistry event query/decode helpers if ABI-based Viem usage is not enough.

### Cosmos REST View Queries

- [x] Cover `GET /shinzonetwork/view/v1/views` with `listViews`.
- [x] Cover pagination limit, offset, key, total-count, and reverse options in `listViews`.
- [x] Cover `include_data`, `since_block`, and `include_metadata` in `listViews`.
- [x] Cover view filters for name and creator in `listViews`.
- [x] Cover metadata filters for root type, lens hash, query text, SDL text, and lens args text in `listViews`.
- [x] Cover `GET /shinzonetwork/view/v1/views/{contract_address}` with `getView`.
- [x] Cover `include_data` and `include_metadata` in `getView`.
- [x] Cover `GET /shinzonetwork/view/v1/view_count` with `countViews`.

### Deployed View Contracts

- [ ] Cover `name()`.
- [ ] Cover `creator()`.
- [ ] Cover `report(uint256,uint256)`.
- [ ] Cover `hosts()`.
- [ ] Cover `unhost()`.
- [ ] Cover `stake()`.
- [ ] Cover `unstake(uint256)`.
- [ ] Cover `totalStake()`.
- [ ] Cover `stakeOf(address)`.
- [ ] Cover `rate()`.
- [ ] Cover `complexity()`.
- [ ] Cover `fund(bytes)`.
- [ ] Cover `fundFor(address,bytes)`.
- [ ] Cover `fundOf(bytes)`.
- [ ] Cover `fundBy(address,bytes)`.
- [ ] Cover `defund(bytes,uint256)`.
- [ ] Cover `earnings()`.
- [ ] Cover `claimEarnings()`.
- [ ] Cover `consume(bytes)`.
- [ ] Cover `price()`.
- [ ] Cover `pricingContract()`.

### Addresses

- [x] Normalize Shinzo address input with `normalizeShinzoAddress`.
- [x] Normalize EVM hex address input with `normalizeHexAddress`.
- [x] Convert EVM hex to Shinzo bech32 with `hexToShinzoAddress`.
- [x] Convert Shinzo bech32 to EVM hex with `shinzoAddressToHex`.
- [ ] Reconsider boolean address validators only if product UI code needs them.
- [ ] Reconsider public address constants only if users need to configure custom prefixes or byte lengths often.
- [ ] Reconsider public address error classes only if consumers need typed catch branches.

### HostRegistry Precompile

- [ ] Cover the HostRegistry precompile address.
- [ ] Cover the HostRegistry ABI.
- [ ] Cover `register(bytes,bytes,bytes,string)`.
- [ ] Cover `isRegistered(address)`.
- [ ] Cover `getDid(address)`.
- [ ] Cover `getConnectionString(address)`.
- [ ] Cover `Registered(address,bytes,string)`.
- [ ] Cover Cosmos REST host queries when the REST API is stable.

### IndexerRegistry Precompile

- [ ] Cover the IndexerRegistry precompile address.
- [ ] Cover the IndexerRegistry ABI.
- [ ] Cover `register(bytes,bytes,bytes,string,string,uint64)`.
- [ ] Cover `isRegistered(address)`.
- [ ] Cover `getDid(address)`.
- [ ] Cover `getConnectionString(address)`.
- [ ] Cover `getSourceChain(address)`.
- [ ] Cover `Registered(address,bytes,string,string,uint64)`.
- [ ] Cover Cosmos REST indexer queries when the REST API is stable.
- [ ] Cover indexer assertion transaction helpers when the workflow is designed.

### SourceHub And Admin Workflows

- [ ] Cover SourceHub ICA registration transactions.
- [ ] Cover Shinzo policy transactions.
- [ ] Cover Shinzo object registration transactions.
- [ ] Cover stream access transactions.
- [ ] Cover admin params queries.
