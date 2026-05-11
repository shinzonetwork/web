import { getRequiredEnv } from './env';

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

interface RecaptchaVerifyResponse {
  success?: boolean;
}

export const verifyCaptcha = async (
  token: string,
): Promise<boolean> => {
  if (!token.trim()) return false;

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: getRequiredEnv('RECAPTCHA_SECRET_KEY'),
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error(`reCAPTCHA returned ${response.status}`);
  }

  const data = (await response.json()) as RecaptchaVerifyResponse;

  return data.success === true;
};
