'use client';

import { Container } from '@/widgets/layout';
import { DEFAULT_LIMIT, PageParams, Pagination } from '@shinzo/ui/pagination';
import { ShinzohubTransactionsList } from '@/pages/transactions/ui/shinzohub/shinzohub-transactions-list';
import { useShinzohubTransactions } from '@/pages/transactions/hooks/shinzohub/use-shinzohub-transactions';
import { useShinzohubBlock } from '../../hook/shinzohub/use-shinzohub-block';
import { isBlockHeightParam } from '@/shared/utils/block-route';

export type ShinzohubBlockTransactionsProps = {
  id: string;
  pageParams: PageParams;
};

export const ShinzohubBlockTransactions = ({
  id,
  pageParams,
}: ShinzohubBlockTransactionsProps) => {
  const { page } = pageParams;
  const lookupByHash = !isBlockHeightParam(id);

  const { data: block, isLoading: isBlockLoading } = useShinzohubBlock(id, {
    enabled: lookupByHash,
  });

  const blockHeight = isBlockHeightParam(id)
    ? Number(id)
    : block?.height
      ? Number(block.height)
      : undefined;

  const { data, isLoading: isTransactionsLoading } = useShinzohubTransactions({
    pageParams,
    block: blockHeight,
    enabled: blockHeight !== undefined,
  });

  const isLoading = (lookupByHash && isBlockLoading) || isTransactionsLoading;

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
