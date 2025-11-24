import type { Meta, StoryObj } from '@storybook/nextjs';
import { formatDistanceToNow } from 'date-fns';
import { formatHash } from '@/shared/utils/format-hash';
import { useEffect, useState } from 'react';
import { TableCell } from './table-cell';
import { TableLayout } from './table-layout';
import { TableNullableCell } from './nullable-cell';

interface BlockRow {
  hash: string;
  number: number;
  timestamp: number;
  miner: string;
}

const createMockBlocks = (page: number, perPage: number): BlockRow[] => {
  const now = Date.now();
  return Array.from({ length: perPage }).map((_, index) => {
    const offset = (page - 1) * perPage + index;
    return {
      hash: `0x${(Math.abs(987654321 - offset)).toString(16).padStart(64, '0')}`,
      number: 199_999 - offset,
      timestamp: Math.floor((now - offset * 12_000) / 1000),
      miner: `0x${(123456789 + offset).toString(16).padStart(40, '0')}`,
    } satisfies BlockRow;
  });
};

interface TableDemoProps {
  page: number;
  rowsPerPage: number;
}

const TableDemo = ({ page, rowsPerPage }: TableDemoProps) => {
  const rows = createMockBlocks(page, rowsPerPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <section className='w-full'>
      <TableLayout
        isLoading={isLoading}
        headings={[
          'Hash',
          'Block',
          'Age',
          'Miner',
        ]}
        iterable={rows}
        rowRenderer={(block) => (
          <>
            <TableNullableCell value={block.hash}>
              {(value) => (
                <span className="font-mono text-sm text-foreground">
                    {formatHash(value, 8, 6)}
                  </span>
              )}
            </TableNullableCell>

            <TableCell numeric>
              {block.number.toLocaleString()}
            </TableCell>

            <TableNullableCell value={block.timestamp}>
              {(value) =>
                formatDistanceToNow(new Date(value * 1000), {
                  addSuffix: true,
                })
              }
            </TableNullableCell>

            <TableNullableCell numeric value={block.miner}>
              {(value) => (
                <span className="font-mono text-sm text-foreground">
                    {formatHash(value, 8, 6)}
                  </span>
              )}
            </TableNullableCell>
          </>
        )}
      />
    </section>
  );
};

const meta = {
  title: 'Table',
  component: TableDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Page number to showcase different mock rows',
    },
    rowsPerPage: {
      control: { type: 'number', min: 3, max: 15, step: 1 },
      description: 'How many rows to render and load with skeletons',
    },
  },
} satisfies Meta<typeof TableDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
    rowsPerPage: 6,
  },
};

