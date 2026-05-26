export const postsDataCode: string = `
:root {
  /* Primitive */
  --color-teal-500: #00bba8;

  /* Semantic */
  --color-surface-brand: var(--color-teal-900);

  /* Component */
  --work-cell-bg: var(--color-surface-brand);
}

@layer components {
  .work-cell {
    background: var(--work-cell-bg);
    color: var(--work-cell-text);
  }
}
`;