'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu } from 'lucide-react';
import { SearchCommand } from './SearchCommand';
import { TopbarAnnouncement } from './TopbarAnnouncement';

type TopNavItem = {
  title: string;
  href: string;
};

const topNav: TopNavItem[] = [
  { title: 'Docs Home', href: '/docs/home' },
  { title: 'Getting Started', href: '/docs/getting-started' },
  { title: 'Guides', href: '/docs/guides/content-architecture' },
  { title: 'Reference', href: '/docs/reference/seo-checklist' },
];

function normalizePath(path: string): string {
  const noHash = path.split('#')[0];
  const noQuery = noHash.split('?')[0];
  const trimmed = noQuery.replace(/\/+$/, '');

  if (!trimmed) {
    return '/';
  }

  if (trimmed === '/docs') {
    return '/docs/home';
  }

  return trimmed;
}

function isActivePath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === '/docs/home') {
    return current === '/docs/home';
  }

  return current === target || current.startsWith(`${target}/`);
}

export function DocsTopbar() {
  const pathname = usePathname();
  const activePathname = pathname || '/docs/home';

  const handleSidebarToggle = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.dispatchEvent(new CustomEvent('docs-sidebar-toggle'));
  };

  return (
    <div className="topbar">
      <TopbarAnnouncement />

      <div className="topbar-inner">
        <div className="topbar-left">
          <button
            type="button"
            className="sidebar-toggle-button"
            onClick={handleSidebarToggle}
            aria-label="Toggle navigation sidebar"
          >
            <Menu size={19} aria-hidden="true" />
          </button>

          <Link className="brand" href="/docs/home">
            <span className="brand-name">Docs Launchpad</span>
          </Link>
        </div>

        <div className="topbar-center">
          <div className="topbar-search-cluster">
            <SearchCommand />
            <a
              className="topbar-repo-icon-link"
              href="https://github.com/your-org/your-repo"
              target="_blank"
              rel="noreferrer"
              aria-label="Open repository"
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="topbar-right">
          <nav className="topnav" aria-label="Top navigation">
            {topNav.map((item) => {
              const isActive = isActivePath(activePathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="topnav-link"
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <a
            className="action-button action-button-primary"
            href="https://github.com/your-org/your-repo"
            target="_blank"
            rel="noreferrer"
          >
            Use This Starter
          </a>
        </div>
      </div>
    </div>
  );
}
