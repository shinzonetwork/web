'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Container } from '@/widgets/layout';
import { TransactionCard } from './tx-card';
import { Typography } from '@/shared/ui/typography';

export interface TxTabsProps {
  hash: string;
}

export const TxTabs = ({ hash }: TxTabsProps) => {
  return (
    <Tabs defaultValue='overview'>
      <Container wrapperClassName='mt-12' borderB>
        <TabsList>
          <TabsTrigger value='overview'>
            Overview
          </TabsTrigger>
          <TabsTrigger value='logs'>
            Logs
          </TabsTrigger>
          <TabsTrigger value='raw'>
            Raw Trace
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-border'>
        <TabsContent value='overview'>
          <TransactionCard txHash={hash} />
        </TabsContent>

        <TabsContent asChild value='logs'>
          <Container className='py-10'>
            <Typography variant='md'>Nothing here yet.</Typography>
          </Container>
        </TabsContent>

        <TabsContent value='raw'>
          <Container className='py-10'>
            <Typography variant='md'>Nothing here yet.</Typography>
          </Container>
        </TabsContent>
      </div>
    </Tabs>
  );
};
