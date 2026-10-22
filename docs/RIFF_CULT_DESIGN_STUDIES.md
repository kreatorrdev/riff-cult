# RIFF CULT — Connected Design Studies

**Date:** 21 October 2026  
**Current revision:** 03 — Gothic Editorial  
**Status:** historical design-stage reference. The Gothic composition now supplies the working application's visual system.  
**Roadmap stage:** this document records M0/M1. The subsequent M2/M3 implementation is documented in [Functional Specification](RIFF_CULT_FUNCTIONAL_SPEC.md) and [Application Verification](APPLICATION_QA.md).

## Owner feedback incorporated

**Revision 03:** the owner supplied three mood references and prioritized the first Gothic-building image. [Gothic Editorial](RIFF_CULT_GOTHIC_DIRECTION.md) combines the dark structure of 01, the clear cover hierarchy of 02, and an original animated atmospheric background. It is now the default local preview. The three revision-02 alternatives below are retained as earlier studies.

**21 October content refinement:** Slayer, Venom and Possession now lead the homepage and editorial catalog order. Possession — Exorkizein was explicitly confirmed by the owner. Metallica/Megadeth albums and their connected editorial references have been removed from the running study; prior screenshots remain historical evidence only.

**Further 21 October refinement:** Reign in Blood replaces South of Heaven throughout the active study. The second home section now has eight cards in two desktop rows, with Sodom — Agent Orange, Kreator — Coma of Souls, Cannibal Corpse — Kill and Nightwish — Once in the first row. The eleven-record catalog includes the new album pages, Finland country option and Symphonic filter. The Gothic composition and translucent surfaces are unchanged.

The owner requested a different design with more realistic album imagery. Revision 02 replaces the abstract vector sleeve studies and the generated concert hero with actual album covers. It reduces the masthead, places records in the opening composition, and brings album imagery ahead of the lead text on phones. The shared black, bone, and oxblood identity and the editorial/catalog/vault journey remain aligned with the revised roadmap.

The earlier After Hours and Paper Riot studies are superseded. Their two saved screenshots are historical references, not current alternatives. Original vector studies and the generated stage image are retained as unused source material.

## The three current alternatives

| Direction | Opening composition | What to compare |
|---|---|---|
| **01 — Sleeve Notes** | Carbon background, Slayer/Venom/Possession covers layered as sleeves, compact identity, listening-list feature | Immediate record recognition, dark editorial character, layered artwork |
| **02 — Cover Stories** | Warm paper, a large uncropped Slayer cover, two supporting records, serif editorial introduction | Artwork scale, paper contrast, a quieter reading hierarchy |
| **03 — Heavy Rotation** | Actual Slayer sleeve, a CSS vinyl disc, physical shadows, supporting record thumbnails | The collection feel, sleeve lift, the balance between archive and magazine |

All three include the same archive, album details, reading templates, band starting points and vault actions. A final selection may combine a masthead, hero composition and collection treatment from different alternatives. The switcher is a design-review tool, not a proposed production theme selector.

## Run and review

Requires Node.js 22 or later. No dependency installation is needed for the design prototype.

```powershell
npm run dev
```

Open the printed address, normally `http://127.0.0.1:4317`. The default is the combined Gothic direction. Use **Earlier studies** to revisit the three original compositions. **Motion on / Motion paused** controls the new background animation.

```powershell
npm run check
```

Checks JavaScript syntax, local assets, a one-to-one match between catalog records and artwork provenance entries, unpublished-study metadata, and five core normal-text contrast pairs. Browser verification is separate.

See [Design Verification](RIFF_CULT_DESIGN_QA.md) for completed browser checks, the resolved mobile overflow and remaining verification work.

Useful local links:

- [Current Gothic Editorial direction](http://127.0.0.1:4317/?direction=gothic-editorial#/)
- [Compare all three](http://127.0.0.1:4317/#/directions)
- [Sleeve Notes](http://127.0.0.1:4317/?direction=sleeve-notes#/)
- [Cover Stories](http://127.0.0.1:4317/?direction=cover-stories#/)
- [Heavy Rotation](http://127.0.0.1:4317/?direction=heavy-rotation#/)

The server binds to this computer's loopback address. This study has not been published or registered as a hosted Site. Stop the preview with Ctrl+C in its terminal when review is finished. Set `PORT` before starting if another application uses 4317.

## Connected prototype behavior

- Home → discovery → album → Owned/Wishlist dialog → vault.
- Eleven representative albums with actual artwork, two Iron Maiden records, two Kreator records, one long title, and sparse track metadata on selected entries.
- Original sample editorial writing: one listening list and two short record essays. Dates and authorship are explicitly part of the design sample.
- Album and band search; genre, country and year filters; editorial/A–Z/year sorting; album/band result views.
- Discovery choices live in the URL fragment and survive a visit to an album and return through **Back to the archive**.
- Album-level collection entries use Owned or Wishlist. Updating the same album changes its single entry rather than adding a duplicate.
- Collection changes persist in this browser's local storage. Grid and Shelf share the same entries and controls.
- Removal provides a 15-second Undo control. Undo restores the prior status. It is not a permanent recovery feature across reloads.
- Empty collection, empty filtered collection, zero search results, sparse metadata and unknown-page states.
- Mobile navigation, expandable inline filters, native dialogs, visible focus, a skip link, and reduced-motion CSS alternatives.

## Typography and artwork

Self-hosted **Barlow Condensed Bold** supplies display type; **Barlow Regular/Medium** supplies body text and controls. Cover Stories uses system Georgia for selected editorial passages. Font license files are stored beside the fonts. These are proposed font choices pending design approval.

**Revision 03 typography/surfaces update:** Gothic Editorial uses self-hosted **Grenze Gotisch** for display type and the masthead, and Barlow for body copy and controls. White paper sections and the white cover mount have been replaced with dark translucent surfaces following the owner's feedback. Earlier alternatives retain their original type and surfaces for comparison.

Actual artwork sources and publication review status are recorded in [the asset register](RIFF_CULT_ASSET_REGISTER.md) and the machine-readable [source manifest](../design/assets/albums/sources.json). Source access does not establish a publication license. Album artwork is used in this local, unpublished design reference; final publication requires the roadmap's asset review.

## Boundaries before M2

This buildless HTML/CSS/JavaScript prototype is disposable design-validation work. It does not replace the intended Next.js, TypeScript, Tailwind, PostgreSQL and Drizzle baseline.

Authentication, server-enforced ownership, shared data, editorial administration, database persistence, publication workflow, complete genre guides, dedicated list routes and concerts have not been implemented. Saving is labeled as a local design demo. Band pages are curated sample starting points, not complete discographies. All eleven records fit in one result set, so pagination is not simulated.

The current mobile filters expand inline with explicit Apply/Clear controls; a modal filter sheet remains an implementation decision. The artwork fallback component remains in source but no revision-02 catalog record intentionally hides available artwork. Do not mark the full M1 or R1 acceptance lists complete from this prototype.

## Transition to implementation

The owner subsequently requested completion of the site. The Gothic design was retained, Better Auth was selected for accounts, and the expanded selection includes Nightwish. This prototype remains available for historical comparison; application functionality and current launch work are described in the functional specification and roadmap.
