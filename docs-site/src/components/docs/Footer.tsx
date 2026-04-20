import Link from 'next/link';

const footerColumns = [
  {
    title: 'Docs',
    links: [
      { label: 'Home', href: '/docs/home' },
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Reference', href: '/docs/reference/seo-checklist' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contributing', href: '/docs/contributing' },
      { label: 'Changelog', href: '/docs/changelog' },
      { label: 'Repository', href: 'https://github.com/your-org/your-repo' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Next.js', href: 'https://nextjs.org/docs' },
      { label: 'Tailwind CSS', href: 'https://tailwindcss.com/docs' },
      { label: 'Vercel', href: 'https://vercel.com/docs' },
    ],
  },
] as const;

export function DocsFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="docs-footer" aria-label="Site footer">
      <div className="docs-footer-inner">
        <div className="docs-footer-logo">
          <span className="docs-footer-link" style={{ fontWeight: 700 }}>
            Docs Launchpad
          </span>
        </div>

        <div className="docs-footer-columns">
          {footerColumns.map((column) => (
            <section key={column.title} className="docs-footer-column" aria-label={column.title}>
              <h3 className="docs-footer-column-title">{column.title}</h3>
              {column.links.map((link) => {
                const isExternal = link.href.startsWith('http');

                return (
                  <Link
                    key={link.label}
                    className="docs-footer-link"
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </section>
          ))}
        </div>
      </div>

      <div className="docs-footer-social" aria-label="Footer links">
        <Link className="docs-footer-social-link" href="https://github.com/your-org/your-repo" target="_blank" rel="noreferrer">
          GitHub
        </Link>
        <Link className="docs-footer-social-link" href="https://vercel.com/new" target="_blank" rel="noreferrer">
          Deploy
        </Link>
        <Link className="docs-footer-social-link" href="https://nextjs.org" target="_blank" rel="noreferrer">
          Next.js
        </Link>
        <span className="docs-footer-social-link" aria-label={`Copyright ${year}`}>
          Copyright {year}
        </span>
      </div>
    </footer>
  );
}
