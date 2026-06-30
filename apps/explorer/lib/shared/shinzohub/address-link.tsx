"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CopyButton } from "@/shared/ui/button";
import { getPageLink } from "@/shared/utils/links";
import { cn } from "@/shared/utils/utils";

export interface ShinzohubAddressLinkProps {
  address?: string | null;
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  copyable?: boolean;
  copyButtonClassName?: string;
  fallback?: ReactNode;
}

export function ShinzohubAddressLink({
  address,
  children,
  className,
  wrapperClassName,
  copyable,
  copyButtonClassName,
  fallback = null,
}: ShinzohubAddressLinkProps) {
  if (!address) {
    return fallback;
  }

  const link = (
    <Link
      prefetch={false}
      href={getPageLink("address", { param: address, chain: "shinzohub" })}
      className={cn("cursor-pointer text-text-accent underline", className)}
    >
      {children ?? address}
    </Link>
  );

  if (!copyable) {
    return link;
  }

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-1", wrapperClassName)}>
      {link}
      <CopyButton text={address} className={cn("text-muted-foreground", copyButtonClassName)} />
    </span>
  );
}
