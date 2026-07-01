"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT } from "@shinzo/ui/pagination";
import { Badge } from "@/shared/ui/badge";
import { EmptyTableState } from "@/shared/ui/empty-table-state";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { GeneratorWithHealth } from "./generators-page";
import { formatTime, formatUptime } from "@/shared/health";
import Link from "next/link";
import { Typography } from "@/shared/ui/typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { formatHash } from "@/shared/utils/format-hash";
import { getHealthUrl } from "@/shared/health/lib/utils";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";

const tableHeadings = [
  "Generator Public IP",
  "Address",
  "Status",
  "Chain",
  "Uptime",
  "Current Block",
  "Last Updated",
  ''
];

export const GeneratorsList = ({
  generators,
  generatorLoading,
}: {
  generators: GeneratorWithHealth[];
  generatorLoading: boolean;
}) => {

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
      <TableLayout
        isLoading={generatorLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound={(
          <EmptyTableState
            variant="content"
            title="No generators are registered yet."
            description="Registered generators and their sync status will appear here."
          />
        )}
        headings={generators.length > 0 ? tableHeadings : [""]}
        gridClass="grid-cols[repeat(5,1fr)]"
        iterable={generators ?? []}
        rowRenderer={(generator) => (
          <>

            <TableNullableCell value={generator?.address}>
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

            <TableNullableCell value={generator?.ip}>
              {(value) => (
              <Link prefetch={false} target="_blank" href={getHealthUrl(value)}>
                <Typography color='accent' className='underline'>
                  {value}
                </Typography>
              </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={generator?.status} nowrap>
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

            <TableNullableCell value={generator?.sourceChain}>
              {(value) => (
                <span className="text-sm text-foreground">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            </TableNullableCell>

              <TableNullableCell value={generator?.uptime_seconds}>
                {(value) => (
                  <span className="text-sm text-foreground">{value ? formatUptime(value) : '—'}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={generator?.current_block}>
                {(value) => (
                  <span className="text-sm text-foreground">{value !== 0 ? value : '—'}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={generator?.last_processed}>
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
