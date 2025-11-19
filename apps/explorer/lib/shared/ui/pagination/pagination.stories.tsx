import type { Meta, StoryObj } from '@storybook/nextjs';
import { usePage } from './use-page';
import { Pagination } from './pagination';

const PaginationDemo = ({
  totalItems,
  itemsPerPage,
}: {
  totalItems: number;
  itemsPerPage: number;
}) => {
  const { page } = usePage();

  return (
    <div className="min-w-[600px]">
      <div className="mt-4 mb-8 text-xs text-muted-foreground text-center">
        Showing items {((page - 1) * itemsPerPage + 1).toLocaleString()} - {Math.min(page * itemsPerPage, totalItems).toLocaleString()}
      </div>

      <Pagination page={page} totalItems={totalItems} itemsPerPage={itemsPerPage} />
    </div>
  );
};

const meta = {
  title: 'Pagination',
  component: PaginationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { page: '1' },
      },
    },
  },
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 1, max: 10000, step: 10 },
      description: 'Total number of items to paginate',
    },
    itemsPerPage: {
      control: { type: 'number', min: 1, max: 100, step: 5 },
      description: 'Number of items per page',
    },
  },
} satisfies Meta<typeof PaginationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 330,
    itemsPerPage: 10,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/?path=/story/pagination--default',
        query: { page: '1' },
      },
    },
  },
};

