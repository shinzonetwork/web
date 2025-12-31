import { NavLink } from "@/app/(frontend)/layout";
import DiscordIconSvg from "@/components/svg/icon-discord.svg";
import GithubIconSvg from "@/components/svg/icon-github.svg";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import Link from "next/link";

export interface NavDesktopProps {
    className?: string;
    navMenu: NavLink[];
}

export function NavDesktop({ className = '', navMenu }: NavDesktopProps) {

    const navItemLvl1Style = "underline-offset-2 hover:underline data-[state=open]:underline";

    return (
        <div className={className}>
            <NavigationMenu >
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
                                                <Link href={item.href} className="">{item.label}</Link>
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
                        <Link href="https://discord.shinzo.network" aria-label="Discord" target="_blank" className="hover:text-szo-primary"><DiscordIconSvg className="size-6" /> </Link>
                        <Link href="https://github.com/shinzo-io" aria-label="GitHub" target="_blank" className="hover:text-szo-primary"><GithubIconSvg className="size-6" /> </Link>
                    </div>

                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuLink href="/" asChild className={cn(navItemLvl1Style)}>
                                <Link href="http://docs.shinzo.network/" target="_blank">Docs</Link>
                            </NavigationMenuLink>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}