# RIFF CULT — Architecture and Operations

## Application

Next.js App Router, React, TypeScript and Tailwind CSS form the application baseline. Existing Gothic CSS, typography and original atmospheric artwork are retained. Public content is rendered on the server. Small client components handle the motion preference, mobile navigation, collection dialog, vault views, account forms and editorial forms.

`src/components/pages.tsx` implements the public page templates. `src/components/ui.tsx` contains shared visual components. `src/lib/data.ts` reads published content and private collections. `src/lib/schema.ts` is the Drizzle schema. Route handlers live under `src/app/api/`.

The current nine records and three pieces of writing are maintained in `src/content/seed.json`; opening and lower selections share `src/content/selections.json`. The full application reads runtime content from the database; the portfolio demo reads curated content directly from the seed through `src/lib/demo-content.ts`. Editing the historical design prototype does not change either runtime automatically. `scripts/extract-content.mjs` is an initial migration aid, not a normal content-editing command.

`src/components/featured-carousel.tsx` handles the three-cover rotation in the opening. Only the central cover grows, by approximately 16%. Automatic progression pauses for hovered/focused content, hidden pages and motion preferences; arrows, selection buttons, keyboard arrows and touch swipes remain available. Migration `0002_curated_rotation.sql` updates an existing full archive while preserving saved collection entries and unpublishing retired content.

## Public portfolio mode

The [Vercel demo](https://riff-cult.vercel.app) runs without a hosted database or account registration. Owned/Wishlist entries belong to the visitor's browser and origin. The public editorial workspace is a read-only preview; it never grants an application role or enables writes. Authentication and all management/collection write endpoints reject requests in demo mode before initializing a database. See [Vercel deployment](VERCEL_DEPLOYMENT.md) for configuration and the retained server-backed mode.

## Local setup

Use Node.js 22 or later and npm.

```powershell
npm ci
node scripts/setup-local.mjs
npm run db:migrate
npm run dev
```

Open `http://127.0.0.1:4318`. The old design study remains available through `npm run design` on 4317. The local setup preserves an existing `.env.local`; it creates a random secret only when the file is absent. Local embedded PostgreSQL files live in `.data/postgres`.

For the optimized build:

```powershell
npm run check
npm test
npm run build
npm start
```

The post-build step stages static assets and migrations into the standalone output. The start helper loads the local environment and makes the embedded data directory absolute, so rebuilding does not move or erase the database. Run only one local application process against the same PGlite directory. Stop the server before running database CLI operations or backups against that directory.

## Administrator bootstrap

Create the intended operator account through the site. Stop the local server before granting the first role:

```powershell
npm run admin:grant -- owner@example.com admin
```

The command requires an existing exact email address; it does not create credentials. Restart the server and sign in. Later administrator/editor/reader changes are available to administrators in `/admin`. Editors can maintain content but cannot grant access. No shared default administrator password is installed.

## Database changes

Add a new numbered SQL file to `migrations/` and update the Drizzle schema together. Applied migration files must not be edited: their checksums are verified. Migrations run before requests use the database. Initial seeding is transactional; `npm run db:seed` adds missing initial content without replacing edited rows. Do not run a separate CLI process against a live PGlite instance.

For hosted PostgreSQL, configure `DATABASE_URL` with the provider's required TLS parameters. The code does not disable certificate validation. Apply migrations once before scaling multiple application instances. Back up PostgreSQL using the host's snapshot facilities or `pg_dump`. Test restoration before relying on backups.

For the local embedded database, stop the application and copy the entire configured `PGLITE_DIR` to protected storage. Treat it as private user data. Restore only while the application is stopped. Back up the authentication secret separately; replacing it can invalidate sessions.

## Full application deployment

The Dockerfile builds Next's standalone Node server. `compose.yaml` defines PostgreSQL and the application without exposing the database port. Supply `POSTGRES_PASSWORD`, `BETTER_AUTH_SECRET` and the exact site origin in `BETTER_AUTH_URL`; use URL-safe credentials or URL-encode database credentials as necessary. Place HTTPS termination in front of the app and configure the deployment's trusted client-IP handling for rate limiting. Do not blindly trust arbitrary forwarding headers.

Set `PUBLIC_INDEXING=true` only after reviewing the public release. The portfolio demo is deployed on Vercel and uses its assigned HTTPS domain without a hosted database. A custom domain and a hosted PostgreSQL service have not been provisioned. The full account-backed configuration described here is optional future service work; it is not required to run the current portfolio demo.

Required production variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Hosted PostgreSQL connection, with TLS as required by its provider |
| `BETTER_AUTH_SECRET` | At least 32 high-entropy random bytes |
| `BETTER_AUTH_URL` | Exact external HTTPS origin |
| `PUBLIC_INDEXING` | Optional public search-engine indexing switch |

The local-only `ALLOW_LOCAL_DATABASE=true` is explicit and must not be used to emulate durable storage on an ephemeral serverless filesystem.

## Security and maintenance

Better Auth handles password hashing and sessions. Session cookies are HTTP-only and become Secure for an HTTPS origin. Custom write handlers require a matching Origin. Authorization is repeated in each handler and reads the user's current role. Zod rejects unrecognized fields. Collections use a composite primary key; drafts and editorial content are not writable by readers.

This release does not send email. Account recovery and email verification require an email service and operator policy before a public launch. The privacy page explains stored account data, necessary cookies, motion preferences and the operator-contact requirement. There are no trackers or autoplay embeds.

Run the test suite and build after dependency or schema changes. `npm audit --omit=dev` checks the installed production dependency tree. Keep the lockfile committed. Never include `.env.local`, `.data/`, or test credentials in a repository or deployment archive.
