"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { formatHash } from "@/shared/utils/format-hash";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import ShinzoFilledIcon from "@/shared/ui/icons/shinzo-filled.svg";
import { Typography } from "@/shared/ui/typography";
import { cn } from '@/shared/utils/utils';
import { useShortBlocks } from './use-short-blocks';
import { useHighlight } from './use-highlight';
import { useMemo } from 'react';
import { CopyButton } from "@/shared/ui/button";

/** A container that takes at most 50% of the width, so that a spacer can take up all the rest width */
export const HALF_CONTAINER_CLASS = cn('w-full max-w-full lg:max-w-lg xl:max-w-160 2xl:max-w-3xl')

export const BlocksHome = () => {
  const { data: blocks, isLoading } = useShortBlocks();

  const dataIds = useMemo(() => blocks
      ?.map((block) => block?.number)
      ?.filter((num): num is number => num !== null && num !== undefined), [blocks]);

  const { getHighlightClass } = useHighlight(dataIds, {
    duration: 1000,
  });

  // needed to fill grid spacing with pink color
  const GAP_BG = cn(
    'after:hidden lg:after:block after:content-[""] after:absolute z-100',
    'after:left-full after:w-4 after:h-[calc(100%+1px)] after:top-0 after:bg-background-accent-light',
    'after:border-border',
  );

  return (
    <div>
      <div className='flex'>
        <div className='flex grow shrink' />
        <Typography variant='md' className={cn('block py-3 pl-8 lg:pl-0', HALF_CONTAINER_CLASS)}>
          / Latest Blocks
        </Typography>
      </div>


      <TableLayout
        isLoading={isLoading}
        loadingRowCount={5}
        className={cn(HALF_CONTAINER_CLASS, 'relative', GAP_BG, 'after:border-t')}
        notFound="No blocks found."
        gridClass="grid-cols-[1fr_270px_150px]"
        headings={["Block number", "Miner", "Txns"]}
        hideHeader
        hideRightSpacer
        iterable={blocks ?? []}
        rowRenderer={(block) => {
          const highlightClass = getHighlightClass(block?.number);

          return (
            <>
              <TableNullableCell value={block?.number} className={highlightClass}>
                {(value) => (
                  <Link
                    href={`/blocks/${value}`}
                    className="flex items-center gap-4"
                  >
                    <i className="flex items-center justify-center size-8 text-text-secondary border border-border rounded-sm">
                      <ShinzoFilledIcon className="size-4 text-[#35353599]" />
                    </i>
                    <div className="flex flex-col">
                      <Typography color="accent" className="underline">
                        {value}
                      </Typography>
                      {block?.timestamp && (
                        <Typography color="secondary" className="text-xs">
                          {formatDistanceToNow(
                            new Date(Number(block.timestamp) * 1000),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Typography>
                      )}
                    </div>
                  </Link>
                )}
              </TableNullableCell>

              <TableNullableCell value={block?.miner} align="center" className={highlightClass}>
                {(value) => (
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    {formatHash(value ?? '', 8, 6)}
                    <CopyButton text={value ?? ''} className="text-muted-foreground" />
                  </div>
                )}
              </TableNullableCell>
              <TableNullableCell
                value={
                  block?.transactions?.[0]?.transactionIndex != null
                    ? block.transactions[0].transactionIndex + 1
                    : 0
                }
                align="center"
                className={highlightClass}
              >
                {(value) => (
                  <div className="flex items-center gap-1">Txns: {value}</div>
                )}
              </TableNullableCell>
            </>
          )
        }}
      />

      <div className='flex'>
        <div className='flex grow shrink' />
        <div className={cn('relative flex justify-center border-r border-b border-l border-border bg-background py-4', HALF_CONTAINER_CLASS, GAP_BG, 'after:left-[calc(100%+1px)] after:border-b')}>
          <Link
            href="/blocks"
            className="flex items-center gap-7 text-sm text-secondary hover:underline"
          >
            <Typography color="accent" font='mono' className="underline">
              View all blocks
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};
