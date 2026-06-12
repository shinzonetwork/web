import type { ShinzohubBlock, ShinzohubBlocksResponse } from "@/shared/shinzohub/types";
import type { ShinzoHubBlock, ListBlocksResult } from "@shinzo/shinzohub";

export function serializeBlocksList(blocksList: ListBlocksResult): ShinzohubBlocksResponse {
  return {
    blocks: blocksList.blocks.map((block) => serializeBlock(block)),
    latestHeight: blocksList.latestHeight.toString(),
    total: Number(blocksList.latestHeight),
  };
}

export function serializeBlock(block: ShinzoHubBlock): ShinzohubBlock {
  return {
    ...block,
    hash: block.hash,
    parentHash: block.parentHash,
    height: block.height.toString(),
    timestamp: block.timestamp,
    chainId: block.chainId,
    proposerAddress: block.proposerAddress,
    transactionCount: block.transactionCount,
    size: block.size?.toString() ?? null,
    lastCommitHash: block.lastCommitHash,
    dataHash: block.dataHash,
    validatorsHash: block.validatorsHash,
    nextValidatorsHash: block.nextValidatorsHash,
    consensusHash: block.consensusHash,
    appHash: block.appHash,
    lastResultsHash: block.lastResultsHash,
    evidenceHash: block.evidenceHash,
  };
}