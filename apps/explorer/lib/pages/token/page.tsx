import { PageLayout } from '@/widgets/layout'
import { Typography } from '@/shared/ui/typography';
import { TokenTabs } from './token-tabs';
import { formatHash } from '@/shared/utils/format-hash';
import { CopyButton } from '@/shared/ui/button';

export const TokenDetailPage = async ({ params }: { params: Promise<{ address: string }> }) => {
  const { address: tokenAddress } = await params;

  return (
    <PageLayout
      info={(
        <div className='flex items-center gap-3'>
          <Typography variant='md' color='accent'>
            {formatHash(tokenAddress)}
          </Typography>
          <CopyButton text={tokenAddress} className='text-text-accent' />
        </div>
        )}
      title='Token'
    >
      <TokenTabs />
    </PageLayout>
  );
};
