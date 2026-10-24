# Who Cares Software website

A static, bilingual website with self-hosted assets. No package installation or
build framework is required. English HTML is the no-JavaScript fallback;
JavaScript progressively adds preferences, project/founder dialogs, the contact
composer and approach sketches.

## Local preview

```sh
python3 scripts/stage-site.py
python3 -m http.server 4173 --directory _site
```

Open http://localhost:4173. Rerun staging after changing public files.
Only the explicit allowlist in `scripts/stage-site.py` is published by the Pages
workflow. Keep source imagery, provenance, design notes and review captures out
of that list. Older portrait variants are retained as source material, not shipped.

## Editing

- `index.html`: source content and English fallback.
- `assets/styles.css`: shared layout, typography and theme tokens.
- `assets/preferences.js`: appearance/language preferences and homepage Greek copy.
- `assets/{work,people,composer,approach}.{css,js}`: component presentation and behavior.
- `PRODUCT.md` and `DESIGN.md`: product constraints and visual decisions.

Check English and Greek, light and dark, narrow and wide screens, keyboard and
reduced motion. Scroll portraits into view before capturing full-page screenshots
so their lazy-loaded images have decoded. Verify dialog closing/focus restoration,
folder browsing and draft preservation. Email and file sharing hand off to the
visitor’s apps; the site does not upload files or send messages.
