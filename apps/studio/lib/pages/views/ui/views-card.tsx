"use client";

import { cn } from "@shinzo/ui/cn";
import { ViewAddressChip, ViewLensBadge } from "@/entities/view";
import { navigateWithAnchorClick } from "@/shared/utils/browser-location";
import type { ViewsPageItem } from "../model/types";

export const ViewsCard = ({ view }: { view: ViewsPageItem }) => (
  <div className="group relative isolate h-full min-w-0">
    <article
      className={cn(
        "relative z-10 flex h-full min-h-48 min-w-0 flex-col gap-4 border-2 border-ui-border bg-white p-4",
        "transition-all duration-300 group-hover:border-szo-primary"
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <a
          href={view.href}
          aria-label={`Open ${view.name}`}
          onClick={(event) => navigateWithAnchorClick(event, view.href)}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-szo-primary/40"
        />
        <h2
          title={`/ ${view.name}`}
          className="min-w-0 truncate whitespace-nowrap font-mono text-base font-normal leading-6 text-szo-black"
        >
          / {view.name}
        </h2>

        <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs leading-6 text-ui-text-muted">
          <span className="shrink-0">View address</span>
          <ViewAddressChip link={view.viewAddressLink} className="relative z-20" />
        </p>

        <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs leading-6 text-ui-text-muted">
          <span className="shrink-0">by</span>
          <ViewAddressChip link={view.creator} className="relative z-20" />
        </p>
      </div>

      <div className="mt-auto grid min-w-0 gap-3 border-t border-ui-border pt-4 text-xs text-ui-text-muted sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <ViewLensBadge lens={view.lens} />
        <p className="min-w-0 truncate font-mono sm:text-right">
          Height: {view.height}
        </p>
      </div>
    </article>

    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-[url('/bg-pattern.png')] bg-right bg-repeat-y opacity-0",
        "transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-100"
      )}
    />
  </div>
);
