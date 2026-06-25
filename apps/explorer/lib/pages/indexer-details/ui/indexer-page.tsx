import { PageLayout } from '@/widgets/layout';
import { formatHash } from '@/shared/utils/format-hash';
import { CopyButton } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { IndexerCard } from './indexer-card';

export type IndexerDetailClientPageProps = {
  address: string;
};

export const IndexerDetailClientPage = async ({ params }: { params: Promise<{ address: string }> }) => {
  const { address } = await params;

  return (
    <PageLayout
      info={(
        <div className='flex items-center gap-3'>
          <Typography variant='md' color='accent'>
            {formatHash(address, 15, 5)}
          </Typography>
          <CopyButton text={address} className='text-text-accent' />
        </div>
        )}
      title='Indexer'
    >
      <IndexerCard address={address} />
    </PageLayout>
  );
};
