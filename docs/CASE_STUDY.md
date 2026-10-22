# RIFF CULT — From an album cover to a personal shelf

## Problem and visual direction

RIFF CULT began as a metal-magazine concept that needed to connect editorial reading with record discovery and collecting. Early compositions put typography and stylized sleeves first. Owner feedback shifted the design toward recognizable album artwork, a Gothic atmosphere and dark transparent surfaces.

The resulting interface uses an original moonlit abbey, restrained mist and light movement, Grenze Gotisch display lettering and Barlow body text. Actual covers remain fully visible, square and unfiltered. Slayer — Reign in Blood, Venom — Black Metal and Possessed — Seven Churches rotate through the opening, with a modest size emphasis on the central cover. A second selection broadens the page with Sodom, Kreator, Cannibal Corpse and Iron Maiden. The owner removed Nightwish and Black Sabbath in the 22 October revision.

## One complete journey

A visitor follows a cover into an album, reads its introduction and track sequence, and chooses to save it. The public portfolio demo opens the Owned/Wishlist dialog immediately and retains the collection in that browser, without asking a reviewer to create an account. The demo and editorial preview are clearly identified; shared content cannot be published from the public workspace.

Grid and Shelf read the same entries. Changing status does not duplicate a record; removal offers Undo. Browser reload preserves the demo collection. In the retained full application, anonymous saving preserves a return destination through registration/sign-in, and the server authenticates the user before updating an account/album pair in PostgreSQL. Full-application collections also survive server restarts and synchronize through the account.

## Content and implementation

Public pages are rendered by Next.js. Discovery filters, sort and pagination use shareable query strings, and detail links preserve the archive context. Dedicated band, genre, review and listening-list routes create multiple ways into a small curated catalog. Editors can change catalog records, writing, publication state and featured order without editing application code.

Drizzle shares a PostgreSQL schema across the disk-backed local PGlite runtime and the hosted PostgreSQL adapter. Better Auth handles passwords and sessions. Reader/editor/administrator roles are checked on the server for each protected mutation. Draft previews remain restricted to editorial accounts.

## Interaction and access tradeoffs

Atmospheric motion is optional, follows the reduced-motion preference and pauses in hidden documents. Album images are independent of the moving scene. Touch users have a regular grid; keyboard users can use the same controls and dialogs. The shelf is an alternate view of the same data, rather than a separate interaction requirement.

The artwork and font provenance are recorded. An independent asset permission decision remains necessary before public distribution. This project does not treat source attribution as a publication license.

## Evidence and limits

Integration tests exercise account sessions, ownership isolation, uniqueness, publication and role boundaries. Browser verification includes the anonymous-save/sign-up/return journey, status changes, removal/Undo, persistence after restarting the server and 20 representative page/breakpoint checks. A save-dialog reopening issue was found during browser QA and corrected by consuming sign-in save intent once.

The portfolio demo is deployed at [riff-cult.vercel.app](https://riff-cult.vercel.app). The full account-backed implementation is retained and tested locally. A hosted database, operator contact and mail/recovery configuration are optional future operational-service work, not dependencies of the portfolio demo. Full assistive-technology testing and field performance are not claimed. Concerts and community features retain their later roadmap phases.
