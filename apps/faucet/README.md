# Shinzo Faucet

Shinzo Faucet is a browser UI for requesting devnet `$SHN` tokens.

The public faucet is available at [https://faucet.shinzo.network/](https://faucet.shinzo.network/).

The app accepts both ShinzoHub bech32 addresses with the `shinzo` prefix and EVM-style 20-byte hex addresses. Hex addresses may be pasted with or without `0x`; the Worker normalizes them to the canonical `shinzo...` address before checking eligibility or sending tokens.

## What The UI Does

Faucet provides one request flow:

- Enter a wallet address.
- Complete reCAPTCHA.
- Request `0.001 $SHN` from the configured faucet account.
- Open the resulting transaction or recipient address in the configured ShinzoHub block explorer.

The frontend is a Vite React SPA. The Cloudflare Worker serves the SPA, verifies reCAPTCHA, checks recent faucet history on ShinzoHub, signs the Cosmos bank send transaction, and broadcasts it.

## Environment

Create `apps/faucet/.env` from `.env.example`.

Server-only Worker variables:

- `RECAPTCHA_SECRET_KEY`: Secret key for server-side reCAPTCHA verification. Create one in the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create) and make sure you set your testing URL in the reCaptcha's allowlist.
- `FAUCET_PRIVATE_KEY`: Private key for the funded ShinzoHub account that sends `$SHN`. Use a testnet faucet account only; never use a production or personally controlled key here.
- `SHINZOHUB_RPC`: ShinzoHub CometBFT/Tendermint RPC endpoint, usually port `26657`. Used for account queries, chain status, and `broadcast_tx_sync`.
- `SHINZOHUB_COSMOS_RPC`: ShinzoHub Cosmos REST/gRPC-gateway endpoint, usually port `1317`. Used to query recent transaction history before sending.

Browser-exposed Vite variables:

- `VITE_RECAPTCHA_SITE_KEY`: Site key for rendering reCAPTCHA in the browser. It must belong to the same reCAPTCHA project as `RECAPTCHA_SECRET_KEY`.
- `VITE_SHINZOHUB_EXPLORER_URL`: Public ShinzoHub block explorer base URL used for transaction and address links. Production uses `https://explorer.shinzo.network/shinzohub`.

## Running

From the repo root:

```bash
pnpm --filter shinzo-faucet dev
```

Build and preview locally:

```bash
pnpm --filter shinzo-faucet build
pnpm --filter shinzo-faucet preview
```

Deploy production:

```bash
pnpm --filter shinzo-faucet deploy
```

Upload a Cloudflare preview version without promoting it to production:

```bash
pnpm --filter shinzo-faucet upload
```

Useful checks:

```bash
pnpm --filter shinzo-faucet typecheck
pnpm --filter shinzo-faucet lint
pnpm --filter shinzo-faucet format:check
```

Formatting:

```bash
pnpm --filter shinzo-faucet format
```
