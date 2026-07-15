# shinzo-webapp

## Environment Variables

This application requires environment variables to be configured. Copy `.env.example` to `.env.local` and update the values as needed:

```bash
cp .env.example .env.local
```

### ShinzoHub Environment

- `SHINZOHUB_CHAIN` selects the ShinzoHub environment for wallet and server requests. Supported values are `testnet`, `internal`, `devnet`, and `local`; it defaults to `testnet`.

The selected chain's EVM, Cosmos REST, and Comet endpoints are provided by `@shinzo/shinzohub`; individual RPC URL overrides are not needed.
