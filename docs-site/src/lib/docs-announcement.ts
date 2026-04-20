export type DocsAnnouncementConfig = {
  id: string;
  enabled: boolean;
  message: string;
  linkLabel?: string;
  linkHref?: string;
};

export const docsAnnouncement: DocsAnnouncementConfig = {
  id: 'docs-launchpad-welcome',
  enabled: false,
  message: 'Welcome to Docs Launchpad. Replace this message from src/lib/docs-announcement.ts.',
  linkLabel: 'Announcement config',
  linkHref: 'https://github.com/your-org/your-repo',
};
