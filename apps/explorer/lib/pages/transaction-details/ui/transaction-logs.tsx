'use client';

import Link from 'next/link';
import { Skeleton } from '@shinzo/ui/skeleton';
import { formatUnits, getAddress } from 'viem';
import { Badge } from '@/shared/ui/badge';
import { CopyButton } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { getPageLink, type ChainPathSegment } from '@/shared/utils/links';
import { DataItem, DataList } from '@/widgets/data-list';
import { Container } from '@/widgets/layout';
import { useChainPathSegment } from '@/widgets/chain-path-segment';
import { isTokenEvent } from '../known-events';
import { useDecodedLog } from '../hook/ethereum/use-decoded-log';
import {
  getTokenIconUrl,
  type TokenMetadata,
  useTokenMetadata,
} from '../hook/ethereum/use-token-metadata';

export interface TransactionLog {
  logIndex?: number | null;
  address?: string | null;
  topics?: readonly (string | null)[] | null;
  data?: string | null;
}

function TokenInfo({ token }: { token: TokenMetadata }) {
  return (
    <div className='flex items-center gap-1'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getTokenIconUrl(token.address)}
        alt={token.symbol}
        width={20}
        height={20}
        className='shrink-0 rounded-full'
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
      <Typography variant='sm' font='mono' className='shrink-0 font-medium'>
        {token.symbol}
      </Typography>
      <Typography variant='sm' font='mono' className='truncate text-text-secondary'>
        ({token.name})
      </Typography>
    </div>
  );
}

function normalizeLogAddress(address: string): string {
  try {
    return getAddress(address);
  } catch {
    return address;
  }
}

function LogAddressLink({
  address,
  chain,
}: {
  address: string;
  chain: ChainPathSegment;
}) {
  const displayAddress = normalizeLogAddress(address);

  return (
    <span className='inline-flex min-w-0 items-center gap-1'>
      <Link
        prefetch={false}
        href={getPageLink('address', { param: displayAddress, chain })}
        className='inline-flex min-w-0 cursor-pointer text-text-accent underline'
      >
        <Typography variant='sm' font='mono' className='truncate'>
          {displayAddress}
        </Typography>
      </Link>
      <CopyButton text={displayAddress} className='text-muted-foreground' />
    </span>
  );
}

function TransactionLogEntry({
  logIndex,
  address,
  topics,
  data,
}: TransactionLog) {
  const normalizedTopics = topics?.filter((topic): topic is string => !!topic) ?? [];
  const { data: decoded } = useDecodedLog(normalizedTopics, data);
  const chain = useChainPathSegment();
  const { data: token } = useTokenMetadata(
    isTokenEvent(normalizedTopics) ? (address ?? undefined) : undefined,
  );

  const checksumAddress = address ? normalizeLogAddress(address) : undefined;

  return (
    <DataList>
      <DataItem title={`Log #${logIndex ?? '—'}`} childClassName='flex gap-2 items-center'>
        {decoded && (
          <Badge
            variant='outline'
            className='shrink-0 border-accent/50 bg-accent/10 text-xs text-text-accent'
          >
            {decoded.eventName}
          </Badge>
        )}
        {checksumAddress && <LogAddressLink address={checksumAddress} chain={chain} />}
      </DataItem>

      {decoded ? (
        decoded.args.map((argument, index) => {
          const isAddressArgument =
            argument.type === 'address' && typeof argument.value === 'string';
          const value =
            token && argument.type === 'uint256' ? (
              <>
                {formatUnits(BigInt(argument.value), token.decimals)}{' '}
                <TokenInfo token={token} />
              </>
            ) : isAddressArgument ? (
              <LogAddressLink address={argument.value} chain={chain} />
            ) : (
              argument.value
            );

          return (
            <DataItem
              key={`${argument.name}-${index}`}
              title={`${argument.name} (${argument.type})`}
              copyable={!token && !isAddressArgument}
              childClassName='flex gap-2 items-center'
              value={value}
            />
          );
        })
      ) : (
        <>
          {normalizedTopics.map((topic, index) => (
            <DataItem key={`${topic}-${index}`} title={`Topic [${index}]`} value={topic} copyable />
          ))}
          <DataItem title='Data' value={data ?? '0x'} copyable allowWrap />
        </>
      )}
    </DataList>
  );
}

export function TransactionLogs({
  logs,
  isLoading,
}: {
  logs?: readonly TransactionLog[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Container className='flex flex-col gap-3 py-6'>
        <div className='h-10 w-full'><Skeleton /></div>
        <div className='h-10 w-full'><Skeleton /></div>
        <div className='h-10 w-full'><Skeleton /></div>
      </Container>
    );
  }

  if (!logs?.length) {
    return (
      <Container className='py-10'>
        <Typography variant='md'>No logs for this transaction.</Typography>
      </Container>
    );
  }

  return (
    <div className='flex flex-col'>
      {logs.map((log, index) => (
        <TransactionLogEntry key={`${log.logIndex ?? index}-${log.address ?? ''}`} {...log} />
      ))}
    </div>
  );
}
