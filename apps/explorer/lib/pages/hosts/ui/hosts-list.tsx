"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT } from "@shinzo/ui/pagination";
import { Badge } from "@/shared/ui/badge";
import { ArrowRightIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { HostWithHealth } from "./hosts-page";
import Link from "next/link";
import { getPageLink } from "@/shared/utils/links";
import { Typography } from "@/shared/ui/typography";
import { formatUptime, formatTime } from "@/shared/health";

const tableHeadings = [
  "Address",
  "Status",
  "Uptime",
  "Current Block",
  "Last Updated",
  ''
];

export const HostsList = ({
  hosts,
  hostLoading,
}: {
  hosts: HostWithHealth[];
  hostLoading: boolean;
}) => {

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
      <TableLayout
        isLoading={hostLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound="No Indexers are registered yet."
        headings={hosts.length > 0 ? tableHeadings : [""]}
        gridClass="grid-cols[repeat(5,1fr)]"
        iterable={hosts ?? []}
        rowRenderer={(host) => (
          <>
            <TableNullableCell value={host?.address}>
              {(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            </TableNullableCell>
            <TableNullableCell value={host?.status} nowrap>
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
              <TableNullableCell value={host?.uptime_seconds}>
                {(value) => (
                  <span className="text-sm text-foreground">{value ? formatUptime(value) : '—'}</span>
                )}
              </TableNullableCell>
              <TableNullableCell value={host?.current_block}>
                {(value) => (
                  <span className="text-sm text-foreground">{value !== 0 ? value : '—'}</span>
                )}
              </TableNullableCell>
              <TableNullableCell value={host?.last_processed}>
                {(value) => (
                  <span className="text-sm text-foreground">{value ? formatTime(value) : '—'}</span>
                )}
              </TableNullableCell>
              <TableNullableCell value={host?.address}>
                {(value) => (
                    <Link prefetch={false} href={getPageLink('host', { address: value, chain: 'shinzohub' })}>
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
