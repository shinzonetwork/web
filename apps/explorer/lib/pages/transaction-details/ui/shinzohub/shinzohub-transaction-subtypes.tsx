'use client';

import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { ShinzohubAddressLink } from '@/shared/shinzohub/address-link';
import type { ShinzohubEvent } from '@/shared/shinzohub/types';
import { cn } from '@/shared/utils/utils';
import {
  getShinzohubTransactionSubtypes,
  type IndexerAssertionTransactionSubtype,
  type ShinzohubTransactionSubtype,
  type ViewTransactionSubtype,
} from '../../model/shinzohub-transaction-subtype';

export interface ShinzohubTransactionSubtypesProps {
  className?: string;
  emptyFallback?: ReactNode;
  events?: readonly ShinzohubEvent[];
  subtypes?: readonly ShinzohubTransactionSubtype[];
}

function formatSourceChain(sourceChain: string) {
  return sourceChain
    ? sourceChain.charAt(0).toUpperCase() + sourceChain.slice(1)
    : 'Unknown chain';
}

function ViewSubtype({
  subtype,
}: {
  subtype: ViewTransactionSubtype;
}) {
  return (
    <span className='inline-flex min-w-0 flex-wrap items-center gap-2'>
      <Badge variant='outline'>{subtype.label}</Badge>
      <a
        href={subtype.externalUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex min-w-0 items-center gap-1 text-text-accent underline'
      >
        <span className='break-all'>{subtype.viewName}</span>
        <ExternalLink aria-hidden className='size-3.5 shrink-0' />
      </a>
    </span>
  );
}

function IndexerAssertionSubtype({
  subtype,
}: {
  subtype: IndexerAssertionTransactionSubtype;
}) {
  return (
    <span className='inline-flex min-w-0 flex-wrap items-center gap-2'>
      <Badge variant='outline'>{subtype.label}</Badge>
      <span className='whitespace-nowrap text-muted-foreground'>
        Address
      </span>
      <ShinzohubAddressLink
        address={subtype.signer}
        copyable
        className='break-all font-mono'
      >
        {subtype.signer}
      </ShinzohubAddressLink>
      <span className='whitespace-nowrap text-muted-foreground'>
        on {formatSourceChain(subtype.sourceChain)}
      </span>
    </span>
  );
}

function TransactionSubtype({
  subtype,
}: {
  subtype: ShinzohubTransactionSubtype;
}) {
  switch (subtype.kind) {
    case 'view':
      return <ViewSubtype subtype={subtype} />;
    case 'indexer-assertion':
      return <IndexerAssertionSubtype subtype={subtype} />;
  }
}

export function ShinzohubTransactionSubtypes({
  className,
  emptyFallback = null,
  events,
  subtypes: providedSubtypes,
}: ShinzohubTransactionSubtypesProps) {
  const subtypes = providedSubtypes ??
    getShinzohubTransactionSubtypes(events);

  if (subtypes.length === 0) {
    return emptyFallback;
  }

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col items-start gap-2',
        className,
      )}
    >
      {subtypes.map((subtype, index) => (
        <TransactionSubtype
          key={`${subtype.kind}-${index}`}
          subtype={subtype}
        />
      ))}
    </div>
  );
}
