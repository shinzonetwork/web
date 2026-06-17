"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { Pagination } from "@shinzo/ui/pagination";
import { useHealthCheck, useHealthPolling } from "@/features/indexer-list";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";
import { useCursorPagePagination } from "../hooks/use-cursor-page-pagination";
import {
  cn,
  formatHash,
  indexerEntryKey,
  ipFromConnectionString,
} from "@/shared/lib";
import { HealthStatus } from "@/shared/types";
import { CopyToClipboard } from "@/widget";
import { LoaderCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

const HOSTS_PAGE_PARAM = "hostsPage";
const HOSTS_CURSOR_KEY = "registered-hosts-cursor-key";
const PAGE_SIZE = 5;

const tableHeadings = [
  "Address",
  "DID",
  "Endpoint Address",
  "Connection String",
  "Status",
];

function HostsHomeContent() {
  const router = useRouter();
  const [healthByKey, setHealthByKey] = useState<Map<string, HealthStatus>>(
    new Map()
  );
  const { fetchHealth } = useHealthCheck();
  const { page, queryParams, applyPaginationData, totalItems } =
    useCursorPagePagination({
      pageParam: HOSTS_PAGE_PARAM,
      storageKey: HOSTS_CURSOR_KEY,
      limit: PAGE_SIZE,
    });

  const { data: registeredHosts, isPending } = useRegisteredHosts(queryParams);
  const hosts = useMemo(
    () =>
      registeredHosts?.hosts.map((host) => ({
        ...host,
        ip: ipFromConnectionString(host.connection_string),
      })) ?? [],
    [registeredHosts]
  );

  const pageTotal = Number(registeredHosts?.pagination?.total ?? 0);
  const nextKey = registeredHosts?.pagination?.next_key;

  useEffect(() => {
    if (registeredHosts) {
      applyPaginationData(nextKey, pageTotal);
    }
  }, [registeredHosts, nextKey, pageTotal, applyPaginationData]);

  useHealthPolling({
    entries: hosts,
    resetKey: page,
    toHealthEntry: (host) => ({
      validatorAddress: host.address,
      ip: host.ip,
    }),
    fetchHealth,
    onResults: (liveDataByKey) => {
      setHealthByKey((prev) => {
        const next = new Map(prev);
        for (const [key, data] of liveDataByKey) {
          if (data.health) next.set(key, data.health);
        }
        return next;
      });
    },
  });

  const hostsWithHealth = useMemo(
    () =>
      hosts.map((host) => {
        const key = indexerEntryKey({
          validatorAddress: host.address,
          ip: host.ip,
        });
        return {
          ...host,
          health: healthByKey.get(key) ?? ("unknown" as HealthStatus),
        };
      }),
    [hosts, healthByKey]
  );

  const handleRegisterAsHost = () => {
    router.push("/host-registration");
  };

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="mb-8 flex min-w-0 p-8 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-h2 text-h2 text-black slash-separator uppercase wrap-break-word">
            Registered Hosts
          </h2>
          <p className="font-mono text-muted-foreground mt-2 wrap-break-word">
            INFRASTRUCTURE LAYER / DATA AVAILABILITY
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 self-start px-6 py-3 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-none transition-opacity hover:opacity-90 active:opacity-80 sm:self-auto sm:px-8"
          onClick={handleRegisterAsHost}
        >
          Register as Host
        </button>
      </div>
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
        <TableLayout
          isLoading={isPending}
          loadingRowCount={PAGE_SIZE}
          notFound="No hosts are registered yet."
          headings={hostsWithHealth.length > 0 ? tableHeadings : [""]}
          gridClass="grid-cols[repeat(4,1fr)]"
          iterable={hostsWithHealth}
          rowRenderer={(host) => (
            <>
              <TableNullableCell value={host?.address}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={host?.did} nowrap>
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-foreground">
                          {formatHash(value, 15, 5)}
                        </span>
                        <CopyToClipboard text={value} />
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
                value={host?.endpoint_address}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-foreground wrap-break-word break-all">
                          {formatHash(value, 20, 10)}
                        </span>
                        <CopyToClipboard text={value} />
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
                value={host?.connection_string}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-foreground wrap-break-word break-all">
                          {value ? formatHash(value, 20, 10) : "—"}
                        </span>
                        <CopyToClipboard text={value} />
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
              <TableNullableCell value={host?.health} nowrap>
                {(value) => (
                  <>
                    {value !== "unknown" && (
                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-xs",
                          value === "healthy"
                            ? "bg-success/20 text-success"
                            : "bg-destructive/20 text-destructive"
                        )}
                      >
                        {value === "healthy" ? "Online" : "Offline"}
                      </span>
                    )}
                    {value === "unknown" && (
                      <span className="px-2 py-1 rounded-md text-xs text-muted-foreground">
                        <LoaderCircle className="w-4 h-4 animate-spin text-muted-foreground" />
                      </span>
                    )}
                  </>
                )}
              </TableNullableCell>
            </>
          )}
        />
        <div className="pr-6">
          <Pagination
            page={page}
            totalItems={totalItems}
            itemsPerPage={PAGE_SIZE}
            pageParam={HOSTS_PAGE_PARAM}
          />
        </div>
      </div>
    </section>
  );
}

export function HostsHome() {
  return (
    <Suspense fallback={null}>
      <HostsHomeContent />
    </Suspense>
  );
}
