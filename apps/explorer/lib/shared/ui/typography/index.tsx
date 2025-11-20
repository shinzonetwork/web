import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/utils"

const typographyVariants = cva('',
  {
    variants: {
      variant: {
        h2: 'text-h2',
        md: 'text-md',
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
      color: {
        primary: 'text-text-primary',
        secondary: 'text-text-secondary',
        accent: 'text-text-accent',
        inverted: 'text-text-inverted',
      },
    },
    defaultVariants: {
      variant: 'base',
      weight: 'medium',
      font: 'sans',
    },
  }
);

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

const tagMapping: Record<TypographyVariant, ElementType> = {
  h2: 'h2',
  md: 'p',
  base: 'p',
  sm: 'p',
  xs: 'p',
};

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof typographyVariants> {
  as?: ElementType;
  children?: ReactNode;
}

export const Typography = ({
  className,
  variant,
  weight,
  font,
  color,
  as,
  children,
  ...props
}: TypographyProps) => {
  const Component = as ?? (variant && tagMapping?.[variant]) ?? 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, font, color }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
