import type { GeneratorAssertion } from "./types";

export interface AssertionWire {
  assertion_id?: string;
  consensus_pub_key?: string;
  delegate_address?: string;
  source_chain?: string;
  source_chain_id?: string;
}

export interface GetAssertionWireResponse {
  assertions?: AssertionWire[];
}

export function toAssertion(wire: AssertionWire): GeneratorAssertion {
  if (!wire.assertion_id) {
    throw new Error("Assertion response is missing assertion_id.");
  }
  if (!wire.consensus_pub_key) {
    throw new Error("Assertion response is missing consensus_pub_key.");
  }
  if (!wire.delegate_address) {
    throw new Error("Assertion response is missing delegate_address.");
  }
  if (!wire.source_chain) {
    throw new Error("Assertion response is missing source_chain.");
  }
  if (!wire.source_chain_id) {
    throw new Error("Assertion response is missing source_chain_id.");
  }

  return {
    assertionId: wire.assertion_id,
    consensusPubKey: wire.consensus_pub_key,
    delegateAddress: wire.delegate_address,
    sourceChain: wire.source_chain,
    sourceChainId: wire.source_chain_id,
  };
}
