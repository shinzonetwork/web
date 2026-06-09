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
import { Transaction as EthereumTransaction } from '@/shared/graphql';
import { formatGwei, type Transaction as ShinzohubTransaction } from 'viem';
import { getPageLink } from '@/shared/utils/links';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { formatTokenValue } from '@/shared/utils/format-token';

export type Transaction = EthereumTransaction | ShinzohubTransaction;
export const BlockTransactionsList = ({ transactions, timestamp, isLoading }: { transactions: Transaction[] | undefined, timestamp: string | bigint, isLoading: boolean }) => {
  const chain = useChainPathSegment();

  return (
      <TableLayout
        isLoading={isLoading}
        loadingRowCount={DEFAULT_LIMIT}
        notFound='No transactions found.'
        gridClass='grid-cols-[1fr_120px_1fr_1fr_160px_160px]'
        headings={['Hash', 'Age', 'From', 'To', 'Value', 'Fee']}
        iterable={transactions ?? []}
        rowRenderer={(tx) => (
          <>
            <TableNullableCell value={tx?.hash}>
              {(value) => (
                <Link prefetch={false} href={getPageLink('tx', { param: value, chain})}>
                  <Typography color='accent' className='underline'>
                    {formatHash(value, 12, 8)}
                  </Typography>
                </Link>
              )}
            </TableNullableCell>

            <TableNullableCell value={timestamp}>
              {(value) => (
                formatDistanceToNow(new Date(Number(value) * 1000), { addSuffix: true })
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.from}>
              {(value) => (
                <div className="flex items-center gap-1 text-sm text-foreground">
                 {formatHash(value ?? '', 8, 6)}
                 <CopyButton text={value ?? ''} className="text-muted-foreground" />
               </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.to}>
              {(value) => (
                <div className="flex items-center gap-1 text-sm text-foreground">
                  {formatHash(value ?? '', 8, 6)}
                  <CopyButton text={value ?? ''} className="text-muted-foreground" />
               </div>
              )}
            </TableNullableCell>

            <TableNullableCell value={tx?.value}>
              {(value) => `${formatTokenValue(value.toString(), 18)} ETH`}
            </TableNullableCell>

            <TableNullableCell value={tx?.gasPrice}>
              {(value) => `${formatGwei(BigInt(value))} Gwei`}
            </TableNullableCell>
          </>
        )}
      />
  );
};
