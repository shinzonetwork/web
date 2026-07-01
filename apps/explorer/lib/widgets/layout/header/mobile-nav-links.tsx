"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/utils";
import type { HeaderNavItem } from "./types";

export interface MobileNavLinksProps {
  items: HeaderNavItem[];
  onNavigate: () => void;
}

export const MobileNavLinks = ({
  items,
  onNavigate,
}: MobileNavLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex min-h-14 items-center font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ui-accent/30",
              isActive && "text-text-accent",
            )}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
