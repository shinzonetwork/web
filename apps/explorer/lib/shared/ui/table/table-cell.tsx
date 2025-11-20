import cn from 'clsx';
import { ElementType, ReactNode } from 'react';
import { Skeleton } from '../skeleton';

export interface TableCellProps {
  children?: ReactNode;
  as?: ElementType;
  isHeading?: boolean;
  loading?: boolean;
  /** Renders numbers in a monospace font with letters of equal size */
  numeric?: boolean;
}

/**
 * A unified component for tables, relies on grid containers for layout.
 *
 * Example table with **TableCell**:
 *
 * ```tsx
 * <div className='grid grid-cols-3'>
 *   <div className='col-span-3 grid grid-cols-subgrid'>
 *     <TableCell isHeading>Name</TableCell>
 *     <TableCell isHeading>Pill</TableCell>
 *     <TableCell isHeading>Amount</TableCell>
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
  isHeading,
  as: Container = 'div',
}: TableCellProps) => {
  return (
    <Container
      className={cn(
        'h-18 py-1 px-2',
        'inline-flex items-center gap-2',
        'text-base font-mono text-left font-medium text-text-primary',
        isHeading && 'whitespace-nowrap',
        numeric && 'font-mono tabular-nums',
      )}
    >
      {loading ? (
        <div className='h-1/2 w-full max-w-20'>
          <Skeleton />
        </div>
      ) : (
        children
      )}
    </Container>
  );
};
