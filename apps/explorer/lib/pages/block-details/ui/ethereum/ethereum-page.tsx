import { PageLayout } from '@/widgets/layout';
import { EthereumBlockTabs } from './ethereum-block-tabs';
import { PageParams } from '@shinzo/ui/pagination';
import { Hex } from 'viem';

export type EthereumBlockDetailClientPageProps =
  | {
      pageParams: PageParams;
      blockNumber: number;
    }
  | {
      pageParams: PageParams;
      blockHash: Hex;
    };

export const EthereumBlockDetailClientPage = async (props: EthereumBlockDetailClientPageProps) => {
  const title =
    'blockNumber' in props
      ? `Block #${props.blockNumber}`
      : `Block ${props.blockHash.slice(0, 10)}…${props.blockHash.slice(-8)}`;

  return (
    <PageLayout title={title}>
      {'blockNumber' in props ? (
        <EthereumBlockTabs blockNumber={props.blockNumber} pageParams={props.pageParams} />
      ) : (
        <EthereumBlockTabs blockHash={props.blockHash} pageParams={props.pageParams} />
      )}
    </PageLayout>
  );
};
