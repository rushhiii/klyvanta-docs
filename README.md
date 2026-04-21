# docs-launchpad

Build and ship stunning developer docs fast with a polished, production-ready starter that blends premium UX, SEO-first architecture, and frictionless MDX authoring.

[![Live Docs Example](https://img.shields.io/badge/Live%20Docs-scriptablehub.vercel.app-111827?logo=vercel&logoColor=white)](https://scriptablehub.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/Content-MDX-1f2937)](https://mdxjs.com)

This repository is designed to be reused across product docs, SDK docs, API guides, and internal knowledge bases.

Live docs example built using this starter: https://scriptablehub.vercel.app

## Alternative name ideas

- `docforge-starter`
- `atlas-docs-kit`
- `shipdocs-template`

## Why this starter

- Premium docs shell: top nav, left sidebar, TOC, search command palette, and theme toggle.
- MD/MDX content system with frontmatter-driven sections and ordering.
- Auto-generated previous/next navigation and heading-based TOC.
- SEO defaults included: canonical URLs, Open Graph/Twitter metadata, `robots.txt`, and `sitemap.xml`.
- CI-ready with lint, typecheck, and build validation.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MD/MDX content via gray-matter + react-markdown
- ESLint + Prettier

## Project structure

- `src/` - Next.js app and docs UI components
- `content/docs/` - Markdown and MDX documentation content
- `.github/workflows/ci.yml` - CI pipeline (install, lint, typecheck, build)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Run locally:

```bash
npm run dev
```

4. Open `http://localhost:3000/docs/home`.

## Environment variables

See `.env.example`.

- `NEXT_PUBLIC_SITE_URL` (required): production site URL used for canonical metadata and sitemap entries.
- `GOOGLE_SITE_VERIFICATION` (optional): Google Search Console verification token.
- `BING_SITE_VERIFICATION` (optional): Bing Webmaster verification token.

## Scripts

From repository root:

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build locally
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run format` - check formatting with Prettier
- `npm run format:write` - fix formatting with Prettier

## Deploy to Vercel

1. Import this repository in Vercel.
2. Use the repository root as the project root directory.
3. Add environment variables from `.env.example`.
4. Deploy.
5. Confirm `https://your-domain.com/robots.txt` and `https://your-domain.com/sitemap.xml` are reachable.

## SEO verification checklist

- `NEXT_PUBLIC_SITE_URL` points to the production domain.
- Canonical tags resolve to the production domain.
- Open Graph metadata renders valid title/description/image.
- `robots.txt` includes sitemap location.
- `sitemap.xml` lists expected docs URLs.
- Google Search Console sitemap submitted.
- Bing Webmaster sitemap submitted.

## Customize for your project

1. Replace starter docs in `content/docs`.
2. Update branding and navigation links in `src/components/docs`.
3. Tune metadata defaults in `src/app/layout.tsx`.
4. Adjust visual tokens in `src/app/globals.css`.

## License

MIT
