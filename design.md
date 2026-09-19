# Design: Akshansh Sinha Portfolio (AKSHANSH.dev)

A locked design system for this site. Every page reads this file before emitting
code. Do not regenerate per page: extend or amend this file when the system
needs to grow.

## Genre
atmospheric (deep violet-obsidian glass, monochrome typography, iris + champagne aurora light)

## Macrostructure Family
- Marketing pages (index.html): Marquee Hero: monumental title, verified metrics proof bar, tech marquee, bento cards, UPI creator backing card
- Portfolio pages (projects.html): Filterable Grid with modal preview sheets and live APK download counters
- Profile & Legal pages (about.html, privacy.html, terms.html): Two-column Editorial narrative with sticky sidebar coordinates
- Inquiry page (contact.html): Tactical Handshake Form with instant Discord webhook bridge and contact coordinates

## Theme: "Iris Monolith"
- `--paper`        oklch(11% 0.014 288)   violet-cast obsidian
- `--paper-2`      oklch(15% 0.018 288)   solid card obsidian surface
- `--ink`          oklch(97.5% 0.006 288) specular white
- `--ink-2`        oklch(80% 0.008 288)   crisp body text (WCAG AA > 5.5:1)
- `--ink-3`        oklch(64% 0.01 288)    labels and secondary coordinates (WCAG AA > 4.5:1)
- `--accent`       oklch(97.5% 0.004 288) white specular highlight (primary buttons)
- `--accent-2`     oklch(74% 0.16 292)    iris / violet brand accent
- `--accent-3`     oklch(84% 0.11 62)     warm champagne secondary accent
- `--accent-ink`   oklch(11% 0.014 288)   deep ink for solid buttons
- `--focus`        oklch(78% 0.15 292)    high-visibility focus ring

## Surface & Glass Discipline (Hallmark Anti-Slop R-10)
- Dose-capped glass: `backdrop-filter` is strictly reserved for floating system overlays (the N5 floating pill navigation bar, the mobile drawer, modals, and the chat popover).
- In-page content cards (agency cards, capability rows, stat cards, project cards, sidebar boxes, contact cards): solid obsidian paper surface (`var(--paper-2)`) with crisp 1px specular border (`var(--glass-border)`) and top specular hairline highlight (`inset 0 1px 0 var(--glass-highlight)`). Zero battery drain, zero muddy glass soup.
- Light theme: clean titanium paper `oklch(97.5% 0.005 288)`, deep ink `oklch(13% 0.014 288)`, crisp card surfaces.

## Typography
- Display: Sora, weight 600–800, style normal (roman only: never italic headers)
- Body: Figtree, weight 400–600
- Mono: JetBrains Mono, weight 600 (labels, chips, stats, coordinates)
- Display tracking: -0.045em hero, -0.028em section headings; sentence case or crisp title case (no all-caps screaming headers)
- Hero anchor: clamp(2.7rem, 7.2vw, 5.2rem)
- Only six weights are loaded (Sora 600/700/800, Figtree 400/500/600, JetBrains Mono 600): never set a weight outside that list.
- Strict ban on em-dashes (\u2014) in UI copy: use `:`, `,`, or `|`.

## Spacing & Geometry
- 4-point named scale in `tokens.css` (`--space-3xs` through `--space-3xl`).
- Geometric radii (Anti-Slop R-08, R-11):
  - Buttons: `--radius-btn: 10px`
  - Inputs: `--radius-input: 10px`
  - Cards: `--radius-card: 16px`
  - Pills: `--radius-pill: 9999px` strictly reserved for chips, tags, status pills, and the N5 floating capsule.

## Motion & Interactivity
- Easings: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`
- Aurora: 5 blurred blobs, translate/scale drift, 17–31s loops (desktop only; phones get a static gradient)
- Reveal pattern: multi-variant IntersectionObserver (`.reveal-blur`, `.reveal-up`, `.reveal-scale`, `.stagger-group`)
- Scroll progress: one `--sp` write per frame drives both the bar fill (a `scaleX`'d `::before`) and the tip dot (a `::after` on the unscaled container, so a scaled parent cannot squash the dot into a sliver). The dot's opacity is `min(--sp * 8, 1)`, so it is absent at rest instead of parked in the top-left corner.
- Focus ring: `outline: 2px solid var(--focus); outline-offset: 3px;` (Anti-Slop R-32: Keyboard Accessible)
- Reduced motion: all spatial motion collapses to ≤150ms opacity; aurora blobs freeze

## Performance Tiers (mobile budget)
- Phones (`max-width:900px` or `pointer:coarse`) run a **static** background: the five aurora blobs, the animated dot mesh, the interaction-lines canvas, the cursor spotlight, card beams and scanlines are all switched off, and the blur budget token (`--blur-scale`) drops to 0.5.
- The `#interaction-lines-canvas` engine is desktop-only, capped at 1.5 DPR, and pauses on `visibilitychange`. It is fixed to the viewport, so tab visibility is the only way it can go off-screen.
- Pointer-driven modules (cursor spotlight, cursor follower, aurora parallax, floating particles, orb gyro, card beams, scroll-blur engine) are never initialised on coarse pointers.
- Phones also drop the text-gradient sweeps (`.grad`, `.fsn-base em`), which animate `background-position` on a clipped gradient and so repaint the glyphs every frame. `.hero-word` keeps its separate `hero-word-in` entrance, so the word still arrives.
- `will-change` is reset to `auto` across cards, buttons, reveals and headings on phones: it is a promise the compositor has to keep alive, and a page of cards each holding a layer is worse than the animation it was meant to smooth.
- Fonts are `<link>`ed with `preconnect` and `display=swap`, and the light theme is applied by an inline head script so there is no first-paint flash.

## CTA Voice
- Primary: solid specular button (`--accent`), deep ink text (`--accent-ink`), clean hover lift
- Secondary: obsidian surface, 1px specular border, ink text
- No decorative arrow appendages (`&rarr;`, `&#8599;`) on buttons by default

## Footer Statement
- Every page closes with `.footer-statement`: a frosted glass plate (`--glass-strong` + `blur(30px) saturate(170%)`) carrying a monumental `AKSHANSH SINHA` wordmark at `clamp(1.75rem, 9vw, 9.5rem)`, Sora 800, tracking -0.055em.
- Three layers sell the glass: the pane itself, a specular top lip (`inset 0 1px 0 --glass-highlight`) with an outer hairline and an iris-tinted lift shadow, and a bloom behind the plate breathing on an 11s transform/opacity loop.
- The wordmark is two stacked layers in one grid cell (`.fsn-base` + `.fsn-sheen`): a vertical ink-to-paper gradient, with `SINHA` drifting through the iris-to-champagne gradient on a 13s loop, under a two-stop light band that sweeps across the letters every 8.5s.
- Entrance: the plate rises 30px while tracking settles from -0.09em to -0.055em, and a mask wipes light across the letters left to right over 1.15s. The wipe masks the layer rather than fading each letter, because the glyphs are painted by the parent's `background-clip:text` and a child span's opacity would not hide it.
- Light theme swaps the sheen's `screen` blend for `multiply` (a no-op against dark ink) and retints the bloom.
- Phones drop the sheen sweep, the accent drift, the glass (solid `--paper-2`) and the wipe, but keep the bloom breathe and the plate reveal.

## Progressive Blur
- Both viewport edges use a stacked stepped-blur treatment rather than one `backdrop-filter`, so the ramp reads as a continuous falloff: six absolutely-positioned panes at 1/3/6/10/15/22px, each masked to a different band, plus a paper scrim on top of the stack.
- The top scrim's opacity is driven by scroll position: `initScrollProgress` writes `--top-scrim` (0 to 0.8 over the first 200px) so the floating pill nav gains contrast only once content is moving under it.
- The bottom pane fades in via `.is-on` past 40px and retreats again over the last 120px, where the footer wordmark is what sits underneath.
- Phones keep only the two cheapest panes, no `backdrop-filter`, a 92px top height, and a constant scrim floor.

## Theming
- Every palette value lives in `tokens.css`; `style.css` contains no raw colours. The two values that cannot be a flat token, the corner vignette and the dot-mesh overlay, are tokens too (`--vignette`, `--mesh-dot`) and invert per theme: the vignette darkens the corners on dark paper and lightens them on light paper.

## What Pages MUST Share
- Wordmark `AKSHANSH.dev`, live status dot, fonts, CTA voice, solid card surface recipe, section heading rhythm (`.section-label` + Sora heading), and the closing `.footer-statement` wordmark

## Verified Metrics
- 30+ Production Deployments
- 2 Venture Studios (Zephyr Devs & Vortex Apps)
- 4,000+ BeatWave APK Downloads
- 100% Ad-Free Open Source
