import type { ImageMetadata } from "astro";
import BillowThumbnail from "../assets/images/projects/billow/billow-tumbnail.png";
import BillowVideo from "../assets/images/projects/billow/videos/billow-cover-video.webm";
import BillowVideoMp4 from "../assets/images/projects/billow/videos/billow-cover-video.mp4";
import XENOThumbnail from "../assets/images/projects/xeno/xeno-thumbnail.jpg";
import StoneAndHoneyThumbnail from "../assets/images/projects/stone-and-honey/stone-honey-thumbnail.jpg";
import TastebudsThumbnail from "../assets/images/projects/tastebuds/foodblog-tumbnail.png";
import TastebudsVideo from "../assets/images/projects/tastebuds/videos/foodblog-cover-video.webm";
import TastebudsVideoMp4 from "../assets/images/projects/tastebuds/videos/foodblog-cover-video.mp4";
import StoreMapNavigationThumbnail from "../assets/images/projects/store-navigation/store-map-thumbnail.webp";
import StoreMapNavigationVideo from "../assets/images/projects/store-navigation/videos/store-map-thumbnail.webm"
import UKGThumbnail from "../assets/images/projects/UKG/UKG-thumbnail.webp";
import UKGVideo from "../assets/images/projects/UKG/videos/main-thumbnail.webm";
import UKGVideoMp4 from "../assets/images/projects/UKG/videos/main-thumbnail.mp4";

type Project = {
  href: string;
  coverVideo: string | undefined;
  coverVideoFallback?: string;
  cover: ImageMetadata;
  title: string;
  description: string;
  summaryList: string[];
  tag: string;
  isReady: boolean;
};

export const projects: Project[] = [
  {
    href: "/store-map",
    cover: StoreMapNavigationThumbnail,
    coverVideo: StoreMapNavigationVideo,
    title: "Walmart Grocery Store Map Navigation",
    description:
      "Mobile app concept that helps shoppers locate products and navigate grocery stores through an interactive indoor map.",
    summaryList: [
      "Designed the interface within a strict enterprise design system and established reusable design tokens",
      "Built a scalable design-to-code workflow using Figma MCP and Claude to automate SVG map naming and ID generation",
      "Developed an interactive React Native prototype to validate navigation and product discovery flows"
    ],
    tag: "Product Design",
    isReady: true,
  },
  {
    href: "/ukg",
    cover: UKGThumbnail,
    coverVideo: UKGVideo,
    coverVideoFallback: UKGVideoMp4,
    title: "UKG Payroll Verification Redesign",
    description:
      "Researched and redesigned the payroll verification experience for UKG, based on real user interviews and feedback",
    summaryList: [
      "Redesigned a payroll experience that was difficult to verify, enabling users to confidently validate their payroll information",
      "Conducted end-to-end UX work including user research, comparative testing, UI design, and prototyping",
      "Introduced shift records and worked-hour breakdowns, improving user trust scores from 3.2 → 6.0"
    ],
    tag: "UI/UX case study",
    isReady: true,
  },
  {
    href: "/billow",
    cover: BillowThumbnail,
    coverVideo: BillowVideo,
    coverVideoFallback: BillowVideoMp4,
    title: "Billow",
    description: "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
    summaryList: [
      "Redesigned and rebuilt an existing hackathon project to create a more scalable architecture",
      "Improved maintainability by organizing API logic, state management, and UI responsibilities",
      "Practiced a development process that prioritized code understanding and architecture while leveraging AI tools"
    ],
    tag: "Web dev",
    isReady: true,

  },
  {
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    coverVideo: TastebudsVideo,
    coverVideoFallback: TastebudsVideoMp4,
    title: "Tastebuds - Food Blog Site",
    description:
      "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
    summaryList: ["Migrated from vanilla JavaScript to React / Next.js, learning and implementing modern frontend architecture",
      "Developed an understanding of component-based architecture and introduced dynamic routing to reduce repetitive code",
      "Transitioned from static content management to a scalable data management structure powered by Supabase"
    ],
    tag: "Web dev",
    isReady: true,

  },
  

  // {
  //   href: "/xeno",
  //   cover: XENOThumbnail,
  //   coverVideo: "",
  //   title: "XENO",
  //   description: "Fitness branding project.",
  //       summaryList:[

  //     ],
  //   tag:"Branding",
  // },
  // {
  //   href: "/stone-and-honey",
  //   cover: StoneAndHoneyThumbnail,
  //   coverVideo: "",
  //   title: "Stone & Honey",
  //   description: "Butter nuts project",
  //       summaryList:[
  //     ],
  //   tag:"Branding",
  // },
]
