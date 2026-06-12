"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { DataItem, DataList } from "@/widgets/data-list";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { getPageLink } from "@/shared/utils/links";
import { useShinzohubBlock } from "../../hook/shinzohub/use-shinzohub-block";
import { formatProposerAddress } from "@/shared/shinzohub/utils/format-proposer-address";

export type ShinzohubBlockCardOptions = { id: string }

export const ShinzohubBlockCard = (options: ShinzohubBlockCardOptions) => {
  const [showMore, setShowMore] = useState(false);
  const { data: block, isLoading } = useShinzohubBlock(options.id);
  const chain = useChainPathSegment();

  if (!block?.height) {
    return (
      <p className="text-center text-muted-foreground">Block not found.</p>
    );
  }

  const proposer = block.proposerAddress
    ? formatProposerAddress(block.proposerAddress)
    : null;

  return (
    <>
      <DataList>
        <DataItem title="Block Height" value={block.height} loading={isLoading}>
          {block.height}
        </DataItem>

        <DataItem title="Timestamp" value={block.timestamp} loading={isLoading}>
          {block.timestamp && formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })}
        </DataItem>

        <DataItem
          title="Validator"
          value={proposer}
          loading={isLoading}
          link={
            proposer
              ? `${getPageLink("address", { param: proposer, chain })}`
              : undefined
          }
        >
          {proposer}
        </DataItem>

        <DataItem
          title="Transactions"
          value={block.transactionCount}
          loading={isLoading}
        >
          {block.transactionCount}
        </DataItem>

        <DataItem title="Chain ID" value={block.chainId} loading={isLoading}>
          {block.chainId}
        </DataItem>

        <DataItem title="Size" value={block.size} loading={isLoading}>
          {block.size ? `${(Number(block.size) / 1024).toFixed(2)} KB` : '-'}
        </DataItem>
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
            link={`${getPageLink("block", { param: block.hash, chain })}`}
          >
            <span className="whitespace-nowrap overflow-x-auto">{block.hash}</span>
          </DataItem>

          <DataItem
            title="Parent Hash"
            value={block.parentHash}
            copyable
            truncate={false}
            link={
              block.parentHash
                ? `${getPageLink("block", { param: block.parentHash, chain })}`
                : undefined
            }
          >
            {block.parentHash}
          </DataItem>

          <DataItem
            title="App Hash"
            value={block.appHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.appHash}
          </DataItem>

          <DataItem
            title="Data Hash"
            value={block.dataHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.dataHash}
          </DataItem>

          <DataItem
            title="Validators Hash"
            value={block.validatorsHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.validatorsHash}
          </DataItem>

          <DataItem
            title="Next Validators Hash"
            value={block.nextValidatorsHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.nextValidatorsHash}
          </DataItem>

          <DataItem
            title="Consensus Hash"
            value={block.consensusHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.consensusHash}
          </DataItem>

          <DataItem
            title="Last Results Hash"
            value={block.lastResultsHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.lastResultsHash}
          </DataItem>

          <DataItem
            title="Evidence Hash"
            value={block.evidenceHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.evidenceHash}
          </DataItem>

          <DataItem
            title="Last Commit Hash"
            value={block.lastCommitHash}
            copyable
            loading={isLoading}
            truncate={false}
          >
            {block.lastCommitHash}
          </DataItem>

          <DataItem title="More Details" loading={isLoading}>
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
          <DataItem title="More Details" loading={isLoading}>
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
