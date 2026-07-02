import type {
  GeneratorAssertion,
  GeneratorAssertionsResponse,
  RegisteredGenerator,
  RegisteredGeneratorDetailsResponse,
  RegisteredGeneratorsListResponse,
} from "@/shared/lib";
import type {
  GeneratorAssertion as ShinzoHubGeneratorAssertion,
  GetAssertionResult,
  ListGeneratorsResult,
  RegisteredGenerator as ShinzoHubRegisteredGenerator,
} from "@shinzo/shinzohub";

export function serializeGenerator(
  generator: ShinzoHubRegisteredGenerator
): RegisteredGenerator {
  return {
    address: generator.address,
    did: generator.did,
    connectionString: generator.connectionString,
    sourceChain: generator.sourceChain,
    sourceChainId: generator.sourceChainId,
  };
}

export function serializeGeneratorsList(
  result: ListGeneratorsResult
): RegisteredGeneratorsListResponse {
  return {
    generators: result.generators.map((generator) =>
      serializeGenerator(generator)
    ),
    pagination: {
      total: result.pagination.total ?? 0,
    },
  };
}

export function serializeGeneratorDetails(
  generator: ShinzoHubRegisteredGenerator
): RegisteredGeneratorDetailsResponse {
  return {
    generator: serializeGenerator(generator),
  };
}

export function serializeAssertion(
  assertion: ShinzoHubGeneratorAssertion
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
  result: GetAssertionResult
): GeneratorAssertionsResponse {
  return {
    assertions: result.assertions.map(serializeAssertion),
  };
}
