'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Download, Home, Info, LayoutGrid, type LucideIcon } from 'lucide-react';

type SubnavResourceLink = {
  title: string;
  href: string;
};

type DocsSubnavProps = {
  resourcesLinks: SubnavResourceLink[];
};

type SubnavItem = {
  title: string;
  href: string;
  icon: 'home' | 'download' | 'book' | 'grid' | 'info';
};

const baseSubnavLinks: SubnavItem[] = [
  { title: 'Overview', href: '/docs/home', icon: 'home' },
  { title: 'Installation', href: '/docs/installation', icon: 'download' },
  { title: 'Usage', href: '/docs/usage', icon: 'book' },
  { title: 'Components', href: '/docs/components/callouts-and-tips', icon: 'grid' },
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

function Icon({ name, size = 15 }: { name: SubnavItem['icon']; size?: number }) {
  const iconMap: Record<SubnavItem['icon'], LucideIcon> = {
    home: Home,
    download: Download,
    book: BookOpen,
    grid: LayoutGrid,
    info: Info,
  };

  const IconComponent = iconMap[name];
  return <IconComponent size={size} strokeWidth={1.8} aria-hidden="true" />;
}

export function DocsSubnav({ resourcesLinks }: DocsSubnavProps) {
  const pathname = usePathname() || '/docs/home';

  const referenceItems = resourcesLinks.slice(0, 2).map((resource) => ({
    title: resource.title,
    href: resource.href,
    icon: 'info' as const,
  }));

  const links = referenceItems.length > 0 ? [...baseSubnavLinks, ...referenceItems] : baseSubnavLinks;

  return (
    <div className="subnav">
      <div className="subnav-inner">
        <div className="subnav-label">Reusable Documentation Starter</div>

        <nav className="subnav-links" aria-label="Section navigation">
          {links.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={`${item.title}:${item.href}`}
                href={item.href}
                className="subnav-link"
                data-active={isActive}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="subnav-actions">
          <a
            className="action-button"
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
          >
            Deploy on Vercel
          </a>
        </div>
      </div>
    </div>
  );
}
