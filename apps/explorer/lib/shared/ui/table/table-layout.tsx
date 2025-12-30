import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/utils';
import { TableCell } from './table-cell';

export interface TableLayoutProps<ROW = unknown> {
  headings?: ReactNode[];
  hideHeader?: boolean;
  hideLeftSpacer?: boolean;
  hideRightSpacer?: boolean;
  iterable: ROW[];
  rowRenderer: (row: ROW, rowIndex: number) => ReactNode;
  isLoading?: boolean;
  loadingRowCount?: number;
  notFound?: ReactNode;
  /** by default, TableLayout uses `grid-cols-N` class, but you can provide a custom grid template class here, e.g. `grid-cols-[auto_1fr_1fr_48px]` */
  gridClass?: string;
  className?: string;
}

const GRID_COLUMN_CLASSES: { [key: number]: string } = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const SPAN_COLUMN_CLASSES: { [key: number]: string } = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

interface TableLayoutWrapperProps {
  children: ReactNode;
  hideHeader: boolean;
  hideLeftSpacer: boolean;
  hideRightSpacer: boolean;
}

export const TableLayoutWrapper = ({ children, hideHeader, hideLeftSpacer, hideRightSpacer }: TableLayoutWrapperProps) => {
  const spacer = (
    <div className={cn('hidden lg:grid min-h-18 basis-0 shrink grow', hideHeader ? 'border-b border-border' : 'pt-[71px]')}>
      <div className={cn(
        'bg-background-accent-light',
        'bg-[repeating-linear-gradient(to_bottom,#C7C7C7,#C7C7C7_1px,transparent_1px,transparent_72px)]'
      )} />
    </div>
  );

  return (
    <section className='flex w-full'>
      {!hideLeftSpacer && spacer}
      {children}
      {!hideRightSpacer && spacer}
    </section>
  );
};

/**
 * TableLayout component to render a table with dynamic columns and rows.
 *
 * Example:
 *
 * ```tsx
 * <TableLayout
 *   isLoading={isLoading}
 *   headings={['Name', 'Age', 'Location']}
 *   iterable={[{ name: 'Alice', age: 30, location: 'NY' }, { name: 'Bob', age: 25, location: 'LA' }]}
 *   rowRenderer={(row) => (
 *     <>
 *       <TableCell>{row.name}</TableCell>
 *       <TableCell>{row.age}</TableCell>
 *       <TableCell>{row.location}</TableCell>
 *     </>
 *   )}
 * />
 * ```
 */
export const TableLayout = <ROW = unknown>({
  headings,
  hideHeader = false,
  hideLeftSpacer = false,
  hideRightSpacer = false,
  iterable,
  rowRenderer,
  notFound,
  isLoading,
  loadingRowCount,
  className,
  gridClass: gridClassName,
}: TableLayoutProps<ROW>) => {
  const columns = headings?.length ?? 0;
  const isNotFound = !!(!isLoading && iterable.length === 0 && notFound);
  const gridClass = gridClassName ?? (GRID_COLUMN_CLASSES[columns] || 'grid-cols-1');
  const spanClass = SPAN_COLUMN_CLASSES[columns] || 'col-span-1';
  const rowClasses = cn(
    spanClass,
    'grid grid-cols-subgrid h-18 bg-background border-b border-border',
    '[&>*:first-child]:border-l [&>*]:border-r [&>*]:border-border',
  );

  return (
    <TableLayoutWrapper hideHeader={hideHeader} hideLeftSpacer={hideLeftSpacer} hideRightSpacer={hideRightSpacer}>
      <div className={cn('grid w-full grow container max-lg:overflow-x-auto max-lg:max-w-[100vw]', gridClass, className)}>
        {!hideHeader && headings && headings.length > 0 && (
          <div className={cn('h-18 grid grid-cols-subgrid border-b border-border', spanClass)}>
            {headings?.map((heading, index) => (
              <TableCell key={index} nowrap>
                {heading}
              </TableCell>
            ))}
          </div>
        )}

        {isNotFound && (
          <div className={cn(spanClass, 'min-h-54 border-x border-b border-border flex flex-col items-center justify-center bg-background-accent-light text-md text-text-primary', hideHeader && 'border-t')}>
            {notFound}
          </div>
        )}

        {!isNotFound && (
          <div className={cn('grid grid-cols-subgrid bg-background-accent-light', hideHeader && 'border-t border-border', spanClass)}>
            {isLoading && Array.from({ length: loadingRowCount ?? 5 }).map((_, index) => (
              <div key={index} className={rowClasses}>
                {Array.from({ length: columns }).map((_, cellIndex) => (
                  <TableCell key={cellIndex} loading />
                ))}
              </div>
            ))}

            {!isLoading && iterable.map((row, rowIndex) => (
              <div key={rowIndex} className={rowClasses}>
                {rowRenderer(row, rowIndex)}
              </div>
            ))}
          </div>
        )}
      </div>
    </TableLayoutWrapper>
  );
};
