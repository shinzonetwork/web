"use client";

import { useId } from "react";
import { getPageLink } from "@/shared/utils/links";
import { ChainSelector } from "./chain-selector";
import { DesktopNav } from "./desktop-nav";
import { HeaderLogo } from "./header-logo";
import { HeaderShell } from "./header-shell";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNavLinks } from "./mobile-nav-links";
import type { HeaderNavItem } from "./types";
import { useMobileMenu } from "./use-mobile-menu";

const ETHEREUM_NAV_ITEMS: HeaderNavItem[] = [
  { href: getPageLink("blocks", { chain: "ethereum" }), label: "Blocks" },
  { href: getPageLink("txs", { chain: "ethereum" }), label: "Transactions" },
];

export const EthereumHeader = () => {
  const mobileMenuId = useId();
  const mobileMenu = useMobileMenu();

  return (
    <HeaderShell
      logo={
        <HeaderLogo
          href={getPageLink("home", { chain: "ethereum" })}
          onClick={mobileMenu.close}
        />
      }
      desktopNavigation={<DesktopNav items={ETHEREUM_NAV_ITEMS} />}
      desktopActions={<ChainSelector chain="ethereum" />}
      mobileActions={
        <MobileMenuButton
          controls={mobileMenuId}
          open={mobileMenu.open}
          onClick={mobileMenu.toggle}
        />
      }
      mobileMenu={
        <MobileMenu id={mobileMenuId} open={mobileMenu.open}>
          <div className="mb-4">
            <ChainSelector
              chain="ethereum"
              className="w-full"
              contentAlign="start"
              onChainChange={mobileMenu.close}
            />
          </div>
          <MobileNavLinks
            items={ETHEREUM_NAV_ITEMS}
            onNavigate={mobileMenu.close}
          />
        </MobileMenu>
      }
    />
  );
};
