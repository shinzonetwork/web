"use client";

import { type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shinzo/ui/select";
import EthereumIcon from "@/shared/ui/icons/ethereum.svg";
import ShinzoHubIcon from "@/shared/ui/icons/shinzo-filled.svg";
import { cn } from "@/shared/utils/utils";
import type { ChainPathSegment } from "@/shared/utils/links";

interface ChainOption {
  value: ChainPathSegment;
  label: string;
  icon: ReactNode;
}

const CHAIN_OPTIONS: ChainOption[] = [
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

export interface ChainSelectorProps {
  chain: ChainPathSegment;
  className?: string;
  contentAlign?: "start" | "center" | "end";
  onChainChange?: () => void;
}

export const ChainSelector = ({
  chain,
  className,
  contentAlign = "end",
  onChainChange,
}: ChainSelectorProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const selectedChain =
    CHAIN_OPTIONS.find((option) => option.value === chain) ?? CHAIN_OPTIONS[0];

  const selectChain = (nextChain: string) => {
    onChainChange?.();

    if (nextChain === chain) {
      return;
    }

    const nextPathname = pathname.replace(
      /^\/(?:ethereum|shinzohub)(?=\/|$)/,
      `/${nextChain}`,
    );
    const preservedPathname = nextPathname === pathname
      ? `/${nextChain}`
      : nextPathname;

    router.push(
      `${preservedPathname}${window.location.search}${window.location.hash}`,
    );
  };

  return (
    <Select value={chain} onValueChange={selectChain}>
      <SelectTrigger
        aria-label="Select chain"
        className={cn("w-48", className)}
      >
        <SelectValue>
          <span className="min-w-0 flex-1 truncate">
            {selectedChain.label}
          </span>
          <span
            aria-hidden
            className="flex size-5 shrink-0 items-center justify-center text-ui-text"
          >
            {selectedChain.icon}
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent align={contentAlign} className="z-[300]">
        {CHAIN_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span
              aria-hidden
              className="flex size-5 shrink-0 items-center justify-center text-ui-text"
            >
              {option.icon}
            </span>
            <span className="truncate">{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
