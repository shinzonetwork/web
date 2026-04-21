"use client";

import Link from "next/link";
// import { SearchInput } from '@/shared/ui/search-input';
import ShinzoLogo from './shinzo-logo.svg';
import { NavLink } from './nav-link';
import { getPageLink } from '@/shared/utils/links';
import { useChainPathSegment } from "../chain-path-segment";

export interface HeaderProps {
  hideSearch?: boolean;
}

export const Header = ({}: HeaderProps) => {
  const chain = useChainPathSegment();

  return (
    <header className="h-40 w-full flex items-center border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-12 px-4 lg:px-0">
        <div className="flex items-center gap-12">
          <Link href={`${getPageLink('home', { chain })}`}>
            <ShinzoLogo className="h-7 w-39" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink link={`${getPageLink('blocks', { chain })}`}>
              Blocks
            </NavLink>
            <NavLink link={`${getPageLink('txs', { chain })}`}>
              Transactions
            </NavLink>
          </nav>
        </div>

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