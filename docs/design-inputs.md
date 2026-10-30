# Design dependencies

The brand repository owns two modules: theme (colors and color recipes) and
identity (rationale, geometry and generated artwork). Website imports their
separate npm packages and builds with Vite.

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

The website's selected Deep Teal palette lives in `public/assets/theme.css`,
loaded after the shared package styles. It overrides semantic color roles for
light, dark and system appearance without modifying the producer packages.
Supporting blue, green and amber roles keep illustrations varied; shared color
recipes continue to derive from the active semantic roles. Browser theme-color
metadata in `public/index.html` mirrors the two page backgrounds.
The WC symbol uses the shared SVG geometry with `currentColor` so it follows the
active website accent instead of retaining a baked-in orchid fill.
`public/assets/favicon.svg` uses the same shared geometry with the selected
light-mode teal and white palette.

Stylelint permits literal colors only in `public/assets/theme.css` and rejects
literal CSS colors and color-producing functions in component styles. Use theme
roles instead. This replaces the custom color scanner; it
checks CSS, not JavaScript or HTML. The site has no custom design lock or sync tool.

## Updating the producer packages

The current unpublished producer work is distributed as standard `npm pack`
archives in `packages/`. `package-lock.json` records npm integrity hashes, so
`npm ci` works without sibling checkouts. These archives are dependency releases,
not editable source. Increment producer versions for subsequent releases.

```sh
# From brand: build and verify both modules
npm run build && npm test && npm run check
npm pack --pack-destination ../../website/website_main/packages
npm pack --workspace @whocaressoftware/theme --pack-destination ../../website/website_main/packages

# From website: install the new versioned archives and verify
npm install ./packages/whocaressoftware-theme-VERSION.tgz ./packages/whocaressoftware-brand-VERSION.tgz
npm run lint && npm run build
```

Commit producer sources and package metadata; generated outputs are ignored.
Commit consumer archives,
package.json and package-lock.json together. Registry releases or pinned Git
dependencies can replace the archive dependencies without changing site code.
Release both packages at the same version from the brand repository.

## Exceptions

- Founder portrait WebPs contain baked-in orchid shirt prints; editing their
  colors requires image work. Sources remain in brand.
- Portfolio screenshots retain their content colors.
- Historical explorations and vendored third-party code are not live palettes.
- `currentColor`, `transparent`, SVG patterns and opacity remain structural
  styling. Theme controls the colors they inherit or compose.
