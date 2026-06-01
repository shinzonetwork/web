"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import { navigateWithAnchorClick } from "@/shared/utils/browser-location";
import type {
  ViewsAddressLink,
  ViewsLensStatus,
  ViewsPageItem,
} from "../model/types";

const AddressChip = ({ link }: { link: ViewsAddressLink }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noreferrer"
    title={link.address}
    className={cn(
      "relative z-20 inline-flex max-w-full items-center gap-1 border border-ui-border bg-ui-bg px-2 py-0.5 align-baseline",
      "font-mono text-[11px] leading-5 text-szo-black transition-colors",
      "hover:border-szo-primary hover:text-szo-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-szo-primary/40"
    )}
  >
    <span className="truncate">{link.shortAddress}</span>
    <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
  </a>
);

const getVerificationLabel = (lens: ViewsLensStatus): string => {
  switch (lens.status) {
    case "verified":
      return "Verified";
    case "not-verified":
      return "Not verified";
    case "unknown":
      return "Unknown";
  }
};

const getVerificationClassName = (lens: ViewsLensStatus): string => {
  switch (lens.status) {
    case "verified":
      return "border-szo-primary/30 bg-ui-bg-accent text-ui-text-accent";
    case "not-verified":
      return "border-ui-border bg-ui-bg-muted text-ui-text-muted";
    case "unknown":
      return "border-ui-border bg-white text-ui-text-muted";
  }
};

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
          <span className="shrink-0">Smart contract</span>
          <AddressChip link={view.contract} />
        </p>

        <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs leading-6 text-ui-text-muted">
          <span className="shrink-0">by</span>
          <AddressChip link={view.creator} />
        </p>
      </div>

      <div className="mt-auto grid min-w-0 gap-3 border-t border-ui-border pt-4 text-xs text-ui-text-muted sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p
          className={cn(
            "inline-flex w-fit max-w-full items-center rounded-full border px-2.5 py-1 font-sans text-xs font-medium",
            getVerificationClassName(view.lens)
          )}
        >
          {getVerificationLabel(view.lens)}
        </p>
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
