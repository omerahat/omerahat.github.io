# Ceramic Tile Paper Links

## Status

Approved design for implementation.

## Context

The `Selected Work` section already renders the Ceramic Tile Defect Detection
project with a link to its GitHub repository. The project was also published as
the paper "Efficient surface crack detection in ceramic tiles using MATLAB image
processing". The project card should expose both the implementation and the
publication evidence without changing the separate `About > Publication` card.

## Design

- Keep the existing GitHub link on the Ceramic Tile project.
- Add a `Read paper` link to the canonical DergiPark article page:
  `https://dergipark.org.tr/en/pub/aupse/article/1498129`.
- Add a `Google Scholar` link to the supplied citation page:
  `https://scholar.google.it/citations?view_op=view_citation&hl=en&user=1LIiTREAAAAJ&citation_for_view=1LIiTREAAAAJ:_FxGoFyzp5QC`.
- Keep publication links data-driven through optional project frontmatter fields:
  `paperHref`, `paperHrefLabel`, `scholarHref`, and `scholarHrefLabel`.
- Render only links whose optional values are present, so all other project
  cards retain their current single-link or no-link behavior.

## Component Changes

1. `src/content.config.ts` accepts the four optional publication-link fields as
   URL and string values.
2. `src/content/projects/ceramic-tile-detection.md` adds the DergiPark and
   Google Scholar URLs and labels while preserving its GitHub fields.
3. `src/components/ProjectCard.astro` renders the existing project link and the
   optional publication links inside a wrapping link group.
4. The link group keeps the current card styling, remains usable on narrow
   screens, and does not introduce client-side JavaScript or dependencies.

## Accessibility and External Link Behavior

- Every external link opens in a new tab with
  `rel="noopener noreferrer"`, matching the existing project-link contract.
- Visible link labels provide distinct accessible names: `View on GitHub`,
  `Read paper`, and `Google Scholar`.
- Existing keyboard focus styles and the page-level axe audit remain unchanged.

## Verification

- Update `tests/homepage.spec.ts` to assert the three Ceramic Tile links and
  their exact URLs and external-link attributes.
- Run `npm run check` to validate Astro schema and component types.
- Run `npm run build` to confirm the static page builds successfully.
- Run `npm run test:e2e` to verify project links, accessibility, responsive
  behavior, and the existing homepage contract.

## Out Of Scope

- No changes to the About publication card.
- No changes to project descriptions, metrics, or the existing GitHub URL.
- No generic migration of every project to a new links-array schema.
- No citation widget, JavaScript behavior, modal, or additional dependency.
