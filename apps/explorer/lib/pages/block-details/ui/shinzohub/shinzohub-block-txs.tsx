'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { ShinzohubTransactionsList } from '@/pages/transactions/ui/shinzohub/shinzohub-transactions-list';
import { useShinzohubTransactions } from '@/pages/transactions/hooks/shinzohub/use-shinzohub-transactions';
import {
  useShinzohubBlock,
  type UseShinzohubBlockOptions,
} from '../../hook/shinzohub/use-shinzohub-block';
import type { Hex } from 'viem';

function toBlockLookupOptions(
  options: ShinzohubBlockTransactionsProps,
): UseShinzohubBlockOptions {
  if (options.blockNumber !== undefined) {
    return { number: options.blockNumber };
  }
  return { hash: options.blockHash };
}

export type ShinzohubBlockTransactionsProps =
  | { blockNumber: number; blockHash?: never; pageParams: PageParams }
  | { blockHash: Hex; blockNumber?: never; pageParams: PageParams };

export const ShinzohubBlockTransactions = (
  options: ShinzohubBlockTransactionsProps,
) => {
  const { pageParams } = options;
  const { page } = pageParams;

  const { data: block, isLoading: isBlockLoading } = useShinzohubBlock(
    toBlockLookupOptions(options),
    { enabled: options.blockNumber === undefined },
  );

  const blockHeight =
    options.blockNumber ??
    (block?.height ? Number(block.height) : undefined);

  const { data, isLoading: isTransactionsLoading } = useShinzohubTransactions({
    pageParams,
    block: blockHeight,
    enabled: blockHeight !== undefined,
  });

  const isLoading =
    (options.blockNumber === undefined && isBlockLoading) ||
    isTransactionsLoading;

  return (
    <>
      <ShinzohubTransactionsList
        transactions={data?.transactions ?? []}
        isLoading={isLoading}
      />
      <Container className="flex justify-between items-end">
        <div />
        <Pagination
          page={page}
          totalItems={data?.totalTransactionsCount ?? 0}
          itemsPerPage={DEFAULT_LIMIT}
        />
      </Container>
    </>
  );
};
