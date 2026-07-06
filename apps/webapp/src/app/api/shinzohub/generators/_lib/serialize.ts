import type { Generator, GeneratorsListResponse } from "@/shared/lib";
import type {
  ListGeneratorsResult,
  Generator as ShinzoHubGenerator,
} from "@shinzo/shinzohub";

export function serializeGenerator(generator: ShinzoHubGenerator): Generator {
  return {
    validatorPublicKey: generator.validatorPublicKey,
    assertionAuthority: generator.assertionAuthority,
    nonce: generator.nonce,
    chainSpecific: generator.chainSpecific,
    operatorAddress: generator.operatorAddress,
    payoutAddress: generator.payoutAddress,
    registered: generator.registered,
    did: generator.did,
    connectionString: generator.connectionString,
    sourceChain: generator.sourceChain,
    sourceChainId: generator.sourceChainId,
  };
}

export function serializeGeneratorsList(
  result: ListGeneratorsResult
): GeneratorsListResponse {
  return {
    generators: result.generators.map((generator) =>
      serializeGenerator(generator)
    ),
    pagination: {
      total: result.pagination.total ?? 0,
    },
  };
}
