import type { BlogContent } from "../blog.types";

export const blogJa = {
  meta: {
    title: "ブログ | 近藤嵩成",
    description: "近藤嵩成によるデザインと開発の記録。制作プロセスやツール、学びについて綴っています。",
  },
  hero: {
    title: "Blog",
    introLines: ["デザインと開発", "制作の記録"],
    imageAlt: "ブログを象徴するイラストオブジェクト",
  },
  list: { emptyLabel: "まだ投稿はありません。近日公開予定です。", backLabel: "ブログ一覧に戻る" },
} satisfies BlogContent;
