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
      title: "My Vision",
      body: "As a designer in this new era, I want to explore approaches beyond established conventions and improve the way we create as a team. Advances in AI are changing how we approach UI/UX and product design compared with when I first set out to enter this field. I see this change as an opportunity to expand what I can do as a designer. The journey from an idea in my head to something people can experience, respond to, and help me improve is becoming shorter.\n\nAs we gain more ways to create, it becomes even more important to consider what we should make and who we are making it for. By listening to users and observing their behavior, I want to understand what they need and how they feel, and keep exploring ways to improve their experience.\n\nI bring together graphic design, motion graphics, 3D modeling, and frontend knowledge to turn that understanding into experiences people can use.",
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
