"use client";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const { visible, accept, decline } = useCookieConsent();

  if (!visible) return null;

  return (
    <div className="fixed right-0 bottom-0 z-50 p-2 sm:p-3">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 border border-szo-border bg-background p-4 shadow-sm sm:flex-row sm:items-center">
        <p className="grow text-xs">
          We use cookies to measure how our site is used. <br />
          You can accept or reject analytics cookies.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" size="md" onClick={decline}>
            Reject
          </Button>
          <Button size="md" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
