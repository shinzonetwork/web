'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CopyButton } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { ShinzohubAddressLink } from '@/shared/shinzohub/address-link';
import type { ShinzohubEvent } from '@/shared/shinzohub/types';
import { getPageLink, type AppPage } from '@/shared/utils/links';
import { cn } from '@/shared/utils/utils';
import {
  getShinzohubTransactionSubtypes,
  type GeneratorRegistrationTransactionSubtype,
  type HostTransactionSubtype,
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
  const label = subtype.viewName ?? subtype.viewAddress;

  return (
    <span className='inline-flex min-w-0 flex-wrap items-center gap-2'>
      <Badge variant='outline'>{subtype.label}</Badge>
      {subtype.externalUrl && label && (
        <a
          href={subtype.externalUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex min-w-0 items-center gap-1 text-text-accent underline'
        >
          <span className='break-all'>{label}</span>
          <ExternalLink aria-hidden className='size-3.5 shrink-0' />
        </a>
      )}
      {!subtype.externalUrl && label && (
        <span className='break-all'>{label}</span>
      )}
      {subtype.viewAddress && (
        <>
          <span className='whitespace-nowrap text-muted-foreground'>
            View
          </span>
          <ShinzohubAddressLink
            address={subtype.viewAddress}
            copyable
            className='break-all font-mono'
          >
            {subtype.viewAddress}
          </ShinzohubAddressLink>
        </>
      )}
      {subtype.error && (
        <span className='break-all text-muted-foreground'>
          {subtype.error}
        </span>
      )}
    </span>
  );
}

function AddressLifecycleSubtype({
  address,
  label,
  page,
}: {
  address: string;
  label: string;
  page?: Extract<AppPage, 'generator' | 'host'>;
}) {
  const addressElement = page ? (
    <Link
      prefetch={false}
      href={getPageLink(page, { address, chain: 'shinzohub' })}
      className='min-w-0 cursor-pointer break-all font-mono text-text-accent underline'
    >
      {address}
    </Link>
  ) : (
    <ShinzohubAddressLink
      address={address}
      copyable
      className='break-all font-mono'
    >
      {address}
    </ShinzohubAddressLink>
  );

  return (
    <span className='inline-flex min-w-0 flex-wrap items-center gap-2'>
      <Badge variant='outline'>{label}</Badge>
      <span className='whitespace-nowrap text-muted-foreground'>
        Address
      </span>
      <span className='inline-flex min-w-0 items-center gap-1'>
        {addressElement}
        {page && (
          <CopyButton
            text={address}
            className='shrink-0 text-muted-foreground'
          />
        )}
      </span>
    </span>
  );
}

function HostSubtype({
  subtype,
}: {
  subtype: HostTransactionSubtype;
}) {
  return (
    <AddressLifecycleSubtype
      address={subtype.address}
      label={subtype.label}
      page='host'
    />
  );
}

function GeneratorRegistrationSubtype({
  subtype,
}: {
  subtype: GeneratorRegistrationTransactionSubtype;
}) {
  return (
    <AddressLifecycleSubtype
      address={subtype.address}
      label={subtype.label}
      page='generator'
    />
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
    case 'host':
      return <HostSubtype subtype={subtype} />;
    case 'generator-registration':
      return <GeneratorRegistrationSubtype subtype={subtype} />;
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
