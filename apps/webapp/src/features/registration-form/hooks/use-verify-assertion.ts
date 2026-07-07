"use client";

import { Generator } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";

export async function fetchGeneratorAssertionVerified(
  validatorPublicKey: string,
  sourceChainId: string
): Promise<boolean> {
  const response = await fetch(
    `/api/shinzohub/generators/verify-assertion?validatorPublicKey=${encodeURIComponent(validatorPublicKey)}&sourceChainId=${encodeURIComponent(sourceChainId)}`
  );

  if (!response.ok) {
    throw new Error("Failed to verify generator assertion");
  }

  const data = (await response.json()) as Generator | null;

  return data != null;
}

export async function waitForGeneratorAssertionVerification(
  validatorPublicKey: string,
  sourceChainId: string,
  options: { maxAttempts?: number; intervalMs?: number } = {}
): Promise<boolean> {
  const { maxAttempts = 30, intervalMs = 2000 } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const verified = await fetchGeneratorAssertionVerified(
      validatorPublicKey,
      sourceChainId
    );
    if (verified) {
      return true;
    }

    if (attempt < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  return false;
}

export function useVerifyAssertion(
  validatorPublicKey: string,
  sourceChainId: string,
  intervalMs = 30000
) {
  return useQuery({
    queryKey: [
      "generator-assertion-verification",
      validatorPublicKey,
      sourceChainId,
    ],
    queryFn: () =>
      fetchGeneratorAssertionVerified(validatorPublicKey, sourceChainId),
    refetchInterval: (query) => (query.state.data ? false : intervalMs),
    refetchIntervalInBackground: true,
    enabled: Boolean(validatorPublicKey && sourceChainId),
  });
}
