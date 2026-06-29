"use client";

import { SHINZO_PREFIX } from "@/shared/lib";
import { toBech32 } from "@cosmjs/encoding";
import { useQuery } from "@tanstack/react-query";
import { Hex, hexToBytes } from "viem";
import { useAccount } from "wagmi";

const registeredHostsApiEndpoint =
  process.env.NEXT_PUBLIC_INDEXER_ASSERTION_API_ENDPOINT ||
  "http://rpc.develop.devnet.shinzo.network:1317/shinzonetwork/indexer/v1/assertions/";

type IndexerAssertion = {
  assertionId: string;
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: number;
};

type AssertionVerificationResponse = {
  assertions: IndexerAssertion[];
};

async function fetchIndexerAssertion(address: string): Promise<boolean> {
  const response = await fetch(`${registeredHostsApiEndpoint}/${address}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: AssertionVerificationResponse = await response.json();

  return data.assertions.length > 0;
}

export function useVerifyIndexerAssertion(intervalMs = 30000) {
  const { address } = useAccount();
  const shinzoAddress = address?.startsWith(SHINZO_PREFIX)
    ? address
    : toBech32(SHINZO_PREFIX, hexToBytes(address as Hex));

  return useQuery({
    queryKey: ["indexer-assertion-verification", shinzoAddress],
    queryFn: () => fetchIndexerAssertion(shinzoAddress as string),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    enabled: !!address,
  });
}
