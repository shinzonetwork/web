'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '@/shared/envs';

export function RecaptchaWidget() {
  if (!RECAPTCHA_SITE_KEY) return null;
  return <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} />;
}
