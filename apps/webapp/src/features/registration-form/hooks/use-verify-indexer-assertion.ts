"use client";

import { SHINZO_PREFIX } from "@/shared/lib";
import type { GeneratorAssertionsResponse } from "@/shared/lib";
import { toBech32 } from "@cosmjs/encoding";
import { useQuery } from "@tanstack/react-query";
import { Hex, hexToBytes } from "viem";
import { useAccount } from "wagmi";

async function fetchIndexerAssertion(address: string): Promise<boolean> {
  const response = await fetch(
    `api/shinzohub/generators/assertion?address=${encodeURIComponent(address)}`
  );

  if (!response.ok) {
    throw new Error("Failed to verify generator assertion");
  }

  const data = (await response.json()) as GeneratorAssertionsResponse;

  return data.assertions.length > 0;
}

export function useVerifyIndexerAssertion(intervalMs = 30000) {
  const { address } = useAccount();

  const shinzoAddress = address
    ? address.startsWith(SHINZO_PREFIX)
      ? address
      : toBech32(SHINZO_PREFIX, hexToBytes(address as Hex))
    : undefined;

  return useQuery({
    queryKey: ["generator-assertion-verification", shinzoAddress],
    queryFn: () => fetchIndexerAssertion(shinzoAddress as string),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    enabled: Boolean(shinzoAddress),
  });
}
