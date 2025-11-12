import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import Link from 'next/link'
import type { ComponentProps } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from "@/shared/utils/utils"
import { Button, buttonVariants } from "@/shared/ui/button"
import { getRange, transform } from './utils';
import { DEFAULT_LIMIT } from './use-page';

export interface PaginationProps extends ComponentProps<"nav"> {
  itemsPerPage?: number;
  totalItems?: number;
  page: number;
}

export const Pagination = ({ page, itemsPerPage = DEFAULT_LIMIT, totalItems = 0, ...props }: PaginationProps) => {
  const siblingCount = 1;
  const showEdges = true;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const range = getRange(page, totalPages, siblingCount, showEdges);
  const pages = transform(range);

  const pathname = usePathname();
  const params = useSearchParams();

  const getPageLink = (pageNum: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', pageNum.toString());
    const joiner = pathname.includes('?') ? '&' : '?';
    return `${pathname}${joiner}${newParams.toString()}`;
  };

  return (
    <PaginationRoot {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageLink(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
          />
        </PaginationItem>

        {pages.map((item, index) => {
          if (item.type === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={`page-${item.value}`}>
              <PaginationLink
                href={getPageLink(item.value)}
                isActive={item.value === page}
              >
                {item.value}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={getPageLink(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

function PaginationRoot({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  PaginationRoot,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
