"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import highlightUrl from "./tab-highlight.png";
import { cn } from "../cn";

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
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex w-fit items-center", className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      style={
        {
          "--tab-highlight": `url(${highlightUrl.src})`,
        } as React.CSSProperties
      }
      className={cn(
        "relative inline-flex h-11 flex-1 items-center justify-center gap-1 border border-ui-border px-6 py-1 whitespace-nowrap transition-all",
        "cursor-pointer hover:bg-ui-bg-accent-hover",
        "text-base text-ui-text data-[state=inactive]:underline data-[state=active]:text-ui-text-accent",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:outline-1 focus-visible:ring-3 focus-visible:ring-ui-accent/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "before:bg-(image:--tab-highlight) before:pointer-events-none before:absolute before:-left-[1px] before:-top-[10px] before:h-[10px] before:w-full before:bg-cover before:bg-no-repeat before:opacity-0 before:transition-opacity before:content-['']",
        "data-[state=active]:border-ui-accent data-[state=active]:before:opacity-100",
        className
      )}
      {...props}
    />
  );
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
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
