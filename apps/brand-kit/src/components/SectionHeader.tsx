import { FadeIn } from "./FadeIn";

interface SectionHeaderProps {
  title: string;
  description?: string;
  noMargin?: boolean;
  jp?: string;
}

export function SectionHeader({ title, description, noMargin, jp }: SectionHeaderProps) {
  return (
    <div className={["col-span-full lg:col-start-2 lg:col-span-10", noMargin ? "" : "mb-[70px]"].join(" ")}>
      <FadeIn>

        {jp && (
          <div className="relative mb-6 w-fit">
            <p
              className="text-[clamp(2rem,5vw,2rem)] leading-[1.15] text-szo-black relative z-1"
              style={{ fontFamily: "var(--font-jp-serif)" }}
            >
              {jp}
            </p>
            <div className="-mt-4 ml-7 w-[140px] h-[30px] bg-gray-100" />
          </div>
        )}

        <h2 className="font-display text-px-36 font-normal tracking-[-1.2px] leading-[1.1] text-gray-900 mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-base text-gray-600 leading-relaxed max-w-[580px]">
            {description}
          </p>
        )}


      </FadeIn>

    </div>
  );
}

export function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center uppercase font-mono mb-8 mt-12 text-px-12 lg:text-px-16 text-szo-black first:mt-0">
      <span className="text-szo-primary mr-3">/</span>
      <h3 className="font-mono font-normal">{children}</h3>
      <div className="grow h-px bg-szo-border ml-2" />
    </div>
  );
}
