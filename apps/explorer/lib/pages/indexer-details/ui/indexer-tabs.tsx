'use client';

import { Container } from '@/widgets/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { IndexerCard } from './indexer-card';

export type IndexerTabsProps = { address: string }

export const IndexerTabs = (props: IndexerTabsProps) => {
  const { address } = props;

  return (
    <Tabs defaultValue='overview'>
      <Container
        wrapperClassName='mt-12 border-b border-ui-border'
        className='[&>*]:translate-y-[1px]'
      >
        <TabsList>
          <TabsTrigger value='overview'>
            Overview
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          <IndexerCard address={address} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
