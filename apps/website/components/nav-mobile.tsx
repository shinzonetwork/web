import type { NavLink } from "@/app/(frontend)/layout";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Variants } from 'motion/react';
import Link from 'next/link';
import DiscordIconSvg from "./svg/icon-discord.svg";
import GithubIconSvg from "./svg/icon-github.svg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export interface NavMobileProps {
    github?: string | null;
    open?: boolean;
    navMenu: NavLink[];
    onClose?: () => void;
    socialLinks?: {
        discord?: string;
        github?: string;
    };
    docsLink?: string;
}

const variants: Record<string, Variants> = {
    list: {
        open: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.2 } },
        closed: { opacity: 0, transition: { when: 'afterChildren' } },
    },
    item: {
        open: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
        closed: { opacity: 0, y: 10 },
    },
};

export default function NavMobile({ open = false, navMenu, socialLinks, docsLink }: NavMobileProps) {

    const textStyle = "font-medium font-mono text-px-16 py-2 hover:text-szo-primary hover:underline transition-colors duration-200";

    return (
        <AnimatePresence>
            {open && (
                <motion.nav
                    variants={variants.list}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="fixed flex flex-col justify-between inset-[var(--spacing-header-h)_0_0] bg-background text-foreground overflow-y-scroll scrollber-none z-10 lg:hidden"
                >
                    <Accordion type="single" collapsible asChild>
                        <div className="p-4 flex flex-col">

                            {navMenu.map((item, index) => {

                                if (item.items && item.items.length > 0) {
                                    return (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-szo-border-light font-mono">
                                            <motion.div variants={variants.item}>
                                                <AccordionTrigger className={textStyle}>
                                                    {item.label}
                                                </AccordionTrigger>
                                                <AccordionContent className="flex flex-col py-4">
                                                    {item.items.map((item, index) => (
                                                        <Link key={index} href={item.href} className={cn(textStyle, 'block')}>{item.label}</Link>
                                                    ))}
                                                </AccordionContent>
                                            </motion.div>
                                        </AccordionItem>
                                    )
                                }

                                return (
                                    <motion.div key={index} variants={variants.item} className="border-b border-szo-border-light">
                                        <Link href={item.href ?? ''} className={cn(textStyle, 'block')}>{item.label}</Link>
                                    </motion.div>
                                )
                            })}

                            {docsLink && (
                                <motion.div variants={variants.item} className="border-b border-szo-border-light">
                                    <Link href={docsLink} className={cn(textStyle, 'block')}>Docs</Link>
                                </motion.div>
                            )}

                            <motion.div variants={variants.item} className="py-4">
                                <div className="flex items-center gap-4">
                                    {socialLinks?.discord && (
                                        <Link href={socialLinks.discord} aria-label="Discord" target="_blank" className="hover:text-szo-primary"><DiscordIconSvg className="size-6" /> </Link>
                                    )}
                                    {socialLinks?.github && (
                                        <Link href={socialLinks.github} aria-label="GitHub" target="_blank" className="hover:text-szo-primary"><GithubIconSvg className="size-6" /> </Link>
                                    )}
                                </div>
                            </motion.div>
                        </div>


                    </Accordion>
                </motion.nav>
            )}

        </AnimatePresence>
    );
}

