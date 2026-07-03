"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyAssertion } from "@/features/registration-form";
import { GENERATOR_ASSERTION_PENDING_KEY } from "../constants";

/** Redirect to assertion when registration is opened without a completed assertion. */
export function useGeneratorOnboardingGuard(enabled: boolean) {
  const router = useRouter();
  const [assertionPending, setAssertionPending] = useState(false);
  const {
    data: isAssertionVerified,
    isLoading,
    isFetching,
  } = useVerifyAssertion();

  useEffect(() => {
    setAssertionPending(
      sessionStorage.getItem(GENERATOR_ASSERTION_PENDING_KEY) === "true"
    );
  }, []);

  useEffect(() => {
    if (!enabled || isLoading || isFetching) {
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
  }, [
    enabled,
    isAssertionVerified,
    isLoading,
    isFetching,
    assertionPending,
    router,
  ]);

  return {
    isAssertionVerified,
    assertionComplete: Boolean(isAssertionVerified) || assertionPending,
    isLoading: isLoading || isFetching,
  };
}
