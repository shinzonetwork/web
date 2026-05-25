import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import { TYPE_SCALE, WEIGHTS, TYPEFACES } from "../config/typography";

export function Typography() {
  return (
    <Section id="typography">
      <SectionHeader
        title="Typography"
        jp="書体"
        description="Shinzo uses two typefaces: Inter for body copy and UI, Geist Mono for headings and code. This pairing creates a technical yet approachable voice."
      />

      <SectionBody>
      <SubsectionTitle>Typefaces</SubsectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-20">
        {TYPEFACES.map((typeface) => (
          <div
            key={typeface.name}
            className="pt-4 pr-8"
          >
            <div className="text-px-13 text-gray-600 mb-10">{typeface.label}</div>
            <div className="flex items-baseline justify-between mb-5">
              <div
                className="text-xl font-normal text-gray-900"
                style={{ fontFamily: typeface.font }}
              >
                {typeface.name}
              </div>
              <div className="text-px-13 text-gray-500 font-mono">{typeface.weight}</div>
            </div>
            <div
              className="font-normal leading-[1.05] text-gray-900 tracking-[-1px] mb-4 text-[clamp(2.25rem,4vw,3.75rem)]"
              style={{ fontFamily: typeface.font }}
            >
              {typeface.specimen}
            </div>
            <div className="text-xs text-gray-600 leading-snug mb-2">{typeface.desc}</div>
            <a
              href={typeface.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-szo-primary no-underline font-mono"
            >
              {typeface.link.replace("https://", "")} →
            </a>
          </div>
        ))}
      </div>

      <SubsectionTitle>Type Scale</SubsectionTitle>
      <div className="mb-12">
        {TYPE_SCALE.map(({ token, px, rem }) => {
          const pxNum = parseInt(px);
          return (
            <div key={token} className="flex items-baseline gap-6 py-4 border-t border-gray-100 last:border-b last:border-b-gray-100">
              <div className="w-[120px] shrink-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.07em] text-gray-600 font-mono mb-0.5">{token}</span>
                <span className="text-xs text-gray-500 font-mono">{px} / {rem}</span>
              </div>
              <div
                className="text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis flex-1"
                style={{ fontSize: `${pxNum}px`, lineHeight: 1.2, fontFamily: "Inter Variable, Inter, sans-serif" }}
              >
                Shinzo Indexing
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-4 bg-gray-100 rounded-md text-px-13 text-gray-600 leading-relaxed mb-10">
        <strong className="text-szo-text">Heading weight rule:</strong> Default heading weight is{" "}
        <code className="font-mono text-xs bg-gray-200 px-[5px] py-px rounded-xs">400</code>.
        {" "}Smaller or secondary headings may use{" "}
        <code className="font-mono text-xs bg-gray-200 px-[5px] py-px rounded-xs">300</code>.
        {" "}Do not go above 400 — Geist Mono's monospace geometry carries sufficient visual weight on its own.
      </div>

      <SubsectionTitle>Weights — Inter</SubsectionTitle>
      <div className="mb-10">
        {WEIGHTS.map(({ weight, label, name }) => (
          <div
            key={weight}
            className="flex items-baseline gap-5 py-[14px] border-t border-gray-100"
          >
            <div className="w-[100px] shrink-0">
              <div className="text-xs font-semibold uppercase tracking-[0.07em] text-gray-600 font-mono">
                --{name}
              </div>
            </div>
            <div className="w-12 shrink-0">
              <span className="text-xs text-gray-500 font-mono">{weight}</span>
            </div>
            <div
              className="text-xl text-gray-900 flex-1"
              style={{ fontWeight: weight, fontFamily: "Inter Variable, Inter, sans-serif" }}
            >
              {label} — The quick brown fox
            </div>
          </div>
        ))}
        <div className="border-b border-gray-100 h-px" />
      </div>

      <SubsectionTitle>Weights — Geist Mono</SubsectionTitle>
      <div>
        {WEIGHTS.map(({ weight, label, name }) => (
          <div
            key={weight}
            className="flex items-baseline gap-5 py-[14px] border-t border-gray-100"
          >
            <div className="w-[100px] shrink-0">
              <div className="text-xs font-semibold uppercase tracking-[0.07em] text-gray-600 font-mono">
                --{name}
              </div>
            </div>
            <div className="w-12 shrink-0">
              <span className="text-xs text-gray-500 font-mono">{weight}</span>
            </div>
            <div
              className="text-xl text-gray-900 flex-1"
              style={{ fontWeight: weight, fontFamily: "Geist Mono Variable, monospace" }}
            >
              {label} — The quick brown fox
            </div>
          </div>
        ))}
        <div className="border-b border-gray-100 h-px" />
      </div>
      </SectionBody>
    </Section>
  );
}
