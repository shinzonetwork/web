'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { EthereumTransactionCard } from './ethereum-transaction-card';
import { EthereumTransactionLogs } from './ethereum-transaction-logs';
import { useEthereumTransaction } from '../../hook/ethereum/use-ethereum-transaction';
import { useEthereumTransactionLogs } from '../../hook/ethereum/use-ethereum-transaction-logs';
import { Hex } from 'viem';

export interface EthereumTxTabsProps {
  hash: Hex;
}

export const EthereumTxTabs = ({ hash }: EthereumTxTabsProps) => {
  const { data: tx } = useEthereumTransaction({ hash });

  // preload logs when page is loaded
  useEthereumTransactionLogs({ hash, enabled: !!tx });

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
          <TabsTrigger value='logs'>
            Logs
          </TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          <EthereumTransactionCard txHash={hash} />
        </TabsContent>

        <TabsContent asChild value='logs'>
          <EthereumTransactionLogs txHash={hash} />
        </TabsContent>
      </div>
    </Tabs>
  );
};