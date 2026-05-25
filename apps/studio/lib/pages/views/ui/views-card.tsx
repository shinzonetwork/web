"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
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
      "inline-flex max-w-full items-center gap-1 border border-ui-border bg-ui-bg px-2 py-0.5 align-baseline",
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

export const ViewsCard = ({ view }: { view: ViewsPageItem }) => (
  <div className="group relative isolate h-full">
    <article
      className={cn(
        "relative z-10 flex h-full min-h-48 flex-col gap-4 border-2 border-ui-border bg-white p-4",
        "transition-all duration-300 group-hover:border-szo-primary"
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <h2
          title={view.name}
          className="truncate font-mono text-base font-light text-szo-black"
        >
          / {view.name}
        </h2>

        <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs leading-6 text-szo-black/60">
          <span>Smart contract</span>
          <AddressChip link={view.contract} />
        </p>

        <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs leading-6 text-szo-black/60">
          <span>by</span>
          <AddressChip link={view.creator} />
        </p>
      </div>

      <div className="mt-auto grid gap-3 border-t border-ui-border pt-4 text-xs text-szo-black/55 sm:grid-cols-2">
        <p className="min-w-0 truncate font-mono text-szo-black">
          {getVerificationLabel(view.lens)}
        </p>
        <p className="font-mono sm:text-right">Height: {view.height}</p>
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
