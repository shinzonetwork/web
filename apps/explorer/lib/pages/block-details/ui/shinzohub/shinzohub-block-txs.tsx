'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { BlockTransactionsList } from "../block-transactions-list";
import { useShinzohubBlock, UseShinzohubBlockOptions } from '../../hook/shinzohub/use-shinzohub-block';
import { Hex } from 'viem';

export type ShinzohubBlockTransactionsProps =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams } 
  | { blockHash: Hex; blockNumber?: never; pageParams: PageParams };

export const ShinzohubBlockTransactions = (options: ShinzohubBlockTransactionsProps) => {
  const { page } = options.pageParams;
  const { data: block, isLoading: isBlockLoading } = useShinzohubBlock(options as unknown as UseShinzohubBlockOptions);

  return (
    <>
      <BlockTransactionsList
        transactions={block?.transactions ?? []}
        timestamp={block?.timestamp ?? ''}
        isLoading={isBlockLoading}
      />
      <Container className='flex justify-between items-end'>
        <div />
        <Pagination
          page={page}
          totalItems={block?.transactions?.length ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};