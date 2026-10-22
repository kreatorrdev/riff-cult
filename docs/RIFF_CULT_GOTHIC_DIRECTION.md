# RIFF CULT — Gothic Editorial, Revision 03

**Date:** 21 October 2026  
**Status:** visual study retained as the reference for the implemented application. The owner's subsequent request to finish the site moved work into M2/M3; see [Functional Specification](RIFF_CULT_FUNCTIONAL_SPEC.md) and [Application Verification](APPLICATION_QA.md).

## Owner request

Prioritize the first supplied reference: a weathered Gothic building, cold moonlight, bare trees, fog and muted red interior light. Add a dynamic background with a similar atmosphere. Combine the first and second site proposals while keeping album images clearly visible. Continue writing documentation in English.

**Follow-up applied:** use a more Gothic typeface and remove the white covering surfaces. The current version uses **Grenze Gotisch** for the masthead and headings, with Barlow retained for body text and controls. The record selection, editorial sections and footer are now dark and translucent; the featured cover no longer has a white mount. The background shading is lighter so the scene remains visible.

**21 October content update:** the owner requested the removal of Metallica and Megadeth albums and prioritized **Slayer, Venom and Possession**. Possession — Exorkizein was explicitly confirmed. A subsequent request replaced Slayer's South of Heaven with **Reign in Blood**, including the lead artwork, album route, 1986 metadata, track list, earlier design compositions, and connected editorial copy. Venom — Black Metal and Possession — Exorkizein remain the two supporting covers.

The owner also requested more albums in the second section. **On Heavy Rotation** now contains eight records in two desktop rows. The new first row features Sodom — Agent Orange, Kreator — Coma of Souls, Cannibal Corpse — Kill and Nightwish — Once. The second row contains Slayer, Venom, Possession and Kreator — Pleasure to Kill. All new cards connect to album pages and the local vault. The catalog contains eleven records and retains Slayer/Venom/Possession as its first three editorial selections. The Symphonic filter and Finland country option support the Nightwish entry; source records cover every active album.

## Resulting composition

**Gothic Editorial** is the new default preview. The previous three alternatives remain available under **Earlier studies**.

- From **Sleeve Notes / 01**: compact identity, dark editorial hierarchy, a listening-list lead, direct archive access and bone/red text contrast. The display family has subsequently changed to Grenze Gotisch following owner feedback.
- From **Cover Stories / 02**: one large, fully visible Slayer cover with two separate supporting covers. Artwork is square, uncropped, in full colour, with no atmosphere layer or filter over it.
- From **reference 01**: the dominant environmental mood — ruined abbey, moonlight, mist, branches and restrained red windows.
- From **reference 02**: a small slate-violet influence in the sky and distant spires.
- From **reference 03**: weathered masonry and tangled organic shapes. No creature or supplied band logo was introduced into the interface.

The scene is new generated environmental artwork; the supplied watermarked reference was not reused as the website background. The album-led front page remains an editorial experience, with a populated discovery route and local collection demo.

## Background motion

The background uses a static raster illustration with independent CSS layers:

- Very slow, small camera drift (52 seconds, alternating).
- Two low-opacity mist layers moving in different directions (34 and 46 seconds).
- A soft, slow moonlight change (17 seconds).

There is no flashing, autoplay audio, video, pointer tracking or scroll interception. The background layer is decorative and cannot receive pointer events. The foreground covers remain still unless the user focuses or hovers a link.

**Motion on / Motion paused** is a keyboard-operable control in the review bar. The preference is stored locally when storage is available. Changes preserve the current route, scroll position, collection and focus. CSS and JavaScript both respect `prefers-reduced-motion`. Motion pauses when the document is hidden; embedded comparison previews use a static frame.

## Responsive and reading behavior

On phones the headline precedes the featured cover and two supporting covers. The introduction and actions follow the gallery, keeping recognizable albums in the first-screen composition. Catalog and reading pages use dark translucent surfaces to retain a quiet reading area while letting the background remain visible. The home record selection is also dark and translucent; the earlier bone-paper section was removed at the owner's request.

## Files and preview

- [Combined preview](http://127.0.0.1:4317/?direction=gothic-editorial#/)
- `design/gothic.css`: isolated visual composition, animation layers and responsive rules.
- `design/app.js`: combined hero, direction routing and motion preference behavior.
- `design/assets/gothic-abbey.png`: original generated scene.
- `docs/references/gothic-mood-01.png`, `02.png`, `03.png`: owner-supplied references, retained outside the served design directory.

The generated background's creation mode and complete prompt are recorded in [the asset register](RIFF_CULT_ASSET_REGISTER.md), alongside the updated album sources. This document describes the preserved visual prototype; the working application and deployment boundary are documented separately.
