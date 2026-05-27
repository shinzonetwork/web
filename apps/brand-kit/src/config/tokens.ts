export interface SpacingToken {
  token: string;
  value: string;
  px: string;
  desc: string;
}

export interface RadiusToken {
  token: string;
  value: string;
  desc: string;
}

export interface LineHeightToken {
  token: string;
  value: string;
  desc: string;
}

export interface ColorToken {
  token: string;
  value: string;
  usage: string;
}

export const SPACING_TOKENS: SpacingToken[] = [
  { token: "--spacing-unit", value: "0.5rem", px: "8px",  desc: "Base unit" },
  { token: "×2",            value: "1rem",   px: "16px", desc: "Small gap" },
  { token: "×3",            value: "1.5rem", px: "24px", desc: "Card padding" },
  { token: "×4",            value: "2rem",   px: "32px", desc: "Section gap" },
  { token: "×6",            value: "3rem",   px: "48px", desc: "Large gap" },
  { token: "×8",            value: "4rem",   px: "64px", desc: "Section padding" },
  { token: "×10",           value: "5rem",   px: "80px", desc: "Layout section" },
];

export const RADIUS_TOKENS: RadiusToken[] = [
  { token: "--radius-xs",   value: "4px",    desc: "Chip, small tag" },
  { token: "--radius-sm",   value: "6px",    desc: "Small input, badge" },
  { token: "--radius-md",   value: "8px",    desc: "Button, input" },
  { token: "--radius-lg",   value: "12px",   desc: "Card, panel" },
  { token: "--radius-xl",   value: "16px",   desc: "Modal, large card" },
  { token: "--radius-2xl",  value: "24px",   desc: "Hero section" },
  { token: "--radius-full", value: "9999px", desc: "Pill, avatar" },
];

export const LINE_HEIGHT_TOKENS: LineHeightToken[] = [
  { token: "--leading-none",    value: "1",     desc: "Display, hero text" },
  { token: "--leading-tight",   value: "1.25",  desc: "Headings" },
  { token: "--leading-snug",    value: "1.375", desc: "Subheadings" },
  { token: "--leading-normal",  value: "1.5",   desc: "Body copy" },
  { token: "--leading-relaxed", value: "1.625", desc: "Long-form text" },
];

export const COLOR_TOKENS: ColorToken[] = [
  { token: "--color-szo-primary",       value: "#d01f27",              usage: "Brand primary, CTAs, links" },
  { token: "--color-szo-primary-dark",  value: "#a81920",              usage: "Hover / pressed state" },
  { token: "--color-szo-primary-hover", value: "#e8454c",              usage: "Interactive hover" },
  { token: "--color-szo-primary-bg",    value: "rgba(208,31,39,0.06)", usage: "Accent background tint" },
  { token: "--color-szo-black",         value: "#000000",              usage: "Headlines, dark BG" },
  { token: "--color-szo-white",         value: "#ffffff",              usage: "Base background" },
  { token: "--color-szo-text",          value: "#353535",              usage: "Body copy" },
  { token: "--color-szo-text-muted",    value: "#525252",              usage: "Secondary text" },
  { token: "--color-szo-border",        value: "#c7c7c7",              usage: "Default borders" },
  { token: "--color-szo-border-light",  value: "#e2e2e2",              usage: "Subtle borders" },
  { token: "--color-szo-bg-muted",      value: "#f5f5f5",              usage: "Muted backgrounds" },
  { token: "--color-szo-bg-accent",     value: "#fffbfb",              usage: "Accent backgrounds" },
];
