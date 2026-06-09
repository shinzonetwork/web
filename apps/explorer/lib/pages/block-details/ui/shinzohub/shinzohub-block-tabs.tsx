'use client';

import { Container } from '@/widgets/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { PageParams } from '@shinzo/ui/pagination';
import { ShinzohubBlockCard } from './shinzohub-block-card';
import { ShinzohubBlockTransactions } from './shinzohub-block-txs';
import { Hex } from 'viem';

export type ShinzohubBlockTabsProps =
  | { pageParams: PageParams; blockNumber: number }
  | { pageParams: PageParams; blockHash: Hex };

export const ShinzohubBlockTabs = (props: ShinzohubBlockTabsProps) => {
  const { pageParams } = props;
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
          <TabsTrigger value='transactions'>
          Transactions
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          {'blockNumber' in props ? (
            <ShinzohubBlockCard number={props.blockNumber} />
          ) : (
            <ShinzohubBlockCard hash={props.blockHash} />
          )}
        </TabsContent>

        <TabsContent asChild value='transactions'>
          {'blockNumber' in props ? (
            <ShinzohubBlockTransactions
              blockNumber={props.blockNumber}
              pageParams={pageParams}
            />
          ) : (
            <ShinzohubBlockTransactions
              blockHash={props.blockHash}
              pageParams={pageParams}
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};
