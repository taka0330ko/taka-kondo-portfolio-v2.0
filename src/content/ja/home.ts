import type { HomeContent } from "../home.types";

export const homeJa = {
  meta: {
    title: "近藤嵩成 | プロダクトデザイナー",
    description:
      "プロダクトデザイナー・近藤嵩成のポートフォリオ。グラフィック、モーション、Web・UI/UXデザインとフロントエンドの知識を組み合わせ、より良いユーザー体験を形にします。",
  },
  hero: {
    name: "こんどう　たかなり",
    role: "Product Design | Front End Development",
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
      title: "商品位置検索アプリ",
      description:
        "商品検索から売り場の確認までを、インタラクティブな店内マップでスムーズに行えるモバイルアプリを作成しました。",
      summaryList: [
        "企業デザインガイドの制約内でUIを設計し、再利用可能な独自のデザインシステムを整備",
        "Figma MCPとClaudeでSVGマップを実装可能なデータに整え、デザインと開発をつなぐワークフローを構築",
        "React Nativeでプロトタイプを開発し2種類のUIでユーザーテストを実行",
      ],
      tag: "UI/UX ケーススタディ",
    },
    ukg: {
      title: "もっと信頼できる給与確認画面へ",
      description:
        "アルバイト先で使っていた従業員向けの給与確認画面を、支給額の根拠がわかるように再設計しました。",
      summaryList: [
        "「給与額が合っているかわからない」という不安に着目し、支給額の根拠を確認できる画面へ再設計",
        "従業員へのインタビューから、比較テスト、UI設計、プロトタイプ制作を実施",
        "シフト記録・勤務時間の内訳・打刻の異常を可視化し、給与額に差異がある場合も、その原因を確認できる画面に改善",
      ],
      tag: "UI/UX ケーススタディ",
    },
    billow: {
      title: "Billow",
      description:
        "会話型UIとチャット体験の設計に重点を置いた、Next.js製のサブスク管理ダッシュボードです。",
      summaryList: [
        "既存のハッカソン作品を、拡張性の高い構成へ再設計・再開発",
        "APIロジック、状態管理、UIの責務を整理して保守性を改善",
        "AIツールを活用しながら、コード理解と設計を重視する開発プロセスを実践",
      ],
      tag: "Web開発",
    },
    tastebuds: {
      title: "Tastebuds - Food Blog",
      description:
        "フードブログサイトをVanilla JavaScriptのMVPからReact、Next.jsへ発展させた学習過程を記録しました",
      summaryList: [
        "Vanilla JavaScriptからReact／Next.jsへ移行し、モダンなフロントエンド設計を実践",
        "コンポーネント設計と動的ルーティングを導入し、重複コードを削減",
        "静的なコンテンツ管理からSupabaseを利用した拡張可能なデータ管理へ移行",
      ],
      tag: "Web開発",
    },
  },
} satisfies HomeContent;
