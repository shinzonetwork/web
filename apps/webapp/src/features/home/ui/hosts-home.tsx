"use client";

import { Suspense, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { Pagination } from "@shinzo/ui/pagination";
import { useRegisteredHosts } from "../hooks/hosts/use-registered-hosts";
import { useOffsetPagePagination } from "../hooks/use-offset-page-pagination";
import {
  cn,
  formatHash,
  HostHealthData,
  ipFromConnectionString,
  RegisteredHost,
} from "@/shared/lib";
import { HealthStatus } from "@/shared/types";
import { CopyToClipboard } from "@/widget";
import { LoaderCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import {
  createHealthEntryKey,
  PAGE_SIZE,
} from "../../../shared/lib/shinzohub/health";
import { useHostHealthPolling } from "../hooks/hosts/use-host-health-polling";

export type HostWithHealth = RegisteredHost &
  Pick<HostHealthData, "status"> & {
    ip: string;
  };

const HOSTS_PAGE_PARAM = "hostsPage";

const tableHeadings = ["Address", "DID", "Connection String", "Status"];

function HostsHomeContent() {
  const router = useRouter();
  const pageParams = useOffsetPagePagination(HOSTS_PAGE_PARAM, PAGE_SIZE);
  const { page } = pageParams;
  const { data: registeredHosts, isPending } = useRegisteredHosts({
    pageParams,
  });

  const hosts: HostWithHealth[] = useMemo(
    () =>
      registeredHosts?.hosts.map((host) => ({
        ...host,
        ip: ipFromConnectionString(host.connectionString),
        status: "unknown" as HealthStatus,
      })) ?? [],
    [registeredHosts]
  );

  const healthByKey = useHostHealthPolling<HostWithHealth>({
    entries: hosts,
    resetKey: page,
    toHealthEntry: (host) => ({
      address: host.address,
      ip: host.ip,
    }),
  });

  const hostsWithHealth = useMemo(
    () =>
      hosts.map((host) => {
        const key = createHealthEntryKey({
          address: host.address,
          ip: host.ip,
        });
        const healthData = healthByKey.get(key);
        return {
          ...host,
          status: healthData?.status ?? ("unknown" as HealthStatus),
        };
      }),
    [hosts, healthByKey]
  );

  const handleRegisterAsHost = () => {
    router.push("/host-registration");
  };

  const showPagination =
    registeredHosts?.totalHostsCount &&
    registeredHosts?.totalHostsCount > PAGE_SIZE;

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
                value={host?.connectionString}
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
              <TableNullableCell value={host?.status} nowrap>
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
        {showPagination && (
          <div className="pr-6">
            <Pagination
              page={page}
              totalItems={registeredHosts?.totalHostsCount ?? 0}
              itemsPerPage={PAGE_SIZE}
              pageParam={HOSTS_PAGE_PARAM}
            />
          </div>
        )}
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
