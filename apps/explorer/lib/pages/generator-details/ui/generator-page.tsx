import { PageLayout } from '@/widgets/layout';
import { formatHash } from '@/shared/utils/format-hash';
import { ShinzohubAddressLink } from '@/shared/shinzohub/address-link';
import { GeneratorCard } from './generator-card';

export type GeneratorDetailClientPageProps = {
  address: string;
};

export const GeneratorDetailClientPage = async ({ params }: { params: Promise<{ address: string }> }) => {
  const { address } = await params;

  return (
    <PageLayout
      info={(
        <div className='flex items-center gap-3'>
          <ShinzohubAddressLink
            address={address}
            copyable
            className='font-mono text-base'
            copyButtonClassName='text-text-accent'
          >
            {formatHash(address, 15, 5)}
          </ShinzohubAddressLink>
        </div>
        )}
      title='Generator'
    >
      <GeneratorCard address={address} />
    </PageLayout>
  );
};
