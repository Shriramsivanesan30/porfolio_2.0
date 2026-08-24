# Shriram Sivanesan — Portfolio

Single-page portfolio site. Dark editorial-tech direction: near-black canvas, one
electric-blue accent, mono eyebrow labels, scroll-reveal motion.

## Run it

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # typecheck (tsc -b) + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Motion 13 (`motion/react`) ·
three.js + React Three Fiber + drei

`vite.config.ts` pins `resolve.dedupe` for react/react-dom. R3F and Motion each resolve
React internally, and without the dedupe you get two React instances and an
"Invalid hook call" crash. If that error ever reappears after installing a package,
delete `node_modules/.vite` and restart the dev server.

Tailwind v4 is configured CSS-first — there is no `tailwind.config.js`. Design tokens
live in the `@theme` block at the top of `src/index.css`.

## Editing your content

**All resume content is in one file: `src/data/content.ts`.** Change text there, not in
the components. It drives every section:

| Export | Feeds |
| --- | --- |
| `profile` | Hero, nav, contact details |
| `work` | Selected Work cards (MRPC, IQAC, KBF) |
| `challenge` | 52-week grid — bump `completed` as you ship |
| `skills` | Stack section |
| `recognition` | Awards + certifications |
| `education`, `languages` | Background block |
| `nav` | Nav links (each `id` must match a section `id`) |

Adding a project = one object in the `work` array. The card renders itself.

## Design tokens

Defined in `src/index.css`:

| Token | Value | Notes |
| --- | --- | --- |
| `--color-ink` | `#0a0a0b` | Page background |
| `--color-text` | `#e8e8e6` | Body text — 16.1:1 contrast |
| `--color-muted` | `#9a9a94` | Secondary text — 7.0:1 |
| `--color-faint` | `#82827c` | Small mono labels — 5.1:1 |
| `--color-accent` | `#5b8cff` | Links, highlights — 6.3:1 |

All foreground colours meet WCAG AA against the background. If you change the palette,
keep small mono text at or above 4.5:1.

## The hero

Five stacked layers, back to front:

| z | Layer |
| --- | --- |
| 0 | Particle field (2D canvas) + grid |
| 10 | WebGL core — distorting icosahedron, wireframe shell, 900-point halo |
| 15 | Oversized `SHRIRAM / SIVANESAN` display type |
| 20 | Cut-out portrait — the figure interrupts the lettering |
| 30 | Copy panel, stats, actions |

The portrait is `public/shriram.webp` (95 KB, transparent). It was cut from a photo whose
background was a vignette gradient overlapping the shirt in tone, so a plain threshold
could not separate them — the matte came from fitting a degree-3 polynomial illumination
model, subtracting it, and thresholding the residual. To swap the photo, replace the file
and keep the transparent background; `Portrait.tsx` handles the mask fade and duotone.

Scene3D is lazy-loaded, so three.js (~237 KB gz) stays out of the initial bundle and the
page paints before WebGL arrives. A `webglcontextlost` handler falls back to a CSS glow.

## Motion

Scroll reveals use `whileInView` with `once: true` via the `Reveal` component in
`src/components/primitives.tsx`. Every animation checks `useReducedMotion()` and
collapses to a plain fade when the visitor has reduced motion enabled.

## Deploying

Static output — `npm run build` emits `dist/`. Drop it on Vercel, Netlify, or GitHub
Pages. Set the build command to `npm run build` and the output directory to `dist`.

Update the canonical/OG URLs in `index.html` if the domain changes.
