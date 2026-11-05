# Who Cares Software website

A static, bilingual website with self-hosted assets, built with Vite and npm.
English HTML is the no-JavaScript fallback;
JavaScript progressively adds preferences, project/founder dialogs, the contact
composer and approach sketches.

## Local preview

Requires Node.js 22.12+ and access to the private brand package. Log in with a
personal access token (classic) with `read:packages` and access to the brand repository:

```sh
npm login --scope=@whocaressoftware --registry=https://npm.pkg.github.com --auth-type=legacy
```

Keep credentials in your user npm configuration, never in the repository.

```sh
npm ci
npm run dev
```

Alternatively, run `mise exec task -- task dev` (or `task dev` if Task is on your PATH).

Open http://localhost:4174. `public/` is the source root; Vite builds `dist/` for
GitHub Pages. Use `npm run build` and `npm run preview` to test that output.
Run `npm run check` before release: it lints, builds, and verifies the pinned
brand release, generated metadata, bundled artwork and consumed theme roles.
Unprocessed images and CNAME live in `static/`. Current portrait source artwork lives
in the sibling brand repository at `../../brand/brand_main/assets/portraits/`.
Keep review captures outside `public/`.
Superseded portrait WebP derivatives have
been removed. Serving and deploying the website does not require the brand repository.

## Editing

- `public/index.html`: source content and English fallback.
- `public/assets/foundations.css`: all CSS spacing, type, sizing and motion-distance variables.
- `public/assets/media.js`: named responsive conditions shared by CSS and JavaScript.
- `public/assets/gestures.js`: shared pointer thresholds for folder and floating-link gestures.
- `public/assets/styles.css`: shared layout and token-consuming typography.
- One `@whocaressoftware/brand` package supplies the Deep Teal theme and artwork.
- Brand releases are tagged and published privately; the website adopts an exact version and lockfile.
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

GitHub Actions installs the private package using `BRAND_PACKAGES_READ_TOKEN`.
Manual workflow runs validate the selected trusted branch; only `main` deploys
to GitHub Pages. Private package downloads must not enter a public Actions cache.

Check English and Greek, light and dark, narrow and wide screens, keyboard and
reduced motion. Scroll portraits into view before capturing full-page screenshots
so their lazy-loaded images have decoded. Verify dialog closing/focus restoration,
folder browsing and draft preservation. Email and file sharing hand off to the
visitor’s apps; the site does not upload files or send messages.
