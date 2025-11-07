import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui/input"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h10" />
              </svg>
            </div>
            <span className="text-lg font-semibold">ShinzoScan</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/blocks" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Blocks
            </Link>
            <Link
              href="/transactions"
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
