---
title: Content Architecture
description: Organize pages by intent so readers can move from setup to implementation quickly.
section: Guides
order: 1
updated: 2026-04-19
tags:
  - architecture
  - information design
  - navigation
---

# Content Architecture

A predictable documentation structure helps readers find answers faster.

## Recommended section model

- `Overview`: mission, scope, and quick links.
- `Getting Started`: setup and onboarding steps.
- `Guides`: detailed implementation walkthroughs.
- `Components`: reusable content/UI documentation.
- `Reference`: policy, API, SEO, and deployment details.

## Ordering strategy

- Use `order` values in increments of 10 for easier insertions later.
- Keep section names stable to avoid unnecessary URL changes.
- Add redirects if you rename pages that are already indexed.

## URL stability

- Prefer short, descriptive slugs.
- Avoid date-based or version-based slugs for evergreen pages.
- Keep legacy pages available until external links are updated.
