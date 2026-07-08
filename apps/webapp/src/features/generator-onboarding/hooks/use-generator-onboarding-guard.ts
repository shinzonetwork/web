"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildGeneratorAssertionUrlFromSearchParams,
  getGeneratorAssertionPrefill,
  useVerifyAssertion,
} from "@/features/registration-form";

/** Redirect to assertion when registration is opened without a verified assertion. */
export function useGeneratorOnboardingGuard(enabled: boolean) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assertionPrefill = getGeneratorAssertionPrefill(searchParams);
  const canVerifyAssertion = Boolean(
    assertionPrefill?.validatorPublicKey && assertionPrefill?.sourceChainId
  );

  const {
    data: isAssertionVerified,
    isLoading,
    isFetching,
  } = useVerifyAssertion(
    assertionPrefill?.validatorPublicKey ?? "",
    assertionPrefill?.sourceChainId
      ? String(assertionPrefill.sourceChainId)
      : ""
  );

  const isAssertionPending =
    canVerifyAssertion &&
    (isLoading || isFetching || isAssertionVerified === undefined);

  useEffect(() => {
    if (!enabled || isAssertionPending || isAssertionVerified === true) {
      return;
    }

    if (canVerifyAssertion && isAssertionVerified !== false) {
      return;
    }

    router.replace(buildGeneratorAssertionUrlFromSearchParams(searchParams));
  }, [
    enabled,
    isAssertionPending,
    isAssertionVerified,
    canVerifyAssertion,
    router,
    searchParams,
  ]);

  return {
    isAssertionVerified: isAssertionVerified === true,
    isAssertionLoading: isAssertionPending,
    isRedirectingToAssertion:
      enabled &&
      !canVerifyAssertion &&
      isAssertionVerified !== true &&
      !isAssertionPending,
  };
}
