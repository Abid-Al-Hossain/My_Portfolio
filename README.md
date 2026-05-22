# Swakkhar Portfolio

A cinematic personal portfolio built with Next.js, React, Tailwind CSS, Framer Motion, and React Three Fiber. The site uses a custom scroll-driven 3D camera system, layered fixed sections, interactive audio controls, project/product/career/contact sections, and a dedicated Chronos product showcase for Swakkhar (Abid Al Hossain).

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Checks

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run the dependency audit:

```bash
npm audit
```

## Notes

- Public resume and avatar assets live in `public/`.
- Audio assets live in `public/audio/`.
- The scroll experience and refresh restoration are controlled by `src/lib/useScrollCamera.tsx` and `src/lib/CameraRig.ts`.
- Product purchase/demo content is implemented in `src/components/ProductsSection.tsx`.
- SEO metadata is configured in `src/app/layout.tsx`, with sitemap output from `src/app/sitemap.ts`.
