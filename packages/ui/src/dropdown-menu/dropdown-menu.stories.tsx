import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Blocks,
  ChevronDown,
  Database,
  HardDrive,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./index";

interface ResultOption {
  description: string;
  Icon: LucideIcon;
  label: string;
  value: string;
}

const options: ResultOption[] = [
  {
    value: "block",
    label: "Block 2,905,114",
    description: "0xb1bcfc…daad53",
    Icon: Blocks,
  },
  {
    value: "host",
    label: "Host",
    description: "shinzo10vc…dvpccc",
    Icon: HardDrive,
  },
  {
    value: "view",
    label: "Studio View",
    description: "0x018a06…e9932",
    Icon: Database,
  },
];

function DropdownMenuDemo() {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  ) ?? options[0];
  const SelectedIcon = selectedOption.Icon;

  return (
    <div className="flex min-h-80 w-full items-start justify-end bg-ui-bg p-8 sm:min-w-xl">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open search results"
          className="flex h-12 w-64 items-center gap-3 rounded-xl border-2 border-ui-accent bg-ui-bg px-4 font-mono text-sm text-ui-text outline-none transition-colors hover:bg-ui-bg-accent-hover focus-visible:ring-3 focus-visible:ring-ui-accent/30"
        >
          <SelectedIcon aria-hidden className="size-4" />
          <span className="min-w-0 flex-1 truncate text-left">
            {selectedOption.label}
          </span>
          <ChevronDown aria-hidden className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Search results</DropdownMenuLabel>
          {options.map(({ description, Icon, label, value }) => (
            <DropdownMenuItem
              key={value}
              onSelect={() => setSelectedValue(value)}
            >
              <Icon aria-hidden className="size-4" />
              <span className="min-w-0 flex-1">
                <strong className="block truncate font-medium">{label}</strong>
                <span className="block truncate text-xs text-ui-text-muted">
                  {description}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const meta = {
  title: "Dropdown Menu",
  component: DropdownMenuDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible shadcn-style dropdown menu with Shinzo's rounded search-result treatment and support for rich item content.",
      },
    },
  },
} satisfies Meta<typeof DropdownMenuDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
