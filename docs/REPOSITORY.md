# Repository guide

> Source documentation review — 1 November 2026: the source repository is public. Earlier dated references to private source access describe the previous repository setting. Hosted access, private user data and historical verification retain their documented scope.


This public repository preserves the RIFF CULT application and its English documentation. The public portfolio demo is hosted separately on [Vercel](https://riff-cult.vercel.app).

Repository: [kreatorrdev/riff-cult](https://github.com/kreatorrdev/riff-cult). The source can be read publicly; changes require the appropriate repository permissions.

```powershell
git clone https://github.com/kreatorrdev/riff-cult.git
cd riff-cult
```

Follow the [project README](../README.md) to run the demo or full application locally.

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
4. Commit with a descriptive English message and push to the public repository.
5. Deploy separately to the existing Vercel project when the website should change. A GitHub push alone is not configured to deploy this project automatically.

See the [documentation index](README.md) for setup and deployment guides. Never edit an already-applied SQL migration; add a new numbered migration instead.
