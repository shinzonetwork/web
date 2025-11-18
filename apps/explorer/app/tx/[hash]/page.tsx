import { PageLayout } from '@/widgets/layout'
import { TransactionCard } from '@/entities/tx';

export default async function TransactionDetailPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;

  return (
    <PageLayout title='Transaction Details'>
      <TransactionCard txHash={hash} />
    </PageLayout>
  );
}
