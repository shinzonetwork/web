export interface SectionMeta {
  id: string;
  label: string;
  /** Present = shown as a card in the GroupIntro */
  desc?: string;
}

export interface GroupConfig {
  id: string;
  group: string;
  title: string;
  description: string;
  sections: SectionMeta[];
}

export const GROUPS: GroupConfig[] = [
  {
    id: "brand-guidelines",
    group: "Visual Identity",
    title: "Brand Guidelines",
    description:
      "The Shinzo visual language — logo usage, colour palette, and typographic conventions that define the brand across every surface.",
    sections: [
      { id: "overview",   label: "Overview" },
      { id: "logo",       label: "Logo",       desc: "Wordmark, symbol, clear space" },
      { id: "colors",     label: "Colors",     desc: "Primary palette & usage" },
      { id: "typography", label: "Typography", desc: "Type scale & hierarchy" },
    ],
  },
  {
    id: "design-system",
    group: "UI Components",
    title: "Design System",
    description:
      "Reusable building blocks and design tokens for building consistent Shinzo interfaces — buttons, cards, badges, and the full token reference.",
    sections: [
      { id: "buttons",    label: "Buttons",    desc: "Variants, sizes, states" },
      { id: "components", label: "Components", desc: "Cards, badges, patterns" },
      { id: "tokens",     label: "Tokens",     desc: "Spacing, radius, colour" },
    ],
  },
];

/** Flat ordered list of all section ids — used for scroll tracking */
export const ALL_SECTION_IDS = GROUPS.flatMap((g) => g.sections.map((s) => s.id));

/** Map from section id → parent group id — used to auto-open accordion */
export const SECTION_TO_GROUP = new Map<string, string>(
  GROUPS.flatMap((g) => g.sections.map((s) => [s.id, g.id]))
);
