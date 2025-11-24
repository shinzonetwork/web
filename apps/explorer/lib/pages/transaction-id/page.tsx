import { PageLayout } from '@/widgets/layout'
import { Typography } from '@/shared/ui/typography';
import { formatHash } from '@/shared/utils/format-hash';
import { CopyButton } from '@/shared/ui/button';
import { TxTabs } from './tx-tabs';

export const TransactionDetailPage = async ({ params }: { params: Promise<{ hash: string }> }) => {
  const { hash } = await params;

  return (
    <PageLayout
      info={(
        <div className='flex items-center gap-3'>
          <Typography variant='md' color='accent'>
            {formatHash(hash)}
          </Typography>
          <CopyButton text={hash} className='text-text-accent' />
        </div>
        )}
      title='Transaction'
    >
      <TxTabs hash={hash} />
    </PageLayout>
  );
};
