import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params -- gtag.js requires the Arguments object
  window.dataLayer.push(arguments);
}

/**
 * Drives the analytics cookie banner. The banner is only shown to visitors
 * in consent-required regions (per /api/geo) who haven't already chosen.
 * Choices are persisted and forwarded to Google Consent Mode.
 */
export function useCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const controller = new AbortController();
    fetch("/api/geo", { signal: controller.signal })
      .then((res) => res.json() as Promise<{ consentRequired: boolean }>)
      .then((data) => {
        if (data.consentRequired) setVisible(true);
      })
      .catch(() => { });

    return () => controller.abort();
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
    setVisible(false);
  };

  return {
    visible,
    accept: () => choose(true),
    decline: () => choose(false),
  };
}
