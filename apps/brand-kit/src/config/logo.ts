export interface LogoCellData {
  src: string;
  bg: string;
  label: string;
  imgMaxHeight?: number;
}

export interface LogoGroup {
  title: string;
  cols: number;
  cells: LogoCellData[];
  taglineCells?: LogoCellData[];
  taglineCols?: number;
}

export const LOGO_GROUPS: LogoGroup[] = [
  {
    title: "Logomark",
    cols: 3,
    cells: [
      { src: "/logo/shinzo-logomark-black.svg", bg: "#ffffff", label: "Black on white", imgMaxHeight: 56 },
      { src: "/logo/shinzo-logomark-black.svg", bg: "#d01f27", label: "Black on red",   imgMaxHeight: 56 },
      { src: "/logo/shinzo-logomark-white.svg", bg: "#000000", label: "White on black", imgMaxHeight: 56 },
    ],
  },
  {
    title: "Horizontal",
    cols: 3,
    cells: [
      { src: "/logo/shinzo-logo-black.svg", bg: "#ffffff", label: "Black on white", imgMaxHeight: 28 },
      { src: "/logo/shinzo-logo-black.svg", bg: "#d01f27", label: "Black on red",   imgMaxHeight: 28 },
      { src: "/logo/shinzo-logo-white.svg", bg: "#000000", label: "White on black", imgMaxHeight: 28 },
    ],
    taglineCols: 2,
    taglineCells: [
      { src: "/logo/shinzo-logo-tagline-black.svg", bg: "#ffffff", label: "Black on white", imgMaxHeight: 36 },
      { src: "/logo/shinzo-logo-tagline-white.svg", bg: "#000000", label: "White on black", imgMaxHeight: 36 },
    ],
  },
  {
    title: "Stacked",
    cols: 3,
    cells: [
      { src: "/logo/shinzo-logo-stacked-black.svg", bg: "#ffffff", label: "Black on white", imgMaxHeight: 72 },
      { src: "/logo/shinzo-logo-stacked-black.svg", bg: "#d01f27", label: "Black on red",   imgMaxHeight: 72 },
      { src: "/logo/shinzo-logo-stacked-white.svg", bg: "#000000", label: "White on black", imgMaxHeight: 72 },
    ],
    taglineCols: 2,
    taglineCells: [
      { src: "/logo/shinzo-logo-stacked-tagline-black.svg", bg: "#ffffff", label: "Black on white", imgMaxHeight: 88 },
      { src: "/logo/shinzo-logo-stacked-tagline-white.svg", bg: "#000000", label: "White on black", imgMaxHeight: 88 },
    ],
  },
];

export const LOGO_DO_RULES: string[] = [
  "Use the provided SVG files without modification",
  "Maintain minimum clear space equal to the symbol height",
  "Use the white version on dark or coloured backgrounds",
  "Choose the lockup format that best fits the layout context",
];

export const LOGO_DONT_RULES: string[] = [
  "Recolour, stretch, or distort the logo",
  "Place on low-contrast or complex backgrounds",
  "Recreate the logo or use an outdated version",
  "Apply drop shadows, outlines, or visual effects",
];
