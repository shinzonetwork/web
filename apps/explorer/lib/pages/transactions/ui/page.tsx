'use client';

import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { PageParams } from "@shinzo/ui/pagination";
import { ShinzohubTransactionsPageClient } from "./shinzohub-page";
import { EthereumTransactionsPageClient } from "./ethereum-page";

export type ShinzohubTransactionPageProps = {
    block?: number;
    pageParams: PageParams;
}
export const TransactionsPageClient = ({block, pageParams}: ShinzohubTransactionPageProps) => {
  const chain = useChainPathSegment();
  switch (chain) {
    case 'ethereum':
      return <EthereumTransactionsPageClient block={block} pageParams={pageParams} />
    case 'shinzohub':
      return <ShinzohubTransactionsPageClient pageParams={pageParams} />
    default:
      return <div>Invalid chain</div>
  }
};