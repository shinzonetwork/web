"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "../cn";

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> & {
  onOpenAutoFocus?: (event: Event) => void;
};

function DropdownMenuContent({
  className,
  sideOffset = 8,
  collisionPadding = 16,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-50 max-h-80 min-w-44 overflow-x-hidden overflow-y-auto rounded-xl border-2 border-ui-accent bg-ui-bg p-1 text-ui-text shadow-lg outline-none",
          "origin-[var(--radix-dropdown-menu-content-transform-origin)] data-[state=open]:animate-select-content-in data-[state=closed]:animate-select-content-out motion-reduce:animate-none",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(
        "px-3 py-2 font-mono text-xs text-ui-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex min-h-12 cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 font-mono text-sm text-ui-text outline-none transition-colors",
        "focus:bg-ui-bg-accent-hover data-[highlighted]:bg-ui-bg-accent-hover data-[active=true]:bg-ui-bg-accent-hover",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
};
