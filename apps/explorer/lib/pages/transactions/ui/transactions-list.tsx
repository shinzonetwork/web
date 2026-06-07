"use client";

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_LIMIT } from '@shinzo/ui/pagination';
import { formatHash } from '@/shared/utils/format-hash';
import { Typography } from '@/shared/ui/typography';
import {
  TableLayout,
  TableNullableCell,
} from '@shinzo/ui/table';
import { CopyButton } from '@/shared/ui/button';
import { getPageLink } from "@/shared/utils/links";
import { useChainPathSegment } from "@/widgets/chain-path-segment";
import type { ShinzohubTransaction } from '@/shared/shinzohub/transactions/types';
import { EthereumTransaction } from '../hooks/ethereum/use-ethereum-transactions';
import { formatTokenValue } from '@/shared/utils/format-token';
import { formatGasPrice } from '@/shared/utils/format-gasprice';
import { getToken } from '@/shared/utils/tokens';

export type TransactionsListProps = {
  transactions: (EthereumTransaction | ShinzohubTransaction)[] | undefined;
  isLoading: boolean;
}
export const TransactionsList = ({ transactions, isLoading }: TransactionsListProps) => {
  const chain = useChainPathSegment();

  return (
      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No transactions found.'
        gridClass='grid-cols-[1fr_100px_120px_1fr_1fr_160px_160px]'
        headings={['Hash', 'Block', 'Age', 'From', 'To', 'Value', 'Fee']}
        iterable={transactions ?? []}
        rowRenderer={(tx) => (
          <>
            <TableNullableCell value={tx?.hash}>
              {(value) => (
                <Link prefetch={false} href={`${getPageLink('tx', { param: value, chain})}`}>
                  <Typography color='accent' className='underline'>
                    {formatHash(value, 12, 8)}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.blockNumber}>
              {(value) => (
                <Link prefetch={false} href={`${getPageLink('block', { param: value.toString(), chain})}`}>
                  <Typography color='accent' className='underline'>
                    {value}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.timestamp}>
              {(value) => (
                formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.from}>
              {(value) => (
                <Link prefetch={false} href={`${getPageLink('address', { param: value, chain})}`}>
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Typography color='accent' className='underline'>
                      {formatHash(value ?? '', 8, 6)}
                    </Typography>
                    <CopyButton text={value ?? ''} className="text-muted-foreground" />
                  </div>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.to}>
              {(value) => (
                <Link prefetch={false} href={`${getPageLink('address', { param: value, chain})}`}>
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Typography color='accent' className='underline'>
                      {formatHash(value ?? '', 8, 6)}
                    </Typography>
                    <CopyButton text={value ?? ''} className="text-muted-foreground" />
                  </div>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.value}>
              {(value) => `${formatTokenValue(value, getToken(chain)?.decimals)} ${getToken(chain)?.symbol}`}
            </TableNullableCell>

            <TableNullableCell value={tx?.gasPrice}>
              {(value) => `${formatGasPrice(value ?? '')} Gwei`}
            </TableNullableCell>
          </>
        )}
      />
  );
};
