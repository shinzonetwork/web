'use server';

import { FAUCET_PRIVATE_KEY } from '@/shared/envs';
import { sendFaucetTokens } from '@/pages/faucet/api/send-tokens';
import { verifyCaptcha } from './verify-captcha';

const RATE_LIMIT_MS = 24 * 60 * 60 * 1000;
const seen = new Map<string, number>();

export const requestFaucetDrop = async (
  address: string,
  captchaToken: string,
): Promise<{ txHash: string } | { error: string }> => {
  if (!address.trim()) return { error: 'Address is required' };

  const captchaOk = await verifyCaptcha(captchaToken);
  if (!captchaOk) return { error: 'Captcha verification failed' };

  // control that the same address cannot request tokens more than once per day
  const last = seen.get(address);
  if (last && Date.now() - last < RATE_LIMIT_MS) {
    return { error: 'This address already received tokens today. Try again in 24 hours.' };
  }

  try {
    const txHash = await sendFaucetTokens(FAUCET_PRIVATE_KEY, address);
    seen.set(address, Date.now());
    return { txHash };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Failed to send tokens' };
  }
};
