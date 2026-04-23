<p align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="./public/logo_icon_dark.png" />
		<source media="(prefers-color-scheme: light)" srcset="./public/logo_icon_dark.png" />
		<img src="./public/logo_icon_dark.png" alt="KlyvantaDocs" width="106" />
	</picture>
</p>

<!-- 
<p align="center">
	<img src="https://raw.githubusercontent.com/rushhiii/klyvanta-docs/refs/heads/main/public/repo_banner.png.png" alt="repo_banner" width="100%" style="border-radius: 30px;" />
</p> -->

<p align="center">
	<strong>KlyvantaDocs</strong><br />
	Design-forward docs starter for product teams and open-source maintainers.
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/rushhiii/klyvanta-docs/refs/heads/main/public/repo_banner.png" alt="repo_banner" width="100%" />
</p>

<p align="center">
	<a href="https://github.com/rushhiii/docs-launchpad/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/rushhiii/docs-launchpad/ci.yml?branch=main&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/stargazers"><img src="https://img.shields.io/github/stars/rushhiii/docs-launchpad?label=stars" alt="GitHub stars" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/network/members"><img src="https://img.shields.io/github/forks/rushhiii/docs-launchpad?label=forks" alt="GitHub forks" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/issues"><img src="https://img.shields.io/github/issues/rushhiii/docs-launchpad?label=issues" alt="GitHub issues" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/pulls"><img src="https://img.shields.io/github/issues-pr/rushhiii/docs-launchpad?label=pull%20requests" alt="GitHub pull requests" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/commits/main"><img src="https://img.shields.io/github/last-commit/rushhiii/docs-launchpad?label=last%20commit" alt="Last commit" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad/graphs/commit-activity"><img src="https://img.shields.io/github/commit-activity/m/rushhiii/docs-launchpad?label=commit%20activity" alt="Commit activity" /></a>
	<a href="https://github.com/rushhiii/docs-launchpad"><img src="https://img.shields.io/github/repo-size/rushhiii/docs-launchpad?label=repo%20size" alt="Repository size" /></a>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
	<img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React" />
	<img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/Content-MD%2FMDX-22324D" alt="MDX" />
	<img src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
	<img src="https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
	<img src="https://img.shields.io/badge/Format-Prettier-F7B93E?logo=prettier&logoColor=111827" alt="Prettier" />
	<img src="https://img.shields.io/badge/Deploy-Vercel-111827?logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
	<a href="#quick-start">Quick Start</a> |
	<a href="#features">Features</a> |
	<a href="#project-structure">Project Structure</a> |
	<a href="#community-and-governance">Community</a> |
	<a href="#deployment">Deployment</a> |
	<a href="#affinity-banner-workflow">Affinity Banner Workflow</a>
</p>

## Why KlyvantaDocs?

KlyvantaDocs helps you ship premium documentation fast, with a polished docs shell, strong SEO defaults, and frictionless MDX authoring.

Use it for:

- Product documentation
- SDK and API guides
- Internal knowledge bases
- Open-source docs websites

## Features

- App Router architecture with Next.js 16 + React 19
- MD/MDX docs content with frontmatter-driven metadata and ordering
- Responsive docs UI with topbar, sidebar, TOC, and command palette search
- Built-in sitemap and robots routes for search indexing
- Open Graph and Twitter metadata generation
- Theme-aware branding support (light/dark logo variants)
- CI workflow for install, lint, typecheck, and build verification

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000/docs/home

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build locally
- `npm run lint` - run ESLint checks
- `npm run typecheck` - run TypeScript checks
- `npm run format` - check formatting with Prettier
- `npm run format:write` - auto-format files with Prettier

## Environment Variables

See `.env.example`.

- `NEXT_PUBLIC_SITE_URL` (required): canonical metadata and sitemap base URL
- `GOOGLE_SITE_VERIFICATION` (optional): Google Search Console verification
- `BING_SITE_VERIFICATION` (optional): Bing Webmaster verification

## Project Structure

- `src/app` - Next.js routes, metadata routes, and docs pages
- `src/components/docs` - reusable docs UI components
- `src/lib` - docs/content loaders, utilities, and helpers
- `content/docs` - Markdown and MDX content files
- `public` - logos, fonts, and banner assets
- `.github/workflows/ci.yml` - CI pipeline

## Deployment

1. Import this repository in Vercel.
2. Set environment variables from `.env.example`.
3. Deploy.
4. Verify:
- `/robots.txt` is reachable
- `/sitemap.xml` is reachable
- canonical and social metadata render correctly

## Affinity Banner Workflow

Use this workflow in Affinity Designer to create a homepage banner that matches your existing logo style:

1. Create a canvas at `1800 x 620`.
2. Add a dark gradient background: `#030816 -> #0a1730 -> #132b56`.
3. Add two radial glows:
- top-right glow `#4f83ff` at `30-35%` opacity
- lower-left glow `#2f5de6` at `25-30%` opacity
4. Add a subtle grid/noise texture at `10-18%` opacity.
5. Place your logo icon on the left inside a rounded rectangle panel.
6. Add headline text on the right: `KlyvantaDocs`.
7. Add a one-line subtitle and 2-3 pill chips (for example: `Fast MDX Authoring`, `Search + SEO Built-in`, `Ready for Vercel Deploy`).
8. Export as `WebP` (quality 80-90) or `PNG` and save as `public/klyvantadocs-home-banner.webp`.
9. If you export a new format, update `bannerImage` in `content/docs/index.mdx`.


## Branding Notes

- All assets are in the `public` folder.
- To design something similar, the Affinity `.af` files are in `/public/affinity` (`public/affinity_templets` in this repository). Download Affinity Designer: https://affinity.serif.com/en-us/designer/

## Community and Governance

To keep this repository reliable, product-focused, and easy to maintain at scale:

- `CODE_OF_CONDUCT.md` defines expected behavior and community standards.
- `CONTRIBUTING.md` defines contribution flow, quality checks, and product principles.
- `SECURITY.md` defines supported versions and responsible vulnerability reporting.
- `LICENSE` defines usage rights under MIT.

## License

See [MIT LICENSE](./LICENSE).
