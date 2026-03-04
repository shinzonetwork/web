'use server';

import { sendFaucetTokens } from '@/pages/faucet/api/send-tokens';
import { verifyCaptcha } from './verify-captcha';

export const requestFaucetDrop = async (
  address: string,
  captchaToken: string,
): Promise<{ txHash: string, address: string } | { error: string }> => {
  if (!address.trim()) return { error: 'Address is required' };

  const captchaOk = await verifyCaptcha(captchaToken);
  if (!captchaOk) return { error: 'Captcha verification failed' };

  try {
    return sendFaucetTokens(address);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Failed to send tokens' };
  }
};
