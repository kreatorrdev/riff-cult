# Opening carousel and catalog revision

22 October 2026. Requested updates to the existing Vercel portfolio demo.

## Content

Possessed — Seven Churches replaces Possession — Exorkizein. The original 1985 album's ten-track sequence and cover were retrieved from [Apple Music](https://music.apple.com/us/album/seven-churches/980777677). Nightwish — Once and Black Sabbath — Paranoid are removed from the public catalog, bands, genre routes, selections and writing. A Possessed reading sample replaces the Sabbath feature. The archive now contains nine albums, seven bands, five genres and three editorial pieces.

The opening and lower selections use one shared content file. The lower section keeps eight records, bringing Iron Maiden — Powerslave into the rotation. The retained full application has a tested migration that unpublishes retired entries while preserving personal collection records.

## Interaction

All three opening covers remain fully visible. The center uses 36% of the stage width; each neighboring cover uses 31%. The selected album advances every 6.5 seconds, with smooth position/size changes. Arrows, direct album selectors, left/right keyboard arrows and horizontal touch gestures provide manual control. Covers and titles still link to album detail pages.

Pause/resume is explicit. Automatic rotation stops while a visitor hovers or focuses inside the carousel, when the document is hidden, or when the global motion preference or OS reduced-motion preference disables motion. Manual selection remains available. Automatic transitions do not interrupt screen-reader output; manual changes have a polite status announcement.

## Verification

The 18 integration scenarios passed, including the catalog revision against an existing archive with saved private data. Test files run sequentially to avoid simultaneous embedded PostgreSQL/WASM memory peaks on Windows. Browser checks confirmed previous/next, direct selection, keyboard wrapping, automatic progression, global motion pause and loaded artwork. After correcting the stage's aspect-ratio minimum-size interaction, 320, 390 and 768 CSS px views have no horizontal overflow.

Historical design screenshots and the old design prototype preserve earlier selections; the Next.js application and its current source register are authoritative.

The revision is deployed at [riff-cult.vercel.app](https://riff-cult.vercel.app), deployment `dpl_4gZ5D9xPCKvvQ9RzZqwSEfw7yAyp`. The native Vercel build and homepage verification succeeded. Forty-one unauthenticated production checks passed, including real 404 responses for retired records, bands, review and genre pages. Automatic progression was also observed on the production page, with no captured warnings or errors.
