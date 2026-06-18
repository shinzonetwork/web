"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT } from "@shinzo/ui/pagination";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { formatHash } from "@/shared/utils/format-hash";
import { CopyButton } from "@shinzo/ui/copy-button";
import { Badge } from "@/shared/ui/badge";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { HostWithHealth } from "./host-page";

const tableHeadings = [
  "Address",
  "DID",
  "Connection String",
  "Endpoint Address",
  "Status",
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

            <TableNullableCell value={host?.did}>
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-foreground">
                          {formatHash(value, 15, 5)}
                        </span>
                        <CopyButton text={value ?? ""} className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={6}
                      className="font-normal font-mono break-all"
                    >
                      {value}
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableNullableCell>

              <TableNullableCell
                value={host?.connection_string ?? "—"}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground wrap-break-word break-all">
                            {formatHash(value, 20, 10)}
                          </span>
                          <CopyButton text={value ?? ""} className="size-4" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={6}
                      className="font-normal font-mono break-all"
                    >
                      {value}
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableNullableCell>
                
              <TableNullableCell
                value={host?.endpoint_address ?? undefined}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground wrap-break-word break-all">
                            {value ? formatHash(value, 20, 10) : "—"}
                          </span>
                          <CopyButton text={value ?? ""} className="size-4" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={6}
                      className="font-normal font-mono break-all"
                    >
                      {value}
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableNullableCell>

              <TableNullableCell value={host?.status} nowrap>
              {(value) => (
                <>
                  {value !== "unknown" && (
                    <Badge
                      variant={value === "healthy" ? "default" : "destructive"}
                      className={cn(
                        "rounded-md capitalize",
                        value === "healthy" && "bg-green-600 text-white"
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
          </>)}
        />
      </div>
    </section>
  );
}
