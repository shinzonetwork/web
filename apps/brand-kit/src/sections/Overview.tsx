import { motion } from "motion/react";
import { DitheredLogo } from "../components/DitheredLogo";

const FRAME_COUNT = 11; // matches CAROUSEL length

const GROUP_LINKS = [
  { href: "#brand-guidelines", label: "Brand Guidelines" },
  { href: "#design-system",    label: "Design System" },
  { href: "#design-md",        label: "DESIGN.md" },
];

export function Overview() {
  return (
    <div id="overview" className="w-full min-h-svh flex flex-col items-center justify-center px-5 pt-14 pb-0 sm:px-8 sm:pt-16 lg:p-[72px] border-b border-gray-200">
      <div className="flex flex-col items-center w-full max-w-[700px]">
        <motion.div
          className="w-full mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <DitheredLogo logicalWidth={700} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
          <motion.div
            className="font-mono text-px-20 font-normal text-szo-text leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Shinzō Brand Kit
          </motion.div>
          <motion.div
            className="font-mono text-px-13 text-szo-text leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Official visual language and component library for Shinzō — Use these tokens,
            components, and guidelines consistently across all products.
          </motion.div>
        </div>

        <motion.div
          className="w-full mt-8 pt-8 border-t border-gray-200 flex justify-between gap-4 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {GROUP_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-szo-primary underline underline-offset-[3px] transition-opacity hover:opacity-75"
            >
              {label}
              <span className="text-xs no-underline inline-block transition-transform duration-150 group-hover:translate-x-[3px]">
                →
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* TEMP: all carousel frames */}
      {/* <div className="w-full max-w-[700px] mt-12 flex flex-col gap-2">
        {Array.from({ length: FRAME_COUNT }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-mono text-xs text-gray-500 w-4 shrink-0">{i}</span>
            <DitheredLogo logicalWidth={660} frameIndex={i} />
          </div>
        ))}
      </div> */}
    </div>
  );
}
