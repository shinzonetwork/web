'use client';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ComponentProps } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-szo-black text-white hover:bg-szo-black/90',
        secondary: 'border border-szo-border bg-transparent hover:bg-gray-50 text-szo-black',
      },
      size: {
        default: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
