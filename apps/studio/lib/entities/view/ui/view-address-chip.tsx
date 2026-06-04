"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import type { ViewAddressLink } from "../model/types";

interface ViewAddressChipProps {
  link: ViewAddressLink;
  className?: string;
}

export const ViewAddressChip = ({
  link,
  className,
}: ViewAddressChipProps) => {
  const classNames = cn(
    "inline-flex max-w-full items-center gap-1 border border-ui-border bg-ui-bg px-2 py-0.5 align-baseline",
    "font-mono text-[11px] leading-5 text-szo-black transition-colors",
    link.href &&
      "hover:border-szo-primary hover:text-szo-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-szo-primary/40",
    className
  );

  if (!link.href) {
    return (
      <span title={link.address} className={classNames}>
        <span className="truncate">{link.shortAddress}</span>
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      title={link.address}
      className={classNames}
    >
      <span className="truncate">{link.shortAddress}</span>
      <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
    </a>
  );
};
