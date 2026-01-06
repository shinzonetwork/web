A Next.js application with Payload, deployed to Cloudflare using Wrangler.

- **[Next.js](https://nextjs.org)** - React framework for the frontend
- **[Payload CMS](https://payloadcms.com)** - Headless CMS for content management
- **[OpenNext.js Cloudflare](https://opennext.js.org/cloudflare)** - Adapter for running Next.js on Cloudflare Workers
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Serverless hosting platform
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - CLI tool for deploying to Cloudflare

> This project is based on the [Payload Cloudflare Template](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1).

## Getting Started

First, install dependencies:

`pnpm install`

Then, run the development server:

`pnpm dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Payload CMS

Access the Payload CMS admin panel at `/admin` when running the development server.

### Type Generation

Generate TypeScript types for both Cloudflare bindings and Payload CMS:

`pnpm run generate:types`

**When to generate types:**

Types should be regenerated whenever you make changes to the wrangler configuration, or Payload CMS collections or globals to keep your TypeScript interfaces in sync with your configuration.

See the [Payload Types documentation](https://payloadcms.com/docs/typescript/generating-types) for more details.

## Migrations

Payload CMS migrations are used to manage database schema changes when you modify collections or globals. They don't need to be run manually in during development.

### Creating Migrations

Migrations need to be created when you make changes to your collections, globals, or payload config. See the [Payload Migration documentation](https://payloadcms.com/docs/database/migrations#create) for details on creating migrations.

### Running Migrations

Migrations are automatically run during deployment to Cloudflare as part of the `deploy:database` script.

Migration files are located in `/migrations/` and include `up` and `down` functions for forward and rollback operations.

## Deployment

The project is automatically deployed to Cloudflare using Wrangler.

The deployment process includes:

1. Running database migrations
2. Building the Next.js application with OpenNext.js Cloudflare adapter
3. Deploying to Cloudflare Workers

### Deploy to Production

`pnpm run deploy`

This will:

- Run migrations against the production database
- Build and deploy the application to Cloudflare

### Environment Configuration

Deployments can target different environments using the `CLOUDFLARE_ENV` environment variable. Environment configurations (such as database bindings, R2 buckets, and service names) are defined in the `env` section of `wrangler.jsonc`. For example:

`CLOUDFLARE_ENV=env_name pnpm run deploy`

When `CLOUDFLARE_ENV` is not set, the default production configuration is used.

## Known Issues

[OpenNext Known Issues](https://opennext.js.org/cloudflare/known-issues#caching-durable-objects-doqueuehandler-and-doshardedtagcache)

Caching Durable Objects WarningIf you see warnings about Durable Objects (`DOQueueHandler` and `DOShardedTagCache`) during the build process, these can be safely ignored. The warnings appear because the caching Durable Objects are not used during the build phase, but they will work correctly in production.

Example warning:

```
▲ [WARNING] You have defined bindings to the following internal Durable Objects:
{"name":"NEXT_CACHE_DO_QUEUE","class_name":"DOQueueHandler"}
These will not work in local development, but they should work in production.
```
