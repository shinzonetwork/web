import type { Meta, StoryObj } from '@storybook/nextjs';
import { Typography } from './index';

const meta = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'base', 'sm', 'xs'],
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

export const Heading1: Story = {
  args: {
    variant: 'h1',
    weight: 'bold',
    children: 'Page Title (text-3xl)',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    weight: 'bold',
    children: 'Section Header (text-2xl)',
  },
};

export const SmallText: Story = {
  args: {
    variant: 'sm',
    children: 'Small text for links and labels (text-sm)',
  },
};

export const Caption: Story = {
  args: {
    variant: 'xs',
    children: 'Caption or meta info (text-xs)',
  },
};

export const MonoHash: Story = {
  args: {
    variant: 'sm',
    font: 'mono',
    weight: 'medium',
    children: '0x1234567890abcdef...',
  },
};
