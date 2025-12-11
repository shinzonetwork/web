"use client";

import { Cable as Cube, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { PageLayout } from "@/widgets/layout";
import { useTransactions } from "@/pages/transactions";
import { useBlocks } from "@/pages/blocks";
import { BlocksHome } from "./blocks-home";
import { TransactionsHome } from "./transactions-home";

export const HomePage = () => {
  const { data: blocks, isLoading: blocksLoading } = useBlocks({
    limit: 5,
    offset: 0,
  });
  const { data: txs, isLoading: txLoading } = useTransactions({
    limit: 5,
    offset: 0,
  });

  return (
    <PageLayout title="Home" hideTitle hideSearch>
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Blocks
            </CardTitle>
            <Cube className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {blocksLoading ? (
              <div className="w-40 h-12">
                <Skeleton />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">
                  {blocks?.totalCount ?? 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg block time: 12.1s
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {txLoading ? (
              <div className="w-40 h-12">
                <Skeleton />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">
                  {((txs?.totalCount ?? 0) / 1e6).toFixed(2)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all blocks
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="bg-background-accent-light pl-8 pr-8 border-t border-border">
      <div className="grid gap-4 lg:grid-cols-2 border-b border-border">
        {/* Latest Blocks */}
        <BlocksHome
          blocks={
            blocks?.blocks?.filter(
              (block): block is NonNullable<typeof block> => block !== null
            ) ?? []
          }
          isLoading={blocksLoading}
        />

        {/* Latest Transactions */}
        <TransactionsHome
          transactions={
            txs?.transactions?.filter(
              (txn): txn is NonNullable<typeof txn> => txn !== null
            ) ?? []
          }
          isLoading={txLoading}
        />
      </div>
      </div>
    </PageLayout>
  );
};
