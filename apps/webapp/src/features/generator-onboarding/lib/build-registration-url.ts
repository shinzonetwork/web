import { getSourceChainMap } from "@/shared/lib";

export function buildGeneratorRegistrationUrl(
  sourceChain: string,
  validatorPublicKey: string,
  sourceChainId?: number
): string {
  const resolvedSourceChainId =
    sourceChainId ?? getSourceChainMap()[sourceChain] ?? 0;
  const params = new URLSearchParams({
    role: "generator",
    sourceChain,
    sourceChainId: String(resolvedSourceChainId),
    validatorPublicKey,
  });

  return `/generator-registration?${params.toString()}`;
}
