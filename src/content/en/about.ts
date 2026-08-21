import type { AboutContent } from "../about.types";

export const aboutEn = {
  meta: {
    title: "About Taka | Takanari Kondo",
    description:
      "Learn about Takanari Kondo, a UI/UX designer and frontend developer who turns ideas into interactive prototypes and tested digital experiences.",
  },
  hero: {
    titlePrefix: "About",
    titleName: "Taka",
    introLines: ["Born in Japan.", "Professional workaholic."],
  },
  sections: {
    whatIDo: {
      title: "What I do",
      body: "I don't stop at Figma. I use code to turn my ideas into interactive prototypes, test them with real users, and improve the experience based on what I learn.",
    },
    coreValue: {
      title: "My core value",
      body: "Whether in design, development, or anything else I do, I value understanding the fundamentals and systems first, building strong foundations before moving forward.",
    },
    education: {
      title: "Education",
      program: "New Media Design and Web Development at BCIT.",
      period: "2025 - present",
    },
  },
  more: {
    title: "More about Taka",
    portraitAlt: "Taka wearing a plush octopus hat",
  },
  contact: {
    copiedLabel: "Copied!",
    emailAriaLabel: "Send email",
  },
} satisfies AboutContent;
