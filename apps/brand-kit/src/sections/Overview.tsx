import { motion } from "motion/react";
import { DitheredLogo } from "../components/DitheredLogo";
import { BayerGradient } from "../components/BayerGradient";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const logoVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

const GROUP_LINKS = [
  { href: "#brand-guidelines", label: "Brand Guidelines", desc: "Logo, colour, and typography rules for every surface." },
  { href: "#design-system", label: "Design System", desc: "Tokens, components, and interaction patterns." },
  { href: "#design-md", label: "DESIGN.md", desc: "Full spec in a single portable document." },
];

export function Overview() {
  return (
    <div id="overview" className="w-full min-h-svh flex flex-col items-center justify-center px-5 pt-14 pb-0 sm:px-8 sm:pt-16 lg:p-[72px] border-b border-gray-200 overflow-x-clip">
      <div className="flex flex-col items-center w-full max-w-[700px]">
        <motion.div
          className="w-full mb-10"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          {/* <DitheredLogo logicalWidth={700} /> */}
          <img src="/logo/shinzo-logo-stacked-tagline-black.png" alt="Shinzo" className="w-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
          <motion.div
            className="font-mono text-px-20 font-normal text-szo-text leading-relaxed"
            variants={fadeUpVariants}
            custom={0.35}
            initial="hidden"
            animate="visible"
          >
            Shinzō Brand Kit
          </motion.div>
          <motion.div
            className="font-mono text-px-13 text-szo-text leading-relaxed"
            variants={fadeUpVariants}
            custom={0.5}
            initial="hidden"
            animate="visible"
          >
            Official visual language and component library for Shinzō — Use these tokens,
            components, and guidelines consistently across all products.
          </motion.div>
        </div>

        <div className="w-full mt-20 relative border-l border-t border-gray-200">
          <div className="absolute right-full w-screen bottom-full border-t border-gray-200" />
          <motion.div
            className="w-full divide-y lg:divide-y-0 lg:divide-x divide-gray-200 flex flex-col lg:flex-row relative"
            variants={fadeUpVariants}
            custom={0.65}
            initial="hidden"
            animate="visible"
          >
            {GROUP_LINKS.map(({ href, label, desc }) => (
              <a key={href} href={href} className="relative flex-1 group hover:z-10 border-r lg:border-r-0  last:border-r border-gray-200">
                <div className="relative z-2 bg-white px-4 py-3 group-hover:outline-2 group-hover:outline-szo-primary group-hover:-outline-offset-2 transition-all">
                  <div className="font-display text-px-16 mb-1">/ {label}</div>
                  <div className="text-xs text-gray-600">{desc}</div>
                </div>

                <BayerGradient
                  from="#ffffff"
                  to="#d01f27"
                  className="absolute right-0 bottom-0 group-hover:-right-1 group-hover:-bottom-1 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none"
                />
              </a>
            ))}
          </motion.div>

          <div className="w-[100cqw] h-3 border-y border-gray-200" />
        </div>
      </div>

    </div>
  );
}
