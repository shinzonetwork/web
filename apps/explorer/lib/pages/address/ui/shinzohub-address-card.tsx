"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
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
  viewsTabHref: string;
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
      <ShinzohubAddressLink
        address={view.contractAddress}
        className="break-all font-mono text-xs"
      >
        {view.contractAddress}
      </ShinzohubAddressLink>
      <span className="text-xs text-muted-foreground">
        Height {view.height}
      </span>
    </div>
  );
}

function getCreatedViewsCount(
  createdViews: ShinzohubAddressDetailsResponse["related"]["createdViews"] | undefined,
): string | null {
  if (!createdViews) return null;
  if (createdViews.total !== null) {
    return BigInt(createdViews.total) > 0n ? createdViews.total : null;
  }

  return createdViews.items.length > 0 ? String(createdViews.items.length) : null;
}

function CreatedViewsSummary({
  count,
  viewsTabHref,
}: {
  count: string;
  viewsTabHref: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span>{count}</span>
      <Link
        prefetch={false}
        href={viewsTabHref}
        className="cursor-pointer text-text-accent underline"
      >
        Show all
      </Link>
    </div>
  );
}

export function ShinzohubAddressCard({
  details,
  isLoading,
  viewsTabHref,
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
  const createdViewsCount = getCreatedViewsCount(details?.related.createdViews);

  return (
    <DataList>
      <DataItem
        title="EVM Address"
        value={details?.hexAddress}
        loading={isLoading}
      >
        <ShinzohubAddressLink
          address={details?.hexAddress}
          copyable
          fallback="—"
          className="break-all font-mono"
        />
      </DataItem>
      <DataItem
        title="Shinzo Address"
        value={details?.shinzoAddress}
        loading={isLoading}
      >
        <ShinzohubAddressLink
          address={details?.shinzoAddress}
          copyable
          fallback="—"
          className="break-all font-mono"
        />
      </DataItem>
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
      {host && (
        <DataItem title="Host" value={host.did} loading={isLoading} allowWrap>
          <Link
            prefetch={false}
            href={getPageLink("host", { address: host.address, chain: "shinzohub" })}
            className="break-all font-mono text-text-accent underline"
          >
            {host.did}
          </Link>
        </DataItem>
      )}
      {generator && (
        <DataItem title="Generator" value={generator.did} loading={isLoading} allowWrap>
          <Link
            prefetch={false}
            href={getPageLink("generator", { address: generator.address, chain: "shinzohub" })}
            className="break-all font-mono text-text-accent underline"
          >
            {generator.did}
          </Link>
        </DataItem>
      )}
      {viewContract && (
        <DataItem
          title="View Contract"
          value={viewContract.name}
          loading={isLoading}
          allowWrap
        >
          <ViewLink view={viewContract} />
        </DataItem>
      )}
      {createdViewsCount && (
        <DataItem
          title="Created Views"
          value={createdViewsCount}
          loading={isLoading}
          allowWrap
        >
          <CreatedViewsSummary
            count={createdViewsCount}
            viewsTabHref={viewsTabHref}
          />
        </DataItem>
      )}
    </DataList>
  );
}
