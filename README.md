# Who Cares Software website

A static, bilingual website with self-hosted assets. No package installation or
build framework is required. English HTML is the no-JavaScript fallback;
JavaScript progressively adds preferences, project/founder dialogs, the contact
composer and approach sketches.

## Local preview

```sh
python3 -m http.server 4173 --directory public
```

Open http://localhost:4173. Local preview and GitHub Pages serve the same `public/`
directory directly, with no build or staging step. Refresh after editing files.
Everything in `public/` is published. Original artwork and historical fonts live
in the sibling brand repository at `../../brand/brand_main/assets/source/website/`.
Website provenance and dependency notes live in `docs/assets/`. Keep design notes
and review captures outside `public/`. Superseded portrait WebP derivatives have
been removed. Serving and deploying the website does not require the brand repository.

## Editing

- `public/index.html`: source content and English fallback.
- `public/assets/styles.css`: shared layout, typography and theme tokens.
- `public/assets/preferences.js`: appearance/language preferences and homepage Greek copy.
- `public/assets/{work,people,composer,approach}.{css,js}`: component presentation and behavior.
- `PRODUCT.md` and `DESIGN.md`: product constraints and visual decisions.

Check English and Greek, light and dark, narrow and wide screens, keyboard and
reduced motion. Scroll portraits into view before capturing full-page screenshots
so their lazy-loaded images have decoded. Verify dialog closing/focus restoration,
folder browsing and draft preservation. Email and file sharing hand off to the
visitor’s apps; the site does not upload files or send messages.
