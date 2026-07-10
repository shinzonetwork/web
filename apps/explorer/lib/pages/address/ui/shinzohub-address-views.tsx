"use client";

import { ExternalLink } from "lucide-react";
import { DEFAULT_LIMIT, Pagination } from "@shinzo/ui/pagination";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { EmptyTableState } from "@/shared/ui/empty-table-state";
import { Typography } from "@/shared/ui/typography";
import { formatHash } from "@/shared/utils/format-hash";
import { Container } from "@/widgets/layout";
import { useShinzohubAddressViews } from "../api/use-shinzohub-address-views";

export interface ShinzohubAddressViewsProps {
  address: string;
  enabled: boolean;
  page: number;
}

export function ShinzohubAddressViews({
  address,
  enabled,
  page,
}: ShinzohubAddressViewsProps) {
  const { data, isLoading, error } = useShinzohubAddressViews({
    address,
    enabled,
    limit: DEFAULT_LIMIT,
    page,
  });

  if (error) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Failed to load created views.
      </p>
    );
  }

  return (
    <>
      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound={(
          <EmptyTableState
            variant="content"
            title="No views created by this address."
            description="Registered views will appear here."
          />
        )}
        headings={["View", "View address", "Height"]}
        gridClass="grid-cols-[minmax(180px,1fr)_minmax(180px,0.8fr)_110px]"
        iterable={data?.views ?? []}
        rowRenderer={(view) => (
          <>
            <TableNullableCell value={view.name}>
              {(name) => (
                <a
                  href={view.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 items-center gap-1 text-text-accent underline"
                >
                  <span className="truncate">{name}</span>
                  <ExternalLink aria-hidden className="size-3.5 shrink-0" />
                </a>
              )}
            </TableNullableCell>

            <TableNullableCell value={view.viewAddress}>
              {(viewAddress) => (
                <ShinzohubAddressLink address={viewAddress} copyable className="font-mono">
                  {formatHash(viewAddress, 10, 8)}
                </ShinzohubAddressLink>
              )}
            </TableNullableCell>

            <TableNullableCell value={view.height}>
              {(height) => (
                <Typography variant="sm" font="mono">
                  {height}
                </Typography>
              )}
            </TableNullableCell>
          </>
        )}
      />

      <Container className="flex translate-y-[-1px] items-end justify-between">
        <div />
        <Pagination
          page={page}
          pageParam="viewsPage"
          totalItems={data?.totalViewsCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
}
