import type { Client } from "viem";
import { getFetch, requestCometRpc } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { normalizeHex } from "../internal/hex";
import type {
  ListValidatorsParameters,
  ListValidatorsResult,
  ShinzoHubValidator,
} from "./types";

interface ValidatorWire {
  address?: string;
  pub_key?: {
    type?: string;
    value?: string;
  };
  voting_power?: string | number;
  proposer_priority?: string | number;
}

interface ValidatorsWireResponse {
  block_height?: string | number;
  validators?: ValidatorWire[];
  count?: string | number;
  total?: string | number;
}

/** Lists consensus validators through Comet RPC. */
export async function listValidators(
  client: ShinzoHubQueryClient | Client,
  parameters: ListValidatorsParameters = {},
): Promise<ListValidatorsResult> {
  const response = await requestCometRpc<ValidatorsWireResponse>(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", parameters.cometRpcUrl),
    "validators",
    buildParams(parameters),
  );

  return {
    blockHeight: BigInt(response.block_height ?? 0),
    validators: (response.validators ?? []).map(toValidator),
    count: Number(response.count ?? 0),
    total: Number(response.total ?? 0),
  };
}

function buildParams(
  parameters: ListValidatorsParameters,
): Record<string, string> {
  const params: Record<string, string> = {
    page: positiveInteger(parameters.page ?? 1, "page"),
    per_page: positiveInteger(parameters.perPage ?? 100, "perPage"),
  };

  if (parameters.height !== undefined) {
    params.height = positiveInteger(parameters.height, "height");
  }

  return params;
}

function positiveInteger(
  value: number | bigint | string,
  name: string,
): string {
  const result = BigInt(value);
  if (result < 1n) {
    throw new Error(`${name} must be greater than zero.`);
  }
  return result.toString();
}

function toValidator(wire: ValidatorWire): ShinzoHubValidator {
  if (!wire.address || !wire.pub_key?.type || !wire.pub_key.value) {
    throw new Error("ShinzoHub validator response is missing required fields.");
  }

  return {
    address: normalizeHex(wire.address, "validator address", 20),
    pubKey: {
      type: wire.pub_key.type,
      value: wire.pub_key.value,
    },
    votingPower: BigInt(wire.voting_power ?? 0),
    proposerPriority: BigInt(wire.proposer_priority ?? 0),
  };
}
