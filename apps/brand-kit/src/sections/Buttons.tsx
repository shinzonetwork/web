import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import { Button } from "../components/Button";

function ButtonRow({
  variant,
  desc,
  children,
}: {
  variant: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:grid sm:[grid-template-columns:200px_1fr] items-start sm:items-center gap-3 sm:gap-6 py-4 border-t border-gray-100">
      <div>
        <div className="font-mono text-px-13 font-medium text-szo-text mb-0.5">
          variant=&quot;{variant}&quot;
        </div>
        <div className="text-xs text-gray-600">{desc}</div>
      </div>
      <div className="flex gap-3 items-center flex-wrap">{children}</div>
    </div>
  );
}

export function Buttons() {
  return (
    <Section id="buttons">
      <SectionHeader
        title="Buttons"
        jp="ボタン"
        description="Pill-shaped by default (44px, full radius). Smaller sizes use rounded-md. Black is the primary action colour — red is reserved for high-emphasis CTAs."
      />

      <SectionBody>
      <SubsectionTitle>Variants</SubsectionTitle>
      <div className="mb-10">
        <ButtonRow variant="primary" desc="Default action — black">
          <Button variant="primary">Get started</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </ButtonRow>

        <ButtonRow variant="red" desc="High-emphasis CTA — Shinzo Red">
          <Button variant="red">Get the whitepaper</Button>
          <Button variant="red" size="sm">Small</Button>
          <Button variant="red" size="lg">Large</Button>
          <Button variant="red" disabled>Disabled</Button>
        </ButtonRow>

        <ButtonRow variant="secondary" desc="Outlined — red border">
          <Button variant="secondary">Join Telegram</Button>
          <Button variant="secondary" size="sm">Small</Button>
          <Button variant="secondary" size="lg">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </ButtonRow>

        <ButtonRow variant="outline" desc="Neutral outlined action">
          <Button variant="outline">View docs</Button>
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="lg">Large</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </ButtonRow>

        <ButtonRow variant="ghost" desc="Minimal, low-emphasis action">
          <Button variant="ghost">Cancel</Button>
          <Button variant="ghost" size="sm">Small</Button>
          <Button variant="ghost" size="lg">Large</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </ButtonRow>

        <div className="border-b border-gray-100 h-px" />
      </div>

      <SubsectionTitle>Sizes</SubsectionTitle>
      <div className="flex gap-3 items-center p-6 bg-gray-50 rounded-lg border border-gray-200 mb-10 flex-wrap">
        <Button size="sm">Small — 32px</Button>
        <Button>Default — 44px</Button>
        <Button size="lg">Large — 48px</Button>
      </div>

      <SubsectionTitle>With Icons</SubsectionTitle>
      <div className="flex gap-3 flex-wrap mb-10">
        <Button>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add indexer
        </Button>
        <Button variant="red">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Deploy view
        </Button>
        <Button variant="secondary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          History
        </Button>
        <Button variant="outline" className="w-11 p-0 shrink-0" aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>

      <SubsectionTitle>On Dark Background</SubsectionTitle>
      <div className="flex gap-3 items-center p-6 bg-szo-black rounded-lg flex-wrap">
        <Button variant="red">Get started</Button>
        <Button variant="custom" className="bg-white text-szo-black hover:bg-white/90">White</Button>
        <Button variant="custom" className="bg-transparent text-white border border-white/25 hover:bg-white/[0.08]">Ghost</Button>
      </div>
      </SectionBody>
    </Section>
  );
}
