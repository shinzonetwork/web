import type { ReactNode } from 'react';
import { TableCell, TableCellProps } from './table-cell';

type NormalizedValue<T> = T extends (infer U)[] ? NonNullable<U>[] : NonNullable<T>;

export interface TableNullableCellProps<VALUE> extends Omit<TableCellProps, 'children'> {
  value?: VALUE | VALUE[] | null;
  children?: (value: NormalizedValue<VALUE>) => ReactNode;
}

/**
 * A table cell that displays a placeholder (—) when the given `value` is null or undefined. This is useful when
 * working with GraphQL data in a table, where some fields may be nullable. The component simplifies
 * the typing and rendering logic for such cases.
 *
 * Support multiple values passed as an array. In this case, renders the placeholder if any of the values is null or undefined.
 *
 * Usage:
 *
 * ```tsx
 * <TableNullableCell value={user?.name} >
 *   {(value) => <span>{value}</span>}
 * </TableNullableCell>
 * ```
 */
export function TableNullableCell <VALUE>({ value, children, ...props }: TableNullableCellProps<VALUE>) {
  if (Array.isArray(value)) {
    const hasNullable = value.some((v) => v == null);
    if (hasNullable || !children) {
      return <TableCell {...props}>—</TableCell>;
    }
    return <TableCell {...props}>{children(value as NormalizedValue<VALUE>)}</TableCell>;
  }

  return (
    <TableCell {...props}>
      {value != null && children ? children(value as NormalizedValue<VALUE>) : '—'}
    </TableCell>
  );
}
