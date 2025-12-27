# shinzo-webapp

## Environment Variables

This application requires environment variables to be configured. Copy `.env.example` to `.env.local` and update the values as needed:

```bash
cp .env.example .env.local
```

### Required Environment Variables

- `NEXT_PUBLIC_RPC_URL` - RPC URL for the Shinzohub network. This should point to a Shinzohub RPC endpoint. Required in production, defaults to `http://localhost:8545` in development.

### Development

In development mode, the application will default to `http://localhost:8545` if `NEXT_PUBLIC_RPC_URL` is not set.

### Production

In production, `NEXT_PUBLIC_RPC_URL` **must** be configured. The application will throw an error at startup if it's not set.

