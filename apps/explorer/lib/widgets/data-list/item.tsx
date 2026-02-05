import type { ReactNode } from 'react';
import { Typography } from '@/shared/ui/typography';
import { Skeleton } from '@shinzo/ui/skeleton';
import Link from 'next/link';
import { CopyButton } from '@/shared/ui/button';
import { cn } from '@/shared/utils/utils';

export interface DataItemProps {
  title: string;
  value?: string | number | null;
  copyable?: boolean;
  link?: string;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
  allowWrap?: boolean;
  wrapAt?: number;
  truncate?: boolean;
}

export const DataItem = ({
  title,
  value,
  copyable,
  loading,
  link,
  children,
  className,
  allowWrap,
  wrapAt,
  truncate = true,
}: DataItemProps) => {
  const isValueNull = typeof value === 'undefined' || value == null;
  const displayValue =
  typeof children !== 'undefined' ? children : isValueNull ? '—' : value;  const wrapStyle =
    allowWrap && wrapAt
      ? {
          maxWidth: `${wrapAt}ch`,
        }
      : undefined;
  const textBehaviorClass = allowWrap
    ? 'break-all whitespace-pre-wrap'
    : truncate
      ? 'truncate'
      : 'whitespace-nowrap overflow-x-auto';

  return (
    <div
      className={cn(
        'grid grid-cols-subgrid col-span-3 gap-x-6 items-center',
        'h-16 border-b border-r border-border',
        allowWrap && 'items-start py-4 h-auto',
        className,
      )}
    >
      <div
        className={cn(
          'w-3 bg-background-accent-light border-r border-border',
          allowWrap ? 'self-stretch -my-4' : 'h-full',
        )}
      />

      <div className='pr-8'>
        <Typography className='w-48 shrink-0'>
          {title}:
        </Typography>
      </div>

      {loading ? (
        <div className='w-32 h-full'>
          <Skeleton />
        </div>
      ) : (
        <div
          className={cn(
            'flex gap-2 lg:min-w-0 pr-8',
            allowWrap ? 'items-start' : 'items-center',
          )}
        >
          {link && !isValueNull ? (
            <Link
              href={link}
              className={cn(
                'lg:min-w-0',
                textBehaviorClass,
              )}
              style={wrapStyle}
            >
              <Typography
                as='div'
                color='accent'
                className={cn(
                  'underline',
                  textBehaviorClass,
                )}
                style={wrapStyle}
              >
                {displayValue}
              </Typography>
            </Link>
          ) : (
            <Typography
              as='div'
              className={cn(
                'lg:min-w-0 w-[900px]',
                textBehaviorClass,
              )}
              style={wrapStyle}
            >
              {displayValue}
            </Typography>
          )}

          {copyable && !isValueNull && typeof value === 'string' && <CopyButton text={value} />}
        </div>
      )}
    </div>
  );
};
