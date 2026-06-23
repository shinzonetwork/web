import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";

import EthereumIcon from "./ethereum.svg";
import ShinzoHubIcon from "./shinzohub.svg";
import { ChainSelector } from "./chain-selector";

const options = [
  {
    value: "ethereum",
    label: "Ethereum",
    icon: <EthereumIcon className="size-4" />,
  },
  {
    value: "shinzohub",
    label: "ShinzoHub",
    icon: <ShinzoHubIcon className="h-4 w-5" />,
  },
];

function ChainSelectorDemo() {
  const [value, setValue] = useState("ethereum");

  return (
    <div className="flex min-h-80 w-full items-start justify-end bg-ui-bg p-8 sm:min-w-xl">
      <ChainSelector
        value={value}
        options={options}
        onValueChange={setValue}
      />
    </div>
  );
}

const meta = {
  title: "Chain Selector",
  component: ChainSelectorDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A controlled, accessible chain picker with direct SVG icons and Shinzo's sharp, dithered visual language.",
      },
    },
  },
} satisfies Meta<typeof ChainSelectorDemo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
