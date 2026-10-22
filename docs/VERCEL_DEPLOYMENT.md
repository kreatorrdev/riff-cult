# Vercel portfolio demo

RIFF CULT has two runtime modes. The public portfolio demo is designed to work on Vercel without a database, authentication credentials or a custom domain. The original application with accounts and private server collections is retained.

Production demo: [riff-cult.vercel.app](https://riff-cult.vercel.app). Created on 21 October 2026 in the owner's Vercel account as project `riff-cult`. This is an authenticated production deployment, not an unclaimed temporary preview.

## Demo behavior

- The nine-album catalog, seven band introductions, five genres, reviews and lists render from curated seed content. The opening carousel rotates Slayer, Venom and Possessed; Nightwish and Black Sabbath are no longer in public content.
- Owned/Wishlist, Grid/Shelf, removal and Undo work without signing in. Entries are stored under `riff-cult-portfolio-vault-v1` in the visitor's browser. Reloading preserves the collection on the same origin and browser. Clearing browser data resets it; nothing synchronizes across devices or deployment domains.
- The edition bar identifies the portfolio demo. The Vault introduction explains browser-only persistence. Sign-in/settings routes explain the demo instead of presenting a nonfunctional registration form.
- The editorial preview is publicly viewable, with publishing disabled. It does not create a session or grant editor/administrator permissions. Every authentication, collection-write and content-management endpoint rejects demo writes on the server as well.
- The privacy page describes actual demo storage. There are no embedded ads, analytics or external music players. Release links open only when selected.

## Configuration

`vercel.json` selects Next.js and a reproducible `npm ci` installation. The platform runs `npm run build`; Vercel builds use native Next.js output instead of the local standalone staging step. No additional environment variables are required for the portfolio demo.

`DEMO_MODE=true` explicitly enables the demo. If it is unset, `VERCEL=1` and an absent `DATABASE_URL` enable it automatically. `DEMO_MODE=false` always selects the full application and does not silently fall back when configuration is missing.

System deployment URLs provide the HTTPS origin. `BETTER_AUTH_URL`, if explicitly configured, overrides the detected URL. Do not copy the local loopback origin to Vercel.

## Source handling

`.vercelignore` excludes local databases, environment files, generated builds, dependencies and historical design/documents. Artwork credits required by the application live in `src/content/artwork-sources.json`; the hosted application does not depend on `design/`.

The deployment staging script creates a clean source package in `tmp/riff-cult-demo` using an explicit file/directory allowlist. It never copies `.env.local`, `.data`, Git history, test accounts or generated build output. Re-running it preserves only the deployment's `.vercel` linkage and replaces the staged source files. Do not put credentials in source code or public assets.

## Publish and maintain

Connect Vercel or authenticate its CLI, then deploy this project as Next.js. No Git provider is required for CLI deployment. The resulting project URL can be linked from a portfolio. A custom domain is optional.

The source and English documentation are maintained in the private [kreatorrdev/riff-cult](https://github.com/kreatorrdev/riff-cult) repository. GitHub pushes and Vercel deployments are separate operations; automatic deployment from that repository has not been configured.

The local checkout is linked to the existing `riff-cult` project in the owner's `kreatorrdev` scope. Future deployments should target that project explicitly:

```powershell
npx --yes vercel@latest deploy --project riff-cult --scope kreatorrdev --prod --verify
```

The initial deployment used the allowlisted staging package. Deploying from the checkout uses `.vercelignore`, which also excludes `tmp/` and tests. Documentation and local database files are not required by the public application. The current deployment belongs to the owner's authenticated account and requires no claim step.

## Optional full application

To enable real accounts and server collections later, provision a hosted PostgreSQL database and configure `DATABASE_URL`, a random `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` for the stable HTTPS origin, and `DEMO_MODE=false`. Do not enable local embedded PostgreSQL storage in serverless functions. Initialize the schema and seed through the database commands. Register the operator account and grant its role only with the owner's authorization. The public editorial preview is then replaced by protected staff access.

Password recovery/verification, the operator's privacy contact and the intended use of credited album artwork should be reviewed for an operational service. This portfolio release does not claim to be a commercial music service.

## Verification

`npm test` passed 18 tests covering full-application ownership/access boundaries, migration of an existing archive, demo content, blocked writes, mode selection and invalid browser storage. `npm run check` passed type and asset validation. The 22 October native Next.js deployment build completed successfully. Forty-one unauthenticated checks passed on the production URL, including the new Possessed pages, removed album/band/genre routes, image assets, privacy text and blocked writes. See [Application verification](APPLICATION_QA.md), [HTTP results](DEMO_HTTP_QA.json), and the current deployment screenshot in `docs/previews/carousel-production.png`.
