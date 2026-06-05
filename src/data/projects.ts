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
  tag: string;
};

export const projects: Project[] = [
    {
    href:"/ukg",
    cover: UKGThumbnail,
    coverVideo:UKGVideo,
    title: "UKG App - Payment Page Redesign",
    description:
      "A project where I researched and redesigned the UX of the payroll app UKG, which is actively used at my workplace, based on interviews and feedback from coworkers.",
      tag:"UI/UX",
  },
    {
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    coverVideo: TastebudsVideo,
    title: "Tastebuds - Food Blog Site",
    description:
      "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
      tag:"Web dev",
  },
  {
    href: "/billow",
    cover: BillowThumbnail,
    coverVideo: BillowVideo,
    title: "Billow",
    description: "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
    tag:"Web dev",
  },
  {
    href: "/xeno",
    cover: XENOThumbnail,
    coverVideo: "",
    title: "XENO",
    description: "Fitness branding project.",
    tag:"Branding",
  },
  {
    href: "/stone-and-honey",
    cover: StoneAndHoneyThumbnail,
    coverVideo: "",
    title: "Stone & Honey",
    description: "Butter nuts project",
    tag:"Branding",
  },
]
