# Personal Website

Static Astro portfolio for Omer Ahat.

## Local Development

Install the locked dependency versions, then start Astro's local development server:

```bash
npm ci
npm run dev
```

The local server runs at `http://localhost:4321` by default. Set `SITE_URL` and
`BASE_PATH` before a build when checking a deployment target other than the
default user site.

## Commands

| Command | Action |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test:e2e` | Run the Playwright end-to-end suite |

Run the checks and build locally with:

```bash
npm run check
npm run build
npm run test:e2e
npm run preview
```

## Content Updates

- Edit `src/data/profile.ts` for the public identity, contact links, impact metrics, skills, education, publication, and community information.
- Add or update project entries in `src/content/projects/*.md`.
- Add or update experience entries in `src/content/experience/*.md`.
- Add or update writing entries in `src/content/writing/*.md`.
- Edit `src/components/` and `src/styles/` only when changing the page structure or visual presentation.

Keep project and article links public and verified. Do not add private work details,
phone or Telegram contact data, backend or CMS code, analytics, or a direct resume
download. The resume action remains a prefilled email request.

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
