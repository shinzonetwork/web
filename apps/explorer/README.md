# Shinzo Explorer

Block explorer based on data from Shinzo Generators and Hosts.

Currently, expects a local Defra instance to be running on `http://localhost:9181`.

## ShinzoHub Environment

Set `SHINZOHUB_CHAIN` to `testnet`, `internal`, `devnet`, or `local` to select the ShinzoHub network used by explorer queries. It defaults to `testnet`; all ShinzoHub RPC endpoints and the chain ID come from `@shinzo/shinzohub`.
