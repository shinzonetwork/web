"use client";

import { Generator } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";

async function fetchGeneratorAssertion(
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

export function useVerifyAssertion(validatorPublicKey: string, sourceChainId: string, intervalMs = 30000) {

  return useQuery({
    queryKey: ["generator-assertion-verification", validatorPublicKey, sourceChainId],
    queryFn: () => fetchGeneratorAssertion(validatorPublicKey, sourceChainId),
    // Stop polling once verified so the registration form is not churned.
    refetchInterval: (query) => (query.state.data ? false : intervalMs),
    refetchIntervalInBackground: true,
    enabled: Boolean(validatorPublicKey && sourceChainId),
  });
}
