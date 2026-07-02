"use client";

import {
  useEffect,
  useId,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { ExplorerSearch } from "@/widgets/search";
import { getPageLink } from "@/shared/utils/links";
import { ChainSelector } from "./chain-selector";
import { DesktopNav } from "./desktop-nav";
import { HeaderLogo } from "./header-logo";
import { HeaderShell } from "./header-shell";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNavLinks } from "./mobile-nav-links";
import { MobileSearchButton } from "./mobile-search-button";
import { MobileSearchTray } from "./mobile-search-tray";
import type { HeaderNavItem } from "./types";
import { useMobileMenu } from "./use-mobile-menu";

export interface ShinzohubHeaderProps {
  hideSearch?: boolean;
}

const SHINZOHUB_NAV_ITEMS: HeaderNavItem[] = [
  { href: getPageLink("blocks", { chain: "shinzohub" }), label: "Blocks" },
  { href: getPageLink("txs", { chain: "shinzohub" }), label: "Transactions" },
  { href: getPageLink("generators", { chain: "shinzohub" }), label: "Generators" },
  { href: getPageLink("hosts", { chain: "shinzohub" }), label: "Hosts" },
  { href: getPageLink("validators", { chain: "shinzohub" }), label: "Validators" },
];

export const ShinzohubHeader = ({
  hideSearch = false,
}: ShinzohubHeaderProps) => {
  const pathname = usePathname();
  const mobileMenuId = useId();
  const mobileMenu = useMobileMenu();
  const [searchOpen, setSearchOpen] = useState(false);
  const showDesktopSearch = !hideSearch;

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setSearchOpen(false);
    mobileMenu.toggle();
  };

  const toggleMobileSearch = () => {
    mobileMenu.close();
    setSearchOpen((open) => !open);
  };

  return (
    <HeaderShell
      logo={
        <HeaderLogo
          href={getPageLink("home", { chain: "shinzohub" })}
          onClick={mobileMenu.close}
        />
      }
      desktopNavigation={<DesktopNav items={SHINZOHUB_NAV_ITEMS} />}
      desktopActions={
        <>
          {showDesktopSearch && (
            <ExplorerSearch className="hidden max-w-lg flex-1 [@media(min-width:1281px)]:block" />
          )}
          <MobileSearchButton
            className="hidden lg:flex [@media(min-width:1281px)]:hidden"
            open={searchOpen}
            onClick={toggleMobileSearch}
          />
          <ChainSelector chain="shinzohub" />
        </>
      }
      mobileActions={
        <>
          <MobileSearchButton
            open={searchOpen}
            onClick={toggleMobileSearch}
          />
          <MobileMenuButton
            controls={mobileMenuId}
            open={mobileMenu.open}
            onClick={toggleMobileMenu}
          />
        </>
      }
      mobileSearchTray={
        <MobileSearchTray open={searchOpen} />
      }
      mobileMenu={
        <MobileMenu id={mobileMenuId} open={mobileMenu.open}>
          <div className="mb-4">
            <ChainSelector
              chain="shinzohub"
              className="w-full"
              contentAlign="start"
              onChainChange={mobileMenu.close}
            />
          </div>
          <MobileNavLinks
            items={SHINZOHUB_NAV_ITEMS}
            onNavigate={mobileMenu.close}
          />
        </MobileMenu>
      }
    />
  );
};
