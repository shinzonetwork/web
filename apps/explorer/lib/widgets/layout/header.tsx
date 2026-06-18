"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shinzo/ui/select";
// import { SearchInput } from '@/shared/ui/search-input';
import EthereumIcon from '@/shared/ui/icons/ethereum.svg';
import ShinzoHubIcon from '@/shared/ui/icons/shinzo-filled.svg';
import ShinzoLogo from './shinzo-logo.svg';
import { NavLink } from './nav-link';
import { getPageLink } from '@/shared/utils/links';
import { useChainPathSegment } from "../chain-path-segment";

export interface HeaderProps {
  hideSearch?: boolean;
}

const CHAIN_OPTIONS = [
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

export const Header = ({}: HeaderProps) => {
  const chain = useChainPathSegment();
  const pathname = usePathname();
  const router = useRouter();
  const selectedChain =
    CHAIN_OPTIONS.find((option) => option.value === chain) ?? CHAIN_OPTIONS[0];

  const selectChain = (nextChain: string) => {
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
    <header className="h-40 w-full flex items-center border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 sm:gap-12">
        <div className="flex items-center gap-12">
          <Link href={`${getPageLink('home', { chain })}`}>
            <ShinzoLogo className="h-6 w-auto sm:h-7" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink link={`${getPageLink('blocks', { chain })}`}>
              Blocks
            </NavLink>
            <NavLink link={`${getPageLink('txs', { chain })}`}>
              Transactions
            </NavLink>
            {chain === 'shinzohub' && <NavLink link={`${getPageLink('indexers', { chain })}`}>
              Indexers
            </NavLink>
            }
            {chain === 'shinzohub' && <NavLink link={`${getPageLink('hosts', { chain })}`}>
              Hosts
            </NavLink>
            }
          </nav>
        </div>

        <Select value={chain} onValueChange={selectChain}>
          <SelectTrigger aria-label="Select chain">
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

          <SelectContent align="end">
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

        {/* TODO: implement searching */}
        {/*{!hideSearch && (*/}
        {/*  <div className="flex flex-1 items-center gap-4 md:max-w-lg">*/}
        {/*    <SearchInput />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </header>
  );
};
