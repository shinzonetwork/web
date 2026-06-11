'use client';

import type { ShinzohubEvent } from '@/shared/shinzohub/types';
import { Typography } from '@/shared/ui/typography';
import { Container } from '@/widgets/layout';

export function ShinzohubTransactionEvents({
  events,
}: {
  events?: readonly ShinzohubEvent[];
}) {
  if (!events?.length) {
    return (
      <Container className='py-10'>
        <Typography variant='md'>No events for this transaction.</Typography>
      </Container>
    );
  }

  return (
    <div className='space-y-4 p-6'>
      {events.map((event, index) => (
        <section key={`${event.type}-${index}`} className='border border-border p-4'>
          <h3 className='mb-3 font-mono text-sm text-text-accent'>{event.type}</h3>
          <dl className='space-y-2 text-sm'>
            {event.attributes.map((attribute, attributeIndex) => (
              <div
                key={`${attribute.key}-${attributeIndex}`}
                className='grid grid-cols-[220px_1fr] gap-4'
              >
                <dt className='font-mono text-muted-foreground'>{attribute.key}</dt>
                <dd className='break-all'>{attribute.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
