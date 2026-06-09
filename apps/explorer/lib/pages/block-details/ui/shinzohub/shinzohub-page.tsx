import { PageLayout } from '@/widgets/layout';
import { ShinzohubBlockTabs } from './shinzohub-block-tabs';
import { PageParams } from '@shinzo/ui/pagination';

export type ShinzohubBlockDetailsClientPageProps =
  | {
      pageParams: PageParams;
      blockNumber: number;
    }
  | {
      pageParams: PageParams;
      blockHash: string;
    };

export const ShinzohubBlockDetailClientPage = async (props: ShinzohubBlockDetailsClientPageProps) => {
  const title =
    'blockNumber' in props
      ? `Block #${props.blockNumber}`
      : `Block ${props.blockHash.slice(0, 10)}…${props.blockHash.slice(-8)}`;

  return (
    <PageLayout title={title}>
      {'blockNumber' in props ? (
        <ShinzohubBlockTabs blockNumber={props.blockNumber} pageParams={props.pageParams} />
      ) : (
        <ShinzohubBlockTabs blockHash={props.blockHash} pageParams={props.pageParams} />
      )}
    </PageLayout>
  );
};
