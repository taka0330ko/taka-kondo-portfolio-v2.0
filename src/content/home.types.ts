export type HeroContent = {
  name: string;
  role: string;
  emailAriaLabel: string;
  projectsLabel: string;
  projectsAriaLabel: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
  summaryList: string[];
  tag: string;
};

export type HomeContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  projectCard: {
    readMore: string;
    comingSoon: string;
  };
  contact: {
    emailAriaLabel: string;
    copiedLabel: string;
  };
  projects: Record<string, ProjectCopy>;
};
