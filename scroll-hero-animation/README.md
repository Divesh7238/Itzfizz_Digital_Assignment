# Itzfizz — Scroll Car Animation

A one-page React/Vite recreation of the supplied reference. The viewport is pinned while scrolling: the car drives in one straight horizontal line, the green trail grows behind it, the `WELCOME ITZFIZZ` letters reveal, and the four statistic cards fade in sequentially.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated `dist` folder can be deployed to GitHub Pages, Netlify, or Vercel. The animation respects `prefers-reduced-motion` and uses transforms and opacity for the animated elements.
