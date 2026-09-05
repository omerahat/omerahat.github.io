# XPRS Research Poster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the supplied XPRS research poster as a responsive full-width preview in the featured project card, with a native full-resolution link.

**Architecture:** Keep project presentation data-driven by adding optional `poster` and `posterAlt` fields to the Astro content schema. Move the PNG into `public/`, then let `ProjectCard.astro` render a semantic linked figure only for projects that provide those fields; no client-side viewer or new dependency is needed.

**Tech Stack:** Astro 7, Astro content collections, TypeScript, CSS, Playwright, axe-core.

## Global Constraints

- Serve the supplied image from `public/XPRS_poster.png` at `/XPRS_poster.png`.
- Keep `poster` and `posterAlt` optional and set them only on the XPRS project.
- Render the poster in a semantic `figure` at full featured-card content width with its natural portrait aspect ratio.
- Open the original PNG in a new tab with `rel="noopener noreferrer"`.
- Do not add a modal, client-side state, dependency, project route, download control, or artwork/compression change.
- Preserve keyboard focus styles, mobile no-overflow behavior, and the existing accessibility checks.

---

## File Map

- `tests/homepage.spec.ts`: Defines the browser-level contract for the XPRS poster image and full-size link.
- `src/content.config.ts`: Validates optional poster metadata for project entries.
- `src/content/projects/xprs.md`: Supplies the XPRS poster URL and descriptive alt text.
- `src/components/ProjectCard.astro`: Conditionally renders and styles the linked poster figure.
- `public/XPRS_poster.png`: Serves the supplied 3175 x 4490 PNG as a static asset.

### Task 1: Define The Poster Test Contract

**Files:**
- Modify: `tests/homepage.spec.ts:80-82` and add the focused XPRS poster test after the featured-project test.

**Interfaces:**
- Consumes: The existing `#work` project card structure and Playwright role locators.
- Produces: Stable expected selectors and attributes for the implementation: image alt text, poster URL, link accessible name, new-tab target, and security relation.

- [ ] **Step 1: Write the failing browser test**

Remove the old assertion that expects the XPRS card to contain zero links, then add this focused test:

```ts
test('XPRS project exposes its research poster', async ({ page }) => {
  await page.goto('/');

  const xprsCard = page.locator('#work').getByRole('article').filter({ hasText: 'XPRS' });
  const posterAlt = 'XPRS explainable product recommendation system research poster';
  const poster = xprsCard.getByRole('img', { name: posterAlt, exact: true });
  const posterLink = xprsCard.getByRole('link', {
    name: 'Open XPRS research poster at full size',
    exact: true,
  });

  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute('src', '/XPRS_poster.png');
  await expect(posterLink).toHaveAttribute('href', '/XPRS_poster.png');
  await expect(posterLink).toHaveAttribute('target', '_blank');
  await expect(posterLink).toHaveAttribute('rel', 'noopener noreferrer');
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npx playwright test tests/homepage.spec.ts -g "XPRS project exposes its research poster"
```

Expected: FAIL because the current XPRS card has no poster image or poster link.

- [ ] **Step 3: Commit the test contract**

Run:

```bash
git add tests/homepage.spec.ts
git commit -m "test: cover XPRS research poster"
```

### Task 2: Implement And Verify The Poster Integration

**Files:**
- Move: `XPRS_poster.png` to `public/XPRS_poster.png`.
- Modify: `src/content.config.ts:5-16`.
- Modify: `src/content/projects/xprs.md:6-13`.
- Modify: `src/components/ProjectCard.astro` after the project details block and in its scoped styles.

**Interfaces:**
- Consumes: The poster URL, alt text, and link expectations defined in Task 1.
- Produces: A static asset at `/XPRS_poster.png` and an optional data-driven poster figure rendered by `ProjectCard.astro`.

- [ ] **Step 1: Move the supplied PNG into Astro's public asset directory**

Run:

```bash
mv "XPRS_poster.png" "public/XPRS_poster.png"
```

Do not edit, resize, recompress, or otherwise transform the image.

- [ ] **Step 2: Extend the project schema and XPRS frontmatter**

In `src/content.config.ts`, add these optional fields to `projectSchema`:

```ts
poster: z.string().optional(),
posterAlt: z.string().optional(),
```

In `src/content/projects/xprs.md`, add these fields below `technologies`:

```yaml
poster: "/XPRS_poster.png"
posterAlt: "XPRS explainable product recommendation system research poster"
```

- [ ] **Step 3: Render the linked poster figure in the reusable card**

In `src/components/ProjectCard.astro`, insert this block after
`<div class="project-card__details">...</div>` and before
`<div class="project-card__footer">`:

```astro
{data.poster && data.posterAlt && (
  <figure class="project-card__poster">
    <a
      class="project-card__poster-link"
      href={data.poster}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${data.title} research poster at full size`}
    >
      <img
        src={data.poster}
        alt={data.posterAlt}
        loading="lazy"
        decoding="async"
      />
    </a>
  </figure>
)}
```

Add these rules to the component's `<style>` block:

```css
.project-card__poster {
  display: grid;
  grid-column: 1 / -1;
  gap: 0.6rem;
  margin: 0;
}

.project-card__poster-link {
  display: block;
  overflow: hidden;
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-surface-solid);
  box-shadow: var(--shadow-card);
}

.project-card__poster-link:hover {
  color: inherit;
}

.project-card__poster img {
  width: 100%;
  height: auto;
}

@media (hover: hover) and (pointer: fine) {
  .project-card__poster-link:hover {
    transform: translateY(-0.1rem);
  }
}
```

The existing mobile flex layout will make the figure full width automatically; do not add a fixed height or `object-fit` rule that could crop the portrait poster.

- [ ] **Step 4: Run the focused test and project checks**

Run each command:

```bash
npx playwright test tests/homepage.spec.ts -g "XPRS project exposes its research poster"
npm run check
npm run build
test -f "dist/XPRS_poster.png"
npm run test:e2e
```

Expected: the focused poster test passes; Astro check, production build, asset existence check, the full Playwright suite, and its axe audit all pass.

- [ ] **Step 5: Review and commit only the implementation files**

Run:

```bash
git status --short
git diff -- src/content.config.ts src/content/projects/xprs.md src/components/ProjectCard.astro tests/homepage.spec.ts
git add public/XPRS_poster.png src/content.config.ts src/content/projects/xprs.md src/components/ProjectCard.astro tests/homepage.spec.ts
git commit -m "feat: add XPRS research poster"
```

Do not stage unrelated worktree changes, generated `dist/` output, or the already committed design/plan documents.
