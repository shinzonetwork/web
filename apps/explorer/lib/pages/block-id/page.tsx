import { PageLayout } from '@/widgets/layout'
import { BlockCard } from './block-card';

export const BlockDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blockNumber = Number(id)

  return (
    <PageLayout title={`Block #${blockNumber}`}>
      <BlockCard height={blockNumber} />
    </PageLayout>
  );
};
