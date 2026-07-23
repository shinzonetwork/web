"use client";

import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@shinzo/ui/skeleton";
import { ViewLensBadge } from "@/entities/view";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";
import { navigateWithAnchorClick } from "@/shared/utils/browser-location";
import { useViewPage } from "../model/use-view";
import { useViewPools } from "../model/use-view-pools";
import { deriveViewAvailability } from "../model/view-availability";
import type { ViewPageRecord } from "../model/types";
import { TechnicalDetails } from "./technical-details";
import { ViewOverview } from "./view-overview";
import { ViewPlayground } from "./view-playground";
import { ViewPoolsSection } from "./view-pools-section";

const ViewPageSkeleton = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-5 py-10 sm:px-6">
      <div className="h-10 w-32">
        <Skeleton />
      </div>
      <div className="h-28 w-full">
        <Skeleton />
      </div>
      <div className="h-40 w-full">
        <Skeleton />
      </div>
      <div className="h-[520px] w-full">
        <Skeleton />
      </div>
    </main>
  </div>
);

const ViewPageError = ({ error }: { error: string }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <Button asChild variant="secondary" className="gap-2 self-start">
        <a href="/" onClick={(event) => navigateWithAnchorClick(event, "/")}>
          <ArrowLeft className="size-4" />
          Views
        </a>
      </Button>
      <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    </main>
  </div>
);

const ViewPageContent = ({ view }: { view: ViewPageRecord }) => {
  const poolState = useViewPools(view.id);
  const availability = deriveViewAvailability(poolState);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full min-w-0 max-w-[1400px] flex-col gap-12 px-5 py-10 sm:px-6 lg:py-14">
        <div className="flex min-w-0 flex-col gap-4 border-b border-ui-border pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Button asChild variant="secondary" className="mb-5 gap-2">
              <a
                href="/"
                onClick={(event) => navigateWithAnchorClick(event, "/")}
              >
                <ArrowLeft className="size-4" />
                Views
              </a>
            </Button>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-ui-text-accent">
              View
            </p>
            <h1
              title={`/ ${view.name}`}
              className="truncate whitespace-nowrap font-mono text-4xl font-normal leading-tight tracking-[-0.04em] text-szo-black md:text-5xl"
            >
              / {view.name}
            </h1>
          </div>

          <div className="shrink-0">
            <ViewLensBadge lens={view.lens} showIcon />
          </div>
        </div>

        <ViewOverview view={view} availability={availability} />
        <ViewPlayground view={view} availability={availability} />
        <ViewPoolsSection state={poolState} />
        <TechnicalDetails view={view} poolState={poolState} />
      </main>
    </div>
  );
};

export const ViewPage = () => {
  const view = useViewPage();

  if (view.status === "loading") {
    return <ViewPageSkeleton />;
  }

  if (view.status === "error") {
    return <ViewPageError error={view.error} />;
  }

  return <ViewPageContent view={view.view} />;
};
