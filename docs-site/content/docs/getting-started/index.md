---
title: Getting Started
description: Launch Docs Launchpad locally and understand how content maps to routes.
section: Getting Started
order: 1
updated: 2026-04-19
tags:
  - onboarding
  - local setup
  - structure
---

# Getting Started

Docs Launchpad is designed for teams that need production-ready docs with minimal setup.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## How routes are generated

- `content/docs/index.mdx` maps to `/docs/home`.
- `content/docs/getting-started/index.md` maps to `/docs/getting-started`.
- Nested files map to nested routes, for example:
  `content/docs/reference/seo-checklist.mdx` -> `/docs/reference/seo-checklist`.

## Add your first page

Create a Markdown or MDX file under `content/docs`.

Example file path:

`content/docs/guides/my-new-page.md`

Each page supports frontmatter keys:

- title
- description
- tags
- section
- order
- updated

### Slug rules

- index.md becomes the folder slug.
- Nested folders become nested URLs.
- File names are converted directly to URL segments.

## Ship checklist

1. Replace starter copy with your project documentation.
2. Set `NEXT_PUBLIC_SITE_URL` in environment variables.
3. Validate `npm run lint`, `npm run typecheck`, and `npm run build`.
4. Deploy and submit your sitemap to search consoles.
