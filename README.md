# OSTA site

Multi-page marketing site (Vite, vanilla JS, Three.js for hero visuals). Pages: home, about, services, catalog, product, contact, plus an internal design-system page.

## Requirements

Node.js 24 (see `.nvmrc`; Vite 8 needs a current Node LTS).

## Commands

```
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve dist/ on http://localhost:4175/osta/
```

## Deploy

GitHub Pages via Actions (`.github/workflows/deploy.yml`) on every push to `main`. Live: https://mak-nw.github.io/osta/

The site is served from the sub-path `/osta/`: production builds and `vite preview` use base `/osta/`, `npm run dev` uses `/`. Override with `VITE_BASE` (e.g. `VITE_BASE=/ npm run build`). In JS use `url()` from `src/utils/url.js` (never hard-code `/assets/...`); in HTML write root-absolute paths, the build adds the base.

The review overlay (`vite-plugin-review.js`, `dev-tools/`) is dev-only and is not part of the production build.

## Structure

- `*.html` in the root: one file per page (`index`, `about`, `services`, `catalog`, `product`, `contact`, `design-system`); shared head/header/footer in `src/partials/`.
- `src/styles/`: `tokens.css` (all design tokens), `base.css`, `layout.css`, `components/`, `pages/`.
- `src/i18n/`: translations (`en.json`, `de.json`); English is the default language.
- `src/pages/`: per-page scripts and 3D scenes; `src/data/`: product data.
- `public/assets/`: fonts, icons, images (served from `/assets/`).
- `design-system.md`: components, role-to-token table and layout rules.

## Rules

- Colors, sizes and spacing come only from tokens in `src/styles/tokens.css`; no hardcoded values or inline styles.
- 12-column grid with a 16 px gap.
- Text is not hardcoded: it goes through `src/i18n`.
