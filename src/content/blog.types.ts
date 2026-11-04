export type BlogContent = {
  meta: { title: string; description: string };
  hero: { title: string; introLines: string[]; imageAlt: string };
  contact: { copiedLabel: string; emailAriaLabel: string };
  list: { emptyLabel: string; backLabel: string };
};
