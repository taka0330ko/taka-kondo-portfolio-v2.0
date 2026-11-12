import type { ImageMetadata } from "astro";
import CitizenCover from "../assets/images/archive/works/citizen/citizen-cover.jpg";
import EnevoCover from "../assets/images/archive/works/enevo/enevo-cover.png";
import GreenSabonCover from "../assets/images/archive/works/green-sbon/green-sabon-cover.png";
import MeltCover from "../assets/images/archive/works/melt/melt-cover.png";
import NebutaCover from "../assets/images/archive/works/nebuta/nebuta-cover.png";
import NutralisCover from "../assets/images/archive/works/nutralis/nutralis-cover.png";
import PsCollageCover from "../assets/images/archive/works/ps-collage/ps-collage.png";
import StoneHoneyCover from "../assets/images/archive/works/stone-honey/stone-honey-cover.png";
import UntitleCover from "../assets/images/archive/works/untitle/untitle-cover.png";
import XenoCover from "../assets/images/archive/works/xeno/xeno-cover.png";


type ArchiveItem = {
    id: number,
    href: string,
    cover: ImageMetadata,
    coverType?: "image" | "green-blob",
    coverVideo: string,
    modalVideo?: string,
    modalImage?: boolean,
    modalPdf?: string,
    modalProject?: "stone-and-honey" | "xeno",
    title: string,
    placeholder: boolean,
    height: number
}


export const archive: ArchiveItem[] = [
    {
        id: 1,
        href: "/stone-and-honey",
        cover: StoneHoneyCover,
        modalProject: "stone-and-honey",
        coverVideo: "",
        title: "Stone & Honey — School Project",
        placeholder: false,
        height: 480
    },
    {
        id: 2,
        href: "https://green-sabon.vercel.app/",
        cover: GreenSabonCover,
        coverType: "green-blob",
        modalVideo: "/videos/archive/green-sabon-demo-v2.mp4",
        coverVideo: "",
        title: "Green Sabon — School Project",
        placeholder: false,
        height: 320
    },
    {
        id: 10,
        href: "",
        cover: CitizenCover,
        modalVideo: "/videos/archive/citizen-full.mp4",
        coverVideo: "/videos/archive/citizen-logo-intro.mp4",
        title: "Citizen — Motion Graphics (Internship)",
        placeholder: false,
        height: 280
    },
    {
        id: 3,
        href: "",
        cover: MeltCover,
        modalPdf: "/documents/archive/melt-brand-sprint.pdf",
        coverVideo: "",
        title: "Melt. — School Project",
        placeholder: false,
        height: 220
    },
    {
        id: 5,
        href: "/xeno",
        cover: XenoCover,
        modalProject: "xeno",
        coverVideo: "",
        title: "XENO — School Project",
        placeholder: false,
        height: 330
    },
    {
        id: 6,
        href: "",
        cover: PsCollageCover,
        modalImage: true,
        coverVideo: "",
        title: "Photoshop Collage — School Project",
        placeholder: false,
        height: 480
    },
    {
        id: 7,
        href: "",
        cover: EnevoCover,
        coverVideo: "",
        title: "ENEVO — School Project",
        placeholder: false,
        height: 480
    },
    {
        id: 8,
        href: "",
        cover: NebutaCover,
        coverVideo: "",
        title: "Nebuta Festival — School Project",
        placeholder: false,
        height: 480
    },
    {
        id: 9,
        href: "",
        cover: NutralisCover,
        coverVideo: "",
        title: "Nutralis — School Project",
        placeholder: false,
        height: 480
    },
    {
        id: 4,
        href: "",
        cover: UntitleCover,
        coverVideo: "",
        title: "Untitled — School Project",
        placeholder: false,
        height: 280
    },

]
