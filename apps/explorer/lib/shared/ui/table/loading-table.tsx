import type { ComponentProps } from 'react';
import { Skeleton } from '../skeleton';
import { TableCell, TableRow, TableBody } from './table';

export interface TableLoadingRowProps extends ComponentProps<"tr"> {
  columns: number;
}

export const TableLoadingRow = ({ columns, ...props }: TableLoadingRowProps) => {
  return (
    <TableRow {...props}>
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index}>
          <div className='w-full max-w-3/4 h-8'>
            <Skeleton />
          </div>
        </TableCell>
      ))}
    </TableRow>
  )
};

export interface TableLoadingBodyProps extends ComponentProps<"tbody"> {
  columns: number;
  rows: number;
}

export const TableLoadingBody = ({ columns, rows, ...props }: TableLoadingBodyProps) => {
  return (
    <TableBody {...props}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableLoadingRow key={rowIndex} columns={columns} />
      ))}
    </TableBody>
  )
};
