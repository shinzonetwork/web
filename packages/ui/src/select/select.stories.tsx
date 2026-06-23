import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { CircleDot, Square } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const options = [
  {
    value: "primary",
    label: "Primary",
    icon: <CircleDot className="size-4" />,
  },
  {
    value: "secondary",
    label: "Secondary",
    icon: <Square className="size-4" />,
  },
];

function SelectDemo() {
  const [value, setValue] = useState("primary");
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="flex min-h-80 w-full items-start justify-end bg-ui-bg p-8 sm:min-w-xl">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label="Select environment">
          <SelectValue>
            <span className="min-w-0 flex-1 truncate">{selectedOption.label}</span>
            <span aria-hidden className="flex size-5 shrink-0 items-center justify-center text-ui-text">
              {selectedOption.icon}
            </span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span aria-hidden className="flex size-5 shrink-0 items-center justify-center text-ui-text">
                {option.icon}
              </span>
              <span className="truncate">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

const meta = {
  title: "Select",
  component: SelectDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A controlled, accessible select with Shinzo's sharp, dithered visual language and support for custom content.",
      },
    },
  },
} satisfies Meta<typeof SelectDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
