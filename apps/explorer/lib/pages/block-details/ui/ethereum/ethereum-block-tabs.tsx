'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { EthereumBlockCard } from './ethereum-block-card';
import { EthereumBlockTransactions } from './ethereum-block-txs';
import { PageParams } from '@shinzo/ui/pagination';
import { Hex } from 'viem';

export type EthereumBlockTabsProps =
  | { pageParams: PageParams; blockNumber: number }
  | { pageParams: PageParams; blockHash: Hex };

export const EthereumBlockTabs = (props: EthereumBlockTabsProps) => {
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
            <EthereumBlockCard number={props.blockNumber} />
          ) : (
            <EthereumBlockCard hash={props.blockHash} />
          )}
        </TabsContent>

        <TabsContent asChild value='transactions'>
          {'blockNumber' in props ? (
            <EthereumBlockTransactions
              blockNumber={props.blockNumber}
              pageParams={pageParams}
            />
          ) : (
            <EthereumBlockTransactions
              blockHash={props.blockHash}
              pageParams={pageParams}
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};
