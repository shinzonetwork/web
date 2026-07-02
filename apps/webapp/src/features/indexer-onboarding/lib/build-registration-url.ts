import { getSourceChainMap } from "@/shared/lib";

export function buildIndexerRegistrationUrl(sourceChain: string): string {
  const sourceChainId = getSourceChainMap()[sourceChain] ?? 0;
  const params = new URLSearchParams({
    role: "indexer",
    sourceChain,
    sourceChainId: String(sourceChainId),
  });

  return `/indexer-registration?${params.toString()}`;
}
