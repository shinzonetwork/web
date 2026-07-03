import { getSourceChainMap } from "@/shared/lib";

export function buildIndexerRegistrationUrl(sourceChain: string): string {
  const sourceChainId = getSourceChainMap()[sourceChain] ?? 0;
  const params = new URLSearchParams({
    role: "generator",
    sourceChain,
    sourceChainId: String(sourceChainId),
  });

  return `/generator-registration?${params.toString()}`;
}
