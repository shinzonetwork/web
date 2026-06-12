import type { Hex } from "viem";
import { getFetch, requestCometRpc } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { normalizeHex } from "../internal/hex";
import type { ShinzoHubBlock } from "./types";

/** Comet block header fields used by block normalization. */
export interface HeaderWire {
  chain_id?: string;
  height?: string;
  time?: string;
  last_block_id?: { hash?: string };
  last_commit_hash?: string;
  data_hash?: string;
  validators_hash?: string;
  next_validators_hash?: string;
  consensus_hash?: string;
  app_hash?: string;
  last_results_hash?: string;
  evidence_hash?: string;
  proposer_address?: string;
}

/** Comet block metadata response before normalization. */
export interface BlockMetaWire {
  block_id?: { hash?: string };
  block_size?: string;
  header?: HeaderWire;
  num_txs?: string;
}

/** Comet blockchain result before normalization. */
export interface BlockchainWire {
  last_height?: string;
  block_metas?: BlockMetaWire[];
}

interface BlockWire {
  block_id?: { hash?: string };
  block?: {
    header?: HeaderWire;
    data?: { txs?: string[] | null };
  };
}

/** Fetches and normalizes a block from either Comet block lookup method. */
export async function getBlockWire(
  client: ShinzoHubQueryClient,
  method: "block" | "block_by_hash",
  params: Record<string, unknown>,
  override?: string,
): Promise<ShinzoHubBlock> {
  const response = await requestCometRpc<BlockWire>(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", override),
    method,
    params,
  );

  if (!response.block?.header?.height || !response.block.header.time) {
    throw new Error("ShinzoHub block not found.");
  }

  return toBlock(
    response.block_id?.hash,
    response.block.header,
    response.block.data?.txs?.length ?? 0,
    null,
  );
}

/** Normalizes block metadata returned by the Comet blockchain method. */
export function toBlockMeta(meta: BlockMetaWire): ShinzoHubBlock {
  return toBlock(
    meta.block_id?.hash,
    meta.header,
    Number(meta.num_txs ?? 0),
    BigInt(meta.block_size ?? 0),
  );
}

/** Validates a block height and normalizes it to bigint. */
export function positiveHeight(
  value: number | bigint | string,
  name: string,
): bigint {
  const result = BigInt(value);
  if (result < 1n) {
    throw new Error(`${name} must be greater than zero.`);
  }
  return result;
}

function toBlock(
  hash: string | undefined,
  header: HeaderWire | undefined,
  transactionCount: number,
  size: bigint | null,
): ShinzoHubBlock {
  if (!hash || !header?.height || !header.time) {
    throw new Error("ShinzoHub block response is missing required fields.");
  }
  return {
    hash: normalizeHex(hash, "block hash", 32),
    parentHash: optionalHash(header.last_block_id?.hash),
    height: BigInt(header.height),
    timestamp: header.time,
    chainId: header.chain_id ?? "",
    proposerAddress: header.proposer_address ?? "",
    transactionCount,
    size,
    lastCommitHash: optionalHash(header.last_commit_hash),
    dataHash: optionalHash(header.data_hash),
    validatorsHash: optionalHash(header.validators_hash),
    nextValidatorsHash: optionalHash(header.next_validators_hash),
    consensusHash: optionalHash(header.consensus_hash),
    appHash: optionalHash(header.app_hash),
    lastResultsHash: optionalHash(header.last_results_hash),
    evidenceHash: optionalHash(header.evidence_hash),
  };
}

function optionalHash(value: string | undefined): Hex | null {
  return value ? normalizeHex(value, "block header hash", 32) : null;
}
