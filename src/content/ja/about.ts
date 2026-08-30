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
      title: "私のつよみ",
      body: "私の強みは、デザインの段階から実装まで見据えて考えられることです。Figma上のデザインにとどまらず、アイデアをコードでインタラクティブなプロトタイプへ落とし込み、実際のユーザーと検証しながら、フィードバックをもとに体験、改善します。", 
    },
    coreValue: {
      title: "大切にしていること",
      body: "デザインや開発に限らず、まず基礎と仕組みを徹底的に理解することを大切にしています。 確かな土台をつくり、その上に一つずつ積み重ねながら前へ進みます。",
    },
    education: {
      title: "学歴",
      program: "カナダ ・ ブリティッシュコロンビア工科大学",
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
