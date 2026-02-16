'use client';

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

import Link from 'next/link'
import type { ComponentProps } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '../cn';
import { DEFAULT_LIMIT } from './get-server-page';

export interface PaginationProps extends ComponentProps<"nav"> {
  itemsPerPage?: number;
  totalItems?: number;
  page: number;
}

export const Pagination = ({ page, itemsPerPage = DEFAULT_LIMIT, totalItems = 0, ...props }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

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
          <PaginationFirst
            href={getPageLink(1)}
            aria-disabled={page <= 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={getPageLink(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive href={getPageLink(page)} aria-disabled>
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={getPageLink(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLast
            href={getPageLink(totalPages)}
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
        'h-full flex items-center justify-center gap-1 py-2.5 px-3 border border-ui-border',
        'hover:bg-ui-bg-accent-hover cursor-pointer transition-all',
        'data-[active=true]:min-w-16 data-[active=true]:border-ui-accent data-[active=true]:text-ui-text-accent data-[active=true]:bg-ui-bg-accent',
        'focus-visible:border-transparent focus-visible:ring-ui-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-1',
        className
      )}
      {...props}
    />
  )
}

function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to the first page"
      className={cn(className)}
      {...props}
    >
      <span className='underline'>First</span>
    </PaginationLink>
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(className, 'border-x-0')}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to the last page"
      className={cn(className, 'border-x-0')}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to the last page"
      className={cn(className)}
      {...props}
    >
      <span className='underline'>Last</span>
    </PaginationLink>
  )
}

export {
  PaginationRoot,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
}
