import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { getPageLink } from '@/shared/utils/links';
import ShinzoLogo from './shinzo-logo.svg';
import { NavLink } from './nav-link';

export interface HeaderProps {
  hideSearch?: boolean;
}

export const Header = ({ hideSearch }: HeaderProps) => {
  return (
    <header className="h-40 w-full flex items-center border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-12">
        <div className="flex items-center gap-12">
          <Link href="/">
            <ShinzoLogo className="h-7 w-39" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink link={getPageLink('blocks')}>
              Blocks
            </NavLink>
            <NavLink link={getPageLink('txs')}>
              Transactions
            </NavLink>
          </nav>
        </div>

        {!hideSearch && (
          <div className="flex flex-1 items-center gap-4 md:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by address / tx hash / block / token..."
                className="w-full pl-10"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
