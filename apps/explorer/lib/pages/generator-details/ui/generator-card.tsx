"use client";

import { Fragment, useMemo } from "react";
import { DataItem, DataList } from "@/widgets/data-list";
import { CopyButton } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  ipFromConnectionString,
  isGeneratorHealthPollable,
  type HealthStatus,
  formatUptime,
  formatTime,
} from "@/shared/health";
import { useGeneratorDetails } from "../hook/use-generator-details";
import { useGeneratorHealthCheck } from "../hook/use-generator-health-check";

export type GeneratorCardOptions = { address: string };

export const GeneratorCard = (options: GeneratorCardOptions) => {
  const { data: generator, isLoading } = useGeneratorDetails(options.address);

  const generatorEntry = useMemo(() => {
    if (!generator) return null;
    return {
      address: generator.operatorAddress,
      ip: ipFromConnectionString(generator.connectionString),
    };
  }, [generator]);

  const { data: healthResult } = useGeneratorHealthCheck(generatorEntry, {
    refetchIntervalMs: 30_000,
    pollable: generator ? isGeneratorHealthPollable(generator) : false,
  });
  const healthData = healthResult?.data ?? null;

  const pollable = generator ? isGeneratorHealthPollable(generator) : false;
  const status: HealthStatus = pollable
    ? (healthData?.status ?? "unknown")
    : "unknown";

  if (!isLoading && !generator) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="md" color="accent">
          Generator not found
        </Typography>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-3 h-12 w-full border-y border-border" />
      <DataList>
        <DataItem title="Status" value={status} loading={isLoading}>
          {!pollable ? (
            <Typography variant="md" color="secondary">
              —
            </Typography>
          ) : status !== "unknown" ? (
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
        <DataItem title="Address" value={generator?.operatorAddress} loading={isLoading}>
          <ShinzohubAddressLink
            address={generator?.operatorAddress}
            copyable
            fallback="—"
            className="break-all font-mono"
          />
        </DataItem>

        <DataItem title="DID key" value={generator?.did} loading={isLoading}>
          <div className="flex items-center gap-2">
            {generator?.did}
            <CopyButton
              text={generator?.did || ""}
              className="text-muted-foreground"
            />
          </div>
        </DataItem>
        <DataItem title="Chain" value={generator?.sourceChain} loading={isLoading} />
        <DataItem title="Chain ID" value={generator?.sourceChainId} loading={isLoading} />
        <DataItem
          title="Uptime"
          value={
            healthData?.uptime_seconds
              ? formatUptime(healthData.uptime_seconds)
              : "—"
          }
          loading={isLoading || (pollable && status === "unknown")}
        />

        <DataItem
          title="Current block"
          value={healthData?.current_block === 0 ? "—" : healthData?.current_block}
          loading={isLoading || (pollable && status === "unknown")}
        />

        <DataItem
          title="Last updated"
          value={
            healthData?.last_processed
              ? formatTime(healthData.last_processed)
              : undefined
          }
          loading={isLoading || (pollable && status === "unknown")}
        />

        <DataItem
          title="Connection string"
          value={generator?.connectionString}
          loading={isLoading}
          allowWrap
        >
          <div className="flex items-start gap-2 min-w-0">
            <span className="break-all">{generator?.connectionString}</span>
            <CopyButton
              text={generator?.connectionString || ""}
              className="text-muted-foreground shrink-0"
            />
          </div>
        </DataItem>
        <DataItem title="Peers Connection Status" value={healthData?.p2p?.enabled} loading={isLoading}>
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
                <Fragment key={peer.id}>
                  <div className="flex items-start gap-2 min-w-0">
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
                </Fragment>
              ))}
            </div>
          ) : (
            "—"
          )}
        </DataItem>
      </DataList>
    </>
  );
};
