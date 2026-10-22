# RIFF CULT — Application Verification

Date: 21 October 2026. Environment: Windows, Node.js 26.5.1, Next.js 16.4.2 production build, server-side disk-backed PGlite, Codex in-app Chromium.

## Latest revision — 22 October 2026

The updated Vercel production build is READY at [riff-cult.vercel.app](https://riff-cult.vercel.app). Eighteen tests and 41 unauthenticated public route/asset/write-boundary checks passed. The current source/asset/type check passed. Production browser verification confirmed automatic progression through Slayer, Venom and Possessed, with no captured console warnings or errors. Desktop and responsive manual-control evidence is recorded in [CAROUSEL_BROWSER_QA.json](CAROUSEL_BROWSER_QA.json) and [the revision notes](CAROUSEL_REVISION.md). The [current screenshot](previews/carousel-production.png) supersedes earlier opening compositions. Earlier dated verification below describes the initial release.

## Vercel portfolio demo verification

The production demo is [riff-cult.vercel.app](https://riff-cult.vercel.app). The authenticated Vercel deployment reached READY and received this stable production alias. It is publicly accessible: 28 route, asset, privacy and blocked-write checks passed using unauthenticated requests with no browser cookies. Results are in [DEMO_HTTP_QA.json](DEMO_HTTP_QA.json).

The suite passes 17 tests: the original full-application boundary scenarios and four demo scenarios covering content without database/authentication configuration, blocked registration/shared writes, invalid browser storage, explicit mode selection and Vercel URL selection. TypeScript and the native Vercel-style Next.js production build passed. Local demo routes passed the same 28 HTTP checks before publishing.

Browser checks confirmed immediate saving without registration, Wishlist persistence after reload, removal/Undo, and disabled publishing in the editor preview. Home, Vault and the editorial preview have no horizontal overflow at 320 and 390 CSS px. On the actual Vercel site, saving Nightwish — Once to Owned survived reload; the inspected console reported no warnings or errors. These checks supplement the full-application evidence below. They do not claim cross-device synchronization for demo collections.

## Automated integration evidence

`npm test` runs against a separate PostgreSQL test directory and an independent authentication secret. It does not grant privileges to an application operator or preview account. Twelve scenarios plus the parent test verify:

1. Anonymous collection writes fail.
2. Cross-origin collection writes fail.
3. Repeated saves and status changes preserve one record.
4. One user's collection cannot be read or removed by another user.
5. Supplied owner IDs and invalid statuses are rejected.
6. Readers cannot edit shared content or assign themselves a role.
7. Editorial draft/publish actions work; editors cannot grant roles.
8. Opening selections require three unique published records.
9. Removal and restoration preserve the prior status.
10. Return URLs reject external origins and malformed paths.
11. Administrator role checks remain separate from editor checks.
12. Signing out invalidates the session.

TypeScript and production builds passed. `npm run check` also verifies the original image/font provenance and assets. `npm audit --omit=dev` reported zero known vulnerabilities in the installed production dependency tree at the time of this run; this is not a future security guarantee.

## Browser evidence

- Anonymous save of Reign in Blood opened registration/sign-in with the original album return destination.
- A normal, local preview reader account was registered. It returned to the intended album and opened the collection dialog.
- Wishlist was saved in the database. After stopping and restarting the production application, the session and saved album were still available.
- Changing Wishlist to Owned preserved one entry. The dialog closed after saving. Keyboard Enter selected Shelf view.
- Removal showed an empty state and Undo. Undo restored the album and its Owned status.
- Home, catalog, a long album title, a listening list and the vault passed horizontal overflow checks at 320, 390, 768 and 1440 CSS px viewport overrides. The 20 measurements are in [APPLICATION_BROWSER_QA.json](APPLICATION_BROWSER_QA.json).
- The Gothic font and all three opening covers loaded. Album artwork remains independent of the atmospheric motion layer.

A browser check exposed repeated reopening of a consumed sign-in save intent during refresh. The runtime now consumes that intent once per page. HTTP verification also exposed a streaming soft-404 caused by the global loading boundary; the unnecessary boundary was removed so missing routes can return a real 404.

Screenshots: [final home](previews/r1-home.jpg) and [vault](previews/r1-vault.jpg). [HTTP_QA.json](HTTP_QA.json) records 22 passing production-server route, real-404, health and anonymous-access checks. The completed Once track sequence and return from album detail to the Symphonic/Finland filter were also checked in the browser after the final restart. The preview reader was signed out before handoff.

## Authorization review limit

Automatic approval review rejected promotion of the local preview reader to administrator because it would expand that account's access without specific approval. That promotion was not performed, and no indirect promotion was attempted. Role and publication behavior were verified in the independent test database instead. No owner/admin account or shared administrator password is preinstalled. The privileged live panel has not been browser-tested with an operator account.

## Launch and verification limits

The portfolio demo is deployed publicly on Vercel. The full account-backed application has been tested locally; its Docker/PostgreSQL hosting, trusted proxy handling, email verification/recovery and operator setup have not been exercised as a hosted service. The local database uses the PostgreSQL engine through PGlite. These optional service concerns do not prevent use of the browser-local portfolio demo.

The production home page was checked again on 22 October 2026 and saved as [the final deployment screenshot](previews/portfolio-vercel.png). The local checkout is linked to the same existing Vercel project for subsequent updates.

Viewport checks do not establish full accessibility conformance. Full screen-reader coverage, actual browser zoom, OS reduced-motion changes and the complete assistive-technology matrix remain unverified. Motion preferences, CSS alternatives, keyboard controls and native dialog behavior are implemented. No Lighthouse/Core Web Vitals or field traffic measurements are claimed. Local HTTP timings describe only the recorded localhost run.
