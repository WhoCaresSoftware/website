# Who Cares Software website

A static, bilingual website with self-hosted assets, built with Vite and npm.
English HTML is the no-JavaScript fallback;
JavaScript progressively adds preferences, project/founder dialogs, the contact
composer and approach sketches.

## Local preview

Requires Node.js 22.12+, [GitHub CLI](https://cli.github.com/), and Task
(available through mise). An administrator must grant your GitHub account/team
Read access to the organization's `@whocaressoftware/brand` package, either
directly or through its linked [brand repository](https://github.com/WhoCaresSoftware/brand).
Website repository access alone may not grant package access.

```sh
mise exec task -- task setup
npm run dev
```

Setup opens GitHub's browser/device authorization when needed (GitHub may ask
you to enter a one-time code), requests `read:packages`, and installs the lockfile.
Authorize organization SSO if prompted. Existing authorized logins are reused.
Credentials are managed by GitHub CLI, not committed or written to your npm
configuration; npm receives the credential only for the setup process.
Rerun setup whenever dependencies change. Setup ignores `GH_TOKEN` and
`GITHUB_TOKEN` for GitHub authentication so shell tokens cannot override the
browser login. You do not need to set or unset any environment variables.

Without Task, run `node scripts/setup.mjs`. If Task is on your PATH, `task setup`
and `task dev` work too. Never commit credentials.

Open http://localhost:4174. `public/` is the source root; Vite builds `dist/` for
GitHub Pages. Use `npm run build` and `npm run preview` to test that output.
Run `npm run check` before release: it lints, builds, and verifies the pinned
brand release, generated metadata, bundled artwork and consumed theme roles.
It also checks for production metadata in source assets and deployment output.
Unprocessed images and CNAME live in `static/`. Identity and portrait source artwork
are maintained separately in the brand repository. Keep review captures outside
the repository. Serving and deploying the website does not require the brand checkout.

## Editing

- `public/index.html`: source content and English fallback.
- `public/assets/foundations.css`: all CSS spacing, type, sizing and motion-distance variables.
- `public/assets/media.js`: named responsive conditions shared by CSS and JavaScript.
- `public/assets/gestures.js`: shared pointer thresholds for folder and floating-link gestures.
- `public/assets/styles.css`: shared layout and token-consuming typography.
- One `@whocaressoftware/brand` package supplies the Deep Teal theme and artwork.
- The website pins an exact brand package version and lockfile.
- Every styling color uses its supplied variables directly; colors and color recipes are edited in brand's `theme/theme.json`.
- Browser metadata, favicon and standalone artwork receive resolved colors from that same package.
- `public/assets/preferences.js`: appearance/language preferences and homepage Greek copy.
- `public/assets/{work,people,composer,approach}.{css,js}`: component presentation and behavior.
- `PRODUCT.md` and `DESIGN.md`: product constraints and visual decisions.

## Brand updates and deployment

Install a published brand version explicitly, then commit both npm manifests:

```sh
npm install --save-exact @whocaressoftware/brand@<version>
npm run check
```

GitHub Actions validates the site and deploys `main` to GitHub Pages.
Package credentials are managed separately from the repository; restricted
dependencies must not enter public build caches.

Check English and Greek, light and dark, narrow and wide screens, keyboard and
reduced motion. Scroll portraits into view before capturing full-page screenshots
so their lazy-loaded images have decoded. Verify dialog closing/focus restoration,
folder browsing and draft preservation. Email and file sharing hand off to the
visitor’s apps; the site does not upload files or send messages.
