"use client";

import * as React from "react";
import { ChevronDown, Grip } from "lucide-react";

import highlightUrl from "../tabs/tab-highlight.png";
import { cn } from "../cn";
import { getImageUrl } from "../image-url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface ChainSelectorOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export interface ChainSelectorProps {
  value: string;
  options: readonly ChainSelectorOption[];
  onValueChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ChainSelectorStyles extends React.CSSProperties {
  "--chain-selector-highlight": string;
}

const SHINZO_EDGE_CLASSES = [
  "relative isolate",
  "before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-2 before:-z-10 before:h-2 before:origin-center before:scale-x-[-1] before:bg-(image:--chain-selector-highlight) before:bg-cover before:bg-center before:bg-no-repeat before:content-['']",
  "after:pointer-events-none after:absolute after:-right-1.5 after:top-1.5 after:-bottom-2 after:-z-10 after:w-1.5 after:bg-ui-accent after:content-['']",
].join(" ");

export function ChainSelector({
  value,
  options,
  onValueChange,
  className,
  disabled = false,
  "aria-label": ariaLabel = "Select chain",
}: ChainSelectorProps) {
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];
  const highlightStyle: ChainSelectorStyles = {
    "--chain-selector-highlight": `url(${getImageUrl(highlightUrl)})`,
  };

  if (!selectedOption) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          type="button"
          aria-label={ariaLabel}
          style={highlightStyle}
          className={cn(
            "group flex h-12 w-48 shrink-0 cursor-pointer items-center gap-3 border border-ui-accent bg-ui-bg px-3 font-mono text-sm text-ui-text outline-none",
            "transition-colors hover:bg-ui-bg-accent-hover focus-visible:ring-3 focus-visible:ring-ui-accent/30",
            "data-[state=open]:bg-ui-bg-accent data-[state=open]:text-ui-text-accent",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            SHINZO_EDGE_CLASSES,
            className,
          )}
        >
          <Grip aria-hidden className="size-4 shrink-0" strokeWidth={1.5} />
          <span className="min-w-0 flex-1 truncate text-left">
            {selectedOption.label}
          </span>
          <span
            aria-hidden
            className="flex size-5 shrink-0 items-center justify-center text-ui-text [&_svg]:max-h-5 [&_svg]:max-w-5"
          >
            {selectedOption.icon}
          </span>
          <ChevronDown
            aria-hidden
            className="size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
            strokeWidth={1.5}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        style={highlightStyle}
        className={cn(
          "w-[var(--radix-dropdown-menu-trigger-width)]",
          SHINZO_EDGE_CLASSES,
        )}
      >
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <span
                aria-hidden
                className="flex size-5 shrink-0 items-center justify-center text-ui-text [&_svg]:max-h-5 [&_svg]:max-w-5"
              >
                {option.icon}
              </span>
              <span className="truncate group-data-[state=checked]:text-ui-text-accent group-data-[state=checked]:underline group-data-[state=checked]:decoration-1 group-data-[state=checked]:underline-offset-4">
                {option.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
