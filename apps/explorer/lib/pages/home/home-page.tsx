"use client";

import { Container, PageLayout } from '@/widgets/layout';
import { useTransactions } from "@/pages/transactions";
import { useBlocks } from "@/pages/blocks";
import { BlocksHome } from "./blocks-home";
import { TransactionsHome } from "./transactions-home";
import { HomeStats } from '@/pages/home/stats';
import { Typography } from '@/shared/ui/typography';
import { SearchInput } from '@/shared/ui/search-input';

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
      <Container borderX borderB className='flex flex-col lg:flex-row'>
        <HomeStats
          totalTransactions={txs?.totalCount ?? 0}
          totalBlocks={blocks?.totalCount ?? 0}
          blocksLoading={blocksLoading}
          transactionsLoading={txLoading}
        />

        <div className='flex flex-col gap-4 grow -mt-px bg-background-accent-light border-t lg:border-t-0 border-l border-b border-border py-11 px-6 lg:px-10'>
          <Typography font='mono' className='text-[25px] whitespace-nowrap'>
            Shinzō Chain Explorer
          </Typography>
          <SearchInput />
        </div>
      </Container>

      <section className='grid gap-12 lg:gap-4 lg:grid-cols-2 mt-18'>
        <BlocksHome blocks={blocks?.blocks ?? []} isLoading={blocksLoading} />
        <TransactionsHome transactions={txs?.transactions ?? []} isLoading={txLoading} />
      </section>
    </PageLayout>
  );
};
