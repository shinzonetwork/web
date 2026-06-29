"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { getPageLink } from "@/shared/utils/links";
import { formatShinzoCoin } from "@/shared/utils/format-token";
import type {
  ShinzohubAddressDetailsResponse,
  ShinzohubAddressView,
} from "@/shared/shinzohub/types";
import { DataItem, DataList } from "@/widgets/data-list";

interface ShinzohubAddressCardProps {
  details?: ShinzohubAddressDetailsResponse;
  isLoading: boolean;
}

interface ViewLinkProps {
  view: ShinzohubAddressView;
}

function formatNativeBalance(
  balance: ShinzohubAddressDetailsResponse["nativeBalance"] | undefined,
): string | undefined {
  if (!balance) return undefined;
  return formatShinzoCoin(`${balance.amount}${balance.denom}`);
}

function ViewLink({ view }: ViewLinkProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <a
        href={view.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-w-0 items-center gap-1 text-text-accent underline"
      >
        <span className="truncate">{view.name}</span>
        <ExternalLink aria-hidden className="size-3.5 shrink-0" />
      </a>
      <span className="break-all font-mono text-xs text-muted-foreground">
        {view.contractAddress}
      </span>
      <span className="text-xs text-muted-foreground">
        Height {view.height}
      </span>
    </div>
  );
}

function CreatedViews({
  details,
}: {
  details?: ShinzohubAddressDetailsResponse;
}) {
  const createdViews = details?.related.createdViews;
  if (!createdViews?.items.length) return null;

  const hasMore = createdViews.total
    ? BigInt(createdViews.total) > BigInt(createdViews.items.length)
    : false;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {createdViews.items.map((view) => (
        <ViewLink key={view.contractAddress} view={view} />
      ))}
      {createdViews.total && hasMore && (
        <span className="text-xs text-muted-foreground">
          Showing {createdViews.items.length} of {createdViews.total}
        </span>
      )}
    </div>
  );
}

export function ShinzohubAddressCard({
  details,
  isLoading,
}: ShinzohubAddressCardProps) {
  if (!isLoading && !details) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Address not found.
      </p>
    );
  }

  const host = details?.related.host;
  const generator = details?.related.generator;
  const viewContract = details?.related.viewContract;
  const hasCreatedViews = !!details?.related.createdViews.items.length;

  return (
    <DataList>
      <DataItem
        title="EVM Address"
        value={details?.hexAddress}
        copyable
        loading={isLoading}
      />
      <DataItem
        title="Shinzo Address"
        value={details?.shinzoAddress}
        copyable
        loading={isLoading}
      />
      <DataItem
        title="Native Balance"
        value={formatNativeBalance(details?.nativeBalance)}
        loading={isLoading}
      />
      <DataItem
        title="Account Type"
        value={details?.account.typeLabel}
        loading={isLoading}
      >
        {details?.account.typeLabel ? (
          <Badge variant="outline">{details.account.typeLabel}</Badge>
        ) : undefined}
      </DataItem>
      <DataItem
        title="Transactions Count"
        value={details?.account.transactionsCount}
        loading={isLoading}
      />
      <DataItem
        title="Host"
        value={host?.address}
        link={host ? getPageLink("host", { address: host.address, chain: "shinzohub" }) : undefined}
        loading={isLoading}
      >
        {host ? (
          <div className="flex min-w-0 flex-col gap-1">
            <span className="break-all font-mono text-sm">{host.address}</span>
            <span className="break-all text-xs text-muted-foreground">{host.did}</span>
          </div>
        ) : undefined}
      </DataItem>
      <DataItem
        title="Generator"
        value={generator?.address}
        link={
          generator
            ? getPageLink("generator", { address: generator.address, chain: "shinzohub" })
            : undefined
        }
        loading={isLoading}
      >
        {generator ? (
          <div className="flex min-w-0 flex-col gap-1">
            <span className="break-all font-mono text-sm">{generator.address}</span>
            <span className="text-xs text-muted-foreground">
              {generator.sourceChain || "Unknown chain"} / {generator.sourceChainId}
            </span>
          </div>
        ) : undefined}
      </DataItem>
      <DataItem
        title="View Contract"
        value={viewContract?.name}
        loading={isLoading}
        allowWrap
      >
        {viewContract ? <ViewLink view={viewContract} /> : undefined}
      </DataItem>
      <DataItem
        title="Created Views"
        value={hasCreatedViews ? `${details?.related.createdViews.items.length}` : undefined}
        loading={isLoading}
        allowWrap
      >
        {hasCreatedViews ? <CreatedViews details={details} /> : undefined}
      </DataItem>
    </DataList>
  );
}
