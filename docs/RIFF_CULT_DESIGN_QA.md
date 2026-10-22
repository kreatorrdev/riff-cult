# RIFF CULT — Design Verification

Historical prototype verification. See [Application Verification](APPLICATION_QA.md) for the subsequently implemented site.

**Date:** 21 October 2026  
**Build:** local design study, revision 03; revision-02 evidence retained below.  
**Environment:** Windows, Codex in-app Chromium browser, local loopback server.

## Revision 03 — Reign in Blood and expanded selection, 21 October

- Reign in Blood is now the Slayer lead, with 1986 metadata and the ten-track sequence from the official release page. South of Heaven is absent from the active catalog, home copy, and current source manifest.
- The second home section shows eight cards in two desktop rows. Sodom — Agent Orange, Kreator — Coma of Souls, Cannibal Corpse — Kill and Nightwish — Once lead the section; Slayer, Venom, Possession and Pleasure to Kill form its second row.
- All eleven catalog covers loaded, and the default order begins with Reign in Blood, Black Metal and Exorkizein. The Nightwish card opened the correct Once album page. Combining Symphonic with Finland returned Once alone.
- The Reign in Blood album page displayed the correct title, artwork, and ten tracks. Connected listening-list and reassessment copy were updated to the new Slayer record.
- The expanded home passed horizontal overflow checks at 320 and 390 CSS px viewport overrides. The eight-card selection used two columns at both widths. Viewport overrides were reset after verification.
- New artwork was visually inspected against its source release. Desktop [hero](previews/gothic-reign-in-blood-hero.jpg), [expanded selection](previews/gothic-expanded-records.jpg), and [mobile opening](previews/gothic-expanded-mobile.jpg) screenshots are saved locally. Earlier screenshots below show prior selections.
- `npm run check` passes. Artwork checks now compare the catalog ID set with the source register instead of assuming a fixed seven-record sample.

## Revision 03 — Earlier front-page record selection, 21 October

- The owner confirmed **Possession — Exorkizein**. The home page and default catalog order now begin with Slayer — South of Heaven, Venom — Black Metal, and Possession — Exorkizein.
- All seven catalog covers loaded. The three hero covers loaded without image filters; Metallica and Megadeth were absent from the rendered home, catalog, and updated listening-list page.
- The Death filter returned Exorkizein alone. Opening its album page showed the correct cover and seven-track sequence; returning to the archive preserved the filter. Venom's album detail and the three-record listening sequence also rendered correctly.
- The updated home page passed horizontal overflow checks with 320 and 390 CSS px viewport overrides. The overrides were reset after verification.
- The Gothic font, animated abbey, dark translucent surfaces, and existing motion control are retained. No new motion behavior was introduced.
- [Updated home screenshot](previews/gothic-editorial-slayer-venom-possession.jpg) records the final selection. Documentation remains in English. `npm run check` passes.

## Revision 03 — Gothic composition and follow-up styling, 20 October

- The combined front page passed horizontal overflow checks at 320, 390, 768, 1024 and 1440 CSS px with the final Grenze Gotisch font.
- The featured Slayer cover and the Metallica/Megadeth supporting covers loaded with `object-fit: contain`, equal square dimensions and no filters.
- The record section now computes to `rgba(12, 17, 27, 0.66)`. The white cover mount and bone-paper section are removed. Body copy remains Barlow while headings and the masthead use Grenze Gotisch.
- Pausing the atmosphere set every animated scene layer to `animation-play-state: paused`. The pause preference survived a reload. Resuming restored the moving state; computed scene and mist transforms showed movement.
- Reduced-motion CSS, a media-query change listener and document-visibility pausing are implemented. The review system's reduced-motion setting was false; the OS preference was not toggled during verification.
- The default preview serves successfully over loopback and `npm run check` passes, including the new background and Gothic font assets.
- [Earlier screenshot](previews/gothic-editorial-desktop.jpg) and [revision-03 evidence log](GOTHIC_QA_DATA.json) are saved locally; their record selection predates the 21 October update.

The background shading and translucent surfaces were inspected visually. The token-pair contrast numbers below do not establish contrast for every composited background pixel or imply a complete accessibility audit.

## Revision 02 checks retained

| Area | Evidence / result |
|---|---|
| Three opening compositions | Checked at 320, 390, 768, 1024 and 1440 CSS px. No horizontal page overflow in the final version. |
| Mobile vinyl overflow | Found an overflowing rotated disc in Heavy Rotation at 320/390 px. Removed the unnecessary mobile disc rotation and constrained its right edge; both widths passed the follow-up check. |
| Long title | Seventh Son of a Seventh Son album page checked at all five widths without horizontal overflow. |
| Reading page | Beyond the Speed checked at all five widths without horizontal overflow. |
| Artwork loading | All seven actual album covers loaded in the catalog. Original file sizes and source URLs are recorded in the asset manifest. |
| Search and filters | Metallica + Thrash + United States + 1984 produced one result. Search/filter choices were reflected in the URL. |
| Return journey | Album → Back to the archive restored the filtered query and search value. |
| Local save | Owned status survived a browser-page reload. |
| Status update | Changing the same album to Wishlist kept the collection count at one; Owned became zero and Wishlist became one. |
| Collection views | Shelf and Grid used the same entry and actions. |
| Removal | Removal showed feedback; Undo restored the album and its prior status. Test entries were removed after verification. |
| Empty search | A query absent from the sample showed “Not in this crate” and a link to all records. |
| Keyboard | Enter opened and closed the mobile menu; Escape closed the native search dialog. |
| Comparison | All three embedded previews rendered their current album-led front pages. |
| Syntax and assets | `npm run check` passed. |
| Core contrast pairs | Bone/carbon 14.65:1; bone/oxblood 8.02:1; ash/raised carbon 8.36:1; muted/warm paper 4.77:1; signal/carbon 6.94:1. These are token-pair checks, not a site-wide conformance claim. |

The [browser evidence log](DESIGN_QA_DATA.json) retains the initial home matrix, the follow-up mobile fix, and representative page checks. Screenshots are in [previews](previews/); the current overview is [design-comparison-v2.jpg](previews/design-comparison-v2.jpg).

## Remaining verification

Full screen-reader coverage, actual 200% browser zoom, OS reduced-motion behavior, storage-denial/retry behavior, and the complete responsive interaction matrix remain for the selected direction. Reduced-motion alternatives exist in CSS but were not verified by changing the OS preference during this session.

No Lighthouse, lab Web Vitals or field performance results are claimed. This prototype has no authentication, database, editor authorization or server ownership boundaries to verify. Those checks belong to the M2 implementation and later release gates.

This is a design-comparison review, not completion of the full M1 or R1 acceptance checklist.
