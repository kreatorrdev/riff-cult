# RIFF CULT — Metal Underground

**Roadmap v0.2 | 19 October 2026 | Implementation status updated 21 October 2026**

**Latest revision — 22 October 2026:** the published portfolio demo now uses a three-cover carousel with Slayer, Venom and Possessed — Seven Churches. Nightwish and Black Sabbath are removed from public content. The current archive has nine albums, seven bands and five genres. See [Carousel revision](CAROUSEL_REVISION.md); the dated implementation notes below describe the earlier release.

This revision develops the supplied v0.1 roadmap around the owner's selected underground magazine direction. It proposes a smaller first release and earlier design validation. It does not represent an implemented product or approval of every scope change.

**Progress — 21 October 2026:** after refining the Gothic composition, the owner requested completion of the site. M2 and M3 now have a working local implementation: Next.js, TypeScript, Tailwind, Drizzle/PostgreSQL storage, Better Auth accounts, private collections, public content routes and protected editorial administration. The 11-album archive includes nine band introductions, seven genre branches, completed track sequences and three pieces of original editorial writing. See [Functional Specification](RIFF_CULT_FUNCTIONAL_SPEC.md), [Architecture](ARCHITECTURE.md), and [Application Verification](APPLICATION_QA.md).

**Design carried into implementation:** revision 03 combines alternatives 01 and 02 with an original Gothic background, Grenze Gotisch headings, dark translucent surfaces and optional motion. Slayer — Reign in Blood leads Venom and Possession; Sodom, Kreator, Cannibal Corpse and Nightwish expand the lower selection. The design selector is retained only in the historical prototype.

**Portfolio release:** the owner chose Vercel hosting as a portfolio demo. The production demo is [riff-cult.vercel.app](https://riff-cult.vercel.app), with public discovery, browser-local Owned/Wishlist collections and a read-only editorial preview. It does not require accounts or a hosted database. The original account-backed application remains available locally. Its hosted PostgreSQL provisioning, operator contact and mail/recovery policy are future operational-service work. No full-accessibility certification is claimed. R1.1 concerts and R2 community features remain deferred. See [Vercel deployment](VERCEL_DEPLOYMENT.md).

## 1. Product purpose

Create an independent metal magazine where visitors discover a record, read why it matters, and save it to a personal vault. Support a broad metal catalog over time, with initial editorial emphasis on thrash and classic heavy metal and supporting death and doom coverage.

The portfolio should demonstrate distinctive editorial design, usable discovery, persistent personal collections, maintainable content, and sound full-stack practices.

**Primary journey:** home story or curated list → album or band → related review → add album to vault → revisit collection.

## 2. Design commitments

- Strong condensed headlines, black and bone surfaces, oxblood accents, and controlled print texture.
- One shared interface system across genres, with variations in selected artwork and editorial composition.
- Distinct templates for the front page, catalog, album, long-form review, and personal collection.
- Real editorial copy and representative usable imagery before layouts are finalized.
- A sleeve interaction developed early, with grid, touch, keyboard, and reduced-motion alternatives.
- Public browsing without sign-in. Request authentication when a visitor wants to save personal data.
- All project documentation in English.

The detailed page layouts and quality criteria live in [Design Direction](RIFF_CULT_DESIGN_DIRECTION.md).

## 3. Release scope

| Release | Included | Deliberately deferred |
|---|---|---|
| R1 — Editorial and vault | Home, band/album discovery, detail pages, populated genre pages, reviews, curated lists, sign-in, album-level Owned/Wishlist vault, minimal editorial administration | Concerts, public comments, community posts, user ratings, recommendations, complex pressing data |
| R1.1 — Live scene | Curated show agenda, event details, poster view, event administration | User-submitted events, ticket uploads, live ticket integrations |
| R2 — Community and deeper collecting | Features selected from user feedback: ratings, moderated discussion, saved events, collection editions or copies | No commitment to ship every idea |

Concerts remain part of the intended product. Moving them after R1 is a recommendation to protect visual polish and editorial completeness. If concerts must be in the first public release, keep them as a simple curated agenda and reduce catalog/content breadth accordingly.

## 4. Information architecture

| Route | Purpose | Release |
|---|---|---|
| `/` | The Underground editorial front page | R1 |
| `/albums`, `/albums/[slug]` | Album discovery and detail | R1 |
| `/bands`, `/bands/[slug]` | Band discovery and profiles | R1 |
| `/genres/[slug]` | Populated genre guide and filtered discovery | R1 |
| `/reviews`, `/reviews/[slug]` | Reviews and reading experience | R1 |
| `/lists`, `/lists/[slug]` | Curated lists with individual shareable pages | R1 |
| `/the-vault` | Personal album collection | R1 |
| `/sign-in`, `/settings` | Account access and essential preferences | R1 |
| `/admin` | Protected catalog and editorial tools | R1 |
| `/shows`, `/shows/[slug]` | Agenda, posters, and event information | R1.1 |
| `/community`, `/profile` | Community features and public identity, if justified | Later |

Desktop navigation: **The Underground · Discover · Reviews · The Vault**, with search and account access as utilities. Discover groups albums, bands, genres, and lists while preserving their individual routes. Add Shows when it has usable content. Do not display navigation to unbuilt sections.

## 5. First-release behavior

### Discovery and reading

- Search band and album names; filter by genre, country, and release year where appropriate. Use format only where the catalog actually contains format data.
- Give filters shareable URLs and preserve them on return from detail pages.
- Include pagination or a clear Load more control, result counts, zero-result guidance, and deliberate sort options.
- Use curated related-record links initially, with a short explanation of each connection.
- Make reviews and lists editable content with authorship, publication status, and publication date.

### Vault

- One entry per user and album, with Owned or Wishlist status. Optional format preference is not a verified physical edition.
- Preserve save intent through sign-in, prevent duplicates, and persist changes across sessions.
- Provide Grid and Shelf views using the same entries and actions.
- Include saving feedback, retryable errors, empty-state discovery, and removal with Undo.
- Verify ownership on the server for every personal-data operation.

### Editorial administration

- Admins manage access; authorized editors maintain catalog and editorial content. Ordinary users cannot mutate shared content.
- Minimum workflow: draft → preview → publish/unpublish, with validation and readable errors.
- Include manual asset records and credits. Advanced uploads and external ingestion are optional later additions.
- Provide a safe way to update featured stories, record selections, and curated ordering without code changes.

## 6. Technical direction

Retain the original Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Drizzle direction as the implementation baseline. Pin compatible versions when implementation starts rather than treating this planning document as a package manifest.

- Prefer server-rendered public content and small client-side interaction boundaries.
- Begin with CSS transitions. Add Motion if the sleeve prototype benefits from it; omit GSAP until a specific approved interaction requires it.
- Use a local PostgreSQL setup and a separately provisioned hosted database. Document environment variables, migrations, and reproducible seed data.
- Keep the authentication provider undecided until a short integration check validates the current framework version, session behavior, deployment, and role enforcement. The original Better Auth / Neon Auth options remain candidates.
- Validate data at server boundaries. Choose form and testing tools based on the actual flows rather than installing every candidate immediately.
- Keep metadata sourcing behind an import boundary. Manual curated records are sufficient for R1; external APIs should not be required for core page rendering.
- Use permitted external links first; add optional media embeds only after their implementation and usage requirements are reviewed. Never autoplay.

## 7. Data model decisions

R1 domains: users/authentication records, profiles as needed, bands, genres, band/album genre relationships, albums, album artists or credits where needed, track metadata, user collections, reviews, editorial lists/items, featured placements, and media assets/credits.

Make collection uniqueness explicit as `(user_id, album_id)` for the album-level R1 model. Add publication status, author/editor attribution, stable slugs, and timestamps where appropriate. Separate human-facing slugs from external provider IDs.

R1.1 adds shows, venues, and show–band relationships. Later phases can add physical editions and copies, saved shows, ratings, comments, posts, and moderation records. Do not create a community schema merely because it appeared in the initial concept.

## 8. Delivery milestones

| Milestone | Deliverable | Exit criteria |
|---|---|---|
| M0 — Content and direction | Reference sheet, original identity proposal, representative copy and asset register | Selected magazine direction translated into usable typography, palette, and a feasible content set |
| M1 — Responsive design | Home, catalog, album, review, and vault prototype; early sleeve study | Main journey understandable on desktop and phone; long titles, missing artwork, keyboard use, and reduced motion considered |
| M2 — Working vertical slice | Project foundation, database, one album detail, sign-in, persisted save, basic editorial mutation | A real album can be maintained by an authorized editor, saved by a user, and restored after reload; unauthorized writes fail |
| M3 — R1 content and features | Catalog, band/genre pages, reviews, lists, vault views, publication tools | Complete first-release content and primary journeys; no decorative controls without behavior |
| M4 — R1 verification and launch | Responsive/accessibility review, permissions tests, performance checks, deployment and case study | Findings resolved or documented; stable public demo; measured results labeled with their test conditions |
| M5 — R1.1 live scene | Show agenda, detail pages, poster presentation, event editing | Real or clearly labeled demo events; time zones, cancellations, and sparse calendars handled |
| M6 — Evidence-led expansion | Selected R2 feature | A clear user need, data model, content/moderation plan, and measurable acceptance criteria exist |

Build one complete journey before filling every route. Refine the design in M1 and M3 rather than reserving all visual work for a late animation milestone.

## 9. R1 acceptance checklist

- [x] The home page has a clear lead story, editorial hierarchy, and distinct RIFF CULT identity.
- [x] Featured records, reviews, and lists contain meaningful content and usable imagery or intentional fallbacks.
- [x] Users can search/filter and return from detail pages without losing discovery context.
- [ ] Every advertised route is complete; empty and error states are designed.
- [x] Vault entries persist, remain private to their owner, and cannot be duplicated accidentally.
- [x] Signed-out saving returns users to the intended record after authentication.
- [ ] Grid and Shelf views work with touch and keyboard; reduced motion preserves functionality.
- [x] Editors can maintain public content; server-side authorization rejects ordinary-user catalog writes.
- [ ] Mobile menus, filters, form errors, long titles, zoom, and focus states have been checked.
- [ ] Asset provenance, permissions, and required credits are recorded before publication.
- [ ] Performance has been measured under documented lab conditions; field metrics are monitored when sufficient traffic exists.
- [x] Documentation covers setup, architecture, data/content workflow, deployment, and known limits in English.
- [x] The case study explains the editorial direction, one end-to-end journey, and the interaction/accessibility tradeoffs.

## 10. Immediate next work

Complete the external launch setup and remaining M4 checks: choose the Node/PostgreSQL hosting destination, configure the production origin and secrets, create the owner's administrator account, settle operator contact and mail/recovery policy, review image permissions, and test the actual deployed infrastructure. Keep concerts and community work in their later release phases.

`RIFF_CULT_FUNCTIONAL_SPEC.md` now documents implemented query behavior, collection transitions, authorization, editorial fields and storage. `ARCHITECTURE.md` covers setup, migrations, backups and deployment. `APPLICATION_QA.md` records evidence and remaining verification limits.
