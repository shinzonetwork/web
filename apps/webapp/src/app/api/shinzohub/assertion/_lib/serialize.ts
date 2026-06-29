import type { GeneratorAssertion, GeneratorAssertionsResponse } from "@/shared/lib";
import type {
  GeneratorAssertion as ShinzoHubGeneratorAssertion,
  GetAssertionResult,
} from "@shinzo/shinzohub";

export function serializeAssertion(
  assertion: ShinzoHubGeneratorAssertion,
): GeneratorAssertion {
  return {
    assertionId: assertion.assertionId,
    consensusPubKey: assertion.consensusPubKey,
    delegateAddress: assertion.delegateAddress,
    sourceChain: assertion.sourceChain,
    sourceChainId: assertion.sourceChainId,
  };
}

export function serializeAssertions(
  result: GetAssertionResult,
): GeneratorAssertionsResponse {
  return {
    assertions: result.assertions.map(serializeAssertion),
  };
}
