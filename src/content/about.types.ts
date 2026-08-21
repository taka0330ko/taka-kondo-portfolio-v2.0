export type AboutContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    titlePrefix: string;
    titleName: string;
    introLines: string[];
  };
  sections: {
    whatIDo: {
      title: string;
      body: string;
    };
    coreValue: {
      title: string;
      body: string;
    };
    education: {
      title: string;
      program: string;
      period: string;
    };
  };
  more: {
    title: string;
    portraitAlt: string;
  };
  contact: {
    copiedLabel: string;
    emailAriaLabel: string;
  };
};
