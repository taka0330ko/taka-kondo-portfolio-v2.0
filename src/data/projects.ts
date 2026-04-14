import type { ImageMetadata } from "astro";
import BillowThumbnail from "../assets/images/projects/billow/billow-thumbnail.jpg";
import XENOThumbnail from "../assets/images/projects/xeno/xeno-thumbnail.jpg";
import StoneAndHoneyThumbnail from "../assets/images/projects/stone-and-honey/stone-honey-thumbnail.jpg";
import TastebudsThumbnail from "../assets/images/projects/tastebuds/tastebuds-thumbnail.jpg";

type Project = {
  href: string;
  cover: ImageMetadata;
  title: string;
  description: string;
  tag: string;
};

export const projects: Project[] = [
    {
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    title: "Tastebuds - Food Blog Site",
    description:
      "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
      tag:"Web dev",
  },
  {
    href: "/billow",
    cover: BillowThumbnail,
    title: "Billow",
    description: "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
    tag:"Web dev",
  },
  {
    href: "/xeno",
    cover: XENOThumbnail,
    title: "XENO",
    description: "Fitness branding project.",
    tag:"Branding",
  },
  {
    href: "/stone-and-honey",
    cover: StoneAndHoneyThumbnail,
    title: "Stone & Honey",
    description: "Butter nuts project",
    tag:"Branding",
  },
]
