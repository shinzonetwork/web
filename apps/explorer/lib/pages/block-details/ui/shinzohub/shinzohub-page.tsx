import { PageLayout } from '@/widgets/layout';
import { ShinzohubBlockTabs } from './shinzohub-block-tabs';
import { PageParams } from '@shinzo/ui/pagination';
import { isBlockHeightParam } from '@/shared/utils/block-route';

export type ShinzohubBlockDetailsClientPageProps = {
  pageParams: PageParams;
  id: string;
};

export const ShinzohubBlockDetailClientPage = async (props: ShinzohubBlockDetailsClientPageProps) => {
  const title =
    isBlockHeightParam(props.id)
      ? `Block #${props.id}`
      : `Block ${props.id.slice(0, 10)}…${props.id.slice(-8)}`;

  return (
    <PageLayout title={title}>
      <ShinzohubBlockTabs id={props.id} pageParams={props.pageParams} />
    </PageLayout>
  );
};
