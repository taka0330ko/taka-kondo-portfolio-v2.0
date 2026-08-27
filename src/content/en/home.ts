import type { HomeContent } from "../home.types";

export const homeEn = {
  meta: {
    title: "Takanari Kondo | UI/UX Designer building with code",
    description:
      "Portfolio of Takanari Kondo, a frontend developer and UI/UX designer focused on building fast, accessible, and visually refined web experiences.",
  },
  hero: {
    name: "Taka",
    role: "UI/UX Design | Front End Development",
    emailAriaLabel: "Send email",
    projectsLabel: "Go to Projects",
    projectsAriaLabel: "Go to Projects",
  },
  projectCard: {
    readMore: "Click To Read More",
    comingSoon: "Coming Soon ...",
  },
  contact: {
    emailAriaLabel: "Send email",
    copiedLabel: "Copied!",
  },
  projects: {
    "store-map": {
      title: "Walmart Grocery Store Map Navigation",
      description:
        "Mobile app concept that helps shoppers locate products and navigate grocery stores through an interactive indoor map.",
      summaryList: [
        "Designed the interface within a strict enterprise design system and established reusable design tokens",
        "Built a scalable design-to-code workflow using Figma MCP and Claude to automate SVG map naming and ID generation",
        "Developed an interactive React Native prototype to validate navigation and product discovery flows",
      ],
      tag: "UI/UX case study",
    },
    ukg: {
      title: "UKG Payroll Verification Redesign",
      description:
        "Researched and redesigned the payroll verification experience for UKG, based on real user interviews and feedback",
      summaryList: [
        "Redesigned a payroll experience that was difficult to verify, enabling users to confidently validate their payroll information",
        "Conducted end-to-end UX work including user research, comparative testing, UI design, and prototyping",
        "Introduced shift records and worked-hour breakdowns, improving user trust scores from 3.2 → 6.0",
      ],
      tag: "UI/UX case study",
    },
    billow: {
      title: "Billow",
      description:
        "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
      summaryList: [
        "Redesigned and rebuilt an existing hackathon project to create a more scalable architecture",
        "Improved maintainability by organizing API logic, state management, and UI responsibilities",
        "Practiced a development process that prioritized code understanding and architecture while leveraging AI tools",
      ],
      tag: "Web dev",
    },
    tastebuds: {
      title: "Tastebuds - Food Blog Site",
      description:
        "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
      summaryList: [
        "Migrated from vanilla JavaScript to React / Next.js, learning and implementing modern frontend architecture",
        "Developed an understanding of component-based architecture and introduced dynamic routing to reduce repetitive code",
        "Transitioned from static content management to a scalable data management structure powered by Supabase",
      ],
      tag: "Web dev",
    },
  },
} satisfies HomeContent;
