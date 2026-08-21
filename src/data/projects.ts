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
import { homeEn } from "../content/en/home";

type Project = {
  slug: keyof typeof homeEn.projects;
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
    slug: "store-map",
    ...homeEn.projects["store-map"],
    href: "/store-map",
    cover: StoreMapNavigationThumbnail,
    coverVideo: StoreMapNavigationVideo,
    isReady: true,
  },
  {
    slug: "ukg",
    ...homeEn.projects.ukg,
    href: "/ukg",
    cover: UKGThumbnail,
    coverVideo: UKGVideo,
    coverVideoFallback: UKGVideoMp4,
    isReady: true,
  },
  {
    slug: "billow",
    ...homeEn.projects.billow,
    href: "/billow",
    cover: BillowThumbnail,
    coverVideo: BillowVideo,
    coverVideoFallback: BillowVideoMp4,
    isReady: true,

  },
  {
    slug: "tastebuds",
    ...homeEn.projects.tastebuds,
    href: "/tastebuds",
    cover: TastebudsThumbnail,
    coverVideo: TastebudsVideo,
    coverVideoFallback: TastebudsVideoMp4,
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
