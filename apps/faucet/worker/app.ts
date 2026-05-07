import { Hono } from 'hono';
import { configureFaucetEnv } from './env';
import { hasRecentFaucetTransfer } from './recent-faucet-transfer';
import { sendFaucetTokens } from './send-tokens';
import {
  createFaucetSigner,
  isAddressValidationError,
  normalizeShinzoAddress,
  type FaucetSigner,
} from './shinzo-address';
import type { Env, FaucetDropResult } from './types';
import { verifyCaptcha } from './verify-captcha';

interface RequestBody {
  address?: unknown;
  captchaToken?: unknown;
}

const getString = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const createFaucetWorkerApp = (): Hono<{ Bindings: Env }> => {
  const app = new Hono<{ Bindings: Env }>();

  app.post('/api/faucet/request-airdrop', async (c) => {
    configureFaucetEnv(c.env);

    let body: RequestBody;

    try {
      body = (await c.req.json()) as RequestBody;
    } catch {
      return c.json({ error: 'Invalid request body.' } satisfies FaucetDropResult, 400);
    }

    const address = getString(body.address).trim();
    const captchaToken = getString(body.captchaToken);
    let recipientAddress: string;

    if (!address) {
      return c.json({ error: 'Address is required' } satisfies FaucetDropResult, 400);
    }

    try {
      recipientAddress = normalizeShinzoAddress(address);
    } catch (error) {
      if (isAddressValidationError(error)) {
        return c.json(
          { error: 'Invalid Shinzo address.' } satisfies FaucetDropResult,
          400,
        );
      }

      throw error;
    }

    let captchaOk: boolean;

    try {
      captchaOk = await verifyCaptcha(captchaToken);
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

    let faucetSigner: FaucetSigner;

    try {
      faucetSigner = await createFaucetSigner();
    } catch (error) {
      return c.json(
        {
          error: getErrorMessage(error, 'FAUCET_PRIVATE_KEY is invalid.'),
        } satisfies FaucetDropResult,
        500,
      );
    }

    try {
      const recentlyFunded = await hasRecentFaucetTransfer(
        faucetSigner.address,
        recipientAddress,
      );

      if (recentlyFunded) {
        return c.json(
          {
            error:
              'This address already received faucet tokens in the last 24 hours.',
          } satisfies FaucetDropResult,
          429,
        );
      }
    } catch {
      return c.json(
        {
          error:
            'Unable to verify recent faucet activity. Please try again shortly.',
        } satisfies FaucetDropResult,
        503,
      );
    }

    try {
      const result = await sendFaucetTokens({
        faucetSigner,
        toAddress: recipientAddress,
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
