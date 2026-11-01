# Contributing to RIFF CULT

Project documentation and contribution descriptions are maintained in English. Literal interface labels, identifiers and recorded output may retain their original language when needed for accuracy.

## Set up a working copy

Use Node.js 22 or later and `npm ci`. Follow the [README](README.md) to choose browser-local demo mode or the database-backed application.

Run project commands from the repository root.

## Make and validate a change

1. Create a focused branch from the current default branch and read the relevant specification and current status.
2. Make the change and update the affected English documentation.
3. For application changes, run the applicable checks below and inspect the affected experience.
4. Review the diff and open a pull request describing the problem, resulting behavior and checks actually performed. For documentation-only changes, verify links, paths and commands; a full application build is needed only if the change affects it.

~~~sh
npm run check
npm test
npm run build
~~~

Review album discovery, browser-local demo collections and authenticated private collections separately. For server changes, check ownership, authentication, editorial roles and negative access cases. Stop the application before opening an embedded database through a separate CLI.

## Content and configuration

Preserve album-cover credits, track metadata sources and font notices. Update the [asset register](docs/RIFF_CULT_ASSET_REGISTER.md) when changing artwork.

Use your own local configuration. Commit configuration templates with placeholders; keep real credentials, runtime databases, personal records and generated build caches out of Git. Do not add a license or claim redistribution rights for third-party material without the owner's decision.

## Release notes

Use [Vercel deployment](docs/VERCEL_DEPLOYMENT.md) for the portfolio demo and optional hosted database. Existing migrations are immutable; add a new migration for schema changes.

Report dated verification honestly. Existing historical PASS records describe their recorded environment and do not establish that a new checkout or deployment has passed the same checks.
