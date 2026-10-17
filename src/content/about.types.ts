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
    coreValue?: {
      title: string;
      body: string;
    };
    experience: {
      title: string;
      additional: { company: string; role: string; period: string };
      company: string;
      role: string;
      type: string;
      period: string;
    };
    education: {
      title: string;
      program: string;
      school: string;
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
