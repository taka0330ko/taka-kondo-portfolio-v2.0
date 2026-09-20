export type BlogContent = {
  meta: { title: string; description: string };
  hero: { title: string; introLines: string[]; imageAlt: string };
  list: { emptyLabel: string; backLabel: string };
};
