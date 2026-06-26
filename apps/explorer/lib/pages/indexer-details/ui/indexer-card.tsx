"use client";

import { useMemo } from "react";
import { DataItem, DataList } from "@/widgets/data-list";
import { CopyButton } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  ipFromConnectionString,
  type HealthStatus,
  formatUptime,
  formatTime,
} from "@/shared/health";
import { useIndexerDetails } from "../hook/use-indexer-details";
import { useIndexerHealthCheck } from "../hook/use-indexer-health-check";

export type IndexerCardOptions = { address: string };

export const IndexerCard = (options: IndexerCardOptions) => {
  const { data: indexerDetails, isLoading } = useIndexerDetails(options.address);

  const indexerEntry = useMemo(() => {
    if (!indexerDetails?.indexer) return null;
    return {
      address: indexerDetails.indexer.address,
      ip: ipFromConnectionString(indexerDetails.indexer.connectionString),
    };
  }, [indexerDetails]);

  const { data: healthResult } = useIndexerHealthCheck(indexerEntry, {
    refetchIntervalMs: 30_000,
  });
  const healthData = healthResult?.data ?? null;

  const status: HealthStatus = healthData?.status ?? "unknown";

  if (!indexerDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="md" color="accent">
          Indexer not found
        </Typography>
      </div>
    );
  }

  const { indexer } = indexerDetails;

  return (
    <>
      <div className="col-span-3 h-12 w-full border-y border-border" />
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
          <DataItem title="Address" value={indexer?.address} loading={isLoading}>
            <div className="flex items-center gap-2">
              {indexer?.address}
              <CopyButton
                text={indexer?.address || ""}
                className="text-muted-foreground"
              />
            </div>
          </DataItem>

          <DataItem title="DID key" value={indexer?.did} loading={isLoading}>
            <div className="flex items-center gap-2">
              {indexer?.did}
              <CopyButton
                text={indexer?.did || ""}
                className="text-muted-foreground"
              />
            </div>
          </DataItem>
          <DataItem title="Chain" value={indexer?.sourceChain} loading={isLoading} />
          <DataItem title="Chain ID" value={indexer?.sourceChainId} loading={isLoading} />
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
            value={indexer?.connectionString}
            loading={isLoading}
            allowWrap
          >
            <div className="flex items-start gap-2 min-w-0">
              <span className="break-all">{indexer?.connectionString}</span>
              <CopyButton
                text={indexer?.connectionString || ""}
                className="text-muted-foreground shrink-0"
              />
            </div>
          </DataItem>
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
