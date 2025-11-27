'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Container } from '@/widgets/layout';
import { BlockCard } from './block-card';
import { Typography } from '@/shared/ui/typography';

export interface BlockTabsProps {
  height: number;
}

export const BlockTabs = ({ height }: BlockTabsProps) => {
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
          <Container className='py-10'>
            <Typography variant='md'>Nothing here yet.</Typography>
          </Container>
        </TabsContent>
      </div>
    </Tabs>
  );
};
