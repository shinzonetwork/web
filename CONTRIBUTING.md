# Contributing

## Before you start

Open an issue to discuss your proposed change before submitting a PR. This avoids wasted effort if the change isn't a good fit. PRs without issues attached will be closed.

## Making changes

The repo is a pnpm monorepo with two top-level directories:

- `apps/` contains the deployable web applications. Each app is independently runnable and deployed separately.
  - `webapp`: Main ShinzoHub web app (Next.js).
  - `website`: Marketing and content site (Next.js + Payload CMS).
  - `explorer`: Block explorer (Next.js, reads from DefraDB via GraphQL).
  - `faucet`: Devnet token faucet (Vite SPA + Cloudflare Worker).
  - `studio`: View creation and deployment UI (Vite SPA + Cloudflare Worker).
  - `health-proxy`: Lightweight HTTP proxy for indexer health checks (Bun, Fly.io).
  - `metrics-dashboard`: Network metrics dashboard (Next.js).
  - `brand-kit`: Brand asset showcase (Vite SPA).
- `packages/` contains shared libraries used by the apps above.
  - `ui`: Shared React component library.
  - `lenses`: AssemblyScript SDK for authoring LensVM WASM transform modules.
  - `shinzohub`: TypeScript/viem client for ShinzoHub.
  - `eslint-config`: Shared ESLint configuration.

Changes that touch a shared package under `packages/` can break multiple apps. Run `pnpm lint` and `pnpm typecheck` from the repo root after making package changes.

## Submitting a PR

- Keep PRs focused. One change per PR.
- Describe what you changed and why in the PR description.
- Make sure `pnpm lint` and `pnpm typecheck` pass before requesting review.
- Leave plenty of inline comments. Reviewers should not have to guess what you were thinking.
