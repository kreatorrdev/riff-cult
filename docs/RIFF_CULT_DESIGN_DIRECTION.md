# RIFF CULT — Design Direction and Roadmap Review

**Date:** 19 October 2026  
**Basis:** the supplied v0.1 roadmap and the owner's follow-up preferences.  
**Status:** the magazine direction is selected; the detailed specifications below are recommendations. No existing application was available to audit.

**20 October update:** the owner requested a different visual design with more realistic album images. [Connected design studies, revision 02](RIFF_CULT_DESIGN_STUDIES.md) now use actual album artwork, smaller mastheads and record-led opening compositions. Original abstract sleeve studies are superseded. The three current alternatives await owner selection; the specifications below remain the baseline where that feedback does not supersede them.

**Revision 03 update:** the owner subsequently requested a dynamic Gothic environment, prioritizing the first supplied building reference, combined with alternatives 01 and 02. [Gothic Editorial](RIFF_CULT_GOTHIC_DIRECTION.md) implements that combined study with clear, full-colour album covers and optional atmospheric motion. Its final composition is still awaiting confirmation.

**Latest owner refinement:** the Gothic direction now uses Grenze Gotisch for display type and removes the white paper section and cover mount. Dark translucent surfaces expose more of the background. These explicit preferences supersede the earlier condensed-display and alternating-paper recommendations for this direction.

## 1. Recommended identity

Build an underground metal magazine with a record archive and a personal vault. The editorial front page establishes the identity; the catalog makes discovery useful; the vault gives visitors a reason to return.

The owner selected **strong typography, black and off-white, and dark red accents**. Named musical references include Slayer, Kreator, Anthrax, Iron Maiden, Black Sabbath, Metallica, Megadeth, Cannibal Corpse, Nuclear Assault, and King Diamond. These references suggest a thrash-led visual language with classic heavy metal storytelling, early doom weight, and occasional death metal abrasion. This is an art-direction interpretation, not a taxonomy claim about every band.

The additional reference written as “deadwish” needs an exact artist identity before catalog content is prepared. It does not block design work.

Translate these references into sharp headline rhythm, photocopied print textures, strong image crops, liner-note metadata, and concert-poster composition. Develop an original RIFF CULT wordmark and graphic language. Keep recognizable band logos and album imagery as separately sourced content assets.

## 2. What should change in v0.1

| Priority | Current gap | Proposed change | Expected benefit |
|---|---|---|---|
| P0 | “Brutalist typography” is too broad to guide a build | Define type roles, palette, grid, image treatments, and example page compositions | A recognizable identity across every route |
| P0 | The first release combines a magazine, catalog, collection, events, and administration | Ship a polished editorial/catalog/vault release first; retain concerts as the next release | More time for content quality and complete user journeys |
| P0 | Signature interactions arrive at M6 | Prototype the record shelf during art direction; implement it after the basic collection flow works | Discover touch, keyboard, and layout problems before architecture hardens |
| P0 | Artwork and writing are treated mainly as sourcing concerns | Prepare representative editorial copy and usable assets before finalizing layouts | Pages can be designed around their actual content |
| P0 | Genre personality could produce several disconnected sites | Share navigation, type, spacing, and components; vary selected artwork, accents, and editorial composition | Variety without relearning the interface |
| P1 | Too many routes could become top-level navigation | Use The Underground, Discover, Reviews, and The Vault; add Shows when ready | A clearer first visit and a practical mobile menu |
| P1 | The visual brief emphasizes effects more than reading | Define album, review, and catalog templates with different information densities | A magazine that remains comfortable to use |
| P1 | Loading, errors, empty collections, and long titles are unspecified | Design these states alongside the polished examples | Consistent quality during ordinary use |
| P1 | The schema does not distinguish an album from a physical pressing | Start with an album-level vault and state its limits; model editions only when required | Honest collection controls and simpler implementation |
| P2 | Several elaborate animations compete for attention | Prioritize the sleeve interaction; use a static poster composition for shows initially | A stronger signature and a smaller performance burden |

The visual improvement comes primarily from hierarchy, typography, real content, and composition. Animation should reinforce those decisions.

## 3. Visual system

### Palette

| Token | Starting value | Intended use |
|---|---|---|
| Carbon | `#111110` | Main background and dark text on paper |
| Raised carbon | `#1B1B19` | Filters, inset metadata, collection controls |
| Bone | `#E8E2D6` | Primary text and paper sections |
| Ash | `#B9B2A5` | Secondary text on dark surfaces |
| Oxblood | `#781F2B` | Feature blocks, active action backgrounds, rules |
| Signal red | `#D85A4B` | Small emphasis marks on dark surfaces |

Treat these as starting design tokens. Verify every text/background pairing and interaction state. Oxblood belongs on filled blocks with light text; it should not be the default small-text color on carbon. Dark and paper sections should alternate deliberately to create a reading rhythm.

### Typography

- Use one condensed display family for the masthead and major headlines, plus one neutral sans-serif family for body text and controls. Start by comparing locally available or properly licensed candidates; choose exact fonts in the first design milestone.
- Keep the wordmark separate from the reading typeface. Distressed or ornamental lettering belongs in limited artwork treatments.
- Start body copy at 16–18 px with approximately 1.6 line height. Use 12–14 px for short metadata, never extended prose.
- Keep review text around 60–72 characters per line. Let titles wrap naturally, including long album and band names.
- Use uppercase for short section labels and selected headlines. Use sentence case for descriptions, form controls, and error messages.
- Prototype headline ranges around 64–112 px on wide layouts and 40–56 px on phones; refine with actual copy rather than locking every title to one size.

### Layout and surfaces

- Use a 12-column desktop grid with an approximately 1280 px content maximum, then reduce columns as content needs space.
- Start with 24–40 px desktop gutters and 16–20 px mobile gutters. Use a consistent spacing scale instead of one-off margins.
- Favor square corners, thin rules, strong alignment, and a small number of deliberate overlaps.
- Use paper grain sparingly on artwork and broad background regions. Keep controls and reading areas clean.
- Keep album covers square and uncropped. Use wider image crops for stories and portrait posters for gigs.
- Let the image treatment carry most of the atmosphere. Avoid applying one dark filter to every album cover, which would erase differences between releases.

### Genre variation

The initial content emphasis should be thrash and traditional heavy metal, supported by death and doom. Other genres can use the core template until there is enough content to justify a dedicated treatment.

| Editorial focus | Variation | Elements that stay consistent |
|---|---|---|
| Thrash | Angular poster compositions, tighter headline rhythm, red emphasis | Navigation, body typography, controls, spacing scale |
| Traditional heavy metal | Larger cover features, archival captions, theatrical editorial imagery | Same component behavior and page structure |
| Death metal | Denser monochrome imagery and sharper image contrast | Readable text, visible focus, consistent actions |
| Doom | More negative space and heavier image proportions | Interaction speed and accessibility |

Genre identity should not change navigation or make controls slower. Do not build a separate theme engine for every subgenre in the first release.

## 4. Page compositions

### The Underground: home page

1. Compact utility strip and a distinctive RIFF CULT masthead.
2. One lead story with a large headline, a short editorial introduction, and one dominant image or original graphic.
3. A contrasting record-selection section with four to six albums and specific one-line listening notes.
4. An asymmetric editorial section: one larger review and two shorter stories, separated by rules and whitespace.
5. A curated entry into thrash, heavy, death, or doom through an actual article or list.
6. A small vault invitation tied to the records already shown. Add upcoming shows only when event content ships.

Avoid making the first screen a generic slogan, a full-screen splash, or a wall of equally weighted cards. A visitor should immediately see a specific story and a useful next action.

### Album detail

Use a large, intact cover beside the band, album title, release year, genres, concise editorial note, and a clear **Add to vault** action. Follow with track metadata, the review, and a short selection of related records explaining why they are related.

For the first release, the vault stores one entry per album with an Owned or Wishlist status. A format preference may be optional, but the interface must not imply ownership of a verified pressing. Pressing identifiers, multiple copies, condition, and marketplace values belong to a later collection model.

The action must cover signed-out, saving, saved, and failed states. Preserve the intended album through sign-in, prevent duplicates, and show a retry path when saving fails.

### Discover: catalog and band pages

Use a stable search/filter area, result count, selected filters, reset action, and shareable URL state. Albums and bands should be separate result views with appropriate filters. Format belongs on album or edition results, not on bands.

Desktop can use an inset filter column. Mobile should use a labeled filter button and a sheet with explicit Apply and Clear actions. Search, sort, and filter choices should survive opening an album and returning to the results.

Band pages should prioritize a concise introduction, a curated starting album, discography, and related writing. Empty metadata fields should disappear gracefully.

### Reviews

Use a quieter reading layout with author, date, album context, comfortable line length, and relevant links. An occasional large quotation or image can break up longer pieces. Keep ratings optional; no score is better than an unexplained number.

### The Vault

Start with clear Owned/Wishlist controls and two views: **Grid** and **Shelf**. Both expose the same collection data and actions. The grid is the dependable baseline; the shelf provides personality.

A sleeve may lift slightly on hover or keyboard focus. Touch activation should reveal the same information and controls. Opening a record should use a real link or button. Removing an album needs feedback and an Undo action. Keep an obvious path from an empty collection to the catalog.

The initial shelf should show recognizable covers; a shelf made only of unreadable spines is a later optional experiment.

### Shows and administration

When shows ship, use an agenda as the primary view and a poster wall as an alternate visual treatment. An agenda handles sparse dates and phone screens well. Always show date, venue, city, and event status as text.

Administration should prioritize practical forms, previews, publication status, validation, and clear feedback. Let the public editorial pages carry the strongest visual expression.

## 5. Content is part of the design

Suggested first-release content budget, to be adjusted to available writing and asset permissions:

- 12–16 bands and 24–32 albums, with meaningful coverage of the owner's musical references.
- 4–6 original reviews and 2 curated lists with an introduction and individual selection notes.
- 3–4 populated genre landing pages; use the shared catalog for other genres.
- 6–8 representative album entries during prototyping, including a long title, missing artwork, a sparse track list, and multiple genre tags.

These are planning targets, not existing content counts. Select fewer entries if necessary to keep every featured page complete.

Write with a knowledgeable, personal voice: explain a riff, a performance, a production choice, or the connection between records. Do not invent first-person concert memories, interviews, or listening history. Label demonstration content clearly.

Keep metadata provenance separate from image permission. Maintain an asset register with source URL, creator or credit, permitted use, required attribution, and review status. API access alone is not the project's asset approval process. Use original typographic studies for early mockups, then evaluate final layouts with cleared representative images.

## 6. Interaction and quality criteria

- Use roughly 120–180 ms for small feedback and 180–260 ms for a sleeve movement as initial design values. Keep navigation immediate.
- Reduced-motion mode must retain the same content and actions, with decorative transforms removed.
- Validate keyboard navigation, visible focus, mobile filters, save errors, and collection removal. Avoid actions that appear only on hover.
- Design against WCAG 2.2 AA: normal text contrast of at least 4.5:1, appropriate non-text contrast, reflow, and meaningful labels. Use 44 px as the project's preferred touch target; WCAG 2.2 AA's target-size minimum is 24 CSS px with defined exceptions. A checklist alone is not a conformance claim. [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Review representative layouts at 320, 390, 768, 1024, and 1440 px, including 200% zoom and long content.
- Aim for LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile of real visits, segmented by mobile and desktop. Use repeatable lab checks before launch; do not report a Lighthouse score as measured field performance. [Web Vitals](https://web.dev/articles/vitals).
- Reserve image dimensions, optimize cover sizes, load media embeds only on request, and keep ordinary content independent of animation code.

## 7. Reference lessons

[The Quietus](https://thequietus.com/) provides a useful editorial reference through recurring review columns, album features, and archive discovery. [Bandcamp Daily](https://daily.bandcamp.com/) offers another useful example through scene reports, label profiles, lists, and album-focused writing. These references support the content structure; the proposed RIFF CULT palette, typography, and compositions are original recommendations rather than copies of either publication.

## 8. Next design deliverable

Produce a connected desktop/mobile prototype of **Home → Discover → Album → Add to vault → Vault**, plus a review page. Use the selected magazine direction and representative content. Evaluate the lead-story hierarchy, album readability, and collection controls before extending the design to every route.

Resolve exact font selection, the ambiguous “deadwish” reference, the first content/asset set, and the proposed release split during this milestone. None requires expanding the visual scope now.
