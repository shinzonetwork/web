"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT } from "@shinzo/ui/pagination";
import { Badge } from "@/shared/ui/badge";
import { EmptyTableState } from "@/shared/ui/empty-table-state";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { HostWithHealth } from "./hosts-page";
import Link from "next/link";
import { Typography } from "@/shared/ui/typography";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { formatUptime, formatTime } from "@/shared/health";
import { formatHash } from "@/shared/utils/format-hash";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { getHealthUrl } from "@/shared/health/lib/utils";

const tableHeadings = [
  "Address",
  "Host Public IP",
  "Status",
  "Uptime",
  "Current Block",
  "Last Updated",
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
        notFound={(
          <EmptyTableState
            variant="content"
            title="No hosts are registered yet."
            description="Registered hosts and their health status will appear here."
          />
        )}
        headings={hosts.length > 0 ? tableHeadings : [""]}
        gridClass="grid-cols[repeat(5,1fr)]"
        iterable={hosts ?? []}
        rowRenderer={(host) => (
          <>
            <TableNullableCell value={host?.address}>
              {(value) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex min-w-0">
                      <ShinzohubAddressLink address={value} copyable className="font-mono">
                        {formatHash(value, 12, 8)}
                      </ShinzohubAddressLink>
                    </span>
                  </TooltipTrigger>

                  <TooltipContent>
                      <Typography variant='xs' color='secondary'>
                        {value}
                      </Typography>
                  </TooltipContent>
                </Tooltip>
              )}
            </TableNullableCell>

            <TableNullableCell value={host?.ip}>
              {(value) => (
              <Link prefetch={false} target="_blank" href={getHealthUrl(value)}>
                <Typography color='accent' className='underline'>
                  {value}
                </Typography>
              </Link>
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
          </>)}
        />
      </div>
    </section>
  );
}
