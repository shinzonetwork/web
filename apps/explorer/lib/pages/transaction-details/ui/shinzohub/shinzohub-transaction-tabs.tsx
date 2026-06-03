'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { Hex } from 'viem';
import { ShinzohubTransactionCard } from './shinzohub-transaction-card';

export type ShinzohubTxTabsProps = {
  hash: Hex;
}

export const ShinzohubTxTabs = ({ hash }: ShinzohubTxTabsProps) => {
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
          <ShinzohubTransactionCard txHash={hash} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
