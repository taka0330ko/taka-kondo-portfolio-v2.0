import type { ImageMetadata } from "astro";
import BillowThumbnail from "../assets/images/projects/billow/billow-thumbnail.jpg";
import NexfitThumbnail from "../assets/images/projects/nexfit/nexfit-thumbnail.jpg";
import StoneAndHoneyThumbnail from "../assets/images/projects/stone-and-honey/stone-honey-thumbnail.jpg";
import TastebudsThumbnail from "../assets/images/projects/tastebuds/tastebuds-thumbnail.jpg";

type Project = {
  href: string;
  cover: ImageMetadata;
  title: string;
  description: string;
  tag: string;
  gridClass: string;
};

export const projects: Project[] = [
    {
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    title: "Tastebuds - Food Blog Site",
    description:
      "Food blog project documenting my JavaScript journey from a Vanilla JS MVP to React and Next.js.",
      tag:"Web dev",
    gridClass: "col-start-1 col-end-7 row-start-1 row-end-2",
  },
  {
    href: "/billow",
    cover: BillowThumbnail,
    title: "Billow ",
    description: "AI chat–based dashboard built with Next.js, focusing on conversational UI and chat interaction design.",
    tag:"Web dev",
    gridClass: "col-start-7 col-end-13 row-start-1 row-end-2",
  },
  {
    href: "/nexfit",
    cover: NexfitThumbnail,
    title: "Nexfit",
    description: "Fitness branding project.",
    tag:"UI/UX",
    gridClass: "col-start-1 col-end-7 row-start-2 row-end-3",
  },
  {
    href: "/stone-and-honey",
    cover: StoneAndHoneyThumbnail,
    title: "Stone & Honey",
    description: "Butter nuts project",
    tag:"UI/UX",
    gridClass: "col-start-7 col-end-13 row-start-2 row-end-3",
  },
]
