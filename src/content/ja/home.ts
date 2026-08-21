import type { HomeContent } from "../home.types";

export const homeJa = {
  meta: {
    title: "近藤嵩成 | UI/UXデザイナー・フロントエンド開発者",
    description:
      "UI/UXデザインとフロントエンド開発に取り組む近藤嵩成のポートフォリオです。",
  },
  hero: {
    name: "こんどう　たかなり",
    role: "UI/UX Design | Front End Development",
    emailAriaLabel: "メールを送る",
    projectsLabel: "プロジェクトを見る",
    projectsAriaLabel: "プロジェクトを見る",
  },
  projectCard: {
    readMore: "続きを読む",
    comingSoon: "近日公開 ...",
  },
  contact: {
    emailAriaLabel: "メールを送る",
    copiedLabel: "コピーしました！",
  },
  projects: {
    "store-map": {
      title: "Walmart 店内マップナビゲーション",
      description:
        "商品検索と店内移動をインタラクティブな屋内マップで支援する、モバイルアプリのコンセプトです。",
      summaryList: [
        "エンタープライズ向けデザインシステムの制約内でUIを設計し、再利用可能なデザイントークンを整備",
        "Figma MCPとClaudeを活用し、SVGマップの命名とID生成を自動化するデザイン・開発フローを構築",
        "ナビゲーションと商品検索体験を検証するReact Nativeプロトタイプを開発",
      ],
      tag: "Product Design",
    },
    ukg: {
      title: "UKG 給与確認画面のリデザイン",
      description:
        "実際のユーザーインタビューとフィードバックをもとに、UKGの給与確認体験を調査・再設計しました。",
      summaryList: [
        "確認しづらかった給与情報を、ユーザーが自信を持って検証できる体験へ再設計",
        "ユーザー調査、比較テスト、UIデザイン、プロトタイピングまで一貫して実施",
        "シフト記録と勤務時間の内訳を導入し、信頼度スコアを3.2から6.0へ改善",
      ],
      tag: "UI/UX Case Study",
    },
    billow: {
      title: "Billow",
      description:
        "会話型UIとチャット体験の設計に重点を置いた、Next.js製のAIチャットダッシュボードです。",
      summaryList: [
        "既存のハッカソン作品を、拡張性の高い構成へ再設計・再開発",
        "APIロジック、状態管理、UIの責務を整理して保守性を改善",
        "AIツールを活用しながら、コード理解と設計を重視する開発プロセスを実践",
      ],
      tag: "Web Development",
    },
    tastebuds: {
      title: "Tastebuds - Food Blog",
      description:
        "Vanilla JavaScriptのMVPからReact、Next.jsへ発展させた学習過程を記録するフードブログです。",
      summaryList: [
        "Vanilla JavaScriptからReact／Next.jsへ移行し、モダンなフロントエンド設計を実践",
        "コンポーネント設計と動的ルーティングを導入し、重複コードを削減",
        "静的なコンテンツ管理からSupabaseを利用した拡張可能なデータ管理へ移行",
      ],
      tag: "Web Development",
    },
  },
} satisfies HomeContent;
