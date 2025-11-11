import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/utils"
import { ElementType } from 'react';

const typographyVariants = cva('',
  {
    variants: {
      variant: {
        h1: 'text-3xl',
        h2: 'text-2xl',
        base: 'text-base',
        sm: 'text-sm',
        xs: 'text-xs',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      font: {
        sans: 'font-sans',
        mono: 'font-mono',
      },
    },
    defaultVariants: {
      variant: 'base',
      weight: 'regular',
      font: 'sans',
    },
  }
);

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

const tagMapping: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  base: 'p',
  sm: 'p',
  xs: 'span',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: ElementType;
  children?: React.ReactNode;
}

export const Typography = ({
  className,
  variant,
  weight,
  font,
  as,
  children,
  ...props
}: TypographyProps) => {
  const Component = as ?? (variant && tagMapping?.[variant]) ?? 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, font }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
