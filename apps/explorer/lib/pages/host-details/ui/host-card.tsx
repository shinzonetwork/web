"use client";

import { useMemo, useState } from "react";
import { DataItem, DataList } from "@/widgets/data-list";
import { useHostDetails } from "../hook/use-host-details";
import { CopyButton } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  createHealthEntryKey,
  ipFromConnectionString,
  useHealthPolling,
  type HealthStatus,
  type LiveData,
  formatUptime,
  formatTime,
} from "@/shared/health";

export type HostCardOptions = { address: string };

export const HostCard = (options: HostCardOptions) => {
  const { data: hostDetails, isLoading } = useHostDetails(options.address);
  const [healthData, setHealthData] = useState<LiveData | null>(null);

  const hostEntry = useMemo(() => {
    if (!hostDetails?.host) return null;
    return {
      address: hostDetails.host.address,
      ip: ipFromConnectionString(hostDetails.host.connectionString),
    };
  }, [hostDetails]);

  useHealthPolling({
    entries: hostEntry ? [hostEntry] : [],
    resetKey: hostEntry?.address,
    toHealthEntry: (host) => ({
      address: host.address,
      ip: host.ip,
    }),
    onResults: (liveDataByKey) => {
      if (!hostEntry) return;
      const key = createHealthEntryKey(hostEntry);
      const data = liveDataByKey.get(key);
      if (data) setHealthData(data);
    },
  });

  const status: HealthStatus = healthData?.status ?? "unknown";

  if (!hostDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="md" color="accent">
          Host not found
        </Typography>
      </div>
    );
  }

  const { host } = hostDetails;

  return (
    <>
    <DataList>
      <DataItem title="Status" value={status} loading={isLoading}>
          {status !== "unknown" ? (
            <Badge
              variant="default"
              className={cn(
                "rounded-md capitalize",
                status === "healthy"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {status === "healthy" ? "Online" : "Offline"}
            </Badge>
          ) : (
            <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
          )}
        </DataItem>
        <DataItem title="Address" value={host?.address} loading={isLoading}>
          <div className="flex items-center gap-2">
            {host?.address}
            <CopyButton
              text={host?.address || ""}
              className="text-muted-foreground"
            />
          </div>
        </DataItem>

        <DataItem title="DID key" value={host?.did} loading={isLoading}>
          <div className="flex items-center gap-2">
            {host?.did}
            <CopyButton
              text={host?.did || ""}
              className="text-muted-foreground"
            />
          </div>
        </DataItem>
        <DataItem
          title="Uptime"
          value={
            healthData?.uptime_seconds
              ? formatUptime(healthData.uptime_seconds)
              : "—"
          }
          loading={isLoading || status === "unknown"}
        />

        <DataItem
          title="Current block"
          value={healthData?.current_block === 0 ? "—" : healthData?.current_block}
          loading={isLoading || status === "unknown"}
        />

        <DataItem
          title="Last updated"
          value={
            healthData?.last_processed
              ? formatTime(healthData.last_processed)
              : undefined
          }
          loading={isLoading || status === "unknown"}
        />

        <DataItem
          title="Connection string"
          value={host?.connectionString}
          loading={isLoading}
          allowWrap
        >
          <div className="flex items-start gap-2 min-w-0">
            <span className="break-all">{host?.connectionString}</span>
            <CopyButton
              text={host?.connectionString || ""}
              className="text-muted-foreground shrink-0"
            />
          </div>
        </DataItem>

        <DataItem
          title="Endpoint URL"
          value={host?.endpointAddress}
          loading={isLoading}
          allowWrap
        >
          <div className="flex items-start gap-2 min-w-0">
            <span className="break-all">{host?.endpointAddress || "—"}</span>
            {host?.endpointAddress && (
              <CopyButton
                text={host?.endpointAddress}
                className="text-muted-foreground shrink-0"
              />
            )}
          </div>
        </DataItem>
      </DataList>

      <div className="col-span-3 h-8 w-full border-y border-border" />

      <DataList>
        <DataItem title="Peers Connection Status" value={healthData?.p2p?.enabled} loading={isLoading} >
            <Badge
              variant="default"
              className={cn(
                "rounded-md capitalize",
                healthData?.p2p?.enabled
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {healthData?.p2p?.enabled ? "Enabled" : "Disabled"}
            </Badge>
        </DataItem>
        <DataItem
            title="Connected peers"
            value={healthData?.p2p?.enabled}
            loading={isLoading}
            allowWrap
          >
            {(healthData?.p2p?.peers?.length ?? 0) > 0 ? (
            <div className="flex flex-col gap-2 min-w-0 w-full">
              {healthData?.p2p?.peers?.map((peer, index) => (
                <>
                  <div key={peer.id} className="flex items-start gap-2 min-w-0">
                    <Typography className="break-all">
                      {`${peer.addresses[0]}/p2p/${peer.id}`}
                    </Typography>
                    <CopyButton
                      text={`${peer.addresses[0]}/p2p/${peer.id}`}
                      className="text-muted-foreground shrink-0"
                    />
                  </div>
                  {index < (healthData?.p2p?.peers?.length ?? 0) - 1 && (
                    <div className="h-1 w-full border-b border-border" />
                  )}
                </>
              ))}
            </div>
            ) : '—'}
          </DataItem>
      </DataList>
    </>
  );
};
