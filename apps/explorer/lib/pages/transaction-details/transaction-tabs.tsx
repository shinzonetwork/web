'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Container } from '@/widgets/layout';
import { TransactionCard } from './transaction-card';
import { TransactionLogs } from './transaction-logs';
import { useTransaction } from './use-transaction';
import { useTransactionLogs } from './use-transaction-logs';

export interface TxTabsProps {
  hash: string;
}

export const TxTabs = ({ hash }: TxTabsProps) => {
  const { data: tx } = useTransaction({ hash });

  // preload logs when page is loaded
  useTransactionLogs({ hash, enabled: !!tx });

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
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-border'>
        <TabsContent value='overview'>
          <TransactionCard txHash={hash} />
        </TabsContent>

        <TabsContent asChild value='logs'>
          <TransactionLogs txHash={hash} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
