import type { Generator } from "./types";

export interface GeneratorWire {
  validator_pubkey?: string;
  source_chain?: string;
  source_chain_id?: string;
  assertion_authority?: string;
  nonce?: string;
  chain_specific?: string | null;
  operator_address?: string;
  payout_address?: string;
  registered?: boolean;
  did?: string;
  connection_string?: string;
}

export interface GetGeneratorWireResponse {
  indexer?: GeneratorWire;
}

function readOptionalString(value: string | null | undefined): string {
  return typeof value === "string" ? value : "";
}

/** Maps Cosmos REST indexer wire data to a Generator record. */
export function toGenerator(wire: GeneratorWire): Generator {
  if (!wire.validator_pubkey) {
    throw new Error("Generator response is missing validator_pubkey.");
  }
  if (!wire.source_chain) {
    throw new Error("Generator response is missing source_chain.");
  }
  if (!wire.source_chain_id) {
    throw new Error("Generator response is missing source_chain_id.");
  }
  if (!wire.assertion_authority) {
    throw new Error("Generator response is missing assertion_authority.");
  }
  if (!wire.nonce) {
    throw new Error("Generator response is missing nonce.");
  }
  if (!wire.operator_address) {
    throw new Error("Generator response is missing operator_address.");
  }
  if (!wire.payout_address) {
    throw new Error("Generator response is missing payout_address.");
  }
  if (wire.registered === undefined) {
    throw new Error("Generator response is missing registered.");
  }

  return {
    validatorPublicKey: wire.validator_pubkey,
    assertionAuthority: wire.assertion_authority,
    nonce: wire.nonce,
    chainSpecific: readOptionalString(wire.chain_specific),
    operatorAddress: wire.operator_address,
    payoutAddress: wire.payout_address,
    registered: wire.registered,
    did: readOptionalString(wire.did),
    connectionString: readOptionalString(wire.connection_string),
    sourceChain: wire.source_chain,
    sourceChainId: wire.source_chain_id,
  };
}
