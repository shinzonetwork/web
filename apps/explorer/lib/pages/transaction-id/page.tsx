import { PageLayout } from '@/widgets/layout'
import { TransactionCard } from './tx-card';

export const TransactionDetailPage = async ({ params }: { params: Promise<{ hash: string }> }) => {
  const { hash } = await params;

  return (
    <PageLayout title='Transaction Details'>
      <TransactionCard txHash={hash} />
    </PageLayout>
  );
};
