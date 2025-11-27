'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Container } from '@/widgets/layout';
import { BlockCard } from './block-card';
import { BlockTransactions } from './block-txs';
import { PageParams } from '@/shared/ui/pagination';

export interface BlockTabsProps {
  height: number;
  pageParams: PageParams;
}

export const BlockTabs = ({ height, pageParams }: BlockTabsProps) => {
  return (
    <Tabs defaultValue='overview'>
      <Container wrapperClassName='mt-12' borderB>
        <TabsList>
          <TabsTrigger value='overview'>
            Overview
          </TabsTrigger>
          <TabsTrigger value='transactions'>
          Transactions
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-border'>
        <TabsContent value='overview'>
          <BlockCard height={height} />
        </TabsContent>

        <TabsContent asChild value='transactions'>
          <BlockTransactions blockNumber={height} pageParams={pageParams} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
