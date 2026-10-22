# RIFF CULT — Metal Underground

**Project roadmap v0.1 | Status: concept | Intended to be expanded later**

## 1. Vision and audience

Build an **independent, multi-page metal zine, discography explorer, and record vault**, with the personality of a longtime metal fan. The visitor should feel like they have entered an underground music scene, not a generic streaming dashboard.

**Portfolio objective:** show editorial design, advanced filtering, dynamic collections, content administration, optional third-party media integrations, and full-stack practices.

## 2. Experience principles

- Brutalist typography, black/oxblood palette, paper grain and gig-poster compositions.
- Meaningful variety *within* the site: doom = heavy/slow, black = stark/cold, power = bold/energetic; preserve consistent navigation and usability.
- Editorial voice: personal album notes, obscure finds, concert recollections, and curated lists.
- Album covers and media must be used with appropriate rights, attribution, and provider policies.
- No autoplay: external Spotify/YouTube embeds play only after deliberate action.

## 3. Multi-page information architecture

| Route | Purpose |
|---|---|
| `/` | Editorial front page / The Underground |
| `/bands` and `/bands/[slug]` | Searchable bands and full profiles |
| `/albums` and `/albums/[slug]` | Album catalog and detail pages |
| `/genres/[slug]` | Genre-specific editorial experience and discovery |
| `/the-vault` | Signed-in user's personal record collection |
| `/reviews` and `/reviews/[slug]` | Staff/fan reviews and editorial content |
| `/shows` and `/shows/[slug]` | Concert calendar, filtering and event details |
| `/lists` | Curated listening lists and themed picks |
| `/community` | Fan discussions and recommendations (later phase) |
| `/profile` and `/settings` | Collection and preferences |
| `/admin` | Admin-only catalog, review and event management |

## 4. Dynamic features

**MVP:** searchable band/album database; filter by subgenre, country, year, format; album details and related bands; editorial review pages; concert calendar using curated data; login; add/remove items in personal vinyl/album vault; admin content CRUD.

**Phase 2:** user album ratings, editorial playlists, personal discovery feed, community posts and moderation, event favorites, display of historical gig tickets (user-generated or licensed imagery).

**Signature experiences:** interactive record shelf with CSS-based sleeve pull-out, album cover details, genre-themed transitions, animated gig poster wall, archive timeline. All must have standard keyboard-operable alternatives.

**Potential integrations:** MusicBrainz for metadata, Discogs where license/API rules allow, Spotify/YouTube for permitted embeds. Verify usage conditions, rate limits, artwork rights and attribution; do **not** copy or stream copyrighted audio into the app.

## 5. Recommended technology stack

- **Frontend / backend:** Next.js App Router, TypeScript, React Server Components, Server Actions/Route Handlers.
- **Design / animation:** Tailwind CSS, bespoke editorial design tokens, Motion for album and page interactions; GSAP only for curated dramatic sequences.
- **Database:** Neon PostgreSQL (separate project), Drizzle ORM, migrations; local Docker Compose PostgreSQL.
- **Auth / access:** Better Auth or Neon Auth subject to evaluation; user/editor/admin RBAC with ownership and moderation rules.
- **Validation and testing:** Zod, React Hook Form, Vitest, React Testing Library, Playwright, ESLint, CI.
- **Hosting/media:** Vercel; licensed and optimized imagery; managed object storage only when users upload assets.

## 6. Initial database domains

`users`, `profiles`, `bands`, `genres`, `band_genres`, `albums`, `album_tracks` (metadata only), `album_formats`, `user_collection`, `reviews`, `review_comments`, `shows`, `venues`, `saved_shows`, `editorial_lists`, `list_items`, `posts`, `moderation_actions`.

Use normalized many-to-many relationships for genres and contributor roles, robust slugs, unique collection entries, and moderation flags.

## 7. Roadmap milestones

| Phase | Deliverable | Exit criteria |
|---|---|---|
| **M0 — Discovery** | Metal fan persona, editorial voice, page map, copyright/content plan | Practical data and artwork strategy selected |
| **M1 — Art direction** | Zine grid, type scale, genre variations, mobile prototypes | Readability survives dramatic styling |
| **M2 — Foundation** | Next.js, auth, Drizzle schema, Docker DB, CI | Local setup reproducible |
| **M3 — Catalog + zine** | Bands, albums, genres, reviews, search, filters | All content data-driven with detail routes |
| **M4 — Personal collection** | Accounts, vault, save/unsave album flow | Data persists and is properly scoped |
| **M5 — Concerts + admin** | Events, details, admin CRUD, editorial workflows | Only editors/admins can publish or update content |
| **M6 — Signature interactions** | Record shelf, poster wall, genre-specific animations | Responsive, keyboard usable, opt-in sound only |
| **M7 — Testing + launch** | Permissions, SEO, media compliance, accessibility, deploy | Live demo stable on desktop/mobile |
| **M8 — Case study** | Screenshots, user flow, architecture and integration notes | Distinct branding and tech work demonstrated |

## 8. MVP boundaries and later expansion

**MVP:** catalog, reviews, gigs, personal record vault, editorial admin.  
**Later:** community forums, user-submitted events, rich collection statistics, third-party account connection, recommendation features, playlist embeds.

## 9. Acceptance checklist

- [ ] Fans can discover bands and albums through meaningful filters.
- [ ] Every major section has real pages and rich, non-placeholder content.
- [ ] Vault actions persist per signed-in user.
- [ ] Editors/admins can maintain data without code changes; ordinary users cannot modify catalog entries.
- [ ] Embed handling respects consent, provider terms, and accessible controls.
- [ ] Performance, responsive layout and reduced-motion behavior are verified.
- [ ] Published demo and case study show the interactive vault and editorial design.

## 10. Next deep-dive document

**`RIFF_CULT_FUNCTIONAL_SPEC.md`**: settle exact genre list, catalog data sourcing, content rights, interaction prototypes, database relationships, editorial workflows, and a prioritized sprint backlog.
