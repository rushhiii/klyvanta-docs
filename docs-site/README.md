# Docs Launchpad App

Reusable documentation site application for the `docs-launchpad` starter.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS + Typography plugin
- MD/MDX via gray-matter + react-markdown
- ESLint + Prettier

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/docs/home`.

## Environment variables

- `NEXT_PUBLIC_SITE_URL` (required)
- `GOOGLE_SITE_VERIFICATION` (optional)
- `BING_SITE_VERIFICATION` (optional)

## Content authoring

Create files under `content/docs` using `.md` or `.mdx`.

Frontmatter keys:

- `title`
- `description`
- `section`
- `order`
- `updated`
- `tags`

Headings (`##`, `###`) generate the right-hand table of contents.

## Important paths

- `src/lib/docs.ts` - docs loading, nav generation, prev/next logic, search index
- `src/app/docs/[[...slug]]/page.tsx` - docs page rendering + metadata
- `src/components/docs` - topbar, sidebar, footer, search, TOC
- `src/app/layout.tsx` - global metadata defaults
- `src/app/robots.ts` - robots route
- `src/app/sitemap.ts` - sitemap route

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run format
```

## Deployment notes

Deploy to Vercel with project root set to this folder (`docs-site`).

After deploy:

1. Verify `robots.txt` and `sitemap.xml` are reachable.
2. Submit `sitemap.xml` in Google Search Console and Bing Webmaster.
3. Validate canonical metadata uses the production domain.
