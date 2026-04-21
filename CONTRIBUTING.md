# Contributing to KlyvantaDocs

Thanks for contributing.
This project is built for product teams and open-source maintainers who need a fast, polished docs launchpad.

## Product Goal
KlyvantaDocs focuses on three outcomes:
- fast docs delivery
- high-quality user experience
- strong SEO and discoverability defaults

Please keep these outcomes in mind when suggesting or implementing changes.

## Ways to Contribute
- Report bugs with clear reproduction steps.
- Propose features that improve docs authoring speed, readability, or discoverability.
- Improve content structure, wording, and examples.
- Improve accessibility, performance, and mobile behavior.
- Improve developer experience, tooling, and reliability.

## Local Setup
### Prerequisites
- Node.js 20+
- npm

### Install and Run
```bash
npm install
npm run dev
```

Open http://localhost:3000/docs/home

## Quality Checks
Before opening a pull request, run:
```bash
npm run lint
npm run typecheck
npm run build
```

## Content and UX Principles
- Keep docs task-oriented and easy to scan.
- Prefer concrete examples over abstract descriptions.
- Preserve metadata quality (title, description, canonical URL, social cards).
- Keep visual branding consistent across topbar, docs home, and README assets.
- Do not add complexity unless it clearly improves user value.

## Pull Request Process
1. Open or reference an issue for non-trivial work.
2. Keep PRs focused on a single objective.
3. Explain the user impact in the PR description.
4. Add screenshots or short recordings for UI changes.
5. Update relevant docs and metadata when behavior changes.

## Pull Request Checklist
- [ ] The change aligns with the product goal and improves docs outcomes.
- [ ] Lint, typecheck, and build pass locally.
- [ ] UI changes are responsive and accessible.
- [ ] Related docs/content were updated as needed.
- [ ] Breaking changes are explicitly called out.

## Need Help?
Open a GitHub issue with context and expected behavior, and a maintainer will guide next steps.
