'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shinzo/ui/tabs';
import { Container } from '@/widgets/layout';
import { useShinzohubTransactionDetails } from '../../hook/shinzohub/use-shinzohub-transaction-details';
import { ShinzohubTransactionCard } from './shinzohub-transaction-card';

export function ShinzohubTxTabs({ hash }: { hash: string }) {
  const { data: transaction, isLoading, error } =
    useShinzohubTransactionDetails(hash);

  return (
    <Tabs defaultValue='overview'>
      <Container
        wrapperClassName='mt-12 border-b border-ui-border'
        className='[&>*]:translate-y-[1px]'
      >
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='messages'>Messages</TabsTrigger>
          <TabsTrigger value='events'>Events</TabsTrigger>
        </TabsList>
      </Container>

      <div className='mt-2 border-t border-ui-border'>
        <TabsContent value='overview'>
          {error ? (
            <p className='py-12 text-center text-muted-foreground'>Transaction not found.</p>
          ) : (
            <ShinzohubTransactionCard transaction={transaction} isLoading={isLoading} />
          )}
        </TabsContent>

        <TabsContent value='messages'>
          <div className='space-y-4 p-6'>
            {transaction?.messages.map((message, index) => (
              <section key={`${message.typeUrl}-${index}`} className='border border-border p-4'>
                <h3 className='mb-3 font-mono text-sm text-text-accent'>
                  {message.typeUrl || `Message ${index + 1}`}
                </h3>
                <pre className='overflow-x-auto whitespace-pre-wrap break-all text-xs'>
                  {JSON.stringify(message.value, null, 2)}
                </pre>
              </section>
            ))}
            {!isLoading && transaction?.messages.length === 0 && (
              <p className='text-muted-foreground'>No decoded messages.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value='events'>
          <div className='space-y-4 p-6'>
            {transaction?.events.map((event, index) => (
              <section key={`${event.type}-${index}`} className='border border-border p-4'>
                <h3 className='mb-3 font-mono text-sm text-text-accent'>{event.type}</h3>
                <dl className='space-y-2 text-sm'>
                  {event.attributes.map((attribute, attributeIndex) => (
                    <div key={`${attribute.key}-${attributeIndex}`} className='grid grid-cols-[220px_1fr] gap-4'>
                      <dt className='font-mono text-muted-foreground'>{attribute.key}</dt>
                      <dd className='break-all'>{attribute.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
