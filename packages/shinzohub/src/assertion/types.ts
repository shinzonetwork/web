/** Generator assertion returned by the ShinzoHub Cosmos REST gateway. */
export interface GeneratorAssertion {
  /** Unique assertion identifier. */
  assertionId: string;
  /** Consensus public key associated with the assertion. */
  consensusPubKey: string;
  /** Shinzo bech32 delegate address the assertion belongs to. */
  delegateAddress: string;
  /** Source chain name the generator validates. */
  sourceChain: string;
  /** Source chain ID the generator validates. */
  sourceChainId: string;
}

/** Options for fetching generator assertions by delegate address. */
export interface GetAssertionParameters {
  /** Shinzo bech32 delegate address to look up assertions for. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Assertions for one delegate address returned by `getAssertion`. */
export interface GetAssertionResult {
  /** Matching assertions for the requested delegate address. */
  assertions: readonly GeneratorAssertion[];
}
