# Health Proxy

**Live URL:** https://shinzo-health-proxy.fly.dev

## Why this exists

The main webapp (`shinzo-webapp`) is deployed on Cloudflare Workers. Cloudflare Workers block all outgoing `fetch()` calls to raw IP addresses, returning error 1003 ("Direct IP Access Not Allowed"). Since indexer health checks require fetching `http://<ip>:443/health` by IP, they cannot be made from the webapp directly.

This service is a lightweight Bun HTTP server that runs outside Cloudflare's network (on Fly.io) and proxies health check requests to indexer IPs on behalf of the webapp's frontend.

### Request flow

```
Browser → shinzo-health-proxy.fly.dev/health?ip=X.X.X.X → http://X.X.X.X:443/health
       ←              { status: "healthy", ... }         ←
```

## API

### `GET /health?ip=<ip>`

- **ip** (required) — a valid IPv4 or IPv6 address of the indexer node
- Returns the indexer's health response JSON on success
- Returns `{ "status": "unhealthy" }` with status `502` on failure or timeout (5s)

### CORS

Allowed origins:
- `https://registration.shinzo.network`
- `http://localhost:3000`

## Deployment

The service is deployed to [Fly.io](https://fly.io). Configuration lives in `fly.toml`.

### Prerequisites

- [Fly CLI](https://fly.io/docs/flyctl/install/) installed and authenticated (`fly auth login`)

### First-time setup

```bash
# From the monorepo root
fly apps create shinzo-health-proxy
fly deploy --config apps/health-proxy/fly.toml
```

### Subsequent deploys

```bash
# From the monorepo root
fly deploy --config apps/health-proxy/fly.toml
```

### Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3001`  | Server listen port (set in `fly.toml`) |

## Local development

```bash
cd apps/health-proxy
bun run dev
# Listening on http://localhost:3001
```
