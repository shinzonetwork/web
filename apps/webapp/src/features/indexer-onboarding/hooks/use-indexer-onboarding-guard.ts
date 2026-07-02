"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyIndexerAssertion } from "@/features/registration-form";
import { INDEXER_ASSERTION_PENDING_KEY } from "../constants";

/** Redirect to assertion when registration is opened without a completed assertion. */
export function useIndexerOnboardingGuard(enabled: boolean) {
  const router = useRouter();
  const [assertionPending, setAssertionPending] = useState(false);
  const { data: isAssertionVerified, isLoading, isFetching } =
    useVerifyIndexerAssertion();

  useEffect(() => {
    setAssertionPending(
      sessionStorage.getItem(INDEXER_ASSERTION_PENDING_KEY) === "true"
    );
  }, []);

  useEffect(() => {
    if (!enabled || isLoading || isFetching) {
      return;
    }

    if (isAssertionVerified) {
      sessionStorage.removeItem(INDEXER_ASSERTION_PENDING_KEY);
      setAssertionPending(false);
      return;
    }

    if (assertionPending) {
      return;
    }

    router.replace("/indexer-assertion");
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
