"use client";

import { ExternalLink } from "lucide-react";
import { DEFAULT_LIMIT, Pagination } from "@shinzo/ui/pagination";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
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
          <div className="flex flex-col items-center gap-1 text-center">
            <Typography variant="md">
              No views created by this address.
            </Typography>
            <Typography variant="sm" color="secondary">
              Registered views will appear here.
            </Typography>
          </div>
        )}
        headings={["View", "Contract", "Height"]}
        gridClass="grid-cols-[minmax(0,55%)_minmax(0,1fr)_140px]"
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

            <TableNullableCell value={view.contractAddress}>
              {(contractAddress) => (
                <ShinzohubAddressLink address={contractAddress} copyable className="font-mono">
                  {formatHash(contractAddress, 10, 8)}
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
