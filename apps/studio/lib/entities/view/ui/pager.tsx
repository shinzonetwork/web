"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@shinzo/ui/cn";

interface PagerProps {
  page: number;
  hasMore: boolean;
  className?: string;
}

export const Pager = ({ page, hasMore, className }: PagerProps) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const getPageLink = (pageNum: number) => {
    const next = new URLSearchParams(params.toString());
    if (pageNum <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(pageNum));
    }
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const prevDisabled = page <= 1;
  const nextDisabled = !hasMore;

  const linkClass = cn(
    "flex h-full items-center justify-center gap-1 border border-ui-border px-3 py-2.5",
    "transition-all hover:bg-ui-bg-accent-hover",
    "aria-disabled:pointer-events-none aria-disabled:opacity-40"
  );

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center", className)}
    >
      <ul className="flex h-11 flex-row items-center">
        <li className="h-full">
          <Link
            href={getPageLink(page - 1)}
            aria-label="Previous page"
            aria-disabled={prevDisabled}
            className={cn(linkClass, "border-r-0")}
          >
            <ChevronLeftIcon />
          </Link>
        </li>
        <li className="h-full">
          <span
            aria-current="page"
            className={cn(
              linkClass,
              "min-w-16 border-ui-accent bg-ui-bg-accent text-ui-text-accent"
            )}
          >
            {page}
          </span>
        </li>
        <li className="h-full">
          <Link
            href={getPageLink(page + 1)}
            aria-label="Next page"
            aria-disabled={nextDisabled}
            className={cn(linkClass, "border-l-0")}
          >
            <ChevronRightIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
