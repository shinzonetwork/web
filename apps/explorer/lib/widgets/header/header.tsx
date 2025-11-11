import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import ShinzoLogo from './shinzo-logo.svg';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="max-h-8">
            <ShinzoLogo className="h-6 w-33" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/blocks" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Blocks
            </Link>
            <Link
              href="/tx"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Transactions
            </Link>
          </nav>
        </div>
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
      </div>
    </header>
  );
};
