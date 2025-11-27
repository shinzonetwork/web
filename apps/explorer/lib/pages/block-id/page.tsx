import { PageLayout } from '@/widgets/layout'
import { BlockTabs } from './block-tabs';
import { PageParamsOptions, getServerPage } from '@/shared/ui/pagination/get-server-page';


export interface BlockDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<PageParamsOptions>;}

export const BlockDetailPage = async ({ params, searchParams }: BlockDetailPageProps) => {
  const { id } = await params;
  const blockNumber = Number(id);
  const search = await searchParams;
  const pageParams = getServerPage(search);

  return (
    <PageLayout title={`Block #${blockNumber}`}>
      <BlockTabs height={blockNumber} pageParams={pageParams} />
    </PageLayout>
  );
};
