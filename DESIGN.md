# Crave Collective — DESIGN.md

> Code-ready translation of the design system locked in Figma file `sJthK6ZLvNjhlM3eejXSeT`.
> Generated 2026-05-10 from Figma variables + text styles. Token source of truth: `/Users/thebeast/crave-colective/design/tokens.json`.

## Aesthetic anchor

Editorial cinema — A24 / Apple Films lineage. Heavy negative space, oversized display serif, monochrome canvas, a single restrained accent (brass), slow reveal motion, stills-first treatment of video. The site reads like a printed feature: long airy intros, deliberate cropping, restrained color, type that earns its size.

## Color tokens

All hex+alpha values pulled from Figma variables collection `Color` (id `VariableCollectionId:62:2`) on 2026-05-10. Two modes: `Dark` (default) and `Paper` (editorial light variant, used per-section on case-study pages).

| Token | Dark | Paper | Scope |
|---|---|---|---|
| `color.bg.canvas` | `#0B0B0C` | `#F4F1EA` | FRAME_FILL, SHAPE_FILL |
| `color.bg.elevated` | `#141416` | `#EAE5DA` | FRAME_FILL, SHAPE_FILL |
| `color.bg.paper` | `#F4F1EA` | `#F4F1EA` | FRAME_FILL, SHAPE_FILL (mode-locked) |
| `color.ink.primary` | `#F4F1EA` | `#0B0B0C` | TEXT_FILL |
| `color.ink.secondary` | `rgba(244, 241, 234, 0.72)` | `rgba(11, 11, 12, 0.72)` | TEXT_FILL |
| `color.ink.muted` | `rgba(244, 241, 234, 0.48)` | `rgba(11, 11, 12, 0.48)` | TEXT_FILL |
| `color.ink.overlayWhite8` | `rgba(255, 255, 255, 0.08)` | `rgba(11, 11, 12, 0.06)` | FRAME_FILL, SHAPE_FILL |
| `color.line.hairline` | `rgba(244, 241, 234, 0.12)` | `rgba(11, 11, 12, 0.12)` | STROKE_COLOR |
| `color.accent.primary` | `#B88246` | `#B88246` | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color.accent.onAccent` | `#0B0B0C` | `#0B0B0C` | FRAME_FILL, TEXT_FILL |
| `color.state.error` | `#C84B3A` | `#9C2A1E` | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |

## Typography

All text styles pulled from Figma local text styles on 2026-05-10. Figma uses Google fallbacks (Fraunces, Inter) for layout fidelity; production targets the licensed pair below.

| Token | Family (Figma fallback) | Weight | Size | Line-height | Letter-spacing | Case |
|---|---|---|---|---|---|---|
| `display` | Fraunces | Black | 128px | 95% | -0.03em | original |
| `xl` | Fraunces | Bold | 96px | 100% | -0.025em | original |
| `l` | Fraunces | Regular | 64px | 105% | -0.02em | original |
| `m` | Fraunces | Regular | 40px | 115% | -0.015em | original |
| `s` | Inter | Medium | 24px | 135% | -0.005em | original |
| `xs` | Inter | Regular | 18px | 150% | 0em | original |
| `caption` | Inter | Medium | 13px | 140% | 0.08em | UPPER |

**Font licenses needed before production:**
- **GT Sectra Display** (Grilli Type) — display serif. Figma fallback: Fraunces (Google).
- **Söhne** (Klim) — sans (Buch + Mono Buch weights). Figma fallback: Inter (Google).
- Web licenses ~$1k–$1.5k combined. **Block web launch until purchased.** Until licensed, ship with Fraunces + Inter to preserve metrics — both are Google Fonts and metric-near to the production pair.

## Spacing

Scale from `space/4` → `space/160` plus layout-specific page-padding and section-padding tokens. All values are FLOAT pixels.

| Token | Value | Use |
|---|---|---|
| `space.4` | 4 | hairline gaps, icon-to-text micro-gap |
| `space.8` | 8 | tight inline gaps |
| `space.12` | 12 | form field inner padding |
| `space.16` | 16 | default button vertical padding, small gaps |
| `space.24` | 24 | mobile gutter, default card padding |
| `space.32` | 32 | desktop column gutter, medium block gaps |
| `space.48` | 48 | desktop page padding, large block gaps |
| `space.64` | 64 | mobile section padding, hero internal padding |
| `space.96` | 96 | extra-large gaps, between major elements |
| `space.128` | 128 | desktop section padding |
| `space.160` | 160 | hero / outsized chapter break spacing |
| `space.pagePadding.desktop` | 48 | horizontal page padding (≥1024px) |
| `space.pagePadding.mobile` | 24 | horizontal page padding (<768px) |
| `space.sectionPadding.desktop` | 128 | vertical section padding (≥1024px) |
| `space.sectionPadding.mobile` | 64 | vertical section padding (<768px) |

## Radius

| Token | Value | Use |
|---|---|---|
| `radius.0` | 0 | default — every surface ships square unless noted |
| `radius.2` | 2 | form fields, hairline inputs |
| `radius.full` | 9999 | pill (link-arrow chip, status pills) |

## Motion

Three motion curves cover the whole system. Each has a duration token and an easing token.

| Curve | Duration | Easing (bezier) | Use |
|---|---|---|---|
| `motion.entrance` | 900ms | `cubic-bezier(0.16, 1, 0.3, 1)` | element fade-up on viewport intersect |
| `motion.exit` | 400ms | `cubic-bezier(0.4, 0, 1, 1)` | overlay close, nav collapse |
| `motion.scroll` | 1200ms | `cubic-bezier(0.65, 0, 0.35, 1)` | scroll-driven parallax, pinned hero exit |

> Reduced-motion fallback per section is documented in the **Section animation specs** table below. Honor `prefers-reduced-motion: reduce` globally — never bypass.

## Grid

| Breakpoint | Max width | Columns | Gutter |
|---|---|---|---|
| Desktop (≥1280px) | 1680 | 12 | 32 |
| Tablet (768–1279px) | 1024 | 8 | 24 |
| Mobile (<768px) | 375 | 4 | 16 |

## Components → React component map

The slash-delimited Figma names map to PascalCase React components. T8 should normalize the path:
- `type/foo` → `<Foo>` (typography primitives)
- `btn/foo` → `<FooButton>` (button family)
- `card/foo` → `<FooCard>`
- `section/foo` → `<SectionFoo>`
- `tile/foo` → `<FooTile>`
- `marquee/foo` → `<FooMarquee>` (or `<LogoStrip>` per map)
- `blockquote/foo` → `<Foo>` (e.g. `<Testimonial>`)
- `footer/site` / `nav/site` / `form/field` → `<Footer>` / `<Nav>` / `<FormField>`
- `pillar/foo` → `<Pillar>`

| Figma component | React component | Notes |
|---|---|---|
| `type/display` | `<Display>` | Use sparingly — hero, contact CTA, chapter break only |
| `type/h1` | `<H1>` | Page opening; use `<xl>` text style |
| `type/h2` | `<H2>` | Section heading; `<l>` text style |
| `type/h3` | `<H3>` | Sub-section heading; `<m>` text style |
| `type/lead` | `<Lead>` | Lead paragraph / standfirst; `<s>` text style |
| `type/body` | `<Body>` | Default body copy; `<xs>` text style |
| `type/eyebrow` | `<Eyebrow>` | Uppercase tracked caption; `<caption>` text style |
| `type/numeral-brass` | `<BrassNumeral>` | Accent-color numeral display. Accepts any short alphanumeric — `$8.4M`, `12d`, `+47%` |
| `btn/primary` | `<PrimaryButton>` | Variants: size `lg`/`md`/`sm` × state `default`/`hover`/`disabled` |
| `btn/ghost` | `<GhostButton>` | Hairline-border button; same size/state matrix |
| `btn/link-arrow` | `<LinkArrow>` | Inline link with brass arrow; translates 4px on hover |
| `card/video` | `<VideoCard>` | Prop `aspect`: `'16:9'` \| `'9:16'` \| `'4:3'`. Poster image + optional play affordance |
| `section/header` | `<SectionHeader>` | Eyebrow + heading + optional lead — section opener |
| `marquee/logo-strip` | `<LogoStrip>` | Continuous horizontal scroll of partner logos |
| `tile/case-study` | `<CaseStudyTile>` | Prop `size`: `'full'` \| `'half'` \| `'third'` |
| `blockquote/testimonial` | `<Testimonial>` | Pull-quote with attribution, optional portrait |
| `footer/site` | `<Footer>` | Hairline-divided site footer |
| `nav/site` | `<Nav>` | Variant `transparent` (hero overlay) / `condensed` (scrolled) |
| `form/field` | `<FormField>` | State `default`/`focused`/`filled`/`error`. **Implement multiline variant in React via `<textarea>`** — the Figma desktop instance is single-line due to Plugin API instance-descendant lock; no design impact |
| `pillar/credential` | `<Pillar>` | Stat card: numeral on top, eyebrow + body below |

## Page archetypes → Next.js routes

| Page | Route | Figma frame (desktop) | Figma frame (mobile) |
|---|---|---|---|
| Home | `/` | `home-desktop` (node 258:2) | `home-mobile` (node 264:257) |
| Case Study | `/work/[slug]` | `case-study-desktop` (node 260:2) | `case-study-mobile` (node 265:62) |
| Contact | `/contact` | `contact-desktop` (node 263:2) | `contact-mobile` (node 266:119) |
| Work index | `/work` | not built in Figma (deferred to a later task) | — |

## Mode toggle (Paper)

Sections 3–5 of the case-study archetype (narrative, stills gallery, pull-quote) render in **Paper mode**. In Figma this uses `explicitVariableModes` to flip the Color collection to Paper at the section level. In CSS:

```css
:root {
  /* Dark mode tokens (default) */
  --color-bg-canvas: #0B0B0C;
  --color-ink-primary: #F4F1EA;
  /* … */
}

[data-theme="paper"] {
  /* Paper-mode overrides on a per-section wrapper */
  --color-bg-canvas: #F4F1EA;
  --color-ink-primary: #0B0B0C;
  /* … */
}
```

Apply `data-theme="paper"` on the section wrapper for the three Paper sections. No JS needed — pure CSS variable swap. Paper mode is the **only** color mode toggle; a separate "light" mode is NOT a target.

## Section animation specs

Each row covers default motion intent + the reduced-motion fallback.

| Section | Motion intent | Reduced-motion fallback |
|---|---|---|
| Hero | entrance 900ms `cubic-bezier(0.16, 1, 0.3, 1)`; pin ~600ms; parallax-lag exit (scroll 1200ms) | static, no pin, no parallax |
| Intro statement | fade-up entrance 900ms staggered per segment (40ms stagger) | instant fade, no stagger |
| Marquee (logo strip) | continuous 60s horizontal scroll loop | static row, all logos visible, no scroll |
| Reel grid | tile entrance staggered 100ms each, fade-up; hover scale 1.02 + `overlayWhite8` wash | static tiles, no hover scale, no wash |
| Credentials (pillars) | pillar entrance staggered 150ms each; numerals slide up from `-16px` | instant; numerals appear at final position |
| Founder note | parallax 2% on portrait during scroll | static, no parallax |
| Contact CTA | display fade-up 900ms entrance | instant fade |
| Case study narrative | column entrance 1200ms scroll curve | instant fade |
| Case study stills | each still fades in at scroll intersection, 900ms entrance | all stills visible immediately |
| Case study outcomes | numerals count up from 0 over 900ms | numerals appear at final value, no count-up |
| Case study next-project CTA | full-bleed fade; link-arrow translates 4px on hover | instant fade, no link-arrow translate |

## Known limitations

- **field-brief textarea on desktop** is single-line in Figma due to a Plugin API instance-descendant lock. Implement as a multiline `<textarea>` in CSS in the React component — no visible design impact.
- **CS-mobile nav** links cluster is hidden in Figma with no hamburger placeholder (instance child lock). Implement a hamburger menu in React using Radix Dialog or Headless UI Menu — match the type/eyebrow caption style for menu items.
- **6 `_unused-*` legacy pages** were cleaned up in the T3 prelude — no residue.
- **Work index page** (`/work`) is not built in Figma. Defer until route is requested; in the meantime a basic grid of `<CaseStudyTile size="third">` reused from Home meets the spec.

## Build sequence reference

Figma was built in this order: Variables → Type styles → Primitives → Compounds → Section blocks → Page archetypes. T8 scaffolding should follow the same order:

1. Wire tokens (`design/tokens.json` → CSS variables in `globals.css`)
2. Build component primitives (typography, buttons, link-arrow, brass numeral)
3. Build compound components (cards, tiles, section header, marquee, testimonial, form field, footer, nav, pillar)
4. Compose page sections (hero, intro, reel grid, credentials, founder note, contact CTA, case-study narrative, stills, outcomes, next-project)
5. Wire page routes (`/`, `/work/[slug]`, `/contact`)

## Hand-off contract

- All numeric values match `/Users/thebeast/crave-colective/design/tokens.json` exactly. Do not hand-tune in CSS.
- Component naming convention `type/foo`, `section/foo`, `tile/foo` in Figma maps to PascalCase React components per the component map above.
- Paper mode is the **only** color mode toggle. A separate light mode is NOT a separate target.
- Mobile breakpoint at 375 width per Figma archetype. Tailwind config should set: `sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1680`. Use `lg:` for desktop-only treatments.
- Honor `prefers-reduced-motion: reduce` globally for every animation listed in the Section animation specs table.
- Production type stack (GT Sectra Display + Söhne) must be licensed before web launch. Fraunces + Inter ship in the meantime to preserve layout metrics.

## T8 implementation contract

The following decisions are locked for T8 to remove judgment-call friction.

### CSS variable naming
Token path → CSS variable: kebab-case throughout, camelCase segments split on capitals.

| Token path | CSS variable |
|---|---|
| `color.bg.canvas` | `--color-bg-canvas` |
| `color.ink.overlayWhite8` | `--color-ink-overlay-white-8` |
| `space.96` | `--space-96` |
| `space.pagePadding.desktop` | `--space-page-padding-desktop` |
| `motion.duration.entrance` | `--motion-duration-entrance` |
| `motion.easing.entrance` | `--motion-easing-entrance` |

All CSS vars defined in `:root` (Dark default) and overridden under `[data-theme="paper"]`. Paper-mode override applies only to color vars that have `paper` mode values.

### Tailwind v4
Use Tailwind v4 (latest stable). Configure tokens via `@theme` block in `src/app/globals.css`, NOT `tailwind.config.js`. No `theme.extend` JS config.

```css
@import "tailwindcss";

@theme {
  --color-bg-canvas: #0B0B0C;
  --color-ink-primary: #F4F1EA;
  --space-96: 96px;
  /* ... rest from design/tokens.json ... */
}

[data-theme="paper"] {
  --color-bg-canvas: #F4F1EA;
  --color-ink-primary: #0B0B0C;
  /* paper-mode overrides only */
}
```

### Font loading
- Fraunces and Inter via `next/font/google` with `display: 'swap'`. Weights: Fraunces 400/700/900, Inter 400/500.
- Place in `src/app/layout.tsx`, expose via CSS variables (`--font-display`, `--font-sans`).
- When GT Sectra Display + Söhne web licenses are purchased, swap to `next/font/local` with the same CSS variable names — no consumer changes needed.

### Motion library
- **GSAP + ScrollTrigger** for: hero pin + parallax-lag exit, scroll-driven section entrances, case-study narrative column scroll, outcomes count-up.
- **CSS `@keyframes`** for: marquee infinite scroll (single `translateX(-50%)` loop with duplicated content for seamless wrap, ~60s).
- **CSS `transition`** for: hover micro-interactions (button states, tile overlay reveal, link-arrow translate).
- Wrap all GSAP timelines in a `useGSAP` hook from `@gsap/react`. Pause + fall back to instant render under `@media (prefers-reduced-motion: reduce)`.

### Count-up implementation
Outcomes numerals: use `gsap.to({val: 0}, {val: targetNum, duration: 0.9, ease: 'power2.out'})` driven by ScrollTrigger intersection. NO third-party library needed.

### Grid breakpoints (clarified)
| Tailwind breakpoint | Min width | Grid | Use |
|---|---|---|---|
| (default) | 0 | mobile 4-col / 16px gutter | base styles |
| `md:` | 768 | tablet-low transitional | minor adjustments |
| `lg:` | 1024 | tablet 8-col / 24px gutter | 8-col layouts |
| `xl:` | 1280 | desktop transitional | minor adjustments |
| `2xl:` | 1680 | desktop 12-col / 32px gutter | full 12-col layouts |

Default to `xl:` for desktop-only treatments. `lg:` is tablet 8-col, not desktop.

### Icon system
No external icon library at this stage. The LinkArrow chevron is an inline SVG `path` rendered in the component itself (path `M 1 8 L 15 8 M 9 2 L 15 8 L 9 14`, stroke `var(--color-ink-primary)`, 1.5px, round caps + joins). If more icons accumulate, consider Lucide React in a follow-up.

### Globals file location
`src/app/globals.css` (Next.js App Router default).

### Mode toggle wiring
The case-study route applies `data-theme="paper"` to the narrative, stills, and pull-quote sections via a wrapping `<section data-theme="paper">` element. Other routes stay on the default (Dark) mode.

### Reduced-motion
Wrap every animation in `useGSAP` + check `gsap.matchMedia({"(prefers-reduced-motion: reduce)": () => { /* static state */ }})`. For pure-CSS animations (marquee, hover transitions), gate via `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }`.

### Component prop typing
See the component map. Variant props on buttons: `size: 'lg' | 'md' | 'sm'`, `state: 'default' | 'hover' | 'disabled'`. VideoCard: `aspect: '16:9' | '9:16' | '4:3'`. CaseStudyTile: `size: 'full' | 'half' | 'third'`. FormField: `state: 'default' | 'focused' | 'filled' | 'error'`. Nav: `state: 'transparent' | 'condensed'`.

### Tokens-to-Tailwind mapping
Run a tiny build script `pnpm tokens:build` that reads `design/tokens.json` and emits the `@theme` block into `src/app/globals.css` (or maintains it inline manually for T8 — the JSON is the source of truth, the CSS block is the artifact).

## Decisions log

Three implicit decisions made during the build. Captured here so future devs don't have to reverse-engineer them.

### Logo
The site uses Crave Collective's actual wordmark image (`/brand/wordmark.webp`) sourced from cravecollective.co — NOT a typographic Display-font rendering. The original Figma design system used a typographic wordmark as a placeholder pending Dante's mark decision. The scraped image works for v1; revisit if Dante wants a refresh.

### Mobile responsive strategy
Figma has 7 `section/<name>-mobile` sibling components at 375w. The repo went a DIFFERENT direction: single responsive components using Tailwind `lg:`/`xl:` breakpoints — no separate mobile components. Consolidation intentional; one source of truth in code, two presentations via media queries. If you're consulting Figma for mobile layout, the `-mobile` siblings tell you the intended composition; the code expresses it via responsive utilities, not duplicate components.

### `/work/[slug]` CMS schema
Route is dynamic but ships a static placeholder (same content per slug). CMS schema is deferred to the web-build phase — when real case-study content lands, this route becomes data-driven from Sanity or similar. The `/Users/thebeast/crave-colective/src/app/page.tsx` LinkArrow CTAs currently point to `/work/longboat-key` and `/work/grove-street-painting`; those slugs must have corresponding case study data before public launch or the buttons land on the placeholder page.

### Brand voice source
Page copy is lifted from `cravecollective.co` (raw HTML in `/Users/thebeast/crave-colective/scraped/raw/`) with light editorial adaptation. Triplet cadence + plural "we" + outcome-led nouns preserved. New copy that doesn't fit the existing voice should be flagged before publishing.
