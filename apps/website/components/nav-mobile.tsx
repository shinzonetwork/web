import { AnimatePresence, motion, Variants } from 'motion/react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export interface NavMobileProps {
    github?: string | null;
    open?: boolean;
    onClose?: () => void;
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

export default function NavMobile({ open = false }: NavMobileProps) {

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
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <Link href="/">Docs</Link>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Link href="/">Docs</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    </Accordion>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
