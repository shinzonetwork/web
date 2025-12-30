import cn from 'clsx';
import { ElementType, ReactNode } from 'react';
import { Skeleton } from '../skeleton';

export interface TableCellProps {
  children?: ReactNode;
  as?: ElementType;
  /** Prevents wrapping the text to the next line. Usually used for heading cells */
  nowrap?: boolean;
  loading?: boolean;
  className?: string;
  /** Renders numbers in a monospace font with letters of equal size */
  numeric?: boolean;
  /** Text alignment: 'left', 'center', or 'right' */
  align?: 'left' | 'center' | 'right';
}

/**
 * A unified component for tables, relies on grid containers for layout.
 *
 * Example table with **TableCell**:
 *
 * ```tsx
 * <div className='grid grid-cols-3'>
 *   <div className='col-span-3 grid grid-cols-subgrid'>
 *     <TableCell nowrap>Name</TableCell>
 *     <TableCell nowrap>Pill</TableCell>
 *     <TableCell nowrap>Amount</TableCell>
 *   </div>
 *   <div className='col-span-3 grid grid-cols-subgrid'>
 *     <TableCell cell loading>Hello</TableCell>
 *     <TableCell cell>
 *       <Pill>Pending</Pill>
 *     </TableCell>
 *     <TableCell cell numeric>
 *       11.1111
 *     </TableCell>
 *   </div>
 * </div>
 * ```
 */
export const TableCell = ({
  children,
  loading,
  numeric,
  nowrap,
  align = 'left',
  className,
  as: Container = 'div',
}: TableCellProps) => {
  const alignClass = align === 'center' ? 'text-center justify-center' : align === 'right' ? 'text-right justify-end' : 'text-left justify-start';

  return (
    <Container
      className={cn(
        'h-18 py-1 px-2',
        'inline-flex items-center gap-2',
        'text-base font-mono font-medium text-text-primary',
        alignClass,
        nowrap && 'whitespace-nowrap',
        numeric && 'font-mono tabular-nums',
        className,
      )}
    >
      {loading ? (
        <div className='h-1/2 w-full max-w-3/4'>
          <Skeleton />
        </div>
      ) : (
        children
      )}
    </Container>
  );
};
