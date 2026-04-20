---
title: Theming and Brand
description: Adapt the visual identity of Docs Launchpad for any product or company.
section: Guides
order: 2
updated: 2026-04-19
tags:
  - theming
  - branding
  - css
---

# Theming and Brand

Docs Launchpad uses CSS custom properties for fast visual customization.

## Primary customization points

- Global tokens: `src/app/globals.css`
- Tailwind theme bridge: `tailwind.config.ts`
- Brand text and links: topbar/footer components under `src/components/docs`

## Recommended branding workflow

1. Set brand colors as CSS variables first.
2. Verify light and dark theme contrast.
3. Update logo or wordmark references.
4. Check mobile nav and command palette readability.

## Typography guidance

- Keep heading and body fonts distinct.
- Test code blocks and monospaced text at small widths.
- Use consistent text spacing across docs sections.
