# Design System — Shinzo

Shinzo is the next-generation multichain indexing layer for web3. The brand conveys technical precision, infrastructure-grade reliability, and developer-first clarity through a typographically driven visual language anchored by a deep crimson red.

---

## 1. Visual Theme & Atmosphere

A developer-infrastructure brand built on typographic clarity and structural restraint. The visual identity uses a single dominant crimson red against clean white surfaces — no gratuitous color, no gradients, no drop shadows. The primary aesthetic tool is monospace type: `Geist Mono` as the display and heading face creates a technical, machine-precision mood while remaining warm enough for product marketing. The brand is **light-first** — white backgrounds are the default presentation surface with red as the accent that directs attention.

**Key characteristics:**
- Flat vector only — no gradients, no blur, no drop shadows anywhere in the system
- Monospace heading type (`Geist Mono`) as the primary aesthetic signal — technical, precise
- Single brand color dominance (`#d01f27` crimson red) with neutral grays for supporting hierarchy
- High contrast pairings: red on white, black on white, white on black
- Geometric pixel-grid symbol mark evoking modular network architecture
- Default presentation surface is white — the brand is light-first

---

## 2. Color Palette & Roles

### Brand Color

One primary red with two derived interactive states:

- **Shinzo Red** (`#d01f27`): The dominant brand color. Used for text highlights, icons, links, active states, borders, and all brand-accent surfaces. This is the `oklch(0.5512 0.2083 25.95)` value in the Tailwind theme.
- **Red Dark** (`#a81920`): Hover and pressed state for buttons and interactive elements. Use wherever a filled red element needs a darker press state.
- **Red Hover** (`#e8454c`): Lighter interactive hover — use for outlined buttons and link hovers where contrast must stay perceptible.

### Neutral Palette

White-first surfaces with a graduated gray scale:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-szo-white` | `#ffffff` | Page background, card background |
| `--color-szo-black` | `#000000` | Hero sections, inverted surfaces |
| `--color-szo-text` | `#353535` | Body copy — primary readable text |
| `--color-szo-text-muted` | `#525252` | Secondary text, captions, metadata |
| `--color-szo-border` | `#c7c7c7` | Default borders on inputs, dividers |
| `--color-szo-border-light` | `#e2e2e2` | Subtle borders, card separators |
| `--color-szo-bg-muted` | `#f5f5f5` | Muted backgrounds, alternating rows |
| `--color-szo-bg-accent` | `#fffbfb` | Accent card backgrounds |
| `--color-szo-bg-accent-hover` | `#fff5f5` | Accent surface hover state |
| `--gray-50` | `#fafafa` | Near-white tint |
| `--gray-100` | `#f5f5f5` | Light backgrounds |
| `--gray-200` | `#e5e5e5` | Borders on light surfaces |
| `--gray-300` | `#d4d4d4` | Disabled borders |
| `--gray-400` | `#a3a3a3` | Placeholder text, disabled states |
| `--gray-500` | `#737373` | Section descriptions, secondary labels |
| `--gray-600` | `#525252` | Secondary body text |
| `--gray-700` | `#404040` | Subdued UI elements |
| `--gray-800` | `#262626` | Dark borders, code backgrounds |
| `--gray-900` | `#171717` | Dark text on light surfaces |

### Semantic Color Tokens

| Token | Value | Role |
|-------|-------|------|
| `--color-szo-primary` | `#d01f27` | Links, active states, highlights, icons |
| `--color-szo-primary-dark` | `#a81920` | Hover/pressed on filled red surfaces |
| `--color-szo-primary-hover` | `#e8454c` | Hover on outlined/ghost red elements |
| `--color-szo-primary-bg` | `rgba(208,31,39,0.06)` | Accent background tint |
| `--color-szo-primary-border` | `rgba(208,31,39,0.2)` | Accent border color |
| `background` | `oklch(1 0 0)` / `#ffffff` | Page background (light mode) |
| `foreground` | `oklch(0 0 0)` / `#000000` | Page foreground (light mode) |
| `border` | `oklch(0.922 0 0)` / `#e5e5e5` | Default UI borders (shadcn/Tailwind) |
| `destructive` | `oklch(0.577 0.245 27.325)` | Error and destructive action color |

### Status Colors (semantic states)

| State | Background | Text | Usage |
|-------|-----------|------|-------|
| Active / Success | `rgba(34,197,94,0.1)` | `#16a34a` | Running indexers, confirmed transactions |
| Warning / Syncing | `rgba(234,179,8,0.1)` | `#ca8a04` | In-progress sync, pending states |
| Error | `rgba(208,31,39,0.08)` | `#d01f27` | Failures, schema mismatches |
| Inactive | `#f5f5f5` | `#a3a3a3` | Offline, disabled, deprecated |

---

## 3. Typography Rules

### Typefaces

| Role | Family | Weights | Fallback |
|------|--------|---------|----------|
| Display / Headings | `Geist Mono` | Variable (100–900), use 400 | `JetBrains Mono, Fira Code, monospace` |
| Body / UI | `Inter` | Variable (100–900), use 300–600 | `system-ui, -apple-system, sans-serif` |
| Code / Mono | `Geist Mono` | Variable (100–900), use 400 | `JetBrains Mono, Fira Code, monospace` |

**Geist Mono** — All headings, display text, section titles, and code/technical values. A variable monospace font that gives Shinzo its technical signature. Use weight 400 for headings. Apply negative letter-spacing on large display sizes only (36px+). Its use as the *heading* font distinguishes Shinzo from typical developer brand which uses a sans-serif display face.

**Inter** — Body copy, UI labels, buttons, captions, metadata, descriptions. Variable font spanning 300 (light) through 600 (semibold). Handles the full readable hierarchy. License: SIL OFL v1.1.

Note: Geist Mono is used for both display/headings AND code contexts — this is intentional. The two roles are distinguished by size, weight, and context, not typeface.

### Weight Usage

> **Heading weight rule:** Headings use `font-weight: 400` as the default. Smaller or secondary headings may use `font-weight: 300` where a lighter feel is appropriate. Do not go above 400 for any heading level — Geist Mono's monospace geometry carries sufficient visual weight on its own.

- **300 Light** — Large body subtitles, introductory descriptive text
- **400 Regular** — Body copy, reading weight; **default heading weight for `Geist Mono`**
- **300 Light** *(headings)* — Smaller or secondary headings where a lighter feel is appropriate
- **500 Medium** — Buttons, navigation labels, interactive UI text (Inter)
- **600 Semibold** — Inline emphasis within body copy, data labels, table headers

### Type Scale

| Token | px | rem | Usage |
|-------|----|-----|-------|
| `--text-12` | 12px | 0.75rem | Captions, legal, labels |
| `--text-14` | 14px | 0.875rem | Small body, metadata |
| `--text-16` | 16px | 1rem | Base body copy |
| `--text-18` | 18px | 1.125rem | Large body, subtitles |
| `--text-20` | 20px | 1.25rem | Card titles, emphasis |
| `--text-24` | 24px | 1.5rem | Small headings — Geist Mono, weight 400 |
| `--text-28` | 28px | 1.75rem | Section subheadings |
| `--text-36` | 36px | 2.25rem | Section headings — Geist Mono, tracking -1px |
| `--text-48` | 48px | 3rem | Large headings — Geist Mono, tracking -1.5px |
| `--text-60` | 60px | 3.75rem | Hero display — Geist Mono, tracking -2px |
| `--text-72` | 72px | 4.5rem | Max display — Geist Mono, tracking -2.5px |

Responsive headings use `clamp()` to scale between breakpoints. Example: `clamp(2rem, 4vw, 3.75rem)` for hero text.

### Typography Principles
- `Geist Mono` is the heading and code typeface — weight 400 for headings. Negative letter-spacing applies to display sizes only (36px+). Not applied to buttons.
- `Inter` handles body text, UI labels, navigation, and all interactive copy.
- Do not use `Geist Mono` at small body sizes (below 16px) except for code values and tokens.
- Do not increase heading weight above 400 — the visual weight of Geist Mono's monospace geometry is sufficient.
- Use `clamp()` for all display and hero type to scale responsively.
- Line-height for headings: `1.0–1.1`. For body: `1.5–1.65`.

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#d01f27`
- Text: `#ffffff` (white)
- Height: `40px` (standard) / `48px` (large) / `28px` (small)
- Padding: `0 16px` (standard) / `0 24px` (large) / `0 10px` (small)
- Border radius: `8px`
- Font: Inter, 14px (standard) / 16px (large) / 12px (small), weight 500
- Hover background: `#a81920`
- Disabled: opacity 0.5, pointer-events none

**Secondary** (brand outlined)
- Background: transparent
- Text: `#d01f27`
- Border: `1px solid #d01f27`
- Border radius: `8px`
- Hover: `rgba(208, 31, 39, 0.06)` background tint

**Outline** (neutral)
- Background: transparent
- Text: `#353535`
- Border: `1px solid #c7c7c7`
- Border radius: `8px`
- Hover: `#f5f5f5` background, `#a3a3a3` border

**Ghost**
- Background: transparent
- Text: `#353535`
- No border
- Border radius: `8px`
- Hover: `#f5f5f5` background

**On Dark Surfaces**
- White ghost: transparent background, `#ffffff` text, `1px solid rgba(255,255,255,0.25)` border
- Surface: `rgba(255,255,255,0.08)` background, `#ffffff` text, `1px solid rgba(255,255,255,0.12)` border
- Primary: unchanged — `#d01f27` background works on dark

**Icon Button** (square)
- Size: `40x40px`, `8px` border radius (matches button convention)
- Border: `1px solid #c7c7c7`
- Hover: border shifts to `#d01f27`

**Constraints:**
- Primary button text is always white (`#ffffff`) on the filled red background
- Never use pill shape (`9999px`) for primary buttons — `8px` radius only
- Buttons with icons use `gap: 6px` between icon and label

### Cards

**Default Card**
- Background: `#ffffff`
- Border: `1px solid #e2e2e2`
- Border radius: `12px`
- Padding: `24px`
- No shadow

**Accent Card** (for featured/highlighted content)
- Background: `#fffbfb`
- Border: `1px solid rgba(208, 31, 39, 0.15)`
- Border radius: `12px`
- Padding: `24px`
- No shadow

**Muted Card** (secondary content)
- Background: `#f5f5f5`
- Border: `1px solid #e5e5e5`
- Border radius: `12px`
- Padding: `24px`
- No shadow

**Dark Card** (inverted sections)
- Background: `#111111`
- Border: `1px solid #222222`
- Border radius: `12px`
- Padding: `24px`
- No shadow

**Dark Accent Card** (highlighted content on dark)
- Background: `rgba(208, 31, 39, 0.08)`
- Border: `1px solid rgba(208, 31, 39, 0.2)`
- Border radius: `12px`
- Padding: `24px`
- No shadow

### Badges / Tags

**Primary badge**
- Background: `rgba(208, 31, 39, 0.08)`
- Text: `#d01f27`
- Padding: `3px 10px`
- Border radius: `9999px` (pill)
- Font: Inter, 12px, weight 500

**Neutral badge**
- Background: `#f5f5f5`
- Text: `#525252`
- Border: `1px solid #e5e5e5`
- Same padding and radius as primary

**Outline badge**
- Background: transparent
- Text: `#d01f27`
- Border: `1px solid rgba(208, 31, 39, 0.3)`
- Same padding and radius as primary

**Semantic state badges** — keep pill radius, swap background and text:
- Active: `rgba(34,197,94,0.1)` bg / `#16a34a` text
- Syncing: `rgba(234,179,8,0.1)` bg / `#ca8a04` text
- Error: `rgba(208,31,39,0.08)` bg / `#d01f27` text
- Inactive: `#f5f5f5` bg / `#a3a3a3` text

---

## 5. Layout Principles

### Spacing System
Base unit: `8px`. All spacing values are multiples of this unit.

| Name | px | rem | Usage |
|------|----|-----|-------|
| Tight | 4px | 0.25rem | Icon-to-label gap |
| Compact | 8px | 0.5rem | Inline element spacing |
| Base | 16px | 1rem | Standard gap |
| Comfortable | 24px | 1.5rem | Card padding, group spacing |
| Spacious | 32px | 2rem | Section sub-spacing |
| Loose | 48px | 3rem | Section internal padding |
| Open | 64px | 4rem | Major section spacing |
| Section | 96px | 6rem | Between top-level page sections |

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `4px` | Tiny elements, inline chips |
| `--radius-sm` | `6px` | Small inputs, tags |
| `--radius-md` | `8px` | Buttons, inputs (developer convention) |
| `--radius-lg` | `12px` | Cards, containers, panels |
| `--radius-xl` | `16px` | Large cards, modals |
| `--radius-2xl` | `24px` | Extra-large containers, hero elements |
| `--radius-full` | `9999px` | Badges, pills, avatars |

### Grid & Layout
- Max content width: `1058px` (`--spacing-container`)
- Page gutter (desktop): `48px` minimum
- Column grid: 12-column at desktop, collapsing to single column on mobile
- Card grids: 3-column at desktop, 2-column at tablet, 1-column on mobile
- Gap between grid items: `16–24px`

### Whitespace Philosophy
Shinzo uses generous whitespace between sections. Light backgrounds amplify this — red accents are visible accent points against clean white space, never smothering the layout. Content-dense developer UIs (explorer, studio) compress spacing but retain the same proportional relationships.

---

## 6. Depth & Elevation

Shinzo's design system is entirely flat. Depth is achieved through surface color contrast and borders, not shadows.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No border, no shadow | Page background (`#ffffff`) |
| Outlined (Level 1) | `1px solid #e2e2e2` | Cards, containers, inputs |
| Tinted (Level 2) | `#f5f5f5` background | Muted containers, alternating rows |
| Inverted | `#000000` or `#111111` background | Dark hero sections, full-bleed blocks |
| Overlay | `rgba(0,0,0,0.5)` backdrop | Modals, drawers |

**Elevation principles:**
- No `box-shadow` anywhere in the system
- Hierarchy expressed through border + background color differentiation
- On light surfaces: `#e2e2e2` borders delineate default containers; `rgba(208,31,39,0.15)` for accent containers
- On dark surfaces: `#222222` → `#333333` borders create layering

---

## 7. Do's and Don'ts

### Do
- Use `#d01f27` as the brand color for links, icons, active states, and decorative highlights
- Use white (`#ffffff`) text on filled red (`#d01f27`) buttons — red is dark enough to need white, not black
- Default to white (`#ffffff`) page backgrounds — the brand is light-first
- Use `Geist Mono` (weight 400) for all headings — this is Shinzo's typographic signature
- Use `Inter` (weights 300–600) for body copy and UI labels
- Apply negative letter-spacing to display headings only (36px+)
- Use `8px` border radius for buttons
- Use `9999px` (pill) radius for badges only
- Keep the design flat: borders and background color, never shadows
- Use `#a81920` (Red Dark) for button hover on filled red surfaces
- Use semantic state colors (green/yellow/red/gray) consistently for indexer and view status
- Apply red as a text highlight color in headings — using `<span style="color:#d01f27">` for a key word
- Maintain sufficient contrast — `#d01f27` on `#ffffff` achieves approximately 4.5:1

### Don't
- Don't use gradients — the brand is entirely flat color
- Don't apply drop shadows or box shadows to any element
- Don't use black text on a filled red primary button — use white
- Don't use Geist Mono for body paragraph text — use Inter
- Don't use Inter weight 600 for headings — use Geist Mono weight 400
- Don't use Geist Mono heading weight above 400 — the mono geometry carries visual weight already (300 is acceptable for smaller/secondary headings)
- Don't mix status colors with the primary brand red — `#d01f27` is for brand, not error state
- Don't use red as a pure error color if the context is also brand-related — be explicit with context
- Don't introduce additional brand colors beyond the defined palette
- Don't use pill-shaped primary buttons — `8px` radius only
- Don't use `#d01f27` as a background for large surfaces — it's an accent color, not a page background
- Don't use white text on neutral/muted surfaces — ensure contrast always meets 4.5:1

---

## 8. Responsive Behavior

### Breakpoints

| Name | Min Width | Notes |
|------|-----------|-------|
| Mobile | `0px` | Single column, stacked layout |
| Tablet | `768px` | Two-column grids, expanded nav |
| Desktop | `1024px` | Full grid, side-by-side layouts |
| Wide | `1440px` | Max content width reached, centered |

### Collapsing Strategy
- **Hero**: Two-column (text + visual) collapses to single column on tablet/mobile
- **Hero type**: Scales down with `clamp()` — e.g. `clamp(2rem, 4vw, 3.75rem)` for display headings
- **Card grids**: 3-col → 2-col at `1024px` → 1-col at `768px`
- **Sidebar nav** (brand kit, studio): hidden on mobile, collapses to a top nav or drawer
- **Section spacing**: `96px` → `64px` on tablet → `48px` on mobile
- **Header height** (`--spacing-header-h`): `6.25rem` (100px) on desktop

---

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand red — links, icons, highlights (`--color-szo-primary`): `#d01f27`
- Red hover/pressed — button press state (`--color-szo-primary-dark`): `#a81920`
- Red interactive hover — outlined element hover (`--color-szo-primary-hover`): `#e8454c`
- Red tint background (`--color-szo-primary-bg`): `rgba(208, 31, 39, 0.06)`
- Page background: `#ffffff`
- Card background: `#ffffff`
- Primary text: `#353535`
- Secondary text: `#525252`
- Muted text / labels: `#737373`
- Default border: `#c7c7c7`
- Subtle border: `#e2e2e2`
- Muted bg: `#f5f5f5`
- Accent bg: `#fffbfb`
- Dark hero background: `#000000`
- Dark card background: `#111111`

### Quick Typography Reference
- Display/heading font: `Geist Mono Variable` (weight 400 — all headings, display text)
- Body font: `Inter Variable` (weights 300–600, body copy and UI)
- Code font: `Geist Mono Variable` (same as heading font — technical values, code snippets)
- Hero headline: Geist Mono, 60–72px, weight 400, leading 1.0, letter-spacing -2px
- Section heading: Geist Mono, 28–36px, weight 400, leading 1.1, letter-spacing -0.5px
- Body: Inter, 16px, weight 400, leading 1.5

### Asset Paths

All logo SVG files are in the website public directory at `apps/website/public/`:
- Full wordmark: `shinzo-logo-full.svg` — black fill, red kanji accent (402×73px)
- Small wordmark: `shinzo-logo-small.svg` — compact version
- Footer wordmark: `shinzo-logo-footer.svg`
- Hero wordmark: `shinzo-logo-hero.svg` — large display version (705×304px)

The Shinzo wordmark uses:
- Main letterforms: `#010101` (effectively black)
- Japanese kanji accent character (rightmost element): `#D01F27` (Shinzo red)

For white-on-dark usage, apply CSS `filter: brightness(0) invert(1)` to the SVG, or use a white-stroked version.

Pattern assets:
- Dot pattern: `pattern-dotted.png` — use as decorative background texture
- Background pattern: `bg-pattern.png`

### Example Component Prompts

**Hero Section:**
"Create a hero section on a white (`#ffffff`) background. Headline in Geist Mono 60px weight 400, line-height 1.0, letter-spacing -2px, color `#000000` with a `#d01f27` red accent word. Subtitle in Inter 18px weight 300, line-height 1.6, color `#737373`. Primary CTA: `#d01f27` background, white text, Inter weight 500, 14px, 8px border radius, 40px height. Secondary CTA: transparent background, `#d01f27` text, `1px solid #d01f27` border, 8px radius. No shadows anywhere."

**Feature Card Grid (Light):**
"Create a 3-column card grid on white (`#ffffff`) background. Each card: white background, `1px solid #e2e2e2` border, 12px border radius, 24px padding, no shadow. Card title: Inter 16px weight 500, `#171717`. Body text: Inter 14px weight 400, `#737373`, line-height 1.55. Gap: 16–24px. Primary buttons inside cards use `#d01f27` background, white text, 8px radius."

**Status Table:**
"Create a table showing indexer status. Active rows: green badge `rgba(34,197,94,0.1)` bg / `#16a34a` text. Syncing rows: amber badge `rgba(234,179,8,0.1)` bg / `#ca8a04` text. Error rows: red badge `rgba(208,31,39,0.08)` bg / `#d01f27` text. Table borders: `1px solid #f5f5f5`. Header text: Geist Mono 11px weight 600, uppercase, `#a3a3a3`. Cell text: Inter 13px, `#353535`."

**Dark Section:**
"Create a full-bleed section on `#000000` background. Headline: Geist Mono 48px weight 400, white, tracking -1.5px. Body: Inter 16px weight 300, `#737373`. Primary button: `#d01f27` background, white text, 8px radius. Ghost button: transparent, white text, `1px solid rgba(255,255,255,0.25)` border, 8px radius."

### Iteration Guide
1. Verify color: brand red `#d01f27` for links/icons/highlights; `#a81920` for hover; white text on red buttons
2. Confirm Geist Mono weight 400 for all headings; Inter for body/UI copy
3. Check no shadows exist — depth is borders and surface color only
4. Ensure status colors (green/amber/red/gray) are not used as brand decorations
5. Validate light-first default: white or near-white backgrounds in standard layout sections
6. Confirm button radius is `8px`, badge radius is `9999px`
7. Check responsive: hero collapses to single column, fluid type scales down with `clamp()`
8. Verify all text meets 4.5:1 contrast — `#d01f27` on white, `#ffffff` on `#d01f27`, `#353535` on white
