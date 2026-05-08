"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const registeredHostsApiEndpoint =
  process.env.NEXT_PUBLIC_REGISTERED_HOSTS_API_ENDPOINT ||
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

  return useQuery({
    queryKey: ["indexer-assertion-verification", address],
    queryFn: () => fetchIndexerAssertion(address as string),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    enabled: !!address,
  });
}
