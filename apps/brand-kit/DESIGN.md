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

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-szo-primary` | `#d01f27` | Brand accent — links, icons, active states, highlights |
| `--color-szo-primary-dark` | `#a81920` | Hover/pressed on filled red surfaces |
| `--color-szo-primary-lite` | `#e8454c` | Hover on outlined/ghost red elements |
| `--color-szo-black` | `#000000` | Headlines, dark surfaces, primary buttons |
| `--color-szo-white` | `#ffffff` | Base background |
| `--color-szo-gray-light` | `#F4F4F4` | Backgrounds, surfaces |
| `--color-szo-gray-mid` | `#C7C7C7` | Borders, muted text |

### UI Semantic Tokens

These are the preferred tokens for interface implementation. Use `--color-ui-*` over raw `--color-szo-*` for any product UI work.

| Token | Value | Role |
|-------|-------|------|
| `--color-ui-bg` | `#ffffff` | Page / card background |
| `--color-ui-bg-muted` | `#f5f5f5` | Muted backgrounds, alternating rows |
| `--color-ui-bg-accent` | `#fffbfb` | Accent card backgrounds |
| `--color-ui-bg-accent-hover` | `#fff5f5` | Accent surface hover state |
| `--color-ui-border` | `#C7C7C7` | Default borders on inputs, dividers |
| `--color-ui-accent` | `#d01f27` | Interactive accent — links, focus rings, highlights |
| `--color-ui-text` | `#353535` | Primary body text |
| `--color-ui-text-muted` | `#525252` | Secondary text, captions, metadata |
| `--color-ui-text-accent` | `#D32C34` | Accent text — links, active labels |

### Gray Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-50` | `#fafafa` | Near-white tint |
| `--color-gray-100` | `#f5f5f5` | Light backgrounds |
| `--color-gray-200` | `#e5e5e5` | Borders on light surfaces |
| `--color-gray-300` | `#d4d4d4` | Disabled borders |
| `--color-gray-400` | `#a3a3a3` | Placeholder text, disabled states |
| `--color-gray-500` | `#737373` | Section descriptions, secondary labels |
| `--color-gray-600` | `#525252` | Secondary body text |
| `--color-gray-700` | `#404040` | Subdued UI elements |
| `--color-gray-800` | `#262626` | Dark borders, code backgrounds |
| `--color-gray-900` | `#171717` | Dark text on light surfaces |

### Status Colors

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
| Display / Headings | `Geist Mono Variable` | Variable (100–900), use 400 | `JetBrains Mono, Fira Code, monospace` |
| Body / UI | `Inter Variable` | Variable (100–900), use 300–600 | `system-ui, -apple-system, sans-serif` |
| Code / Mono | `Geist Mono Variable` | Variable (100–900), use 400 | `JetBrains Mono, Fira Code, monospace` |

**Geist Mono** — All headings, display text, section titles, and code/technical values. Use weight 400 for headings. Apply negative letter-spacing on large display sizes only (36px+).

**Inter** — Body copy, UI labels, buttons, captions, metadata, descriptions. Variable font spanning 300–600.

Note: Geist Mono is used for both display/headings AND code contexts — this is intentional.

### Weight Usage

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Subtitles, introductory text, secondary headings |
| 400 | Regular | Body copy; default for all Geist Mono headings |
| 500 | Medium | Buttons, nav labels, interactive UI (Inter) |
| 600 | Semibold | Inline emphasis, data labels, table headers |

> Do not go above 400 for any heading — Geist Mono's monospace geometry carries sufficient visual weight.

### Type Scale

| Token | px | rem | Usage |
|-------|----|----|-------|
| `text-px-12` | 12 | 0.75 | Captions, legal, labels |
| `text-px-13` | 13 | 0.8125 | Small UI text |
| `text-px-14` | 14 | 0.875 | Small body, metadata |
| `text-px-15` | 15 | 0.9375 | UI body |
| `text-px-16` | 16 | 1 | Base body copy |
| `text-px-18` | 18 | 1.125 | Large body, subtitles |
| `text-px-24` | 24 | 1.5 | Small headings |
| `text-px-28` | 28 | 1.75 | Section subheadings |
| `text-px-36` | 36 | 2.25 | Section headings — Geist Mono, tracking -1.2px |
| `text-px-48` | 48 | 3 | Large headings — Geist Mono, tracking -1.5px |
| `text-px-60` | 60 | 3.75 | Hero display — Geist Mono, tracking -2px |

Responsive headings use `clamp()` to scale between breakpoints.

---

## 4. Component Stylings

### Buttons

Default and large buttons use `rounded-full` (pill). Small buttons use `rounded-md` (8px).

**Primary** (default action — black)
- Background: `#000000`
- Text: `#ffffff`
- Height: `44px` (default) / `48px` (large) / `32px` (small)
- Padding: `0 32px` (default/large) / `0 16px` (small)
- Border radius: `9999px` (pill) — `8px` for small
- Font: Inter, 14px weight 500
- Hover: `rgba(0,0,0,0.9)`

**Red** (high-emphasis CTA)
- Background: `#d01f27`
- Text: `#ffffff`
- Hover: `#a81920`
- Same sizing as primary

**Secondary** (outlined red)
- Background: transparent
- Text: `#d01f27`
- Border: `1px solid #d01f27`
- Hover: `rgba(208,31,39,0.06)` background tint

**Outline** (neutral)
- Background: transparent
- Text: `#353535`
- Border: `1px solid #C7C7C7`
- Hover: `#f5f5f5` background, `#a3a3a3` border

**Ghost**
- Background: transparent
- Text: `#353535`
- No border
- Hover: `#f5f5f5` background

### Cards

**Default**
- Background: `#ffffff` / Border: `1px solid #F4F4F4` / Radius: `12px` / Padding: `24px`

**Accent** (featured content)
- Background: `#fffbfb` / Border: `1px solid rgba(208,31,39,0.2)` / Radius: `12px` / Padding: `24px`

**Muted**
- Background: `#f5f5f5` / Border: `1px solid #e5e5e5` / Radius: `12px` / Padding: `24px`

### Badges

- **Primary**: `rgba(208,31,39,0.08)` bg / `#d01f27` text / pill / Inter 12px weight 500
- **Neutral**: `#f5f5f5` bg / `#525252` text / `1px solid #e5e5e5` border / pill
- **Outline**: transparent bg / `#d01f27` text / `1px solid rgba(208,31,39,0.3)` border / pill

---

## 5. Layout Principles

### Spacing System

Base unit: `8px`. All spacing values are multiples.

| Name | px | Usage |
|------|----|-------|
| Tight | 4px | Icon-to-label gap |
| Compact | 8px | Inline element spacing |
| Base | 16px | Standard gap |
| Comfortable | 24px | Card padding, group spacing |
| Spacious | 32px | Section sub-spacing |
| Loose | 48px | Section internal padding |
| Open | 64px | Major section spacing |
| Section | 96px | Between top-level page sections |

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `4px` | Tiny elements, inline chips |
| `--radius-sm` | `6px` | Small inputs, tags |
| `--radius-md` | `8px` | Small buttons, inputs |
| `--radius-lg` | `12px` | Cards, containers, panels |
| `--radius-xl` | `16px` | Large cards, modals |
| `--radius-2xl` | `24px` | Extra-large containers |
| `--radius-full` | `9999px` | Badges, pills, default buttons |

### Grid & Layout

- Max content width: `1400px` (`--spacing-content`)
- Sidebar width: `240px` (`--spacing-sidebar`)
- Nav height: `56px` (`--spacing-nav`)
- Column grid: 12-column at desktop (`lg`), full-width on mobile — content in `col-start-2 col-span-10`
- Page gutter: `px-5` mobile, `px-6` tablet, `px-0` desktop (offset handled by grid columns)

---

## 6. Depth & Elevation

Shinzo's design system is entirely flat. Depth is achieved through surface color contrast and borders, not shadows.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No border, no shadow | Page background |
| Outlined (1) | `1px solid #C7C7C7` | Cards, containers, inputs |
| Tinted (2) | `#f5f5f5` background | Muted containers |
| Inverted | `#000000` background | Dark hero sections |

No `box-shadow` anywhere in the system.

---

## 7. Logo Usage Guidelines

### Do
- Use the provided SVG files without modification
- Maintain minimum clear space equal to the symbol height on all sides
- Use the white version on dark or coloured backgrounds
- Choose the lockup format that best fits the layout context

### Don't
- Recolour, stretch, or distort the logo
- Place on low-contrast or complex backgrounds
- Recreate the logo or use an outdated version
- Apply drop shadows, outlines, or visual effects

---

## 8. Asset Index

All logo assets are served at `https://brand.shinzo.network/logo/`. Each file is available in SVG and PNG formats.

### Wordmark — Horizontal

| File | Format | Background | Notes |
|------|--------|------------|-------|
| `shinzo-logo-black.svg` / `.png` | SVG + PNG | Light | Full wordmark, black |
| `shinzo-logo-white.svg` / `.png` | SVG + PNG | Dark | Full wordmark, white |
| `shinzo-logo.svg` | SVG | Light | Default wordmark |
| `shinzo-logo-variant-1.svg` | SVG | Light | Alternate lockup variant |

### Wordmark — With Tagline

| File | Format | Background |
|------|--------|------------|
| `shinzo-logo-tagline-black.svg` / `.png` | SVG + PNG | Light |
| `shinzo-logo-tagline-white.svg` / `.png` | SVG + PNG | Dark |

### Wordmark — Stacked

| File | Format | Background |
|------|--------|------------|
| `shinzo-logo-stacked-black.svg` / `.png` | SVG + PNG | Light |
| `shinzo-logo-stacked-white.svg` / `.png` | SVG + PNG | Dark |
| `shinzo-logo-stacked-tagline-black.svg` / `.png` | SVG + PNG | Light |
| `shinzo-logo-stacked-tagline-white.svg` / `.png` | SVG + PNG | Dark |

### Logomark / Symbol

| File | Format | Notes |
|------|--------|-------|
| `shinzo-symbol.svg` | SVG | Geometric symbol only — no wordmark |
| `shinzo-logomark-black.svg` / `.png` | SVG + PNG | Symbol + mark, black |
| `shinzo-logomark-white.svg` / `.png` | SVG + PNG | Symbol + mark, white |
| `shinzo-logomark-red.svg` | SVG | Symbol + mark, red accent |

---

## 9. Do's and Don'ts

### Do
- Use `#d01f27` as the brand accent for links, icons, active states, and decorative highlights
- Use black (`#000000`) as the primary button color — reserve red for high-emphasis CTAs
- Default to white (`#ffffff`) page backgrounds — the brand is light-first
- Use `Geist Mono` (weight 400) for all headings
- Use `Inter` (weights 300–600) for body copy and UI labels
- Apply negative letter-spacing to display headings only (36px+)
- Use pill radius (`9999px`) for default/large buttons; `8px` for small buttons and badges
- Keep the design flat: borders and background color only, never shadows
- Maintain sufficient contrast — minimum 4.5:1 for all body text

### Don't
- Don't use gradients — the brand is entirely flat color
- Don't apply drop shadows or box shadows to any element
- Don't use Geist Mono for body paragraph text — use Inter
- Don't use heading weight above 400 — the mono geometry carries visual weight already
- Don't mix status colors with the primary brand red
- Don't use `#d01f27` as a background for large surfaces — it's an accent color
- Don't use the old `--color-szo-text-muted: #AAAAAA` token for body text — it fails WCAG AA. Use `--color-ui-text-muted: #525252` instead

---

## 10. Responsive Behavior

### Breakpoints

| Name | Min Width | Notes |
|------|-----------|-------|
| Mobile | `0px` | Single column, stacked layout |
| sm | `640px` | Two-column grids |
| lg | `1024px` | Full grid, sidebar visible, `px-0` gutters |

### Collapsing Strategy
- **Hero**: Two-column collapses to single column on mobile
- **Hero type**: Scales with `clamp()` — e.g. `clamp(2rem, 4vw, 3.75rem)`
- **Card grids**: 3-col → 2-col at `sm` → 1-col on mobile
- **Sidebar nav**: hidden below `lg`, sticky at `top: 56px` (nav height) on desktop
- **Section spacing**: `py-20` → `py-16` → `py-12`

---

## 11. Agent Prompt Guide

### Quick Color Reference
- Brand red: `#d01f27` (`--color-szo-primary` / `--color-ui-accent`)
- Red hover/pressed: `#a81920` (`--color-szo-primary-dark`)
- Red light hover: `#e8454c` (`--color-szo-primary-lite`)
- Primary text: `#353535` (`--color-ui-text`)
- Secondary text: `#525252` (`--color-ui-text-muted`)
- Accent text: `#D32C34` (`--color-ui-text-accent`)
- Default border: `#C7C7C7` (`--color-ui-border`)
- Page background: `#ffffff` (`--color-ui-bg`)
- Muted background: `#f5f5f5` (`--color-ui-bg-muted`)
- Accent background: `#fffbfb` (`--color-ui-bg-accent`)

### Quick Typography Reference
- Display/heading font: `Geist Mono Variable` (weight 400)
- Body font: `Inter Variable` (weights 300–600)
- Hero headline: Geist Mono, 60px, weight 400, leading 1.0, letter-spacing -2px
- Section heading: Geist Mono, 36px, weight 400, leading 1.1, letter-spacing -1.2px
- Body: Inter, 16px, weight 400, leading 1.5

### Example Component Prompts

**Hero Section:**
"White background. Headline: Geist Mono 60px weight 400, leading 1.0, tracking -2px, `#000000` with a `#d01f27` accent word. Subtitle: Inter 18px weight 300, leading 1.6, `#525252`. Primary CTA: `#000000` background, white text, pill radius. Red CTA: `#d01f27` background, white text, pill radius. No shadows."

**Feature Card Grid:**
"3-column grid, white background. Cards: `#ffffff` bg, `1px solid #F4F4F4` border, 12px radius, 24px padding, no shadow. Card title: Inter 16px weight 500, `#171717`. Body: Inter 14px weight 400, `#525252`, leading 1.55."

**Dark Section:**
"Full-bleed `#000000` background. Headline: Geist Mono 48px weight 400, white, tracking -1.5px. Body: Inter 16px weight 300, `#737373`. Primary button: `#d01f27` bg, white text, pill radius. Ghost: transparent, white text, `1px solid rgba(255,255,255,0.25)` border."

### Iteration Checklist
1. Color: `#d01f27` for accent; `#000000` for primary buttons; `#a81920` for red hover
2. Typography: Geist Mono weight 400 for headings; Inter for body/UI
3. No shadows — depth via borders and surface color only
4. Status colors (green/amber/red/gray) are not brand decorations
5. Light-first default: white or near-white backgrounds
6. Button radius: pill for default/large; `8px` for small
7. Responsive: fluid type with `clamp()`, single column on mobile
8. Contrast: all body text ≥ 4.5:1 — use `--color-ui-text` (`#353535`) not legacy muted tokens
