import type { ReactNode } from 'react';
import { Typography } from '@/shared/ui/typography';
import { Skeleton } from '@/shared/ui/skeleton';
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
}

export const DataItem = ({
  title,
  value,
  copyable,
  loading,
  link,
  children,
  className,
}: DataItemProps) => {
  const isValueNull = typeof value === 'undefined' || value == null;
  const displayValue = isValueNull ? '—' : children || value;

  return (
    <div className={cn(
      'grid grid-cols-subgrid col-span-3 gap-x-6 items-center',
      'h-16 border-b border-r border-border',
      className,
    )}>
      <div className='w-3 h-full bg-background-accent-light border-r border-border' />

      <div className='pr-8'>
        <Typography>
          {title}:
        </Typography>
      </div>

      {loading ? (
        <div className='w-32 h-full'>
          <Skeleton />
        </div>
      ) : (
        <div className='flex items-center gap-2 min-w-0 pr-8'>
          {link && !isValueNull ? (
            <Link href={link} className='truncate min-w-0'>
              <Typography color='accent' className='underline'>
                {displayValue}
              </Typography>
            </Link>
          ) : (
            <Typography className='truncate min-w-0'>
              {displayValue}
            </Typography>
          )}

          {copyable && !isValueNull && typeof value === 'string' && <CopyButton text={value} />}
        </div>
      )}
    </div>
  );
};
