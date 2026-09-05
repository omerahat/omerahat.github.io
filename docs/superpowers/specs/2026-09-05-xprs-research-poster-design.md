# XPRS Research Poster

## Status

Approved design for implementation.

## Context

The portfolio already renders XPRS as the featured project card in
`ProjectsSection`. The supplied `XPRS_poster.png` is a portrait research poster
that should become visible evidence for that project without changing the
site's static Astro architecture or adding a JavaScript viewer.

## Design

- Move the supplied image into `public/XPRS_poster.png` so Astro serves it as a
  stable static asset at `/XPRS_poster.png`.
- Add an optional poster field to the project content schema and set it only on
  the XPRS entry. This keeps the reusable `ProjectCard` component
  data-driven rather than coupling it to the project title.
- Render the poster in a semantic `figure` inside the project card. The figure
  spans the full width of the featured card, sits below the project details,
  and keeps the source image's portrait aspect ratio.
- Wrap the preview image in an accessible link to the original PNG. The link
  opens in a new tab with `rel="noopener noreferrer"`, allowing visitors to
  inspect the full-resolution poster using the browser's native image view.
- Use the poster's descriptive alt text from project content and a short visual
  hint that it can be opened at full size. No modal, client-side state, or new
  dependency is required.

## Component Changes

1. `src/content.config.ts` accepts an optional poster asset path and alt text.
2. `src/content/projects/xprs.md` provides `/XPRS_poster.png` and descriptive
   research-poster alt text.
3. `src/components/ProjectCard.astro` conditionally renders the poster figure
   and adds responsive, card-consistent styling. Other project cards remain
   unchanged.
4. `public/XPRS_poster.png` contains the supplied 3175 x 4490 PNG.

## Responsive Behavior

- The preview width is `100%` of the featured card content area.
- The image remains naturally proportioned and never exceeds its container.
- On mobile, the featured card already collapses to one column; the poster
  remains full width with the same ordering and no horizontal overflow.
- Existing focus styles remain visible on the poster link.

## Accessibility

- Use a semantic `figure` and an informative `img` alt value.
- The image itself is the link target, so keyboard users have the same
  full-resolution action as pointer users.
- Preserve the existing focus ring and external-link security attributes.
- Verify the complete page with the existing axe and keyboard-focused tests.

## Verification

- Run `npm run check` to validate Astro content schema and component types.
- Run `npm run build` to confirm the static asset is emitted and the page
  builds successfully.
- Run `npm run test:e2e` and add assertions that the XPRS card contains the
  poster image and links to `/XPRS_poster.png` in a new tab.
- Confirm the page has no horizontal overflow at the existing 320px mobile
  boundary and that the existing accessibility audit remains clean.

## Out Of Scope

- No modal/lightbox implementation.
- No poster download control or separate project detail route.
- No changes to the poster artwork or compression settings.
