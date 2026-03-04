'use server';

import { FAUCET_PRIVATE_KEY } from '@/shared/envs';
import { sendFaucetTokens } from '@/pages/faucet/api/send-tokens';
import { verifyCaptcha } from './verify-captcha';

export const requestFaucetDrop = async (
  address: string,
  captchaToken: string,
): Promise<{ txHash: string } | { error: string }> => {
  if (!address.trim()) return { error: 'Address is required' };

  const captchaOk = await verifyCaptcha(captchaToken);
  if (!captchaOk) return { error: 'Captcha verification failed' };

  try {
    const txHash = await sendFaucetTokens(FAUCET_PRIVATE_KEY, address);
    return { txHash };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Failed to send tokens' };
  }
};
