"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyAssertion } from "@/features/registration-form";
import { GENERATOR_ASSERTION_PENDING_KEY } from "../constants";

/** Redirect to assertion when registration is opened without a completed assertion. */
export function useGeneratorOnboardingGuard(enabled: boolean) {
  const router = useRouter();
  const { data: isAssertionVerified, isLoading } = useVerifyAssertion();

  // Read sessionStorage during init so the registration form is not briefly
  // replaced by the loading state after assertion navigation.
  const [assertionPending, setAssertionPending] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return sessionStorage.getItem(GENERATOR_ASSERTION_PENDING_KEY) === "true";
  });

  useEffect(() => {
    // Only wait on the initial verification request. Background refetches must
    // not unmount the registration form or re-run navigation.
    if (!enabled || isLoading) {
      return;
    }

    if (isAssertionVerified) {
      sessionStorage.removeItem(GENERATOR_ASSERTION_PENDING_KEY);
      setAssertionPending(false);
      return;
    }

    if (assertionPending) {
      return;
    }

    router.replace("/generator-assertion");
  }, [enabled, isAssertionVerified, isLoading, assertionPending, router]);

  return {
    isAssertionVerified,
    assertionComplete: Boolean(isAssertionVerified) || assertionPending,
    // Initial load only — do not treat background refetches as loading.
    isLoading,
  };
}
