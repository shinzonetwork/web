"use client"

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import highlightUrl from './tab-highlight.png';

import { cn } from "@/shared/utils/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit items-center",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      style={{ /* set bg image URL used in ::before element */ '--tab-highlight': `url(${highlightUrl.src})` } as React.CSSProperties}
      className={cn(
        'relative inline-flex h-11 flex-1 items-center justify-center gap-1 border border-border px-6 py-1 whitespace-nowrap transition-all',
        'hover:bg-background-accent-hover cursor-pointer',
        'text-base text-text-primary data-[state=inactive]:underline data-[state=active]:text-text-accent',
        'focus-visible:border-transparent focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:outline-1',
        'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "before:bg-(image:--tab-highlight) before:content-[''] before:absolute before:-left-[1px] before:-top-[10px] before:h-[10px] before:w-full before:bg-no-repeat before:bg-cover before:pointer-events-none before:opacity-0 before:transition-opacity",
        'data-[state=active]:border-accent data-[state=active]:before:opacity-100',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
