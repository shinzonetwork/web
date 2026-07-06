"use client";

import { Suspense, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { Pagination } from "@shinzo/ui/pagination";
import { useRegisteredGenerators } from "../hooks/generators/use-registered-generators";
import { useOffsetPagePagination } from "../hooks/use-offset-page-pagination";
import { CopyToClipboard } from "@/widget";
import {
  cn,
  formatHash,
  GeneratorHealthData,
  ipFromConnectionString,
  isGeneratorHealthPollable,
  Generator,
} from "@/shared/lib";
import { HealthStatus } from "@/shared/types";
import { LoaderCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import {
  createHealthEntryKey,
  PAGE_SIZE,
} from "../../../shared/lib/shinzohub/health";
import { useGeneratorHealthPolling } from "../hooks/generators/use-generator-health-polling";

export type GeneratorWithHealth = Generator &
  Pick<GeneratorHealthData, "status"> & {
    ip: string;
  };

const GENERATORS_PAGE_PARAM = "generatorsPage";

const tableHeadings = [
  "Address",
  "DID",
  "Chain",
  "Connection String",
  "Status",
];

function GeneratorHomeContent() {
  const router = useRouter();
  const pageParams = useOffsetPagePagination(GENERATORS_PAGE_PARAM, PAGE_SIZE);
  const { page } = pageParams;
  const { data: registeredGenerators, isPending } = useRegisteredGenerators({
    pageParams,
  });

  const generators: GeneratorWithHealth[] = useMemo(
    () =>
      registeredGenerators?.generators.map((generator: Generator) => ({
        ...generator,
        ip: ipFromConnectionString(generator.connectionString),
        status: "unknown" as HealthStatus,
      })) ?? [],
    [registeredGenerators?.generators]
  );

  const healthByKey = useGeneratorHealthPolling<GeneratorWithHealth>({
    entries: generators,
    resetKey: page,
    isPollable: isGeneratorHealthPollable,
    toHealthEntry: (generator) => ({
      address: generator.operatorAddress,
      ip: generator.ip,
    }),
  });

  const generatorsWithHealth = useMemo(
    () =>
      generators.map((generator) => {
        const pollable = isGeneratorHealthPollable(generator);
        const key = createHealthEntryKey({
          address: generator.operatorAddress,
          ip: generator.ip,
        });
        const healthData = pollable ? healthByKey.get(key) : undefined;
        return {
          ...generator,
          status: pollable
            ? (healthData?.status ?? ("unknown" as HealthStatus))
            : ("unknown" as HealthStatus),
        };
      }),
    [generators, healthByKey]
  );

  const handleRegisterAsGenerator = () => {
    router.push("/generator-registration");
  };

  const showPagination =
    registeredGenerators?.totalGeneratorsCount &&
    registeredGenerators?.totalGeneratorsCount > PAGE_SIZE;

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="mb-8 flex min-w-0 p-8 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-h2 text-h2 text-foreground slash-separator uppercase wrap-break-word">
            Registered Generators
          </h2>
          <p className="font-mono text-muted-foreground mt-2 wrap-break-word">
            NETWORK LAYER / INDEXING SERVICES
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground rounded-none transition-opacity hover:opacity-90 active:opacity-80 sm:self-auto sm:px-8"
          onClick={handleRegisterAsGenerator}
        >
          REGISTER AS GENERATOR
        </button>
      </div>
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
        <TableLayout
          isLoading={isPending}
          loadingRowCount={PAGE_SIZE}
          notFound="No Generators are registered yet."
          headings={generatorsWithHealth.length > 0 ? tableHeadings : [""]}
          gridClass="grid-cols[repeat(5,1fr)]"
          iterable={generatorsWithHealth}
          rowRenderer={(generator) => (
            <>
              <TableNullableCell value={generator?.operatorAddress}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={generator?.did}>
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

              <TableNullableCell value={generator?.sourceChain}>
                {(value) => (
                  <span className="text-sm text-foreground">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              </TableNullableCell>

              <TableNullableCell
                value={generator?.connectionString}
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
                          <CopyToClipboard text={value} />
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

              <TableNullableCell value={generator?.status} nowrap>
                {(value) => (
                  <>
                    {!isGeneratorHealthPollable(generator) ? (
                      <span className="px-2 py-1 rounded-md text-xs bg-muted-foreground/20 text-muted-foreground">
                        Unknown
                      </span>
                    ) : value !== "unknown" ? (
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
                    ) : (
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
              totalItems={registeredGenerators?.totalGeneratorsCount ?? 0}
              itemsPerPage={PAGE_SIZE}
              pageParam={GENERATORS_PAGE_PARAM}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function GeneratorsHome() {
  return (
    <Suspense fallback={null}>
      <GeneratorHomeContent />
    </Suspense>
  );
}
