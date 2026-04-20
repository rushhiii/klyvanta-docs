import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';

export type TocItem = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type DocPage = {
  slug: string[];
  slugPath: string;
  title: string;
  description: string;
  tags: string[];
  section: string;
  order: number;
  updated: string | null;
  bannerImage: string | null;
  bannerAlt: string | null;
  bannerCaption: string | null;
  bannerKicker: string | null;
  body: string;
  toc: TocItem[];
};

export type NavPage = Pick<DocPage, 'title' | 'description' | 'slug' | 'slugPath'>;

export type NavSection = {
  section: string;
  pages: NavPage[];
};

export type AdjacentDocs = {
  previous: { title: string; slugPath: string } | null;
  next: { title: string; slugPath: string } | null;
};

export type DocsSearchItem = {
  title: string;
  summary: string;
  tags: string[];
  headings: Array<{ depth: 2 | 3; title: string }>;
  href: string;
  section: string;
};

type Frontmatter = {
  title?: unknown;
  description?: unknown;
  tags?: unknown;
  section?: unknown;
  order?: number | string;
  updated?: unknown;
  toc?: boolean;
  bannerImage?: unknown;
  bannerAlt?: unknown;
  bannerCaption?: unknown;
  bannerKicker?: unknown;
  banner_image?: unknown;
  banner_alt?: unknown;
  banner_caption?: unknown;
  banner_kicker?: unknown;
};

const DOCS_ROOT = path.join(process.cwd(), 'content', 'docs');
const MARKDOWN_FILE_PATTERN = /\.(md|mdx)$/i;

async function readMarkdownFiles(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const results = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return readMarkdownFiles(absolutePath);
      }

      if (entry.isFile() && MARKDOWN_FILE_PATTERN.test(absolutePath)) {
        return [absolutePath];
      }

      return [];
    })
  );

  return results.flat();
}

function normalizeSlug(relativePath: string): string[] {
  const unixStyle = relativePath.replace(/\\/g, '/').replace(MARKDOWN_FILE_PATTERN, '');
  const parts = unixStyle.split('/').filter(Boolean);

  if (parts.at(-1) === 'index') {
    parts.pop();
  }

  return parts;
}

function toTitleCase(value: string): string {
  return value
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeTag(value: string): string | null {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ');

  return normalized || null;
}

function parseFrontmatterTags(value: unknown): string[] {
  if (!value) {
    return [];
  }

  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];

  if (rawValues.length === 0) {
    return [];
  }

  const tags = rawValues
    .map((entry) => normalizeTag(String(entry)))
    .filter((entry): entry is string => Boolean(entry));

  return Array.from(new Set(tags));
}

function pickFrontmatterString(...values: unknown[]): string | null {
  for (const value of values) {
    if (value === null || value === undefined) {
      continue;
    }

    const trimmed = String(value).trim();

    if (trimmed) {
      return trimmed;
    }
  }

  return null;
}

function formatUpdatedValue(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return pickFrontmatterString(value);
}

function normalizeBannerImage(value: string | null): string | null {
  if (!value) {
    return null;
  }

  if (/^(https?:\/\/|data:)/i.test(value)) {
    return value;
  }

  if (value.startsWith('/')) {
    return value;
  }

  return `/${value.replace(/^\.?\//, '')}`;
}

function stripMarkdownTokens(value: string): string {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim();
}

function parseTagAttributes(tagBody: string): Record<string, string> {
  const attributes: Record<string, string> = {};

  for (const match of tagBody.matchAll(/([A-Za-z][A-Za-z0-9_-]*)=(?:"([^"]*)"|'([^']*)')/g)) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? '';
    attributes[key] = value;
  }

  return attributes;
}

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]+>/g, ' ');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripLegacyLayoutTags(value: string): string {
  return value
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, levelRaw: string, headingRaw: string) => {
      const level = Math.min(6, Math.max(1, Number(levelRaw)));
      const hashes = '#'.repeat(level);
      const heading = compactWhitespace(stripHtmlTags(String(headingRaw)));

      if (!heading) {
        return '\n';
      }

      return `\n${hashes} ${heading}\n`;
    })
    .replace(/<\/?section\b[^>]*>/gi, '\n')
    .replace(/<\/?div\b[^>]*>/gi, '\n')
    .replace(/<p\b[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');
}

function normalizeLegacyIndentation(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .map((line) => {
      if (!line.trim()) {
        return '';
      }

      // Legacy MDX often includes JSX indentation that becomes a markdown code block after tags are stripped.
      return line.replace(/^[ \t]+/, '');
    })
    .join('\n');
}

function renderLegacyHero(attributesRaw: string): string {
  const attributes = parseTagAttributes(attributesRaw);
  const output: string[] = [];

  if (attributes.title) {
    output.push(`## ${attributes.title}`);
  }

  if (attributes.subtitle) {
    output.push(`**${attributes.subtitle}**`);
  }

  if (attributes.description) {
    output.push(attributes.description);
  }

  const links: string[] = [];
  if (attributes.primaryLabel && attributes.primaryHref) {
    links.push(`[${attributes.primaryLabel}](${attributes.primaryHref})`);
  }
  if (attributes.secondaryLabel && attributes.secondaryHref) {
    links.push(`[${attributes.secondaryLabel}](${attributes.secondaryHref})`);
  }

  if (links.length > 0) {
    output.push(links.join(' | '));
  }

  return output.join('\n\n').trim();
}

function renderLegacyCallout(attributesRaw: string, inner: string): string {
  const attributes = parseTagAttributes(attributesRaw);
  const allowedVariants = new Set(['note', 'warning', 'tip', 'updated', 'alert']);
  const variantCandidate = (attributes.variant || 'note').toLowerCase();
  const variant = allowedVariants.has(variantCandidate) ? variantCandidate : 'note';
  const title = compactWhitespace(attributes.title || 'Note');
  const contentLines = inner
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => compactWhitespace(stripHtmlTags(line)))
    .filter((line) => line.length > 0);

  const renderedLines = [
    `<div class="callout" data-variant="${variant}">`,
    `  <div class="callout-title">${escapeHtml(title)}</div>`,
  ];

  if (contentLines.length > 0) {
    renderedLines.push(...contentLines.map((line) => `  <p>${escapeHtml(line)}</p>`));
  }

  renderedLines.push('</div>');

  return renderedLines.join('\n');
}

function renderLegacyCards(cardBlock: string): string {
  const items: string[] = [];
  const cardPattern = /<Card([^>]*?)(?:\/>|>([\s\S]*?)<\/Card>)/g;

  for (const match of cardBlock.matchAll(cardPattern)) {
    const attributes = parseTagAttributes(match[1] ?? '');
    const title = attributes.title || 'Untitled';
    const href = attributes.href || '#';
    const meta = attributes.meta ? ` - ${attributes.meta}` : '';
    const innerContent = compactWhitespace(stripLegacyLayoutTags(match[2] ?? ''));
    const suffix = innerContent ? `: ${innerContent}` : '';

    items.push(`- [${title}](${href})${meta}${suffix}`);
  }

  return items.join('\n');
}

function normalizeLegacyMdx(content: string): string {
  let normalized = content;

  normalized = normalized.replace(/<Hero([\s\S]*?)\/>/g, (_, attributesRaw) => {
    return `\n${renderLegacyHero(String(attributesRaw))}\n`;
  });

  normalized = normalized.replace(/<Callout([^>]*)>([\s\S]*?)<\/Callout>/g, (_, attributesRaw, inner) => {
    return `\n${renderLegacyCallout(String(attributesRaw), String(inner))}\n`;
  });

  normalized = normalized.replace(/<CardGrid>([\s\S]*?)<\/CardGrid>/g, (_, cardBlock) => {
    return `\n${renderLegacyCards(String(cardBlock))}\n`;
  });

  normalized = normalizeLegacyIndentation(stripLegacyLayoutTags(normalized))
    .replace(/<\/?(Card|CardGrid|Callout|Hero)\b[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return normalized;
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function createHeadingIdGenerator() {
  const slugCounts = new Map<string, number>();

  return (text: string): string => {
    const baseId = slugifyHeading(text) || 'section';
    const seen = slugCounts.get(baseId) ?? 0;

    slugCounts.set(baseId, seen + 1);

    return seen === 0 ? baseId : `${baseId}-${seen}`;
  };
}

function extractToc(markdown: string): TocItem[] {
  const getHeadingId = createHeadingIdGenerator();

  return markdown
    .split('\n')
    .map((line) => line.trim())
    .map((line) => /^(##|###)\s+(.+)$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => {
      const text = stripMarkdownTokens(match[2] ?? '');
      return {
        depth: match[1] === '##' ? 2 : 3,
        text,
        id: getHeadingId(text),
      };
    });
}

function normalizeRequestedSlug(parts: string[]): string {
  return parts.filter(Boolean).map((part) => decodeURIComponent(part)).join('/');
}

const loadDocs = cache(async (): Promise<DocPage[]> => {
  let filePaths: string[] = [];

  try {
    filePaths = await readMarkdownFiles(DOCS_ROOT);
  } catch {
    return [];
  }

  const docs = await Promise.all(
    filePaths.map(async (absolutePath) => {
      const rawFile = await fs.readFile(absolutePath, 'utf8');
      const { data, content } = matter(rawFile);
      const frontmatter = data as Frontmatter;
      const normalizedBody = absolutePath.endsWith('.mdx')
        ? normalizeLegacyMdx(content)
        : content.trim();

      const relativePath = path.relative(DOCS_ROOT, absolutePath);
      const slug = normalizeSlug(relativePath);
      const safeSlug = slug.length > 0 ? slug : ['home'];

      const parsedOrder = Number(frontmatter.order);
      const order = Number.isFinite(parsedOrder) ? parsedOrder : 999;
      const title = pickFrontmatterString(frontmatter.title) || toTitleCase(safeSlug.at(-1) || 'Untitled');

      const bannerImage = normalizeBannerImage(
        pickFrontmatterString(frontmatter.bannerImage, frontmatter.banner_image)
      );
      const bannerAlt = pickFrontmatterString(frontmatter.bannerAlt, frontmatter.banner_alt);
      const bannerCaption = pickFrontmatterString(frontmatter.bannerCaption, frontmatter.banner_caption);
      const bannerKicker = pickFrontmatterString(frontmatter.bannerKicker, frontmatter.banner_kicker);

      return {
        slug: safeSlug,
        slugPath: safeSlug.join('/'),
        title,
        description: pickFrontmatterString(frontmatter.description) || '',
        tags: parseFrontmatterTags(frontmatter.tags),
        section: pickFrontmatterString(frontmatter.section) || 'General',
        order,
        updated: formatUpdatedValue(frontmatter.updated),
        bannerImage,
        bannerAlt,
        bannerCaption,
        bannerKicker,
        body: normalizedBody,
        toc: frontmatter.toc === false ? [] : extractToc(normalizedBody),
      } satisfies DocPage;
    })
  );

  docs.sort((a, b) => {
    if (a.section !== b.section) {
      return a.section.localeCompare(b.section);
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });

  return docs;
});

export async function getAllDocSlugs(): Promise<string[][]> {
  const docs = await loadDocs();
  return docs.map((doc) => doc.slug);
}

export async function getFirstDoc(): Promise<DocPage | null> {
  const docs = await loadDocs();
  const homeDoc = docs.find((doc) => doc.slugPath === 'home');

  if (homeDoc) {
    return homeDoc;
  }

  const gettingStartedDoc = docs.find((doc) => doc.slugPath === 'getting-started');

  if (gettingStartedDoc) {
    return gettingStartedDoc;
  }

  return docs[0] || null;
}

export async function getDocBySlug(slugParts: string[]): Promise<DocPage | null> {
  const docs = await loadDocs();
  const slugPath = normalizeRequestedSlug(slugParts);

  return docs.find((doc) => doc.slugPath === slugPath) || null;
}

export async function getDocsNavigation(): Promise<NavSection[]> {
  const docs = await loadDocs();
  const sectionMap = new Map<string, NavSection>();

  const sectionRank: Record<string, number> = {
    overview: 0,
    'getting started': 1,
    guides: 2,
    components: 3,
    reference: 4,
  };

  const getSectionRank = (value: string) => sectionRank[value.toLowerCase()] ?? 99;

  for (const doc of docs) {
    const section = sectionMap.get(doc.section) || { section: doc.section, pages: [] };
    section.pages.push({
      title: doc.title,
      description: doc.description,
      slug: doc.slug,
      slugPath: doc.slugPath,
    });
    sectionMap.set(doc.section, section);
  }

  const sections = Array.from(sectionMap.values());

  sections.sort((a, b) => {
    const rankDiff = getSectionRank(a.section) - getSectionRank(b.section);

    if (rankDiff !== 0) {
      return rankDiff;
    }

    return a.section.localeCompare(b.section);
  });

  return sections;
}

export async function getPrevNextDoc(slugParts: string[]): Promise<AdjacentDocs> {
  const docs = await loadDocs();
  const slugPath = normalizeRequestedSlug(slugParts);
  const currentIndex = docs.findIndex((doc) => doc.slugPath === slugPath);

  if (currentIndex < 0) {
    return { previous: null, next: null };
  }

  const previousDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  return {
    previous: previousDoc
      ? {
          title: previousDoc.title,
          slugPath: previousDoc.slugPath,
        }
      : null,
    next: nextDoc
      ? {
          title: nextDoc.title,
          slugPath: nextDoc.slugPath,
        }
      : null,
  };
}

export async function getDocsSearchIndex(): Promise<DocsSearchItem[]> {
  const docs = await loadDocs();

  return docs.map((doc) => {
    const href = `/docs/${doc.slugPath}`;
    const headings = doc.toc.map((heading) => ({ depth: heading.depth, title: heading.text }));
    const summary = doc.description || (headings[0]?.title ?? '');

    return {
      title: doc.title,
      summary,
      tags: doc.tags,
      headings,
      href,
      section: doc.section,
    };
  });
}
