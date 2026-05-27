export interface ChipData {
  name: string;
  label?: string;
  hex: string;
  extraValues?: string;
  size?: "hero" | "small";
  theme?: "dark" | "light";
}

export interface ScaleEntry {
  hex: string;
  label: string;
}

export const PRIMARY_CHIPS: ChipData[] = [
  {
    name: "Shinzo Red",
    label: "--color-szo-primary",
    hex: "#d01f27",
    extraValues: "rgb(208, 31, 39)  ·  oklch(0.55 0.21 25.95)",
    size: "hero",
    theme: "dark",
  },
  {
    name: "Black",
    label: "--color-szo-black",
    hex: "#000000",
    extraValues: "Headlines · dark surfaces",
    size: "hero",
    theme: "dark",
  },
  {
    name: "White",
    label: "--color-szo-white",
    hex: "#ffffff",
    extraValues: "Base background",
    size: "hero",
    theme: "light",
  },
];

export const SECONDARY_CHIPS: ChipData[] = [
  { name: "Background",       label: "--color-ui-bg",              hex: "#ffffff",  theme: "light", size: "small" },
  { name: "Accent BG",        label: "--color-ui-bg-accent",       hex: "#fffbfb",  theme: "light", size: "small" },
  { name: "Accent BG Hover",  label: "--color-ui-bg-accent-hover", hex: "#fff5f5",  theme: "light", size: "small" },
  { name: "Background Muted", label: "--color-ui-bg-muted",        hex: "#f5f5f5",  theme: "light", size: "small" },
  { name: "Border",           label: "--color-ui-border",          hex: "#C7C7C7",  theme: "light", size: "small" },
  { name: "Accent",           label: "--color-ui-accent",          hex: "#d01f27",  theme: "dark",  size: "small" },
  { name: "Text Accent",      label: "--color-ui-text-accent",     hex: "#D32C34",  theme: "dark",  size: "small" },
  { name: "Text Muted",       label: "--color-ui-text-muted",      hex: "#525252",  theme: "dark",  size: "small" },
  { name: "Text",             label: "--color-ui-text",            hex: "#353535",  theme: "dark",  size: "small" },
];

/** @deprecated use PRIMARY_CHIPS / SECONDARY_CHIPS */
export const BRAND_CHIPS: ChipData[] = [...PRIMARY_CHIPS, ...SECONDARY_CHIPS];


export const RED_SCALE: ScaleEntry[] = [
  { hex: "#fff5f5", label: "50" },
  { hex: "#ffe0e0", label: "100" },
  { hex: "#ffc0c0", label: "200" },
  { hex: "#ff9090", label: "300" },
  { hex: "#f05a5a", label: "400" },
  { hex: "#e8454c", label: "500" },
  { hex: "#d01f27", label: "600" },
  { hex: "#a81920", label: "700" },
  { hex: "#8a1219", label: "800" },
  { hex: "#6e0e13", label: "900" },
];

export const GRAY_SCALE: ScaleEntry[] = [
  { hex: "#fafafa", label: "50" },
  { hex: "#f5f5f5", label: "100" },
  { hex: "#e5e5e5", label: "200" },
  { hex: "#d4d4d4", label: "300" },
  { hex: "#a3a3a3", label: "400" },
  { hex: "#737373", label: "500" },
  { hex: "#525252", label: "600" },
  { hex: "#404040", label: "700" },
  { hex: "#262626", label: "800" },
  { hex: "#171717", label: "900" },
];
