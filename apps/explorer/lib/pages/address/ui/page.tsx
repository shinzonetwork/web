import { PageLayout } from '@/widgets/layout'
import { Typography } from '@/shared/ui/typography';
import { formatHash } from '@/shared/utils/format-hash';
import { CopyButton } from '@/shared/ui/button';
import { AddressTabs } from './address-tabs';
import { Hex } from 'viem';

export const AddressDetailPage = async ({ params }: { params: Promise<{ address: Hex | string }> }) => {
  const { address } = await params;

  return (
    <PageLayout
      info={(
        <div className='flex items-center gap-3'>
          <Typography variant='md' color='accent'>
            {formatHash(address)}
          </Typography>
          <CopyButton text={address} className='text-text-accent' />
        </div>
        )}
      title='Address'
    >
      <AddressTabs />
    </PageLayout>
  );
};
