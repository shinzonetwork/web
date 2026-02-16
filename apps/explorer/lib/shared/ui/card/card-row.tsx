import { ReactNode } from 'react';
import { Skeleton } from '@shinzo/ui/skeleton';
import Link from 'next/link';
import { CopyButton } from '@/shared/ui/button';

export interface CardRowProps {
  title: string;
  value?: string | number | null;
  copyable?: boolean;
  link?: string;
  loading?: boolean;
  children?: ReactNode;
}

/**
 * Utility component to display a row in a card with a title and value.
 */
export const CardRow = ({
  title,
  value,
  link,
  children,
  loading = false,
  copyable = false,
}: CardRowProps) => {
  if (loading) {
    return (
      <div className="flex justify-between border-b border-light pb-4">
        <div className="h-5 w-32">
          <Skeleton />
        </div>
        <div className="h-5 w-48">
          <Skeleton />
        </div>
      </div>
    );
  }

  const isValueNull = typeof value === 'undefined' || value == null;
  const displayValue = isValueNull ? '—' : children || value;

  return (
    <div className="flex justify-between border-b border-light pb-4">
      <span className="text-sm text-muted-foreground">{title}</span>
      <div className="flex items-center gap-2">
        {link && !isValueNull ? (
          <Link href={link} className="font-mono text-sm text-foreground hover:underline">
            {displayValue}
          </Link>
        ) : (
          <span className="text-sm text-foreground">{displayValue}</span>
        )}
        {copyable && !isValueNull && typeof value === 'string' && <CopyButton text={value} />}
      </div>
    </div>
  );
};
