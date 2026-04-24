import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FOOTER_LOGO_LIGHT_URL = '/logo_light.png';
const FOOTER_LOGO_DARK_URL = '/logo_dark.png';

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
  return (
    <footer className="docs-footer" aria-label="Site footer">
      <div className="docs-footer-inner">
        <div className="docs-footer-logo">
          <Link href="/docs/home" className="docs-footer-logo-icon" aria-label="Docs home">
            <img
              className="docs-footer-logo-image docs-footer-logo-image-light"
              src={FOOTER_LOGO_LIGHT_URL}
              alt=""
            />
            <img
              className="docs-footer-logo-image docs-footer-logo-image-dark"
              src={FOOTER_LOGO_DARK_URL}
              alt=""
            />
          </Link>
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

      <div className="docs-footer-social" aria-label="Social links">
        <Link
          className="docs-footer-social-link"
          href="https://github.com/rushhiii/klyvanta-docs/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="docs-footer-social-icon" aria-hidden="true" />
        </Link>
        <Link
          className="docs-footer-social-link"
          href="https://www.linkedin.com/in/rushhiii/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="docs-footer-social-icon" aria-hidden="true" />
        </Link>
        <Link
          className="docs-footer-social-link"
          href=""
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter / X"
        >
          <FontAwesomeIcon icon={faXTwitter} className="docs-footer-social-icon" aria-hidden="true" />
          {/* <FontAwesomeIcon icon={faLinkedin} className="docs-footer-social-icon" aria-hidden="true" /> */}
          {/* <i className="fa-brands fa-x-twitter docs-footer-social-icon" aria-hidden="true"></i> */}
        </Link>
        <Link
          className="docs-footer-social-link"
          href="mailto:rushiofficial120506@gmail.com"
          aria-label="Gmail"
        >
          <FontAwesomeIcon icon={faEnvelope} className="docs-footer-social-icon" aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
