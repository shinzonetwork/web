'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CopyButton } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { formatHash } from '@/shared/utils/format-hash';
import { getPageLink } from '@/shared/utils/links';
import { PageLayout } from '@/widgets/layout';
import { useShinzohubTransactionDetails } from '../../hook/shinzohub/use-shinzohub-transaction-details';
import { ShinzohubTxTabs } from './shinzohub-transaction-tabs';

function normalizeComparableHash(hash: string): string {
  const normalized = hash.toLowerCase();
  return normalized.startsWith('0x') ? normalized : `0x${normalized}`;
}

function TransactionHeaderInfo({
  hash,
  label,
}: {
  hash: string;
  label: string;
}) {
  return (
    <div className='flex min-w-0 flex-col items-start gap-1 md:items-end'>
      <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
        {label}
      </span>
      <div className='flex min-w-0 items-center gap-3'>
        <Typography variant='md' color='accent' className='truncate'>
          {formatHash(hash)}
        </Typography>
        <CopyButton text={hash} className='shrink-0 text-text-accent' />
      </div>
    </div>
  );
}

export function ShinzohubTransactionPageClient({ hash }: { hash: string }) {
  const router = useRouter();
  const { data: transaction, isLoading, error } =
    useShinzohubTransactionDetails(hash);
  const headerHash = transaction?.cosmosHash ?? hash;
  const headerLabel = transaction ? 'ShinzoHub Tx Hash' : 'Requested Hash';

  useEffect(() => {
    if (!transaction?.cosmosHash) return;
    if (
      normalizeComparableHash(transaction.cosmosHash) ===
      normalizeComparableHash(hash)
    ) {
      return;
    }

    router.replace(getPageLink('tx', {
      chain: 'shinzohub',
      param: transaction.cosmosHash,
    }));
  }, [hash, router, transaction?.cosmosHash]);

  return (
    <PageLayout
      info={<TransactionHeaderInfo hash={headerHash} label={headerLabel} />}
      title='Transaction'
    >
      <ShinzohubTxTabs
        transaction={transaction}
        isLoading={isLoading}
        hasError={!!error}
      />
    </PageLayout>
  );
}
