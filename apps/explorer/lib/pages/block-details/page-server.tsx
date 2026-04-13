
  import { isBlockHeightParam, parseBlockHashFromPathParam } from '@/shared/utils/block-route';
import { getServerPage, PageParamsOptions } from '@shinzo/ui/pagination';
  import { notFound } from 'next/navigation';
    import { BlockDetailClientPage } from './page';
  
  export interface BlocksDetailsProps {
    searchParams: Promise<PageParamsOptions>
    params: Promise<{ id: string }>;
  }
  
  export const BlockDetails = async ({ params, searchParams }: BlocksDetailsProps) => {
    const search = await searchParams;
    const pageParams = getServerPage(search);

    const { id } = await params;
    if (isBlockHeightParam(id)) {
      return <BlockDetailClientPage blockNumber={Number(id)} pageParams={pageParams} />
    } else {
      const blockHash = parseBlockHashFromPathParam(id);
      if (blockHash == null) {
        notFound();
      }
      return <BlockDetailClientPage blockHash={blockHash} pageParams={pageParams} />; 
    }
  }
  