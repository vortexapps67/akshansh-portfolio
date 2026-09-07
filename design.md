# Design: Akshansh Sinha Portfolio (AKSHANSH.dev)

A locked design system for this site. Every page reads this file before emitting
code. Do not regenerate per page: extend or amend this file when the system
needs to grow.

## Genre
atmospheric (deep obsidian glass, monochrome typography, luminous ice-cyan aurora light)

## Macrostructure Family
- Marketing pages (index.html): Marquee Hero: monumental title, verified metrics proof bar, tech marquee, bento cards, UPI creator backing card
- Portfolio pages (projects.html): Filterable Grid with modal preview sheets and live APK download counters
- Profile & Legal pages (about.html, privacy.html, terms.html): Two-column Editorial narrative with sticky sidebar coordinates
- Inquiry page (contact.html): Tactical Handshake Form with instant Discord webhook bridge and contact coordinates

## Theme: "Monolith Specular"
- `--paper`        oklch(10% 0.008 285)   deep obsidian
- `--paper-2`      oklch(13.5% 0.012 285) solid card obsidian surface
- `--ink`          oklch(97.5% 0.004 285) specular white
- `--ink-2`        oklch(78% 0.006 285)   crisp body text (WCAG AA > 5.5:1)
- `--ink-3`        oklch(62% 0.006 285)   labels and secondary coordinates (WCAG AA > 4.5:1)
- `--accent`       oklch(97.5% 0.004 285) white specular highlight
- `--accent-2`     oklch(78% 0.12 215)    ice-cyan accent
- `--accent-ink`   oklch(10% 0.008 285)   deep ink for solid buttons
- `--focus`        oklch(78% 0.12 215)    high-visibility focus ring

## Surface & Glass Discipline (Hallmark Anti-Slop R-10)
- Dose-capped glass: `backdrop-filter` is strictly reserved for floating system overlays (the N5 floating pill navigation bar, the mobile drawer, modals, and the chat popover).
- In-page content cards (agency cards, capability rows, stat cards, project cards, sidebar boxes, contact cards): solid obsidian paper surface (`var(--paper-2)`) with crisp 1px specular border (`var(--glass-border)`) and top specular hairline highlight (`inset 0 1px 0 var(--glass-highlight)`). Zero battery drain, zero muddy glass soup.
- Light theme: clean titanium paper `oklch(97% 0.004 285)`, deep ink `oklch(12% 0.008 285)`, crisp card surfaces.

## Typography
- Display: Syne, weight 600–800, style normal (roman only: never italic headers)
- Body: Manrope, weight 400–500
- Mono: JetBrains Mono, weight 500–700 (labels, chips, stats, coordinates)
- Display tracking: -0.03em; sentence case or crisp title case (no all-caps screaming headers)
- Hero anchor: clamp(2.8rem, 7.5vw, 5.4rem)
- Strict ban on em-dashes (`—`) in UI copy: use `:`, `,`, or `|`.

## Spacing & Geometry
- 4-point named scale in `tokens.css` (`--space-3xs` through `--space-3xl`).
- Geometric radii (Anti-Slop R-08, R-11):
  - Buttons: `--radius-btn: 10px`
  - Inputs: `--radius-input: 10px`
  - Cards: `--radius-card: 16px`
  - Pills: `--radius-pill: 9999px` strictly reserved for chips, tags, status pills, and the N5 floating capsule.

## Motion & Interactivity
- Easings: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`
- Aurora: 3 blurred blobs, translate/scale drift, 19–26s loops
- Reveal pattern: multi-variant IntersectionObserver (`.reveal-blur`, `.reveal-up`, `.reveal-scale`, `.stagger-group`)
- Focus ring: `outline: 2px solid var(--focus); outline-offset: 3px;` (Anti-Slop R-32: Keyboard Accessible)
- Reduced motion: all spatial motion collapses to ≤150ms opacity; aurora blobs freeze

## CTA Voice
- Primary: solid specular button (`--accent`), deep ink text (`--accent-ink`), clean hover lift
- Secondary: obsidian surface, 1px specular border, ink text
- No decorative arrow appendages (`&rarr;`, `&#8599;`) on buttons by default

## What Pages MUST Share
- Wordmark `AKSHANSH.dev`, live status dot, fonts, CTA voice, solid card surface recipe, section heading rhythm (`.section-label` + Syne heading)

## Verified Metrics
- 30+ Production Deployments
- 2 Venture Studios (Zephyr Devs & Vortex Apps)
- 2,600+ BeatWave APK Downloads
- 100% Ad-Free Open Source
