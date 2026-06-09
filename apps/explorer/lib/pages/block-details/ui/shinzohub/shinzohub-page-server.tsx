
  import { isBlockHeightParam, parseBlockHashFromPathParam } from '@/shared/utils/block-route';
  import { getServerPage, PageParamsOptions } from '@shinzo/ui/pagination';
  import { notFound } from 'next/navigation';
  import { ShinzohubBlockDetailClientPage } from './shinzohub-page';
import { Hex } from 'viem';
  
  export interface ShinzohubBlocksDetailsProps {
    searchParams: Promise<PageParamsOptions>
    params: Promise<{ id: string }>;
  }
  
  export const ShinzohubBlockDetails = async ({ params, searchParams }: ShinzohubBlocksDetailsProps) => {
    const search = await searchParams;
    const pageParams = getServerPage(search);

    const { id } = await params;
    if (isBlockHeightParam(id)) {
      return <ShinzohubBlockDetailClientPage blockNumber={Number(id)} pageParams={pageParams} />
    } else {
      const blockHash = parseBlockHashFromPathParam(id) as Hex;
      if (blockHash == null) {
        notFound();
      }
      return <ShinzohubBlockDetailClientPage blockHash={blockHash} pageParams={pageParams} />; 
    }
  }
  