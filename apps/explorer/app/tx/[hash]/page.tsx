import { Header } from "@/widgets/header"
import { TransactionCard } from '@/entities/tx';

export default async function TransactionDetailPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;

  return (
    <div className="min-h-screen">
      <Header />

      <TransactionCard txHash={hash} />
    </div>
  );
}
