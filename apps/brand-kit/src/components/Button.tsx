import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-body font-medium border-0 cursor-pointer",
    "transition-all duration-150 no-underline whitespace-nowrap leading-none rounded-full shrink-0",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-szo-black text-white hover:bg-szo-black/90",
        red:       "bg-szo-primary text-white hover:bg-szo-primary-dark",
        secondary: "bg-transparent text-szo-primary border border-szo-primary hover:bg-szo-primary/[0.06]",
        outline:   "bg-transparent text-szo-text border border-szo-border hover:bg-szo-bg-muted hover:border-gray-400",
        ghost:     "bg-transparent text-szo-text hover:bg-szo-bg-muted",
        custom:    "",
      },
      size: {
        default: "h-11 px-8 text-sm rounded-full",
        sm:      "h-8 px-4 text-xs rounded-md",
        lg:      "h-12 px-8 text-base rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      className={twMerge(button({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
