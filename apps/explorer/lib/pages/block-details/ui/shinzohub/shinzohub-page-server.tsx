
  import { getServerPage, PageParamsOptions } from '@shinzo/ui/pagination';
  import { ShinzohubBlockDetailClientPage } from './shinzohub-page';
  
  export interface ShinzohubBlocksDetailsProps {
    searchParams: Promise<PageParamsOptions>
    params: Promise<{ id: string }>;
  }
  
  export const ShinzohubBlockDetails = async ({ params, searchParams }: ShinzohubBlocksDetailsProps) => {
    const search = await searchParams;
    const pageParams = getServerPage(search);

    const { id } = await params;

    return <ShinzohubBlockDetailClientPage id={id} pageParams={pageParams} />
  }
  