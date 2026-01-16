import type { NavLink } from "@/app/(frontend)/layout";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import Link from "next/link";
import GithubIconSvg from "./svg/icon-github.svg";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";

export interface NavDesktopProps {
    className?: string;
    navMenu: NavLink[];
    socialLinks?: {
        github?: string;
    };
    docsLink?: string;
}

export default function NavDesktop({ className = '', navMenu, socialLinks, docsLink }: NavDesktopProps) {

    const navItemLvl1Style = "underline-offset-2 hover:underline data-[state=open]:underline";

    return (
        <div className={className}>
            <NavigationMenu viewport={false}>
                <NavigationMenuList className="flex-wrap" >
                    {navMenu.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            {item.href ? (
                                <NavigationMenuLink asChild className={cn(navItemLvl1Style)}>
                                    <Link href={item.href}>{item.label}</Link>
                                </NavigationMenuLink>
                            ) : (
                                <NavigationMenuTrigger className={cn(navItemLvl1Style)}>{item.label}</NavigationMenuTrigger>
                            )}

                            {item.items && (
                                <NavigationMenuContent className="p-0 py-2">
                                    <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="grid md:w-[275px] ">
                                        {item.items?.map((item, index) => (
                                            <NavigationMenuLink key={index} asChild
                                                className="px-6 py-1 underline-offset-2 underline border-szo-primary link-arrow
                                        hover:bg-black hover:text-white
                                        ">
                                                <Link href={item.href} target={item.type === 'external' ? '_blank' : '_self'} className="">{item.label}</Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </motion.ul>
                                </NavigationMenuContent>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        {socialLinks?.github && (
                            <Link href={socialLinks.github} aria-label="GitHub" target="_blank" className="hover:text-szo-primary"><GithubIconSvg className="size-6" /> </Link>
                        )}
                    </div>

                    <div className="hidden md:block">
                        {docsLink && (
                            <NavigationMenu>
                                <NavigationMenuLink href={docsLink} asChild className={cn(navItemLvl1Style)}>
                                    <Link href={docsLink} target="_blank">Docs</Link>
                                </NavigationMenuLink>
                            </NavigationMenu>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}