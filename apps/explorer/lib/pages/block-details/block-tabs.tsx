import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Container } from '@/widgets/layout';
import { BlockCard } from './block-card';
import { BlockTransactions } from './block-txs';
import { PageParams } from '@shinzo/ui/pagination';

export type BlockTabsProps =
  | { pageParams: PageParams; blockNumber: number }
  | { pageParams: PageParams; blockHash: string };

export const BlockTabs = (props: BlockTabsProps) => {
  const { pageParams } = props;
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
          {'blockNumber' in props ? (
            <BlockCard number={props.blockNumber} />
          ) : (
            <BlockCard hash={props.blockHash} />
          )}
        </TabsContent>

        <TabsContent asChild value='transactions'>
          {'blockNumber' in props ? (
            <BlockTransactions
              blockNumber={props.blockNumber}
              pageParams={pageParams}
            />
          ) : (
            <BlockTransactions
              blockHash={props.blockHash}
              pageParams={pageParams}
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};
