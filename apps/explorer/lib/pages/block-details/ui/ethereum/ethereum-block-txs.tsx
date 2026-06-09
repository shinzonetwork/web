'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { useEthereumBlockTransactions } from "../../hook/ethereum/use-ethereum-block-transactions";
import { BlockTransactionsList } from "../block-transactions-list";
import { useEthereumBlockTransactionsCount } from '../../hook/ethereum/use-ethereum-block-transactions-count';

export type EthereumBlockTransactionsProps =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams } 
  | { blockHash: string; blockNumber?: never; pageParams: PageParams };

export const EthereumBlockTransactions = (options: EthereumBlockTransactionsProps) => {
  const { page } = options.pageParams;
  const { data: blockTransactions, isLoading: isBlockTransactionsLoading } = useEthereumBlockTransactions(options);
  const { data: blockTransactionsCount } = useEthereumBlockTransactionsCount(options);
  return (
    <>
      <BlockTransactionsList
        transactions={blockTransactions?.transactions ?? []}
        timestamp={blockTransactions?.timestamp ?? ''}
        isLoading={isBlockTransactionsLoading}
      />
      <Container className='flex justify-between items-end'>
        <div />
        <Pagination
          page={page}
          totalItems={blockTransactionsCount?.txCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};