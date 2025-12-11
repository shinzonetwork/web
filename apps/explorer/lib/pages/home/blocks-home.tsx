"use client";

import Link from "next/link";

import { formatHash } from "@/shared/utils/format-hash";
import { Block } from "@/shared/graphql/generated/graphql";
import { TableLayout, TableNullableCell } from "@/shared/ui/table";
import ShinzoFilledIcon from "@/shared/ui/icons/shinzo-filled.svg";
import { Typography } from "@/shared/ui/typography";
import { formatDistanceToNow } from "date-fns";

export const BlocksHome = ({
  blocks,
  isLoading,
}: {
  blocks: Block[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <TableLayout
        isLoading={isLoading}
        loadingRowCount={5}
        notFound="No blocks found."
        gridClass="grid-cols-[1fr_270px_150px]"
        numColumns={3}
        iterable={blocks ?? []}
        rowRenderer={(block) => (
          <>
            <TableNullableCell value={block?.number}>
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

            <TableNullableCell value={block?.miner} align="center">
              {(value) => (
                <div className="flex flex-row gap-1">
                  <Typography>Miner:</Typography>
                  <Link
                    href={`/address/${value}`}
                    className="font-mono text-sm hover:underline pt-[2]"
                  >
                    <Typography
                      color="accent"
                      className="font-mono text-sm hover:underline"
                    >
                      {formatHash(value, 8, 6)}
                    </Typography>
                  </Link>
                </div>
              )}
            </TableNullableCell>
            <TableNullableCell value={0} align="center">
              {(value) => (
                <div className="flex items-center gap-1">Txns: {value}</div>
              )}
            </TableNullableCell>
          </>
        )}
      />
      <div className="flex justify-center pr-8 border-r border-l border-border bg-background py-4">
        <Link
          href="/blocks"
          className="flex items-center gap-7 text-sm text-secondary hover:underline"
        >
          <Typography color="accent" className="hover:underline">
            View all
          </Typography>
        </Link>
      </div>
    </div>
  );
};
