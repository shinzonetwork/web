"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Grip } from "lucide-react";

import highlightUrl from "../tabs/tab-highlight.png";
import { cn } from "../cn";
import { getImageUrl } from "../image-url";

interface SelectStyles extends React.CSSProperties {
  "--select-highlight": string;
}

const SELECT_HIGHLIGHT_STYLE: SelectStyles = {
  "--select-highlight": `url(${getImageUrl(highlightUrl)})`,
};

const SELECT_EDGE_CLASSES = [
  "relative isolate",
  "before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-2 before:-z-10 before:h-2 before:origin-center before:scale-x-[-1] before:bg-(image:--select-highlight) before:bg-cover before:bg-center before:bg-no-repeat before:content-['']",
  "after:pointer-events-none after:absolute after:-right-1.5 after:top-1.5 after:-bottom-2 after:-z-10 after:w-1.5 after:bg-ui-accent after:content-['']",
].join(" ");

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  const valueClassName = cn(
    "flex min-w-0 flex-1 items-center gap-3 text-left",
    className,
  );

  if (children === undefined) {
    return (
      <span data-slot="select-value" className={valueClassName}>
        <SelectPrimitive.Value {...props} />
      </span>
    );
  }

  return (
    <SelectPrimitive.Value asChild {...props}>
      <span data-slot="select-value" className={valueClassName}>
        {children}
      </span>
    </SelectPrimitive.Value>
  );
}

function SelectTrigger({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      style={{ ...SELECT_HIGHLIGHT_STYLE, ...style }}
      className={cn(
        "group flex h-12 w-48 shrink-0 cursor-pointer items-center gap-3 border border-ui-accent bg-ui-bg px-3 font-mono text-sm text-ui-text outline-none",
        "transition-colors hover:bg-ui-bg-accent-hover focus-visible:ring-3 focus-visible:ring-ui-accent/30",
        "data-[state=open]:bg-ui-bg-accent data-[state=open]:text-ui-text-accent",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        SELECT_EDGE_CLASSES,
        className,
      )}
      {...props}
    >
      <Grip aria-hidden className="size-4 shrink-0" strokeWidth={1.5} />
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          aria-hidden
          className="size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
          strokeWidth={1.5}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 8,
  collisionPadding = 16,
  style,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        style={{ ...SELECT_HIGHLIGHT_STYLE, ...style }}
        className={cn(
          "z-50 w-[var(--radix-select-trigger-width)] min-w-44 border border-ui-accent bg-ui-bg text-ui-text outline-none",
          "origin-[var(--radix-select-content-transform-origin)] data-[state=open]:animate-select-content-in data-[state=closed]:animate-select-content-out motion-reduce:animate-none",
          SELECT_EDGE_CLASSES,
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="w-full p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group relative flex h-10 cursor-pointer select-none items-center gap-3 px-3 font-mono text-sm text-ui-text outline-none transition-colors",
        "focus:bg-ui-bg-accent-hover focus:text-ui-text",
        "data-[state=checked]:text-ui-text-accent data-[state=checked]:underline data-[state=checked]:decoration-1 data-[state=checked]:underline-offset-4",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        <span className="flex min-w-0 items-center gap-3">{children}</span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
