# RIFF CULT — R1 Functional Specification

Updated: 21 October 2026. The owner requested completion of the site with the Gothic Editorial design. Concerts and community features retain their later roadmap phases.

## Portfolio deployment

The owner subsequently chose a public portfolio demo on Vercel: [riff-cult.vercel.app](https://riff-cult.vercel.app). Public content is rendered from curated seed data. Visitors can use Owned/Wishlist in their browser without signing in, and explore a read-only editorial preview. Authentication, server collection writes and publishing are blocked in demo mode. The account and editorial requirements below describe the retained full application, not privileges granted to public demo visitors. See [Vercel deployment](VERCEL_DEPLOYMENT.md).

## Public journeys

Public content is server-rendered by Next.js. Visitors can browse without an account. `/albums` searches band and album names and filters genres, countries and original release years. Filters and sort are GET query parameters. Results use eight-item pages with Previous/Next controls and counts. Album links carry a validated archive return address, preserving search, filters, sort and page.

Bands have stable independent routes. Genre guides are populated only when matching published records exist. Reviews and listening lists have separate indexes and stable detail routes. Lists preserve an editor-defined record order. Related albums prioritize a shared genre and explain the connection. Missing routes return a designed 404.

The opening selection contains Slayer — Reign in Blood, Venom — Black Metal and Possessed — Seven Churches. All three covers remain visible in a carousel; the center is approximately 16% larger. Progression occurs every 6.5 seconds when motion is enabled, the page is visible and the carousel is not hovered or focused. Controls support pause/resume, previous/next, direct selection, keyboard arrows and touch swipes. The lower home section supports up to twelve records in editor-defined order; the current selection contains eight. Nightwish and Black Sabbath have been removed from public content. No design-study selector appears in the application. The historical prototype remains in `design/`.

## Accounts and vault

Better Auth provides email/password registration, sign-in, session cookies, sign-out, display-name updates and password changes. Passwords require at least twelve characters. Roles are never accepted from registration or profile-update input. An initial administrator is granted through the operator CLI after their account exists; there is no automatic first-user administrator.

An anonymous save goes to sign-in with a same-origin return path. After registration or sign-in, the original album opens its collection dialog. That intent is consumed once. A user explicitly chooses Owned or Wishlist. The server upserts a single `(user_id, album_id)` entry. Both views share the same entries. Removal returns the previous status and offers an Undo action for fifteen seconds. Collection reads and writes use the authenticated session's user ID; supplied owner IDs are rejected.

The database persists collection data across browser and server restarts. Sign-in from another browser can read the same account's collection when connecting to the same database. The application does not import prototype local-storage entries automatically.

## Editorial workflow

Readers manage personal data. Editors manage albums, bands, reviews, lists, publication status and featured record ordering. Administrators can additionally assign account roles. Every mutation verifies the session, fresh database role, origin and validated input. A user cannot demote their own administrator access through the web panel.

Editors create a draft, preview it, then publish. Published album dependencies are required for published writing and placements. An album referenced by published writing or a featured placement cannot be unpublished until those references are changed. Ordinary visitors cannot read drafts through a preview query. Editorial body text is rendered by React as text, not interpreted as HTML.

Cover images may use existing local assets or credited HTTPS URLs. Uploads, external ingestion, automatic fact retrieval and a rich-text editor are outside R1. Source and credit fields remain required. Source access does not establish publication permission.

## Storage and runtime

The schema includes authentication, users and roles, bands, albums, writing, collections and placements. Versioned SQL migrations have recorded checksums. Seed insertion is transactional and never overwrites existing edits. Drizzle uses PostgreSQL types for both adapters: a hosted PostgreSQL pool when `DATABASE_URL` is set, and persistent server-side PGlite for a single-process local preview otherwise.

Hosted production requires `DATABASE_URL`, `BETTER_AUTH_SECRET` and the exact HTTPS `BETTER_AUTH_URL`. Local production preview explicitly enables the embedded database. Neither user data nor authentication secrets are committed. Schema and source credit manifests are tracked.

## Verification and launch boundary

Automated integration tests cover authentication, origin rejection, collection uniqueness and ownership, status validation, reader/editor/admin authorization, draft/publication changes, featured-order validation, removal/restore, safe return URLs and sign-out. Browser QA covers the actual save journey and responsive presentation. Full screen-reader, production PostgreSQL hosting and deployment checks are recorded separately.

The application includes a Docker deployment definition and environment template. Public domain, hosted database, operator contact, mail delivery/recovery policy, image publication permissions and production infrastructure must be configured before public launch. No email-verification, password-reset email delivery, third-party identity provider or external media autoplay is presented as working.
