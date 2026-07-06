"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  buildGeneratorAssertionUrlFromSearchParams,
  getGeneratorAssertionPrefill,
  useVerifyAssertion,
} from "@/features/registration-form";

/** Redirect to assertion when registration is opened without a verified assertion. */
export function useGeneratorOnboardingGuard(enabled: boolean) {
  const router = useRouter();
  const assertionPrefill = getGeneratorAssertionPrefill();
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

  useEffect(() => {
    if (!enabled || isLoading || isFetching || isAssertionVerified) {
      return;
    }

    router.replace(buildGeneratorAssertionUrlFromSearchParams());
  }, [enabled, isAssertionVerified, isLoading, isFetching, router]);

  return {
    isAssertionVerified: Boolean(isAssertionVerified),
    isAssertionLoading:
      canVerifyAssertion && (isLoading || isFetching) && !isAssertionVerified,
    isRedirectingToAssertion:
      enabled && !isAssertionVerified && !canVerifyAssertion,
  };
}
