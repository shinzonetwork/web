"use client";


import { NavLink } from "@/app/(frontend)/_layout";
import LogoSvg from "@/components/svg/shinzo-logo.svg";
import { useLockBody } from "@/hooks/useLockBody";
import { useBreakpointObserver } from "@/hooks/useMediaQuery";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NavDesktop } from "./nav-desktop";
import NavMobile from "./nav-mobile";
import { Button } from "./ui/button";

export interface HeaderProps {
    navMenu: NavLink[];
    socialLinks: {
        discord: string;
        github: string;
    };
    docsLink: string;
}

export default function HeaderNew({ navMenu, socialLinks, docsLink }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const isLarge = useBreakpointObserver('--breakpoint-lg');
    const pathname = usePathname();

    useLockBody(mobileMenuOpen);

    const toggleMobileMenu = useCallback(() => setMobileMenuOpen(!mobileMenuOpen), [mobileMenuOpen]);

    // Close the mobile menu when the pathname changes
    useEffect(() => setMobileMenuOpen(false), [pathname]);

    // Edge case: If the mobile menu is open and resized to large screen, close the menu
    useEffect(() => {
        if (!isLarge) return;
        setMobileMenuOpen(false);
    }, [isLarge]);

    return (
        <header className="sticky top-0 z-50 bg-background">
            <div className="flex items-center w-full min-h-header-h content-wrapper">

                <Link href="/"><LogoSvg className="w-[150px] lg:w-[255px]" aria-label="Shinzo" /></Link>

                <NavDesktop className="hidden md:flex grow ml-10" navMenu={navMenu} socialLinks={socialLinks} docsLink={docsLink} />

                <div className="md:hidden flex items-center ml-auto">
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
                    </Button>
                </div>
            </div>

            <NavMobile open={mobileMenuOpen} navMenu={navMenu} socialLinks={socialLinks} docsLink={docsLink} />
        </header>
    );
}

