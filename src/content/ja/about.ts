import type { AboutContent } from "../about.types";

export const aboutJa = {
  meta: {
    title: "Takaについて | 近藤嵩成",
    description:
      "UI/UXデザインとフロントエンド開発を通じて、アイデアを触れて試せる体験へと形にする近藤嵩成について紹介します。",
  },
  hero: {
    titlePrefix: "",
    titleName: "近藤　嵩成",
    introLines: ["愛知出身。", "ものづくりがすきです。"],
  },
  sections: {
    whatIDo: {
      title: "My Vision",
      body: "新しい時代のデザイナーとして、これまでの常識にとらわれない方法を模索しながら、チームでのものづくりをより良くしていきたいと考えています。AIの進化によって、UI/UXやプロダクトデザインの考え方は、私がこの業界を目指し始めた頃から変わりつつあります。私はこの変化を、デザイナーとしての可能性を広げるチャンスだと捉えています。頭の中にあったアイデアを形にし、ユーザーに実際に体験してもらい、その反応から改善するまでの距離が短くなったからです。\n\n作れるものが増えるほど、誰のために、何を作るかを考えることが大切になります。ユーザーの声に耳を傾け、実際の行動にも目を向けながら、何を必要とし、どう感じているのかを理解し、より良い体験を探り続けたいと考えています。\n\nグラフィック、モーショングラフィック、3Dモデリング、フロントエンドの知識を組み合わせ、その理解を具体的な体験へとつなげていきます。", 
    },
    experience: {
      title: "職歴",
      additional: { company: "VKDS Inc.", role: "Design Assistant", period: "2026年9月 – 現在" },
      company: "Burst Creative Group",
      role: "Product Designer",
      type: "インターンシップ",
      period: "2026年9月 – 現在",
    },
    education: {
      title: "学歴",
      program: "New Media Design and Web Development",
      school: "British Columbia Institute of Technology",
      period: "2025 - 在学中",
    },
  },
  more: {
    title: "プライベートの時間はアートと料理",
    portraitAlt: "タコのぬいぐるみ帽子をかぶったTaka",
  },
  contact: {
    copiedLabel: "コピーしました！",
    emailAriaLabel: "メールを送る",
  },
} satisfies AboutContent;
