"use client";

import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@shinzo/ui/skeleton";
import { ViewAddressChip, ViewLensBadge } from "@/entities/view";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";
import { navigateWithAnchorClick } from "@/shared/utils/browser-location";
import { useViewPage } from "../model/use-view";
import type { ViewPageRecord } from "../model/types";
import { NetworkBilling } from "./network-billing";
import { ViewPlayground } from "./view-playground";

const ViewMeta = ({ view }: { view: ViewPageRecord }) => (
  <dl className="grid min-w-0 gap-4 border-y border-ui-border py-5 text-sm md:grid-cols-2 xl:grid-cols-4">
    <div className="min-w-0">
      <dt className="mb-1 text-xs uppercase text-ui-text-muted">
        View address
      </dt>
      <dd>
        <ViewAddressChip link={view.viewAddressLink} />
      </dd>
    </div>
    <div className="min-w-0">
      <dt className="mb-1 text-xs uppercase text-ui-text-muted">Author</dt>
      <dd>
        <ViewAddressChip link={view.creator} />
      </dd>
    </div>
    <div className="min-w-0">
      <dt className="mb-1 text-xs uppercase text-ui-text-muted">Height</dt>
      <dd className="truncate font-mono text-szo-black">{view.height}</dd>
    </div>
    <div className="min-w-0">
      <dt className="mb-1 text-xs uppercase text-ui-text-muted">Root type</dt>
      <dd className="break-words font-mono text-szo-black [overflow-wrap:anywhere]">
        {view.rootType}
      </dd>
    </div>
  </dl>
);

const LensDetails = ({ view }: { view: ViewPageRecord }) => {
  if (view.lens.status === "verified") {
    return (
      <section className="border border-szo-primary/30 bg-ui-bg-accent p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-mono text-lg font-normal text-szo-black">
              {view.lens.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ui-text-muted">
              {view.lens.description}
            </p>
          </div>
        </div>
        <p className="mt-4 break-words font-mono text-xs text-ui-text-muted [overflow-wrap:anywhere]">
          Hash: {view.lens.hash}
        </p>
      </section>
    );
  }

  if (view.lens.status === "not-verified") {
    return (
      <section className="border border-ui-border bg-white p-5">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="min-w-0">
            <h2 className="font-mono text-lg font-normal text-szo-black">
              Lens not verified
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {view.lens.hashes.map((hash) => (
                <span
                  key={hash}
                  className="max-w-full break-words rounded-sm border border-ui-border bg-ui-bg px-2 py-1 font-mono text-xs text-ui-text-muted [overflow-wrap:anywhere]"
                >
                  {hash}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border border-ui-border bg-white p-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-lg font-normal text-szo-black">
          Lens unknown
        </h2>
      </div>
    </section>
  );
};

const ViewPageSkeleton = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
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

const ViewPageContent = ({ view }: { view: ViewPageRecord }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-7 px-5 py-10 sm:px-6">
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
          <h1
            title={view.name}
            className="break-words font-mono text-3xl font-normal leading-tight text-szo-black [overflow-wrap:anywhere] md:text-4xl"
          >
            / {view.name}
          </h1>
        </div>

        <div className="shrink-0">
          <ViewLensBadge lens={view.lens} showIcon />
        </div>
      </div>

      <ViewMeta view={view} />
      <LensDetails view={view} />
      <NetworkBilling viewAddress={view.id} />
      <ViewPlayground view={view} />
    </main>
  </div>
);

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
