import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={[
        "border-b border-gray-200 max-w-content last:border-b-0",
        "scroll-mt-nav",
        "grid grid-cols-12 px-5 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20",
        className,
      ].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}
