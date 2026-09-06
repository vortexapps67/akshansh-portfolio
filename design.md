# Design — Akshansh Sinha Portfolio (AKSHANSH.dev)

A locked design system for this site. Every page reads this file before emitting
code. Do not regenerate per page — extend or amend this file when the system
needs to grow.

## Genre
atmospheric (dark glass, aurora field, frosted surfaces)

## Macrostructure family
- Marketing pages (index): Marquee Hero — glass hero + tech marquee + bento glass sections
- Portfolio pages (projects): Filterable Glass Grid
- Profile/legal pages (about, privacy, terms): Long Document on glass — two-column with sidebar

## Theme — "Aurora Glass"
- `--paper`      oklch(13% 0.035 285)   deep violet-navy
- `--paper-2`    oklch(17% 0.045 290)
- `--ink`        oklch(96% 0.012 285)
- `--ink-2`      oklch(74% 0.025 285)
- `--ink-3`      oklch(56% 0.02 285)
- `--accent`     oklch(70% 0.19 300)    electric violet
- `--accent-2`   oklch(78% 0.13 210)    cyan
- `--focus`      oklch(78% 0.13 210)
- Glass surfaces: white at 4–9% alpha + `backdrop-filter: blur(20px) saturate(150%)`
- Light variant: paper `oklch(96% 0.015 285)`, pastel aurora, glass white 55–70% alpha

## Typography
- Display: Syne, weight 700–800, style normal (roman only — never italic headers)
- Body:    Manrope, weight 400–500
- Mono:    JetBrains Mono, weight 500–700 (labels, chips, stats)
- Display tracking: -0.02em; sentence case (no all-caps headings)
- Hero anchor: clamp(2.75rem, 7vw, 5rem)

## Spacing
4-point named scale in `tokens.css`. Pages use named tokens, never raw values.

## Motion
- Easings: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`
- Aurora: 3 blurred blobs, translate/scale drift, 18–26s loops
- Reveal pattern: fade + 24px rise (IntersectionObserver, `.reveal`)
- Hover: lift + border glow on glass cards
- Reduced-motion: all spatial motion collapses to ≤150ms opacity; aurora blobs freeze

## Microinteractions stance
- Silent success; no celebratory toasts
- Focus ring: 2px cyan, instant (never animated)
- Magnetic hover: softened (max 8px), pointer devices only

## CTA voice
- Primary: solid violet pill (`--accent`), dark ink text, soft violet glow shadow
- Secondary: glass pill, 1px glass border, ink text
- No gradient fills on text or pill buttons — gradients live only in the aurora background

## What pages MUST share
- Wordmark AKSHANSH.dev, accent gradient usage (≤ 5% per viewport), fonts,
  CTA voice, glass card recipe, section heading rhythm (mono label + Syne heading)

## What pages MAY differ on
- Macrostructure within the page-type family; enrichment only on index (Tier-A CSS art)

## Exports

### tokens.css
See `tokens.css` at project root — single source for all colour, font, space,
text, ease, duration and radius tokens. `style.css` imports it.
