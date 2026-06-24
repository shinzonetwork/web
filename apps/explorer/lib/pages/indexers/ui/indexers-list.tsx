"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT } from "@shinzo/ui/pagination";
import { Badge } from "@/shared/ui/badge";
import { ArrowRightIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { IndexerWithHealth } from "./indexers-page";
import { formatTime, formatUptime } from "@/shared/health";
import Link from "next/link";
import { getPageLink } from "@/shared/utils/links";
import { Typography } from "@/shared/ui/typography";

const tableHeadings = [
  "Address",
  "Status",
  "Chain",
  "Uptime",
  "Current Block",
  "Last Updated",
  ''
];

export const IndexersList = ({
  indexers,
  indexerLoading,
}: {
  indexers: IndexerWithHealth[];
  indexerLoading: boolean;
}) => {

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
      <TableLayout
        isLoading={indexerLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound="No Indexers are registered yet."
        headings={indexers.length > 0 ? tableHeadings : [""]}
        gridClass="grid-cols[repeat(5,1fr)]"
        iterable={indexers ?? []}
        rowRenderer={(indexer) => (
          <>
            <TableNullableCell value={indexer?.address}>
              {(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            </TableNullableCell>

            <TableNullableCell value={indexer?.status} nowrap>
              {(value) => (
                <>
                  {value !== "unknown" && (
                    <Badge
                      variant={"default"}
                      className={cn(
                        "rounded-md capitalize",
                        value === "healthy" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {value === "healthy" ? "Online" : "Offline"}
                    </Badge>
                  )}
                  {value === "unknown" && (
                    <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
                  )}
                </>
              )}
            </TableNullableCell>

            <TableNullableCell value={indexer?.sourceChain}>
              {(value) => (
                <span className="text-sm text-foreground">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            </TableNullableCell>

              <TableNullableCell value={indexer?.uptime_seconds}>
                {(value) => (
                  <span className="text-sm text-foreground">{value ? formatUptime(value) : '—'}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.current_block}>
                {(value) => (
                  <span className="text-sm text-foreground">{value !== 0 ? value : '—'}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.last_processed}>
                {(value) => (
                  <span className="text-sm text-foreground">{value ? formatTime(value) : '—'}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.address}>
                {(value) => (
                    <Link prefetch={false} href={getPageLink('indexer', { address: value, chain: 'shinzohub' })}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Typography color="accent" font="mono" className="underline text-accent/75 hover:text-accent">View</Typography>
                        <ArrowRightIcon className="size-4 text-accent/75 hover:text-accent" />
                      </div>
                    </Link>
                )}
              </TableNullableCell>
          </>)}
        />
      </div>
    </section>
  );
}
