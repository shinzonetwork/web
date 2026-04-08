"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import { cn } from "@shinzo/ui/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-all",
  {
    variants: {
      variant: {
        primary: "bg-szo-black text-white hover:bg-szo-black/90",
        secondary:
          "border border-szo-border bg-transparent text-szo-black hover:bg-gray-50",
      },
      size: {
        default: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
