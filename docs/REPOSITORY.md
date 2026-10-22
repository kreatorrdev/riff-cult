# Repository guide

This private repository preserves the RIFF CULT application and its English documentation. The public portfolio demo is hosted separately on [Vercel](https://riff-cult.vercel.app).

## Contents

| Path | Purpose |
|---|---|
| `src/` | Next.js application, public content, client interactions and server logic |
| `public/` | Application artwork, fonts and other static assets |
| `migrations/` | Versioned PostgreSQL schema and content migrations |
| `scripts/` | Local setup, database operations, validation and deployment preparation |
| `tests/` | Integration checks for full application mode, demo mode and existing-archive migration |
| `docs/` | Specifications, architecture, roadmap, case study, provenance and release evidence |
| `design/` | Historical design prototype retained for reference and asset validation |
| `.env.example` | Configuration names and safe, empty credential placeholders |
| `package-lock.json` | Reproducible dependency resolution |

## Local-only files

Git excludes `.env.local` and other real environment files, `.data/` databases and private account data, `node_modules/`, `.next/`, `.vercel/`, temporary staging packages, test output and TypeScript build caches. Only `.env.example` is included as a configuration template. The repository contains no default operator account.

The Vercel deployment has a separate `.vercelignore` and allowlisted packaging workflow. Documentation belongs in GitHub even though it is not needed by the hosted application.

## Updating the project

1. Make the source or documentation change locally.
2. For application changes, run `npm run check` and `npm test`; build and inspect affected pages when appropriate.
3. Review `git diff` and the staged file list. Keep environment values and databases outside Git.
4. Commit with a descriptive English message and push to the private repository.
5. Deploy separately to the existing Vercel project when the website should change. A GitHub push alone is not configured to deploy this project automatically.

See the [documentation index](README.md) for setup and deployment guides. Never edit an already-applied SQL migration; add a new numbered migration instead.
