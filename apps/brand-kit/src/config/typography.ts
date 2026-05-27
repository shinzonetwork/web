export interface TypeScaleEntry {
  token: string;
  px: string;
  rem: string;
}

export interface WeightEntry {
  weight: number;
  label: string;
  name: string;
}

export interface TypefaceEntry {
  label: string;
  name: string;
  weight: string;
  specimen: string;
  font: string;
  desc: string;
  link: string;
}

export const TYPE_SCALE: TypeScaleEntry[] = [
  { token: "--text-12", px: "12px", rem: "0.75rem" },
  { token: "--text-14", px: "14px", rem: "0.875rem" },
  { token: "--text-16", px: "16px", rem: "1rem" },
  { token: "--text-18", px: "18px", rem: "1.125rem" },
  { token: "--text-20", px: "20px", rem: "1.25rem" },
  { token: "--text-24", px: "24px", rem: "1.5rem" },
  { token: "--text-28", px: "28px", rem: "1.75rem" },
  { token: "--text-36", px: "36px", rem: "2.25rem" },
  { token: "--text-48", px: "48px", rem: "3rem" },
  { token: "--text-60", px: "60px", rem: "3.75rem" },
  { token: "--text-72", px: "72px", rem: "4.5rem" },
];

export const WEIGHTS: WeightEntry[] = [
  { weight: 300, label: "Light", name: "weight-light" },
  { weight: 400, label: "Regular", name: "weight-normal" },
  { weight: 500, label: "Medium", name: "weight-medium" },
  { weight: 600, label: "Semibold", name: "weight-semibold" },
  { weight: 700, label: "Bold", name: "weight-bold" },
];

export const TYPEFACES: TypefaceEntry[] = [
  {
    label: "Display / Headings / Mono",
    name: "Geist Mono",
    weight: "Variable (100–900)",
    specimen: "Shinzo",
    font: "Geist Mono Variable, monospace",
    desc: "Used for all headings, display text, and code. The monospace aesthetic creates a technical, precise voice suited to developer-facing products.",
    link: "https://vercel.com/font",
  },
  {
    label: "Body / UI",
    name: "Inter",
    weight: "Variable (100–900)",
    specimen: "Shinzo",
    font: "Inter Variable, Inter, sans-serif",
    desc: "Used for body copy, labels, captions, and UI text. Its humanist geometry ensures excellent readability at all sizes.",
    link: "https://rsms.me/inter/",
  },
  {
    label: "Japanese / Accent",
    name: "Toppan Bunkyu Midashi Mincho",
    weight: "Regular (400)",
    specimen: "信頼",
    font: "Toppan Bunkyu Midashi Mincho, serif",
    desc: "Used for Japanese typographic accents throughout the site. An Adobe premium Mincho (serif) typeface with elegant stroke contrast suited to display and heading contexts.",
    link: "https://fonts.adobe.com",
  },
];
