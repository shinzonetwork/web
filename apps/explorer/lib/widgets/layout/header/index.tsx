"use client";

import { useChainPathSegment } from "@/widgets/chain-path-segment";
import { EthereumHeader } from "./ethereum-header";
import { ShinzohubHeader } from "./shinzohub-header";

export interface HeaderProps {
  hideSearch?: boolean;
}

export const Header = ({ hideSearch = false }: HeaderProps) => {
  const chain = useChainPathSegment();

  if (chain === "ethereum") {
    return <EthereumHeader />;
  }

  return <ShinzohubHeader hideSearch={hideSearch} />;
};
