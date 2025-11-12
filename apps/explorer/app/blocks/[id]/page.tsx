import { Header } from "@/widgets/header"
import { BlockCard } from '@/entities/block';

export default async function BlockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blockNumber = Number(id)

  return (
    <div className="min-h-screen">
      <Header />
      <BlockCard height={blockNumber} />
    </div>
  )
}
