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

Worker runtime variables (set in the Cloudflare dashboard per Worker; kept across
deploys via `keep_vars`):

- `HOST_GRAPHQL_URL`: GraphQL endpoint for Shinzo Host. See [`shinzo-host-client`](https://github.com/shinzonetwork/shinzo-host-client) for running or connecting a Host.
- `SHINZOHUB_CHAIN`: ShinzoHub environment used by Worker RPC proxies. Supported values are `testnet`, `internal`, `devnet`, and `local`.

Local / build-time variables (`.env` or the deploy script):

- `SHINZOHUB_CHAIN`: Also baked into the Vite SPA at build time for wagmi and wallet chain config. Must match the Worker dashboard value for that environment.
- `VITE_WALLETCONNECT_ID` (optional): WalletConnect/Reown project ID for QR wallet connections.
- `VITE_APP_URL` (optional, needed with VITE_WALLETCONNECT_ID): Public app URL used in wallet metadata.
- `VITE_SHINZOHUB_EXPLORER_URL` (optional): ShinzoHub block explorer base URL. Production uses `https://explorer.shinzo.network/shinzohub`.

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

Deploy production (`shinzo-studio`):

```bash
pnpm --filter @shinzo/studio deploy
```

Deploy internal (`studio-internal`). Builds the SPA with `SHINZOHUB_CHAIN=internal` and deploys the Wrangler `internal` env:

```bash
pnpm --filter @shinzo/studio deploy:internal
```

Upload a Cloudflare preview version without promoting it:

```bash
pnpm --filter @shinzo/studio upload
pnpm --filter @shinzo/studio upload:internal
```

Useful checks:

```bash
pnpm --filter @shinzo/studio typecheck
pnpm --filter @shinzo/studio lint
```
