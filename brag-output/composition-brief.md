# Hyperframes Composition Brief: AKSHANSH.dev

## Objective
Create a short launch-style brag video for AKSHANSH.dev.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20.0 seconds

## Source Material
- Project root: `d:\WEBSITES\pf`
- Primary files read: `index.html`, `style.css`, `tokens.css`, `projects.html`
- Product name: AKSHANSH.dev
- Tagline / strongest claim: "Building the web that moves."
- Key UI or visual moments to recreate:
  - Telemetry HUD with Patna coordinates and latency
  - Dual Studio cards (Zephyr Devs & Vortex Apps)
  - BeatWave live download counter (4,000+ Downloads) & app cards
  - Avatar Orb with glowing rotating concentric rings
- Copy that must appear verbatim:
  - "Building the web that moves."
  - "NODE: PATNA_IN [25.59°N, 85.14°E] / LATENCY: 18ms"
  - "Zephyr Devs" / "Vortex Apps"
  - "BeatWave" / "4,000+ downloads"
  - "AKSHANSH.dev" / "Let's build something."

## Creative Direction
- Tone preset: polished
- Creative direction: Sleek obsidian systems-engineer & tech-founder launch trailer
- Interpretation: Confident, fast-in motion with generous legible holds, crisp technical telemetry, precision cyan lighting, and zero fluff.
- Angle: High-octane systems engineering meets luminous obsidian aesthetics. We showcase not just abstract marketing, but the live telemetry, dual engineering studios, and battle-tested products (BeatWave, WaveMirror, Onyx) built from Patna to production.
- Hook: Telemetry HUD + "Building the web that moves."
- Outro / punchline: "AKSHANSH.dev" with avatar orb, "Let's build something."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: `oklch(10% 0.008 285)` / `#0d0d10`
- Text: `oklch(97.5% 0.004 285)` / `#f8fafc`
- Accent: `oklch(78% 0.12 215)` / `#38bdf8` & `#00e5ff`
- Display font: `Syne`, sans-serif
- Body font: `Manrope`, sans-serif
- Mono font: `JetBrains Mono`, monospace
- Visual references from the project: Obsidian glassmorphism cards, glowing status pill badge, cyan specular gradients, live download ticker.

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract:
1. Telemetry Hook & Hero Title — 5.0s (0.0s – 5.0s) — HUD initialization and "Building the web that moves."
2. Dual Engineering Studios — 5.0s (5.0s – 10.0s) — Zephyr Devs & Vortex Apps cards and tech stack
3. Flagship Products & Key Metrics — 5.5s (10.0s – 15.5s) — BeatWave (4,000+ downloads), WaveMirror, Onyx Chat, and 4 performance metrics
4. Outro & Global Call to Action — 4.5s (15.5s – 20.0s) — Avatar orb, AKSHANSH.dev brand mark, "Let's build something."

## Audio
- Audio role: Steady and clean electronic bed with pristine UI clicks and resonant impact accents
- Audio arc: Ambient opening rises into confident dual-studio architecture, peaks with product metrics and download counters, and settles into a resonant logo bell outro.
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: Starts at 0.0s, volume 0.35, gentle fade under final logo bell at 18.5s.
- Music cue guidance: Estimated tempo ~110 BPM. Strong cues at 8.74s, 13.11s, 17.47s, 18.56s.
- Audio-reactive treatment: Subtle; ambient background glows and orb rings breathe slightly with music RMS.
- Audio-coupled moments:
  - 0.3s: HUD Telemetry lock-in (`interface/switch_001.ogg`)
  - 5.0s: Studios reveal (`impact/impactSoft_medium_000.ogg`)
  - 10.0s: BeatWave 4,000+ ticker counter burst (`casino/chips-collide-1.ogg`)
  - 16.0s: Outro logo arrival (`impact/impactBell_heavy_000.ogg`)
- SFX selection guidance: Precise, tactile, low-HF risk.
- SFX analysis guidance: `skills/brag/assets/sfx/sfx-analysis.md`
- Audio files: copy music and selected SFX to `brag-output/composition/assets/`

## Hyperframes Instructions
Requirements:
- Show real UI, copy, and visuals directly inspired by the portfolio.
- Keep all text readable in the final render.
- Keep the video at 20.0 seconds.
- Include the planned music and SFX tracks with distinct `data-track-index` attributes.
- Use local assets for audio and images.
- Run `npx hyperframes check` before render.
