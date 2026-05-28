# Build from source

## Prerequisites

- Node.js >= 24
- PNPM 10

## Steps

```shell
git clone git@github.com:shinzonetwork/web.git
cd web
pnpm install
```

Then start the app you want to work on. See the table in the [README](./README.md) for the full list of `dev:*` commands.

## Per-app configuration

Most apps require environment variables. Each app has an `.env.example` file at its root. Copy it before running:

```shell
cp apps/webapp/.env.example apps/webapp/.env.local
cp apps/studio/.env.example apps/studio/.env
```

Refer to the README inside each `apps/*` directory for the full list of required variables.

## Useful commands

| Command | What it does |
| --- | --- |
| `pnpm dev:<app>` | Start a local dev server for the named app with hot reload. |
| `pnpm lint` | Run ESLint across all workspaces. |
| `pnpm typecheck` | Run TypeScript type checking across all workspaces. |
| `pnpm --filter <app> build` | Generate a production build for a specific app. |
| `pnpm --filter <app> preview` | Serve the production build locally. |
| `pnpm --filter <app> build-and-deploy` | Build and deploy an app to Cloudflare Workers. |
