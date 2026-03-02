'use server';

import { RECAPTCHA_SECRET_KEY } from '@/shared/envs';

export const verifyCaptcha = async (token: string): Promise<boolean> => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json() as { success: boolean };
  return data.success;
};
