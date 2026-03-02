'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { forwardRef } from 'react';
import { RECAPTCHA_SITE_KEY } from '@/shared/envs';

export type RecaptchaRef = ReCAPTCHA;

export const RecaptchaWidget = forwardRef<ReCAPTCHA>((_, ref) => {
  if (!RECAPTCHA_SITE_KEY) return null;
  return <ReCAPTCHA ref={ref} sitekey={RECAPTCHA_SITE_KEY} size="invisible" />;
});

RecaptchaWidget.displayName = 'RecaptchaWidget';
