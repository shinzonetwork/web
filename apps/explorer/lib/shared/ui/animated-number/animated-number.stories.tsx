/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Typography } from '../typography';
import { AnimatedNumber } from './animated-number';

const meta: Meta<typeof AnimatedNumber> = {
  component: AnimatedNumber,
  title: 'AnimatedNumber',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 100,
  },
  render: (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev ?? 0) + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Typography variant='lg' font='mono' weight='regular' color='secondary'>
        <AnimatedNumber {...props} value={value} />
      </Typography>
    );
  },
};
