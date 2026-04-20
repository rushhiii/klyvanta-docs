# docs-launchpad

Production-ready documentation starter built with Next.js App Router, TypeScript, Tailwind CSS, and MDX.

This repository is designed to be reused across product docs, SDK docs, API guides, and internal knowledge bases.

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

- `docs-site/` - application source
- `.github/workflows/ci.yml` - CI pipeline (install, lint, typecheck, build)

## Quick start

1. Install dependencies:

```bash
cd docs-site
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

See `docs-site/.env.example`.

- `NEXT_PUBLIC_SITE_URL` (required): production site URL used for canonical metadata and sitemap entries.
- `GOOGLE_SITE_VERIFICATION` (optional): Google Search Console verification token.
- `BING_SITE_VERIFICATION` (optional): Bing Webmaster verification token.

## Scripts

From `docs-site/`:

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build locally
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run format` - check formatting with Prettier
- `npm run format:write` - fix formatting with Prettier

## Deploy to Vercel

1. Import this repository in Vercel.
2. Set the project root directory to `docs-site`.
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

1. Replace starter docs in `docs-site/content/docs`.
2. Update branding and navigation links in `docs-site/src/components/docs`.
3. Tune metadata defaults in `docs-site/src/app/layout.tsx`.
4. Adjust visual tokens in `docs-site/src/app/globals.css`.

## License

MIT
