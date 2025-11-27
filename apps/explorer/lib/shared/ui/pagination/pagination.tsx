import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';

import Link from 'next/link'
import type { ComponentProps } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Typography } from '@/shared/ui/typography';
import { cn } from '@/shared/utils/utils';
import { getRange, transform } from './utils';
import { DEFAULT_LIMIT } from './get-server-page';

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
      className={cn("h-11 flex flex-row items-center", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className='h-full' {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        'h-full flex items-center justify-center gap-1 py-2.5 px-3 border border-border',
        'hover:bg-background-accent-hover cursor-pointer transition-all',
        'data-[active=true]:min-w-16 data-[active=true]:border-accent data-[active=true]:text-text-accent data-[active=true]:bg-background-accent-light',
        'focus-visible:border-transparent focus-visible:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-1',
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
      className={cn(className, 'text-text-secondary')}
      {...props}
    >
      <ChevronLeftIcon />
      <Typography color='secondary'>Prev</Typography>
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
      className={cn(className, 'text-text-secondary')}
      {...props}
    >
      <Typography>Next</Typography>
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
      className={cn("h-full flex items-center justify-center gap-1 py-2.5 px-3 border border-border", className)}
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
