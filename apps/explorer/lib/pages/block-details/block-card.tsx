"use client";

import { useState } from "react";
import { DataItem, DataList } from "@/widgets/data-list";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useBlock, type UseBlockOptions } from "./use-block";
import { formatTimestamp } from "@/shared/utils/format-timestamp";
import { useChainPathSegment } from "@/widgets/chain-path-segment/use-chain-path-segment";
import { getPageLink } from "@/shared/utils/links";

export type BlockCardProps = UseBlockOptions;

export const BlockCard = (options: BlockCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const { data: block, isLoading } = useBlock(options);
  const chain = useChainPathSegment();

  if (!block || !block.number) {
    return (
      <p className="text-center text-muted-foreground">Block not found.</p>
    );
  }

  return (
    <>
      <DataList>
        <DataItem
          title="Block Height"
          value={block.number}
          loading={isLoading}
        >
          {block.number}
        </DataItem>

        <DataItem
          title="Timestamp"
          value={block.timestamp}
          loading={isLoading}
        >
          {block.timestamp && formatTimestamp(block.timestamp)}
        </DataItem>

        <DataItem
          title="Validator"
          value={block.miner}
          loading={isLoading}
          link={block.miner != null ? `${getPageLink('address', { param: block.miner, chain})}` : undefined}
        >
          {block.miner}
        </DataItem>

        <DataItem title="size" value={block.size} loading={isLoading}>
          {block.size && `${(Number(block.size) / 1024).toFixed(2)} KB`}
        </DataItem>

        <DataItem title="Gas Used" value={block.gasUsed} loading={isLoading}>
          {block.gasUsed && block.gasLimit && (
            <>
              {(Number(block.gasUsed) / 1e6).toFixed(2)}M (
              {((Number(block.gasUsed) / Number(block.gasLimit)) * 100).toFixed(
                2
              )}
              %)
            </>
          )}
        </DataItem>

        <DataItem title="Gas Limit" value={block.gasLimit} loading={isLoading}>
          {block.gasLimit && `${(Number(block.gasLimit) / 1e6).toFixed(2)}M`}
        </DataItem>

        <DataItem
          title="Base Fee Per Gas"
          value={block.baseFeePerGas}
          loading={isLoading}
        >
          {block.baseFeePerGas &&
            `${(Number(block.baseFeePerGas) / 1e9)} Gwei`}
        </DataItem>

        <DataItem title="Nonce" value={block.nonce} loading={isLoading} />

        <DataItem
          title="Difficulty"
          value={block.difficulty}
          loading={isLoading}
        />

        <DataItem
          title="Total Difficulty"
          value={block.totalDifficulty || 0}
          loading={isLoading}
        />
      </DataList>

      <div className="col-span-3 h-8 w-full" />

      <div className="col-span-3 h-3 w-full border-y border-border" />
      
      {showMore ? (
        <DataList>
          <DataItem
            title="Hash"
            value={block.hash}
            copyable
            loading={isLoading}
            truncate={false}
            link={block.hash != null ? `${getPageLink('block', { param: block.hash, chain})}` : undefined}
          >
            <span className="whitespace-nowrap overflow-x-auto">
              {block.hash}
            </span>
          </DataItem>

          <DataItem
            title="Parent Hash"
            value={block.parentHash}
            copyable
            truncate={false}
            link={block.parentHash != null ? `${getPageLink('block', { param: block.parentHash, chain})}` : undefined}
          >
            {block.parentHash}
          </DataItem>

          <DataItem
            title="State Root"
            value={block.stateRoot}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.stateRoot}
          </DataItem>
          <DataItem
            title="More Details"
            loading={isLoading}
          >
            <Button variant="link" onClick={() => setShowMore(false)}>
            <span className="flex items-center gap-2 text-[#D01F27]">
              <MinusIcon className="w-4 h-4" />
              Click to show less details
            </span>
            </Button>
          </DataItem>
        </DataList>
      ) : (
        <DataList>
          <DataItem
            title="More Details"
            loading={isLoading}
          >
            <Button variant="link" onClick={() => setShowMore(true)}>
            <span className="flex items-center gap-2 text-[#D01F27]">
              <PlusIcon className="w-4 h-4" />
                Click to show more details
              </span>
            </Button>
          </DataItem>
        </DataList>
      )}
    </>
  );
};
