<!--
  This README covers local setup, Docker, and deployment only.
  Do not add: architecture explanations, API reference, configuration 
  deep-dives, or troubleshooting guides. Those belong in the Shinzo 
  documentation site. If you're tempted to add a section, link to the docs 
  instead.
-->

# Shinzo Web

[![Build status](https://img.shields.io/github/actions/workflow/status/shinzonetwork/web/.github/workflows/ci.yml)](https://github.com/shinzonetwork/web/actions)

Frontend monorepo for the Shinzo Network, containing all web apps and shared packages.

## Getting started

```shell
git clone git@github.com:shinzonetwork/web.git
cd web
pnpm install
```

Then start whichever app you need:

| Command | App |
| --- | --- |
| `pnpm dev:webapp` | Main ShinzoHub web app. |
| `pnpm dev:website` | Marketing and content website. |
| `pnpm dev:explorer` | Block explorer. |
| `pnpm dev:faucet` | Devnet token faucet. |
| `pnpm dev:studio` | View creation and deployment UI. |
| `pnpm dev:health-proxy` | Health check proxy service. |
| `pnpm dev:brand-kit` | Brand asset showcase. |

> [!TIP]
> See [BUILD.md](./BUILD.md) for full build-from-source and per-app configuration instructions.

## Deployment

See the [Shinzo documentation site](https://docs.shinzo.network) for production deployment instructions.

## Contributing

Open an issue before submitting a PR. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
