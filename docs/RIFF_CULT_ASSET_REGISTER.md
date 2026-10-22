# RIFF CULT — Asset Register

**Updated:** 21 October 2026  
**Use:** local, unpublished design comparison requested by the project owner.

## Current album artwork

The artwork is displayed as supplied. Square cover components use containment; colour is preserved. CSS sleeve angles and shadows are presentation effects and do not modify the source files. The local artwork manifest records exact image URLs, file sizes, source pages, and permission-review status.

| Album | Local file | Source page | Credit / review status |
|---|---|---|---|
| Venom — Black Metal | `design/assets/albums/black-metal.jpg` | [Apple Music catalog](https://music.apple.com/us/album/black-metal/1436231855) | Artwork belongs to Venom and its respective rights holders. Complete creator credit before publication. |
| Possession — Exorkizein | `design/assets/albums/exorkizein.jpg` | [Official Iron Bonehead label page](https://ironboneheadproductions.bandcamp.com/album/possession-exorkizein) | Possession / Iron Bonehead / Invictus Productions and respective artwork rights holders. Complete creator credit before publication. |
| Iron Maiden — Powerslave | `design/assets/albums/powerslave.jpg` | [Apple Music catalog](https://music.apple.com/us/album/powerslave-2015-remaster/1713861278) | Artwork belongs to its respective rights holders. Complete creator/rights-holder credit before publication. |
| Black Sabbath — Paranoid | `design/assets/albums/paranoid.jpg` | [Official band discography](https://www.blacksabbath.com/discography.html) | Small source image suitable for this study; seek a larger cleared source for final large-format use. Complete photo credit. |
| Slayer — Reign in Blood | `design/assets/albums/reign-in-blood.jpg` | [Official band release page](https://www.slayer.net/products/reign-in-blood) | Official source includes a Parental Advisory mark. Artwork belongs to its respective rights holders. Complete creator credit before publication. |
| Kreator — Pleasure to Kill | `design/assets/albums/pleasure-to-kill.jpg` | [Nuclear Blast album page](https://www.nuclearblast.com/pages/album/pleasure-to-kill) | Source depicts the sleeved reissue with a sticker. The model remains album-level and does not assert a pressing. Complete artwork credit. |
| Iron Maiden — Seventh Son of a Seventh Son | `design/assets/albums/seventh-son-of-a-seventh-son.jpg` | [Apple Music catalog](https://music.apple.com/us/album/seventh-son-of-a-seventh-son-2015-remaster/1716093955) | Artwork belongs to its respective rights holders. Complete creator/rights-holder credit before publication. |
| Sodom — Agent Orange | `design/assets/albums/agent-orange.jpg` | [Apple Music catalog](https://music.apple.com/us/album/agent-orange/1675512622) | Artwork belongs to its respective rights holders. Complete creator credit before publication. |
| Kreator — Coma of Souls | `design/assets/albums/coma-of-souls.jpg` | [Apple Music catalog](https://music.apple.com/us/album/coma-of-souls/1439115702) | Artwork belongs to its respective rights holders. Complete creator credit before publication. |
| Cannibal Corpse — Kill | `design/assets/albums/kill.jpg` | [Apple Music catalog](https://music.apple.com/us/album/kill/129322268) | Artwork belongs to its respective rights holders. Complete creator credit before publication. |
| Nightwish — Once | `design/assets/albums/once.jpg` | [Apple Music catalog](https://music.apple.com/us/album/once/1460471435); [official release metadata](https://www.nightwish.com/releases/once) | Artwork belongs to its respective rights holders. Complete creator credit before publication. |

For all eleven: no public-use license is asserted. Attribution and source provenance are recorded separately from permission. A public-release asset decision is still required. Cover images do not imply an artist endorsement of RIFF CULT.

**21 October selection changes:** Slayer — Reign in Blood replaces South of Heaven as the lead record, followed by Venom — Black Metal and Possession — Exorkizein. The owner explicitly confirmed Possession rather than Possessed. The lower home section now includes the four additional records above. South of Heaven, Metallica and Megadeth entries are absent from the running catalog and current artwork manifest. Earlier image files and screenshots are retained as unused historical assets.

The catalog displays original album years. Some image sources identify remastered digital releases; their imagery is a visual reference, not evidence of a user's physical edition. Metadata sources are linked on the album pages.

## Fonts

| Asset | Source | License |
|---|---|---|
| Barlow Condensed Bold | [Google Fonts official repository](https://github.com/google/fonts/tree/main/ofl/barlowcondensed) | SIL Open Font License; local `BARLOW-CONDENSED-OFL.txt` |
| Barlow Regular / Medium | [Google Fonts official repository](https://github.com/google/fonts/tree/main/ofl/barlow) | SIL Open Font License; local `BARLOW-OFL.txt` |
| Grenze Gotisch variable | [Google Fonts official repository](https://github.com/google/fonts/tree/main/ofl/grenzegotisch) | SIL Open Font License; local `GRENZE-GOTISCH-OFL.txt`. Gothic Editorial display type and masthead. |
| Georgia and Courier New | System fallbacks | Not redistributed |

## Original project graphics

The RIFF CULT wordmark treatment, favicon, abstract vector sleeve studies and CSS vinyl illustration were created for the design prototype. The vector studies in `design/assets/covers/` are superseded and are not used by revision 02. They were never presented as the official album artwork.

## Current Gothic scene — revision 03

- **File:** [gothic-abbey.png](../design/assets/gothic-abbey.png).
- **Creation:** built-in imagegen tool, opaque output; not the fallback CLI.
- **Purpose:** decorative environmental artwork with CSS mist and light layers behind the editorial interface.
- **References:** the owner's first Gothic-building image is the primary mood reference; the second and third add restrained palette/texture details. The reference images are retained in `docs/references/`, outside the served design directory.
- **Composition:** newly generated ruined abbey, moonlight, bare trees, mist and muted red windows. No supplied source image, logo or watermark is reused as the background.
- **Complete prompt and reference roles:** [generation record](prompts/GOTHIC_BACKGROUND.md).
- **Presentation:** source image is unmodified. Motion is created with CSS transforms and separate translucent gradient layers. Album-cover files remain unchanged and are not placed inside the atmosphere layer.

## Superseded generated stage image

- **File:** `design/assets/underground-stage.png`
- **Creation:** built-in imagegen tool, not the fallback CLI.
- **Current use:** unused in revision 02. Retained as prior design source material.
- **Subject:** fictional guitarist; no real musician or concert is asserted.
- **Final generation prompt:**

> Use case: photorealistic-natural. Asset type: editorial hero image for an original underground heavy metal magazine design study. Create a raw black-and-white analog concert photograph of a fictional long-haired heavy metal guitarist, face hidden by hair, bent forward while playing a dark electric guitar on a small intimate club stage. Shot from low down near the crowd, torso and guitar neck dominate middle-right, very dark empty haze on left, silhouetted hands at bottom, bright harsh single stage beam behind the head, imperfect candid motion in hair but guitar sharply detailed. Landscape 3:2 composition, dramatic deep blacks, smoky silver whites, gritty 35mm film grain, xerox zine atmosphere, authentic underground club energy, no arena spectacle. No identifiable real musician, no text, no logos, no watermarks, no band marks. This is atmospheric fictional imagery, not documentation of a real concert.
