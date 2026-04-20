'use client';

import type { NavSection } from '@/lib/docs';
import { inferDocIconName, type DocIconName } from '@/lib/doc-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Blocks,
  ChevronRight,
  Download,
  FileText,
  Home,
  LayoutGrid,
  List,
  Map,
  Rocket,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type SidebarProps = {
  navigation: NavSection[];
  currentSlugPath: string;
};

type IconName = DocIconName | 'chevron';

const TABLET_MAX_WIDTH = 1020;

function toDocHref(slugPath: string): string {
  return `/docs/${slugPath}`;
}

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

function isExactPath(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}

function Icon({ name, size = 14 }: { name: IconName; size?: number }) {
  const iconMap: Record<IconName, LucideIcon> = {
    home: Home,
    rocket: Rocket,
    download: Download,
    sliders: SlidersHorizontal,
    grid: LayoutGrid,
    list: List,
    book: BookOpen,
    blocks: Blocks,
    map: Map,
    file: FileText,
    chevron: ChevronRight,
  };

  const IconComponent = iconMap[name];
  return <IconComponent size={size} strokeWidth={1.8} aria-hidden="true" />;
}

export function DocsSidebar({ navigation, currentSlugPath }: SidebarProps) {
  const pathname = usePathname();
  const currentPathname = pathname || toDocHref(currentSlugPath);
  const [isTabletSidebarOpen, setIsTabletSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const closeTabletSidebar = useCallback(() => {
    setIsTabletSidebarOpen(false);
  }, []);

  useEffect(() => {
    closeTabletSidebar();
  }, [pathname, closeTabletSidebar]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const tabletQuery = window.matchMedia(`(max-width: ${TABLET_MAX_WIDTH}px)`);

    const onSidebarToggle = () => {
      if (!tabletQuery.matches) {
        return;
      }

      setIsTabletSidebarOpen((open) => !open);
    };

    const onResize = () => {
      if (!tabletQuery.matches) {
        setIsTabletSidebarOpen(false);
      }
    };

    window.addEventListener('docs-sidebar-toggle', onSidebarToggle as EventListener);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('docs-sidebar-toggle', onSidebarToggle as EventListener);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setOpenSections((current) => {
      const next: Record<string, boolean> = {};

      for (const section of navigation) {
        const hasActivePage = section.pages.some((page) => {
          return isExactPath(currentPathname, toDocHref(page.slugPath));
        });

        const currentValue = current[section.section];
        next[section.section] = hasActivePage || (currentValue ?? true);
      }

      const currentKeys = Object.keys(current);
      const nextKeys = Object.keys(next);
      const hasSameKeys = currentKeys.length === nextKeys.length
        && nextKeys.every((key) => Object.hasOwn(current, key));

      if (hasSameKeys && nextKeys.every((key) => current[key] === next[key])) {
        return current;
      }

      return next;
    });
  }, [navigation, currentPathname]);

  const toggleSection = useCallback((sectionName: string) => {
    setOpenSections((current) => ({
      ...current,
      [sectionName]: !(current[sectionName] ?? true),
    }));
  }, []);

  const handleClickCapture = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as Element | null;

      if (!target) {
        return;
      }

      if (!target.closest('a[href]')) {
        return;
      }

      closeTabletSidebar();
    },
    [closeTabletSidebar]
  );

  const normalizedNavigation = useMemo(() => {
    return navigation.filter((section) => section.pages.length > 0);
  }, [navigation]);

  return (
    <>
      <button
        type="button"
        className="sidebar-tablet-backdrop"
        data-open={isTabletSidebarOpen}
        aria-label="Close sidebar"
        onClick={closeTabletSidebar}
      />

      <aside
        className="sidebar"
        data-tablet-open={isTabletSidebarOpen}
        onClickCapture={handleClickCapture}
      >
        <button
          type="button"
          className="sidebar-tablet-close"
          aria-label="Close sidebar"
          onClick={closeTabletSidebar}
        >
          <X size={16} strokeWidth={1.9} aria-hidden="true" />
        </button>

        <div className="sidebar-scroll-content">
          {normalizedNavigation.map((section, sectionIndex) => {
            const isSectionOpen = openSections[section.section] ?? true;
            const sectionItemsId = `sidebar-section-items-${sectionIndex}`;

            return (
              <div key={section.section} className="sidebar-section" data-open={isSectionOpen}>
                <button
                  type="button"
                  className="sidebar-title sidebar-section-toggle"
                  data-open={isSectionOpen}
                  aria-expanded={isSectionOpen}
                  aria-controls={sectionItemsId}
                  onClick={() => toggleSection(section.section)}
                >
                  <span className="sidebar-section-hover-bg" aria-hidden="true" />
                  <span className="sidebar-section-title-text">{section.section}</span>
                  <ChevronRight className="sidebar-section-caret" size={14} aria-hidden="true" />
                </button>

                <div id={sectionItemsId} className="sidebar-section-items" data-open={isSectionOpen}>
                  {section.pages.map((page) => {
                    const href = toDocHref(page.slugPath);
                    const isCurrent = isExactPath(currentPathname, href);
                    const icon = inferDocIconName(section.section, page.slugPath);

                    return (
                      <Link
                        key={page.slugPath}
                        href={href}
                        className="sidebar-link"
                        data-active={isCurrent}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {icon ? (
                          <span className="sidebar-item-icon" aria-hidden="true">
                            <Icon name={icon} size={14} />
                          </span>
                        ) : null}
                        <span>{page.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
