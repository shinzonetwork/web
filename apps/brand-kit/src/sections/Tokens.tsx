import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import { TokenTable, TokenName, TokenValue } from "../components/TokenTable";
import { SPACING_TOKENS, RADIUS_TOKENS, LINE_HEIGHT_TOKENS, COLOR_TOKENS } from "../config/tokens";

export function Tokens() {
  return (
    <Section id="tokens">
      <SectionHeader
        title="Design Tokens"
        jp="デザイントークン"
        description="Core spacing, radius, and typographic tokens. The base unit is 8px — all spacing derives from multiples of this value."
      />

      <SectionBody>
        <SubsectionTitle>Spacing Scale</SubsectionTitle>
        <div className="overflow-x-auto mb-12">
          <div className="flex flex-col gap-2 min-w-[480px]">
            {SPACING_TOKENS.map(({ token, value, px, desc }) => (
              <div key={token} className="flex items-center gap-4">
                <div className="w-[120px] shrink-0 font-mono text-xs font-medium text-gray-500 text-right">
                  {token}
                </div>
                <div
                  className="h-6 border-[1.5px] border-szo-primary bg-[color-mix(in_srgb,var(--color-szo-primary)_5%,white)] rounded-[4px]"
                  style={{ width: Math.max(parseInt(px) * 2, 8) }}
                />
                <div className="font-mono text-xs text-gray-500 whitespace-nowrap shrink-0 min-w-[80px]">
                  {px} / {value}
                </div>
                <div className="text-xs text-gray-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <SubsectionTitle>Border Radius</SubsectionTitle>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-12">
          {RADIUS_TOKENS.map(({ token, value, desc }) => (
            <div key={token} className="flex flex-col items-center gap-3">
              <div
                className="w-full h-14 bg-[color-mix(in_srgb,var(--color-szo-primary)_5%,white)] border-[1.5px] border-szo-primary"
                style={{ borderRadius: value }}
              />
              <div className="text-center">
                <div className="text-xs font-mono text-szo-primary mb-0.5">{token.replace("--", "")}</div>
                <div className="text-xs text-gray-600 font-mono mb-0.5">{value}</div>
                <div className="text-xs text-gray-500 leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <SubsectionTitle>Line Height</SubsectionTitle>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col divide-y divide-gray-100 mb-12 border-t border-gray-100">
          {LINE_HEIGHT_TOKENS.map(({ token, value, desc }) => (
            <div key={token} className="py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <TokenName>{token}</TokenName>
                <TokenValue>{value}</TokenValue>
              </div>
              <div className="text-xs text-gray-500">{desc}</div>
              <div className="text-xs text-szo-text border-l-2 border-gray-200 pl-3 mt-1" style={{ lineHeight: value }}>
                Shinzo indexes all events on-chain so your apps don't have to.
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block mb-12">
          <TokenTable>
            <thead>
              <tr><th>Token</th><th>Value</th><th>Usage</th><th>Preview</th></tr>
            </thead>
            <tbody>
              {LINE_HEIGHT_TOKENS.map(({ token, value, desc }) => (
                <tr key={token}>
                  <td><TokenName>{token}</TokenName></td>
                  <td><TokenValue>{value}</TokenValue></td>
                  <td className="text-xs text-gray-600">{desc}</td>
                  <td>
                    <div className="text-xs text-szo-text max-w-[200px]" style={{ lineHeight: value }}>
                      Shinzo indexes all events on-chain so your apps don't have to.
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TokenTable>
        </div>

        <SubsectionTitle>Color Token Reference</SubsectionTitle>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col divide-y divide-gray-100 border-t border-gray-100">
          {COLOR_TOKENS.map(({ token, value, usage }) => (
            <div key={token} className="py-4 flex items-start gap-3">
              <div
                className="size-9 rounded-md border border-gray-200 shrink-0 mt-0.5"
                style={{ background: value }}
              />
              <div className="flex-1 min-w-0">
                <TokenName>{token}</TokenName>
                <div className="flex items-center gap-2 mt-1">
                  <TokenValue>{value}</TokenValue>
                </div>
                <div className="text-xs text-gray-500 mt-1">{usage}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <TokenTable>
            <thead>
              <tr><th>Token</th><th>Value</th><th>Swatch</th><th>Usage</th></tr>
            </thead>
            <tbody>
              {COLOR_TOKENS.map(({ token, value, usage }) => (
                <tr key={token}>
                  <td><TokenName>{token}</TokenName></td>
                  <td><TokenValue>{value}</TokenValue></td>
                  <td>
                    <div className="size-6 rounded-sm border border-gray-200 shrink-0" style={{ background: value }} />
                  </td>
                  <td className="text-xs text-gray-600">{usage}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>
        </div>
      </SectionBody>
    </Section>
  );
}
