import { PageLayout } from '@/widgets/layout';
import { BlockTabs } from './block-tabs';
import { PageParams } from '@shinzo/ui/pagination';

export type BlockDetailClientPageProps =
  | {
      pageParams: PageParams;
      blockNumber: number;
    }
  | {
      pageParams: PageParams;
      blockHash: string;
    };

export const BlockDetailClientPage = async (props: BlockDetailClientPageProps) => {
  const title =
    'blockNumber' in props
      ? `Block #${props.blockNumber}`
      : `Block ${props.blockHash.slice(0, 10)}…${props.blockHash.slice(-8)}`;

  return (
    <PageLayout title={title}>
      {'blockNumber' in props ? (
        <BlockTabs blockNumber={props.blockNumber} pageParams={props.pageParams} />
      ) : (
        <BlockTabs blockHash={props.blockHash} pageParams={props.pageParams} />
      )}
    </PageLayout>
  );
};
