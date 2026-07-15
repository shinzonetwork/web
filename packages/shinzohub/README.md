# @shinzo/shinzohub

Viem-first TypeScript client actions and canonical chain definitions for ShinzoHub.

See the complete [API reference](./api.md).

Each query function maps to exactly one ShinzoHub REST or Comet RPC request. Applications can compose primitives when they need enrichment or fallback behavior.

## Chain selection

The package exposes four environments:

| Name | Chain ID | EVM RPC base |
| --- | ---: | --- |
| `testnet` | `91273001` | `http://testnet.shinzo.network:8545` |
| `internal` | `91273002` | `http://testnet-internal.shinzo.network:8545` |
| `devnet` | `91273002` | `http://rpc.develop.devnet.shinzo.network:8545` |
| `local` | `91273002` | `http://localhost:8545` |

Use `getShinzoHubChain` with the shared `SHINZOHUB_CHAIN` environment variable. Missing values default to `testnet`; unsupported values throw a configuration error.

```ts
import { getShinzoHubChain } from "@shinzo/shinzohub";

const chain = getShinzoHubChain(process.env.SHINZOHUB_CHAIN);
```

The same definitions are available as `shinzoHubTestnet`, `shinzoHubInternal`, `shinzoHubDevnet`, `shinzoHubLocal`, and through `shinzoHubChains`.

## Usage

```ts
import { createPublicClient, createWalletClient, http } from "viem";
import {
  createShinzoHubClient,
  getShinzoHubChain,
  shinzoHubActions,
} from "@shinzo/shinzohub";

const chain = getShinzoHubChain(process.env.SHINZOHUB_CHAIN);
const publicClient = createPublicClient({
  chain,
  transport: http(),
}).extend(shinzoHubActions);

const views = await publicClient.listViews({
  limit: 25,
  includeMetadata: true,
});

const view = await publicClient.getView({
  viewAddress: views.views[0].viewAddress,
});

const transactions = await publicClient.listTransactions({
  kind: "all",
  limit: 20,
});

const blocks = await publicClient.listBlocks({
  minHeight: 100,
  maxHeight: 119,
});

const validators = await publicClient.listValidators();

const walletClient = createShinzoHubClient(
  createWalletClient({
    account: "0x1234567890AbcdEF1234567890aBcdef12345678",
    chain,
    transport: http(),
  }),
);

const hash = await walletClient.createView({
  bundle: "0x68656c6c6f",
});
```

Read the deterministic View address from a receipt and poll registration:

```ts
import { getCreatedViewAddress } from "@shinzo/shinzohub";

const receipt = await publicClient.waitForTransactionReceipt({ hash });
const viewAddress = getCreatedViewAddress(receipt);
const registration = await publicClient.getViewRegistration({ viewAddress });

if (registration.status === "registered") {
  const view = await publicClient.getView({ viewAddress });
}
```

Power users can import `viewRegistryAbi` and `viewRegistryAddress` and call Viem directly for lower-level contract reads or log decoding.
