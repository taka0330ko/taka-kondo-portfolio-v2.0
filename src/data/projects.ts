import type { ImageMetadata } from "astro";
import BillowThumbnail from "../assets/images/projects/billow/billow-tumbnail.png";
import BillowVideo from "../assets/images/projects/billow/videos/billow-cover-video.mp4";
import XENOThumbnail from "../assets/images/projects/xeno/xeno-thumbnail.jpg";
import StoneAndHoneyThumbnail from "../assets/images/projects/stone-and-honey/stone-honey-thumbnail.jpg";
import TastebudsThumbnail from "../assets/images/projects/tastebuds/foodblog-tumbnail.png";
import TastebudsVideo from "../assets/images/projects/tastebuds/videos/foodblog-cover-video.mp4"
import UKGThumbnail from "../assets/images/projects/UKG/UKG-thumbnail.webp"
import UKGVideo from "../assets/images/projects/UKG/videos/main-thumbnail.mp4"

type Project = {
  href: string;
  coverVideo: string;
  cover: ImageMetadata;
  title: string;
  description: string;
  summaryList: string[];
  tag: string;
};

export const projects: Project[] = [
    {
    href:"/ukg",
    cover: UKGThumbnail,
    coverVideo:UKGVideo,
    title: "UKG Payroll Verification Redesign",
    description:
      "Researched and redesigned the payroll verification experience for UKG, based on real user interviews and feedback",
    summaryList:[
        "Redesigned a payroll experience that was difficult to verify, enabling users to confidently validate their payroll information", 
        "Conducted end-to-end UX work including user research, comparative testing, UI design, and prototyping",
        "Introduced shift records and worked-hour breakdowns, improving user trust scores from 3.2 → 6.0"
      ],
      tag:"UI/UX case study",
  },
  {
    href: "/billow",
    cover: BillowThumbnail,
    coverVideo: BillowVideo,
    title: "Billow",
    description: "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
        summaryList:[
          "Redesigned and rebuilt an existing hackathon project to create a more scalable architecture",
          "Improved maintainability by organizing API logic, state management, and UI responsibilities",
          "Practiced a development process that prioritized code understanding and architecture while leveraging AI tools"
      ],
    tag:"Web dev",
  },
    {
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    coverVideo: TastebudsVideo,
    title: "Tastebuds - Food Blog Site",
    description:
      "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
          summaryList:["Migrated from vanilla JavaScript to React / Next.js, learning and implementing modern frontend architecture",
            "Developed an understanding of component-based architecture and introduced dynamic routing to reduce repetitive code",
            "Transitioned from static content management to a scalable data management structure powered by Supabase"
      ],
      tag:"Web dev",
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