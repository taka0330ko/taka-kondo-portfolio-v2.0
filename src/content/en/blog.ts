import type { BlogContent } from "../blog.types";

export const blogEn = {
  meta: {
    title: "Blog | Takanari Kondo",
    description:
      "Notes on design and development from Takanari Kondo, covering process, tools, and lessons learned along the way.",
  },
  hero: {
    title: "Blog",
    introLines: ["Notes on design,", "code, and process."],
    imageAlt: "An illustrated object representing the blog",
  },
  list: { emptyLabel: "No posts yet — check back soon.", backLabel: "Back to Blog" },
} satisfies BlogContent;
