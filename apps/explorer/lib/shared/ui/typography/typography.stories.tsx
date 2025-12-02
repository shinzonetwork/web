import type { Meta, StoryObj } from '@storybook/nextjs';
import { Typography } from './index';

const meta = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h2', 'md', 'base', 'sm', 'xs'],
      description: 'Text size variant matching Tailwind utilities',
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    font: {
      control: 'select',
      options: ['sans', 'mono'],
      description: 'Font family (Geist Sans or Geist Mono)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'inverted'],
      description: 'Button text color',
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'p', 'main', 'section'],
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'base',
    children: 'Default typography text',
  },
};
