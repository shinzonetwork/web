'use client';

import { Container } from '@/widgets/layout';
import { Typography } from '@/shared/ui/typography';
import { Badge } from '@/shared/ui/badge';
import { CopyButton } from '@/shared/ui/button';
import { Skeleton } from '@shinzo/ui/skeleton';
import { DataList, DataItem } from '@/widgets/data-list';
import { useTransactionLogs } from './use-transaction-logs';
import { useDecodedLog } from './use-decoded-log';
import { useTokenMetadata, getTokenIconUrl, type TokenMetadata } from './use-token-metadata';
import { isTokenEvent } from './known-events';
import { formatUnits, getAddress } from 'viem';
import Link from 'next/link';
import { getPageLink } from '@/shared/utils/links';
import { useChainPathSegment } from '@/widgets/chain-path-segment';

interface LogEntryProps {
  logIndex: number | null | undefined;
  address: string | null | undefined;
  topics: (string | null)[] | null | undefined;
  data: string | null | undefined;
}

const TokenInfo = ({ token }: { token: TokenMetadata }) => {
  return (
    <div className='flex items-center gap-1'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getTokenIconUrl(token.address)}
        alt={token.symbol}
        width={20}
        height={20}
        className='rounded-full shrink-0'
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      <Typography variant='sm' font='mono' className='shrink-0 font-medium'>
        {token.symbol}
      </Typography>
      <Typography variant='sm' font='mono' className='truncate text-text-secondary'>
        ({token.name})
      </Typography>
    </div>
  );
};

const LogEntry = ({ logIndex, address, topics, data }: LogEntryProps) => {
  const nonNullTopics = (topics?.filter(Boolean) as string[]) ?? [];
  const { data: decoded } = useDecodedLog(nonNullTopics, data);
  const chain = useChainPathSegment();

  const isToken = isTokenEvent(nonNullTopics);
  const { data: token } = useTokenMetadata(isToken ? (address ?? undefined) : undefined);

  let checksumAddress: string | undefined;
  try {
    checksumAddress = address ? getAddress(address) : undefined;
  } catch {
    checksumAddress = address ?? undefined;
  }

  return (
    <DataList>
      {/* Header: log index + token info / contract address + event name */}
      <DataItem title={`Log #${logIndex ?? '—'}`} childClassName='flex gap-2 items-center'>
        {decoded && (
          <Badge variant='outline' className='border-accent/50 bg-accent/10 text-text-accent text-xs shrink-0'>
            {decoded.eventName}
          </Badge>
        )}
        {checksumAddress && (
          <>
            <Link href={`${getPageLink('address', { param: checksumAddress, chain})}`}>
              <Typography variant='sm' font='mono' className='truncate'>
                {checksumAddress}
              </Typography>
              <CopyButton text={checksumAddress} />
            </Link>
          </>
        )}
      </DataItem>

      {decoded ? (
        decoded.args.map((arg, i) => (
          <DataItem
            key={i}
            title={`${arg.name} (${arg.type})`}
            copyable={!token}
            childClassName='flex gap-2 items-center'
            value={
              token && arg.type === 'uint256'
                ? (<>{formatUnits(BigInt(arg.value), token.decimals)} <TokenInfo token={token} /></>)
                : arg.value
            }
          />
        ))
      ) : (
        // Raw fallback: topics + data as hex
        <>
          {nonNullTopics.map((topic, i) => (
            <DataItem key={i} title={`Topic [${i}]`} value={topic} copyable />
          ))}
          <DataItem title='Data' value={data ?? '0x'} copyable allowWrap />
        </>
      )}
    </DataList>
  );
};

export interface TransactionLogsProps {
  txHash: string;
}

export const TransactionLogs = ({ txHash }: TransactionLogsProps) => {
  const { data: logs, isLoading } = useTransactionLogs({ hash: txHash });

  if (isLoading) {
    return (
      <Container className='py-6 flex flex-col gap-3'>
        <div className='h-12 w-full'><Skeleton /></div>
        <div className='h-12 w-full'><Skeleton /></div>
        <div className='h-12 w-full'><Skeleton /></div>
      </Container>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <Container className='py-10'>
        <Typography variant='md'>No logs for this transaction.</Typography>
      </Container>
    );
  }

  return (
    <div className='flex flex-col'>
      {logs.map((log, i) => log && (
        <LogEntry
          key={i}
          logIndex={log.logIndex}
          address={log.address}
          topics={log.topics}
          data={log.data}
        />
      ))}
    </div>
  );
};
