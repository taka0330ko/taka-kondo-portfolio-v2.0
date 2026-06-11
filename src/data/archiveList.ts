import type { ImageMetadata } from "astro";
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
    title: string,
    placeholder: boolean,
    height: number
}


export const archive: ArchiveItem[] = [
    {
        id: 1,
        href: "/stone-and-honey",
        cover: StoneHoneyCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 480
    },
    {
        id: 2,
        href: "https://green-sabon.vercel.app/",
        cover: GreenSabonCover,
        coverType: "green-blob",
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 320
    },
    {
        id: 3,
        href: "",
        cover: MeltCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 220
    },
    {
        id: 4,
        href: "",
        cover: UntitleCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 280
    },
    {
        id: 5,
        href: "/xeno",
        cover: XenoCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 330
    },
    {
        id: 6,
        href: "",
        cover: PsCollageCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 480
    },
    {
        id: 7,
        href: "",
        cover: EnevoCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 480
    },
    {
        id: 8,
        href: "",
        cover: NebutaCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 480
    },
    {
        id: 9,
        href: "",
        cover: NutralisCover,
        coverVideo: "",
        title: "",
        placeholder: false,
        height: 480
    },


]
