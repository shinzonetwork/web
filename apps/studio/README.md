# Shinzo Studio

Shinzo Studio is a browser UI for creating, deploying, and querying Shinzo Views.

A View describes an indexed dataset: it combines a source query, an output SDL type, and one or more Lens WASM transforms. The View is registered on ShinzoHub, then queried through a Shinzo Host GraphQL endpoint.

Lenses are small WASM modules that transform raw source rows into the final View shape. This app uses the shared [`@shinzo/lenses`](https://github.com/shinzonetwork/web/tree/main/packages/lenses) package for example lenses, validation, and LensVM authoring utilities.

## What The UI Does

Studio is organized around a few deployment flows:

- Decode arbitrary verified Ethereum contract events from Sourcify ABIs.
- Deploy ERC-20 transfer and account-balance views.
- Re-open stored deployments and query them through the configured Host.

The frontend is a Vite React SPA. The Cloudflare Worker serves the SPA and proxies server-only upstreams so RPC URLs do not need to be exposed to the browser.

## Environment

Create `apps/studio/.env` from `.env.example`.

Server-only Worker variables:

- `HOST_GRAPHQL_URL`: GraphQL endpoint for Shinzo Host. See [`shinzo-host-client`](https://github.com/shinzonetwork/shinzo-host-client) for running or connecting a Host.
- `SHINZOHUB_EVM_RPC`: EVM JSON-RPC endpoint for ShinzoHub, used for wallet transactions and confirmations. See [`shinzohub`](https://github.com/shinzonetwork/shinzohub).
- `SHINZOHUB_COSMOS_RPC`: Cosmos REST/RPC endpoint for ShinzoHub, used for View registry reads. See [`shinzohub`](https://github.com/shinzonetwork/shinzohub).

Browser-exposed Vite variables:

- `VITE_WALLETCONNECT_ID` (optional): WalletConnect/Reown project ID for QR wallet connections.
- `VITE_APP_URL` (optional, needed with VITE_WALLETCONNECT_ID): Public app URL used in wallet metadata.
- `VITE_SHINZOHUB_EXPLORER_URL` (optional): ShinzoHub block explorer base URL. Production uses `https://explorer.shinzo.network/shinzohub`.
- `VITE_SHINZOHUB_CHAIN_ID`: ShinzoHub EVM chain ID. Local/default testnet is `91273002`.

## Running

From the repo root:

```bash
pnpm --filter @shinzo/studio dev
```

Build and preview locally:

```bash
pnpm --filter @shinzo/studio build
pnpm --filter @shinzo/studio preview
```

Deploy production:

```bash
pnpm --filter @shinzo/studio deploy
```

Upload a Cloudflare preview version without promoting it to production:

```bash
pnpm --filter @shinzo/studio upload
```

Useful checks:

```bash
pnpm --filter @shinzo/studio typecheck
pnpm --filter @shinzo/studio lint
```
