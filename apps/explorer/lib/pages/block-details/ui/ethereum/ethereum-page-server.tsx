
  import { isBlockHeightParam, parseBlockHashFromPathParam } from '@/shared/utils/block-route';
import { getServerPage, PageParamsOptions } from '@shinzo/ui/pagination';
  import { notFound } from 'next/navigation';
    import { EthereumBlockDetailClientPage } from './ethereum-page';
import { Hex } from 'viem';
  
  export interface EthereumBlocksDetailsProps {
    searchParams: Promise<PageParamsOptions>
    params: Promise<{ id: string }>;
  }
  
  export const EthereumBlockDetails = async ({ params, searchParams }: EthereumBlocksDetailsProps) => {
    const search = await searchParams;
    const pageParams = getServerPage(search);

    const { id } = await params;
    if (isBlockHeightParam(id)) {
      return <EthereumBlockDetailClientPage blockNumber={Number(id)} pageParams={pageParams} />
    } else {
      const blockHash = parseBlockHashFromPathParam(id) as Hex;
      if (blockHash == null) {
        notFound();
      }
      return <EthereumBlockDetailClientPage blockHash={blockHash} pageParams={pageParams} />; 
    }
  }
  