import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import { FadeIn } from "../components/FadeIn";
import { LOGO_GROUPS, LOGO_DO_RULES, LOGO_DONT_RULES, type LogoCellData } from "../config/logo";
import { Button } from "../components/Button";

const COLS_CLASS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

function LogoCell({ src, bg, label, imgMaxHeight = 32 }: LogoCellData) {
  const isDark = bg === "#000000" || bg === "#1a1a1a" || bg === "#d01f27";
  return (
    <div>
      <div
        className="flex items-center justify-center min-h-[140px] p-8"
        style={{ background: bg }}
      >
        <img
          src={src}
          alt={label}
          style={{ height: imgMaxHeight, width: "auto", maxWidth: "100%", display: "block" }}
        />
      </div>
      <p
        className="text-xs uppercase tracking-[0.07em] text-center mt-2 font-mono"
        style={{ color: isDark ? "#525252" : "#737373" }}
      >
        {label}
      </p>
    </div>
  );
}


export function Logo() {
  return (
    <Section id="logo">
      <SectionHeader
        title="Logo"
        jp="ロゴ"
        description="Shinzo has four lockup formats — horizontal, horizontal with tagline, stacked, and stacked with tagline — plus the standalone logomark. Use the file that fits the context; never alter colours, proportions, or spacing."
        noMargin
      />
      <SectionBody>
      <Button
        variant="red"
        className="mt-8 mb-[clamp(48px,8vw,150px)]"
        onClick={() => alert("Logo package download coming soon.")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Download logos
      </Button>

      {LOGO_GROUPS.map(({ title, cols, cells, taglineCells, taglineCols }) => (
        <FadeIn key={title}>
          <SubsectionTitle>{title}</SubsectionTitle>
          <div className={`grid ${COLS_CLASS[cols] ?? "grid-cols-3"} gap-3 mb-3`}>
            {cells.map((cell) => <LogoCell key={cell.src + cell.bg} {...cell} />)}
          </div>
          {taglineCells && (
            <>
              <SubsectionTitle>{title} with tagline</SubsectionTitle>
              <div className={`grid ${COLS_CLASS[taglineCols ?? 2] ?? "grid-cols-2"} gap-3 mb-12`}>
                {taglineCells.map((cell) => <LogoCell key={cell.src + cell.bg} {...cell} />)}
              </div>
            </>
          )}
          {!taglineCells && <div className="mb-12" />}
        </FadeIn>
      ))}

      <FadeIn>
        <SubsectionTitle>Usage guidelines</SubsectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-[0.07em] text-gray-600">
              Do
            </div>
            <ul className="p-4 space-y-0">
              {LOGO_DO_RULES.map((rule, i) => (
                <li
                  key={i}
                  className={`flex gap-3 items-start text-px-13 text-gray-700 py-2.5 ${i < LOGO_DO_RULES.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-green-600 shrink-0 font-semibold mt-px">✓</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-szo-primary/20 overflow-hidden">
            <div className="px-4 py-3 bg-szo-primary/[0.05] border-b border-szo-primary/20 text-xs font-bold uppercase tracking-[0.07em] text-szo-primary">
              Don't
            </div>
            <ul className="p-4 space-y-0">
              {LOGO_DONT_RULES.map((rule, i) => (
                <li
                  key={i}
                  className={`flex gap-3 items-start text-px-13 text-gray-700 py-2.5 ${i < LOGO_DONT_RULES.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-szo-primary shrink-0 font-semibold mt-px">✗</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-5 py-4 bg-gray-100 text-px-13 text-gray-500 leading-relaxed">
          <strong className="text-szo-text">Asset files:</strong> All logo SVGs are in{" "}
          <code className="font-mono text-xs bg-gray-200 px-[5px] py-px rounded-xs">/public/logo/</code>
          {" "}— available in SVG and PNG formats.
        </div>
      </FadeIn>
      </SectionBody>
    </Section>
  );
}
