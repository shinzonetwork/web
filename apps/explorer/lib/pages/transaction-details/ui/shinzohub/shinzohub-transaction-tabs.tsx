'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { useShinzohubTransactionDetails } from '../../hook/shinzohub/use-shinzohub-transaction-details';
import { ShinzohubTransactionCard } from './shinzohub-transaction-card';
import { ShinzohubTransactionEvents } from './shinzohub-transaction-events';
import { ShinzohubTransactionLogs } from './shinzohub-transaction-logs';

export function ShinzohubTxTabs({ hash }: { hash: string }) {
  const { data: transaction, isLoading, error } =
    useShinzohubTransactionDetails(hash);
  const isEvm = transaction?.kind === 'evm';

  return (
    <Tabs defaultValue='overview'>
      <Container
        wrapperClassName='mt-12 border-b border-ui-border'
        className='[&>*]:translate-y-[1px]'
      >
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          {transaction?.kind === 'evm' ? (
            <TabsTrigger value='logs'>Logs</TabsTrigger>
          ) : transaction?.kind === 'cosmos' ? (
            <TabsTrigger value='events'>Events</TabsTrigger>
          ) : null}
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          {error ? (
            <p className='py-12 text-center text-muted-foreground'>
              Transaction not found.
            </p>
          ) : (
            <ShinzohubTransactionCard
              transaction={transaction}
              isLoading={isLoading}
            />
          )}
        </TabsContent>

        {isEvm ? (
          <TabsContent value='logs'>
            <ShinzohubTransactionLogs
              transaction={transaction}
              isLoading={isLoading}
            />
          </TabsContent>
        ) : transaction?.kind === 'cosmos' ? (
          <TabsContent value='events'>
            <ShinzohubTransactionEvents events={transaction?.events} />
          </TabsContent>
        ) : null}
      </div>
    </Tabs>
  );
}
