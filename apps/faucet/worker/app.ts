import { Hono } from 'hono';
import { sendFaucetTokens } from './send-tokens';
import type { Env, FaucetDropResult } from './types';
import { verifyCaptcha } from './verify-captcha';

const DEFAULT_RPC_URL = 'http://rpc.devnet.shinzo.network:26657';

interface RequestBody {
  address?: unknown;
  captchaToken?: unknown;
}

const getString = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const getRequiredBinding = (
  env: Env,
  key: 'FAUCET_PRIVATE_KEY' | 'RECAPTCHA_SECRET_KEY',
): { value: string } | { response: Response } => {
  const value = env[key]?.trim();

  if (!value) {
    return {
      response: Response.json({ error: `${key} is not configured.` }, { status: 500 }),
    };
  }

  return { value };
};

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const createFaucetWorkerApp = (): Hono<{ Bindings: Env }> => {
  const app = new Hono<{ Bindings: Env }>();

  app.post('/api/faucet/request-airdrop', async (c) => {
    let body: RequestBody;

    try {
      body = (await c.req.json()) as RequestBody;
    } catch {
      return c.json({ error: 'Invalid request body.' } satisfies FaucetDropResult, 400);
    }

    const address = getString(body.address).trim();
    const captchaToken = getString(body.captchaToken);

    if (!address) {
      return c.json({ error: 'Address is required' } satisfies FaucetDropResult, 400);
    }

    const captchaSecret = getRequiredBinding(c.env, 'RECAPTCHA_SECRET_KEY');
    if ('response' in captchaSecret) return captchaSecret.response;

    const faucetPrivateKey = getRequiredBinding(c.env, 'FAUCET_PRIVATE_KEY');
    if ('response' in faucetPrivateKey) return faucetPrivateKey.response;

    let captchaOk: boolean;

    try {
      captchaOk = await verifyCaptcha(captchaSecret.value, captchaToken);
    } catch (error) {
      return c.json(
        {
          error: `Failed to verify captcha: ${getErrorMessage(
            error,
            'Unknown captcha verification error',
          )}`,
        } satisfies FaucetDropResult,
        502,
      );
    }

    if (!captchaOk) {
      return c.json(
        { error: 'Captcha verification failed' } satisfies FaucetDropResult,
        403,
      );
    }

    try {
      const result = await sendFaucetTokens({
        faucetPrivateKey: faucetPrivateKey.value,
        rpcUrl: c.env.VITE_SHINZO_RPC?.trim() || DEFAULT_RPC_URL,
        toAddress: address,
      });

      return c.json(result satisfies FaucetDropResult);
    } catch (error) {
      return c.json(
        {
          error: getErrorMessage(error, 'Failed to send tokens'),
        } satisfies FaucetDropResult,
        502,
      );
    }
  });

  return app;
};
