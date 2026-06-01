'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { EthereumTransactionCard } from './ethereum-transaction-card';
import { TransactionLogs } from './transaction-logs';
import { useEthereumTransaction } from '../hook/ethereum/use-ethereum-transaction';
import { useTransactionLogs } from '../hook/ethereum/use-transaction-logs';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { Hex } from 'viem';
import { ChainPathSegment } from '@/shared/utils/links';
import { ShinzohubTransactionCard } from './shinzohub-transaction-card';

export interface TxTabsProps {
  hash: Hex;
}
type ChainSpecificTransactionCardProps = {
  chain: ChainPathSegment;
  hash: Hex;
};

const ChainSpecificTransactionCard = ({ chain, hash }: ChainSpecificTransactionCardProps) => {
  switch (chain) {
    case 'ethereum':
      return <EthereumTransactionCard txHash={hash} />;
    case 'shinzohub':
      return <ShinzohubTransactionCard txHash={hash} />;
    default:
      return null;
  }
};

export const TxTabs = ({ hash }: TxTabsProps) => {
  const { data: tx } = useEthereumTransaction({ hash });
  const chain = useChainPathSegment();

  // preload logs when page is loaded
  useTransactionLogs({ hash, enabled: !!tx });

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
          <ChainSpecificTransactionCard
            chain={chain}
            hash={hash}
          />
        </TabsContent>

        <TabsContent asChild value='logs'>
          <TransactionLogs txHash={hash} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
