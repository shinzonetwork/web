"use client";

import Link from "next/link";

import { Typography } from "@/shared/ui/typography";
import { TableLayout, TableNullableCell } from "@/shared/ui/table";
import ShinzoTxnIcon from "@/shared/ui/icons/shinzo-txn.svg";

import { formatHash } from "@/shared/utils/format-hash";
import { Transaction } from "@/shared/graphql/generated/graphql";

export const TransactionsHome = ({
  transactions,
  isLoading,
}: {
  transactions: Transaction[] | [];
  isLoading: boolean;
}) => {
  const formatValue = (value: string) => {
    const eth = Number(value) / 1e18;
    return eth.toFixed(2);
  };

  return (
    <div className="flex flex-col">
      <TableLayout
        isLoading={isLoading}
        loadingRowCount={5}
        notFound="No transactions found."
        gridClass="grid-cols-[1fr_270px_150px]"
        numColumns={3}
        iterable={transactions ?? []}
        rowRenderer={(tx) => (
          <>
            <TableNullableCell value={tx?.hash}>
              {(value) => (
                <Link href={`/tx/${value}`} className="flex items-center gap-4">
                  <i className="flex items-center justify-center size-8 text-text-secondary border border-border rounded-sm">
                    <ShinzoTxnIcon className="size-4" />
                  </i>
                  <Typography color="accent" className="underline">
                    {formatHash(value)}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.from} align="center">
              {(value) => (
                <div className="flex flex-col gap-1">
                  {value && (
                    <div className="flex flex-row gap-2">
                      <Typography>From</Typography>
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
                  {tx?.to && (
                    <div className="flex flex-row gap-2">
                      <Typography>To</Typography>
                      <Link
                        href={`/address/${tx?.to}`}
                        className="font-mono text-sm hover:underline pt-[2]"
                      >
                        <Typography
                          color="accent"
                          className="font-mono text-sm hover:underline"
                        >
                          {formatHash(tx?.to, 8, 6)}
                        </Typography>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </TableNullableCell>
            <TableNullableCell value={tx?.value} align="center">
              {(value) => (
                <div className="flex items-center gap-1 text-sm">
                  {formatValue(value)}ETH
                </div>
              )}
            </TableNullableCell>
          </>
        )}
      />
      <div className="flex justify-center pr-8 border-r border-l border-border bg-background py-4">
        <Link
          href="/tx"
          className="flex items-center gap-7 text-sm hover:underline"
        >
          <Typography color="accent" className="hover:underline">
            View all
          </Typography>
        </Link>
      </div>
    </div>
  );
};
