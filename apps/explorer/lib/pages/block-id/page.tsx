import { PageLayout } from '@/widgets/layout'
import { BlockTabs } from './block-tabs';

export const BlockDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blockNumber = Number(id)

  return (
    <PageLayout title={`Block #${blockNumber}`}>
      <BlockTabs height={blockNumber} />
    </PageLayout>
  );
};
