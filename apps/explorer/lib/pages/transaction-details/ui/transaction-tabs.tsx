'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { EthereumTransactionCard } from './ethereum-transaction-card';
import { TransactionLogs } from './transaction-logs';
import { useTransactionLogs } from '../hook/ethereum/use-transaction-logs';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { Hex } from 'viem';
import { ChainPathSegment } from '@/shared/utils/links';
import { ShinzohubTransactionCard } from './shinzohub-transaction-card';

export interface TxTabsProps {
  hash: Hex;
}
type ChainSpecificTransactionProps = {
  chain: ChainPathSegment;
  hash: Hex;
};

const ChainSpecificTransactionCard = ({ chain, hash }: ChainSpecificTransactionProps) => {
  switch (chain) {
    case 'ethereum':
      return <EthereumTransactionCard txHash={hash} />;
    case 'shinzohub':
      return <ShinzohubTransactionCard txHash={hash} />;
    default:
      return null;
  }
};

const ChainSpecificTransactionLogs = ({ chain, hash }: ChainSpecificTransactionProps) => {
  switch (chain) {
    case 'ethereum':
      return <TransactionLogs txHash={hash} />;
    default:
      return null;
  }
};

export const TxTabs = ({ hash }: TxTabsProps) => {
  const chain = useChainPathSegment();
  const showLogsTab = chain === 'ethereum';

  // preload logs when page is loaded
  useTransactionLogs({ hash });

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
          {showLogsTab && (
            <TabsTrigger value='logs'>
              Logs
            </TabsTrigger>
          )}
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          <ChainSpecificTransactionCard
            chain={chain}
            hash={hash}
          />
        </TabsContent>

        <TabsContent asChild value='logs'>
          <ChainSpecificTransactionLogs
            chain={chain}
            hash={hash}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
