import FooterLogoSvg from "@/components/svg/logo-footer.svg";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import BlockContainer from "./block-container";

export default function FooterNew() {

    const columnStyle = "w-1/2 md:w-1/2 lg:w-1/4 ";
    const labelStyle = "text-px-14 md:text-px-14 lg:text-base font-mono mb-4";

    const listVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    };

    return (
        <footer className="bg-background">
            <BlockContainer>
                <div className="grid grid-cols-12 my-12">

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="col-span-full md:col-span-4 lg:col-span-3 mb-12">
                        <h4 className="text-h4 mb-3">Get started building with Shinzō </h4>
                        <ul className="text-px-14 space-y-4">
                            <li><Link href="https://docs.shinzo.network" target="_blank" className="text-inline-link ">Documentation</Link></li>
                        </ul>
                    </motion.div>

                    <motion.ul variants={listVariants} initial="hidden" whileInView="visible" className="col-span-full md:col-start-6 md:col-span-6 lg:col-start-5 lg:col-span-8 flex flex-wrap md:justify-end gap-y-8">
                        <motion.li variants={itemVariants} className={columnStyle}>
                            <div className={labelStyle}>Categories</div>
                            <ul className="text-px-14 space-y-2">
                                <li><Link href="/" className="text-inline-link ">ShinzoHub</Link></li>
                                <li><Link href="/" className="text-inline-link ">Shinzo App SDK</Link></li>
                                <li><Link href="/" className="text-inline-link ">ViewCreator</Link></li>
                            </ul>
                        </motion.li>
                        <motion.li variants={itemVariants} className={columnStyle}>
                            <div className={labelStyle}>Categories</div>
                            <ul className="text-px-14 space-y-2">
                                <li><Link href="/" className="text-inline-link ">Solutions</Link></li>
                                <li><Link href="/" className="text-inline-link ">Shinzo App SDK</Link></li>
                                <li><Link href="/" className="text-inline-link ">Explore Apps</Link></li>
                            </ul>
                        </motion.li>
                        <motion.li variants={itemVariants} className={columnStyle}>
                            <div className={labelStyle}>Categories</div>
                            <ul className="text-px-14 space-y-2">
                                <li><Link href="/" className="text-inline-link ">Documentation</Link></li>
                                <li><Link href="/" className="text-inline-link ">Shinzo App SDK</Link></li>
                                <li><Link href="/" className="text-inline-link ">Events</Link></li>
                            </ul>
                        </motion.li>

                        <motion.li variants={itemVariants} className={columnStyle}>
                            <div className={labelStyle}>Categories</div>
                            <ul className="text-px-14 space-y-2">
                                <li><Link href="/" className="text-inline-link ">Documentation</Link></li>
                                <li><Link href="/" className="text-inline-link ">Shinzo App SDK</Link></li>
                                <li><Link href="/" className="text-inline-link ">Events</Link></li>
                            </ul>
                        </motion.li>
                    </motion.ul>
                </div>

                <div>
                    <span className="text-px-12 font-mono">Shinzō © {new Date().getFullYear()}</span>
                    <div className="overflow-hidden">
                        <motion.div initial={{ opacity: 0.5, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                            <FooterLogoSvg className="h-auto mt-2 w-full" />
                        </motion.div>
                    </div>
                </div>
            </BlockContainer>
        </footer>
    );
}