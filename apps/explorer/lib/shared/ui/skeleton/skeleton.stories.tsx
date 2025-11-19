import type { Meta, StoryObj } from '@storybook/nextjs';

import { Skeleton } from '.';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Skeleton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  render: (props) => {
    return (
      <>
        <p className='text-foreground size-5'>Resize me</p>
        <div className='h-20 w-60 resize overflow-auto'>
          <Skeleton {...props} />
        </div>
      </>
    );
  },
};
