# Who Cares Software website

A static, bilingual website with self-hosted assets, built with Vite and npm.
English HTML is the no-JavaScript fallback;
JavaScript progressively adds preferences, project/founder dialogs, the contact
composer and approach sketches.

## Local preview

```sh
npm ci
npm run dev
```

Open http://localhost:4174. `public/` is the source root; Vite builds `dist/` for
GitHub Pages. Use `npm run build` and `npm run preview` to test that output.
Unprocessed images and CNAME live in `static/`. Current portrait source artwork lives
in the sibling brand repository at `../../brand/brand_main/assets/portraits/`,
with provenance in its `assets/README.md`. Keep design notes
and review captures outside `public/`. Superseded portrait WebP derivatives have
been removed. Serving and deploying the website does not require the brand repository.

## Editing

- `public/index.html`: source content and English fallback.
- `public/assets/styles.css`: shared layout and typography.
- `public/assets/theme.css`: website Deep Teal color roles, layered over the shared theme.
- Theme CSS and brand artwork are imported from npm dependencies.
- [Design dependencies](docs/design-inputs.md): ownership, package updates and exceptions.
- `public/assets/preferences.js`: appearance/language preferences and homepage Greek copy.
- `public/assets/{work,people,composer,approach}.{css,js}`: component presentation and behavior.
- `PRODUCT.md` and `DESIGN.md`: product constraints and visual decisions.

Check English and Greek, light and dark, narrow and wide screens, keyboard and
reduced motion. Scroll portraits into view before capturing full-page screenshots
so their lazy-loaded images have decoded. Verify dialog closing/focus restoration,
folder browsing and draft preservation. Email and file sharing hand off to the
visitor’s apps; the site does not upload files or send messages.
