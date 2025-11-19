import { PageLayout } from '@/widgets/layout'
import { BlockCard } from '@/entities/block';

export default async function BlockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blockNumber = Number(id)

  return (
    <PageLayout title='Block Detail'>
      <BlockCard height={blockNumber} />
    </PageLayout>
  );
}
