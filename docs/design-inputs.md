# Design dependencies

Theme owns colors and color recipes. Brand owns identity rationale, geometry and
generated artwork. Website imports their packages using npm and builds with Vite.

## Development and deployment

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`public/` contains authored HTML, CSS and JavaScript; it is Vite's source root.
`static/` contains unchanged images and CNAME, copied to the output by Vite.
`dist/` is generated and ignored. GitHub Pages publishes `dist/` after lint/build.

Vite resolves theme CSS and brand SVGs from installed packages and fingerprints
assets. The standard Handlebars plugin inserts theme metadata and brand's hero
fragment into HTML in both development and production. Project decorations use
Vite's `?raw` SVG imports. No source files are rewritten by the build.

Stylelint rejects literal CSS colors and color-producing functions in website
styles. Use theme roles instead. This replaces the custom color scanner; it
checks CSS, not JavaScript or HTML. The site has no custom design lock or sync tool.

## Updating the producer packages

The current unpublished producer work is distributed as standard `npm pack`
archives in `packages/`. `package-lock.json` records npm integrity hashes, so
`npm ci` works without sibling checkouts. These archives are dependency releases,
not editable source. Increment producer versions for subsequent releases.

```sh
# From theme: regenerate, verify and package the release
npm run build && npm test && npm run check
npm pack --pack-destination ../../website/website_main/packages

# From brand: consume the matching theme and generate all artwork variants
uv run scripts/build.py --theme ../../theme/theme_main/dist
uv run scripts/build.py --check
npm pack --pack-destination ../../website/website_main/packages

# From website: install the new versioned archives and verify
npm install ./packages/whocaressoftware-theme-VERSION.tgz ./packages/whocaressoftware-brand-VERSION.tgz
npm run lint && npm run build
```

Commit producer sources/outputs and package metadata; commit consumer archives,
package.json and package-lock.json together. Registry releases or pinned Git
dependencies can replace the archive dependencies without changing site code.
Update brand alongside theme when resolved standalone asset colors change.

## Exceptions

- Founder portrait WebPs contain baked-in orchid shirt prints; editing their
  colors requires image work. Sources remain in brand.
- Portfolio screenshots retain their content colors.
- Historical explorations and vendored third-party code are not live palettes.
- `currentColor`, `transparent`, SVG patterns and opacity remain structural
  styling. Theme controls the colors they inherit or compose.
