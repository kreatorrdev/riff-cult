# RIFF CULT documentation

All project documentation is maintained in English. The current release is a portfolio demo at [riff-cult.vercel.app](https://riff-cult.vercel.app), with the full account-backed application retained in the same source tree.

## Start here

| Document | What it covers |
|---|---|
| [Project README](../README.md) | Demo and full-application setup, available features and commands |
| [Case study](CASE_STUDY.md) | Product problem, visual direction, user journey and tradeoffs |
| [Functional specification](RIFF_CULT_FUNCTIONAL_SPEC.md) | Pages, interactions and current release scope |
| [Architecture and operations](ARCHITECTURE.md) | Runtime modes, authentication, storage, migrations and maintenance |
| [Vercel deployment](VERCEL_DEPLOYMENT.md) | Public demo behavior, configuration and deployment procedure |
| [Repository guide](REPOSITORY.md) | Source layout, exclusions and Git maintenance |
| [Roadmap](RIFF_CULT_ROADMAP.md) | Delivered work and optional later phases |

## Current release evidence

- [Application verification](APPLICATION_QA.md): test coverage and the latest release checks.
- [Carousel and catalog revision](CAROUSEL_REVISION.md): the 22 October 2026 release, behavior and verification.
- [Production HTTP results](DEMO_HTTP_QA.json): 41 unauthenticated checks against the live demo.
- [Carousel browser checks](CAROUSEL_BROWSER_QA.json): interaction and responsive evidence.
- [Current production screenshot](previews/carousel-production.png).

The latest recorded revision passed 18 integration tests, type/asset checks, the Vercel production build and 41 public HTTP checks. The public demo stores collections in the visitor's browser; it does not offer account synchronization or editorial publishing.

## Asset provenance

- [Artwork and font register](RIFF_CULT_ASSET_REGISTER.md).
- [Track metadata sources](TRACK_METADATA_SOURCES.json).
- [Current artwork source records](../src/content/artwork-sources.json).

Source attribution is recorded separately from permission to redistribute third-party artwork. Font license files are included with the assets.

## Historical material

The design studies, earlier QA files, `archive/`, reference images and earlier screenshots document the design process. The prototype in [`design/`](../design/) preserves an earlier catalog. These historical files are not the current site's source of content; use the latest application documents and [`src/content/`](../src/content/) for the deployed release.
