# Ömer Ahat — AI/ML Portfolio

This repository contains Ömer Ahat's personal AI/ML portfolio, built as a static
Astro site. It presents production ML systems, applied research, explainability,
recommendation systems, computer vision, and data tooling through selected work,
experience, and writing.

## Content Structure

- `src/data/profile.ts` contains the public identity, contact links, impact metrics,
  skills, education, publication, and community information.
- `src/content/experience/` contains the reverse-chronological experience timeline.
  Each entry keeps its structured frontmatter and uses Markdown evidence bullets.
- `src/content/projects/` contains project cards and their structured metadata. The
  featured selection mixes verified public projects with anonymized, public-safe AI
  case studies.
- `src/content/writing/` contains archived writing entries. An entry is featured only
  after its authorship and external link have been verified.
- `src/content.config.ts` defines the schemas for the experience, project, and
  writing collections.
- `src/components/` and `src/styles/` contain the page structure and visual system.

## Public-Content Boundary

Case studies use approved aggregate metrics and general techniques while omitting
employer names and internal system names. Project and article links must be public
and verified. The site does not add private work details, phone or Telegram contact
data, analytics, CMS or backend code, or direct resume downloads. The resume action
remains a prefilled email request.

## Local Development

Install the locked dependency versions, then start Astro's local development server:

```bash
npm ci
npm run dev
```

The local server runs at `http://localhost:4321` by default. For the default user
site, build with:

```bash
SITE_URL=https://omerahat.github.io BASE_PATH=/ npm run build
```

## Commands

| Command | Action |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build` | Build the static site into `dist/` |
| `npm run test:e2e` | Run the Playwright end-to-end suite |
| `npm run preview` | Preview the production build locally |

Run the checks, build, browser tests, and local production preview with:

```bash
npm run check
npm run build
npm run test:e2e
npm run preview
```

## GitHub Pages Deployment

The workflow in `.github/workflows/deploy.yml` deploys the static `dist/` artifact
to GitHub Pages on pushes to `main` and on manual dispatches. It uses Node.js 22,
`npm ci`, and `npm run build`.

In the repository settings, open **Pages**, set **Build and deployment** source to
**GitHub Actions**, and allow the workflow to deploy. No separate server is
required.

The workflow derives the deployment values from the actual GitHub repository, so it
does not assume a repository name that may be wrong:

- User site repository `<owner>.github.io`: `SITE_URL=https://<owner>.github.io` and `BASE_PATH=/`.
- Project site repository `<repository-name>`: `SITE_URL=https://<owner>.github.io` and `BASE_PATH=/<repository-name>/`.

For this site, the default local values are `SITE_URL=https://omerahat.github.io`
and `BASE_PATH=/`. To use a custom site URL or base path, create repository
variables named `SITE_URL` and `BASE_PATH` under **Settings > Secrets and variables
> Actions > Variables**. `SITE_URL` should be the site origin, and a project
`BASE_PATH` should start and end with `/`.
