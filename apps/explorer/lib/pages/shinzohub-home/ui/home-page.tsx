"use client";

import { Container, PageLayout } from '@/widgets/layout';
import { Typography } from '@/shared/ui/typography';

import { BlocksHome } from "./blocks-home";
import { TransactionsHome } from "./transactions-home";
import { HomeStats } from './stats-home';
import { ExplorerSearch } from '@/widgets/search';

export const HomePage = () => {
  return (
    <PageLayout title="Home" hideTitle hideSearch>
      <Container borderX borderB className='flex flex-col lg:flex-row'>
        <HomeStats />

        <div className='flex flex-col gap-4 grow -mt-px bg-background-accent-light border-t lg:border-t-0 lg:border-l border-b border-border py-11 px-6 lg:px-10'>
          <Typography font='mono' className='break-words text-[22px] leading-snug sm:text-[25px]'>
            Shinzō Chain Explorer
          </Typography>
          <ExplorerSearch />
        </div>
      </Container>

      <section className='grid gap-12 lg:gap-4 lg:grid-cols-2 mt-18 [&>*]:min-w-0'>
        <BlocksHome />
        <TransactionsHome />
      </section>
    </PageLayout>
  );
};
