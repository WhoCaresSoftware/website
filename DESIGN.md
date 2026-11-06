# Design

## Direction

Independent and plain-spoken: open composition, real people, direct language,
fine rules and restrained Deep Teal emphasis. Preserve the approved WC symbol
and lowercase wordmark. Source Sans 3 is the UI face; logo lettering is artwork.
Product facts and content constraints live in `PRODUCT.md`.

## Shared foundations

- **Colors and identity:** `@whocaressoftware/brand` supplies the canonical
  light/dark theme, favicon, wordmarks and symbol geometry. Consume `--wcs-*`
  semantic variables directly. Change colors and recipes in brand's
  `theme/theme.json`, not in website CSS. Browser theme-color metadata and
  standalone artwork come from that same release.
- **Spacing and dimensions:** `public/assets/foundations.css` owns all CSS lengths.
  Shared spacing runs from `--space-3xs` to `--space-2xl`; fluid layout roles
  interpolate across 320–1600px. Gutters span 24–96px, column gaps 32–80px and
  section spacing 48–64px at the default root font size. Use shared roles first;
  dedicated variables cover coupled component geometry, not a second spacing scale.
- **Typography:** foundations defines the family, weights, leading, tracking and
  reading measures. Self-host Source Sans 3 regular/semibold, including Greek.
  Labels are 16px, body 18px, lead 20px, item titles 24–26px, section titles
  32–52px and display 40–76px. Body measure is capped at 65ch.
- **Responsive behavior:** `public/assets/media.js` defines named conditions
  shared by CSS and JavaScript; Vite expands CSS conditions. Scripts measure
  actual layout where needed; `gestures.js` shares pointer thresholds.
- **Functional icons:** website UI glyphs share a 24 × 24 viewBox, `currentColor`,
  1.5-unit strokes and round caps/joins, normalized in `public/assets/styles.css`.
  Keep this family separate from illustrations and supplied identity artwork;
  brand symbols and wordmarks retain their approved geometry. `--symbol-ink-shift`
  offsets the symbol's built-in viewBox padding so its ink meets the layout edge.
- **Enforcement:** Stylelint rejects literal colors and color recipes, plus
  length units outside foundations. `npm run check` also builds and checks
  brand pinning, metadata, bundled artwork and consumed theme roles.

## Homepage

The marketing page helps visitors assess fit and start a conversation:
offer → services → work → approach → founders → contact.

- Header uses the WC symbol and wordmark, section navigation and language/theme
  controls. Narrow layouts use a full-screen menu; its background is inert and
  scroll-locked while open.
- The sticky header fades out in place during scrolling, then slides back down
  after a 320ms settling delay. Scrolls under 6px leave it visible; keyboard
  focus and an open menu keep it visible. Its opaque, full-width background
  matches the section beneath its midpoint. Measured header height sets anchor
  clearance without layout jumps; reduced motion disables transitions.
- Desktop navigation uses accent `[ ]` brackets for the current section, hover
  and keyboard focus, with no separator dots or underline. Brackets slide inward
  and fade in; the mobile menu retains arrows and an accent current row instead.
- Hero sets the argument at full width in regular display type; the offer,
  contact action and graph share the row beneath it. Section titles use a dark
  line then an accent line. The graph resolves
  into the exact supplied WC symbol. The reveal runs once; reduced motion and
  no JavaScript show the completed symbol. The action remains usable throughout.
  The wordmark loading highlight follows the running reveal and clears whenever
  it pauses, so offscreen progress cannot leave a static accent in the header.
- Services and approach share six expressive editorial SVG illustrations: layered,
  slightly rotated paper silhouettes, solid Deep Teal overprints, open tinted
  fields and a fine amber thread. These are conceptual drawings, not product
  screenshots. Neutral section bands retain rhythm without generic card shells;
  service artwork is open composition rather than tinted rounded icon tiles.
  `public/assets/illustrations.js` owns the six compositions, integrated by
  `services.js` and `approach.js`; `public/assets/illustrations.css` owns their
  shared material and stroke grammar.
  All use a 240 × 160 canvas with non-scaling strokes: 1px base, 2px routes and
  emphasized details. Services display at 192px wide on desktop and 108px compact;
  approach artwork at 240px desktop and 180px compact, using foundations sizing.
  Consume supplied theme roles directly: `--wcs-accent` for solid overprints/ink,
  `--wcs-on-accent` for inverse marks, `--wcs-automate-tint` for open fields,
  `--wcs-section-background` for paper, `--wcs-foreground-muted` for base lines
  and `--wcs-plan` for amber routes. Do not add custom color recipes, grain,
  raster textures or artwork labels. The SVGs are decorative; localized adjacent
  copy carries meaning. No raster assets are produced for this family.
  Only the amber thread draws on service reveal or approach-step arrival; paper
  stays still. Each connector draws continuously through a scaling alpha mask
  over 1800ms with gentle acceleration and deceleration; its two arrow arms form
  outward from the tip over the following 320ms. Separate continuous subpaths
  prevent premature arrowheads and disconnected fragments. Visible ink remains
  undashed and non-scaling throughout. Mask IDs are unique per illustration
  instance. Reduced motion shows the completed drawing without thread animation.
- Work uses the editorial collage covers in the desktop grid, mobile folder and
  standalone project pages. Teal overprints, warm monochrome photography and amber routes
  unite frame-specific project portraits; the existing Aigistos cover remains
  the visual benchmark.
  Brand Image Pipelines shows one source product becoming many campaign contexts;
   Engineering and business-operations covers retain distinct workflow stories. Native picture
  sources select compact, panoramic, tall and landscape companions in
  `public/assets/work-art.js`; folder images use the default covers, while project
  pages select their own responsive companions.
  The work grid has a dedicated 1200px breakpoint, independent of navigation's
  1000px breakpoint, with a horizontal Hex Mythica companion in the tablet grid.
  The two small grid tiles protect the actual wrapped HTML captions with
  caption-relative overlays. No study controls or temporary captions ship.
  Grid tiles, folder documents and service evidence links use native project routes,
  preserving direct loads and open-in-new-tab rather than opening dialogs.
  Folder dragging must preserve native vertical scrolling and pinch zoom.
- Founder portraits remain XRS first, then Mike. Preserve supplied artwork and
  alpha transparency; decode lazy-loaded portraits before review screenshots.
  Portrait shirt prints use brand Deep Teal, preserving the original ink texture;
  all other portrait pixels and alpha remain unchanged. Portfolio imagery retains
  its baked-in colors.
- The homepage ends on its one inverse Deep Teal band: the contact question, the
  address, then "Who cares? We do." as the only semibold display line. That line
  appears only here, and project pages close their contact prompt on the same band.
- Contact opens a native draft composer: centered on desktop, bottom sheet on
  phones. Dismissal preserves the in-memory draft. No backend sends messages or
  uploads files; email attachments require reattachment, and Web Share is optional.

## Project showcases

- Six static `/work/<slug>/` routes showcase selected projects. Vite builds
  each entry with `templates/project.hbs` and approved bilingual content from
  `scripts/projects.mjs`. Each page has its own title, description, canonical and
  Open Graph metadata; story anchors, all-work, next-project and email links
  remain native navigation.
- Each story explains the situation, delivered scope, concrete workflow and
  supported result. Pair the narrative with a dedicated bilingual `delivery`
  paragraph rather than repeating the metadata summary. Follow the content
  standards in `PRODUCT.md`. Keep provider usage separate from endorsement or
  compliance claims, and artist credits separate from software delivery.
- A narrow sticky desktop story rail (230px) holds identity, back navigation,
  reading-position anchors and preferences beside a wide continuous showcase.
  An inverse Deep Teal opening pairs metadata, large title and hook with an
  editorial cover and context; the work, supported outcomes and contact follow
  without generic card shells. At 1000px and below the rail becomes a compact,
  wrapping header; at 800px and below story columns and workflow steps stack.
  Phone layouts use independently composed square artwork and stack the synthetic demo.
  Long project names may break within a word when enlarged phone text would
  otherwise overflow; default-size title composition stays unchanged.
- Reuse Source Sans 3 and supplied brand semantic colors without new palette
  recipes. All length roles live in the `.case-page` block of
  `public/assets/foundations.css`; `public/assets/project.css` consumes them.
  Fine rules, open paper fields and amber connections extend the existing brand;
  original portfolio artwork retains its own colors.
- Project-page heroes have their own full-frame panoramic (2000 × 667) and square
  phone compositions, with 1200px/2000px and 400px/800px responsive WebP sources.
  Preserve the complete artwork instead of cropping portrait covers into a fixed
  stage height. Homepage grid/folder covers remain unchanged. Software-oriented
   artwork puts the product workflow in view. Conceptual illustrations must not
   be presented as actual client screenshots. Preserve artwork attribution.
- Aigistos uses a synthetic HTML interface study, never client screenshots or
  records. Its interactive
  80 L fuel-capacity check is local-only, submits nothing and saves no entries;
  a static example remains without JavaScript. The amber thread draws once on
  arrival and is complete without animation under reduced motion.
- Hex Mythica uses the original GAMES.GG banner on wide screens and original card
  promotional artwork on phones. Its gallery pairs cards,
  an environment, Thieves Guild character development and prop studies, retaining
  artist marks and linked Tanya Podolskaia / ArtStation and GAMES.GG credits.
  WhoCaresGames remains the development attribution, separate from visual-art
  authorship. Its privacy-enhanced YouTube embed loads only
  on explicit activation; a native YouTube link remains available. Other project
  showcases use explanatory SVG workflows from `scripts/project-diagrams.mjs`
  rather than client architecture or interfaces.
- The engineering workflow showcase uses a dedicated bilingual HTML walkthrough: seven connected
  lifecycle stages, an original customer-discount approval brief paired with four
  supporting system components, and supporting workflows. The example uses
  business-facing goals, rules and checks rather than developer-only terminology.
  The designed lifecycle and
  proposed operational flow are described in prose, separate from delivered
  engineering enablement. `templates/coding-showcase.hbs` and
  `scripts/coding-showcase.mjs` contain the public teaching example, not client
  documents. Keep all examples readable without JavaScript; use open amber
  connections and theme-aware paper. Stack the artifacts at the shared 800px
  breakpoint. No new raster imagery, controls or animation is required.
- `public/assets/project.js` imports the shared, page-safe preferences controller
  for complete English/Greek and light/dark support. It also localizes dynamic
  demo feedback and video titles. Without JavaScript, retain English content,
  system-aware appearance, native links and the static study; enhanced controls
  remain hidden until usable.

## Accessibility and preferences

- Support complete English and Greek, light and dark, narrow and wide layouts.
  First visit follows the system appearance and primary browser language; only
  Greek selects Greek. Manual choices persist safely when storage is available.
- Language uses native EN / ΕΛ radios; appearance uses a localized sun/moon button.
  No manual reset control. Without JavaScript, retain English content, native
  links and system-aware CSS.
- Keep visible focus, underlined text links, readable contrast, wrapping text and
  usable touch targets. Dialogs close with Escape and restore trigger focus.
- Honor reduced motion without hiding content or removing functionality. Avoid
  horizontal page overflow and fixed-height containers that clip enlarged text.

## Publication

Vite builds `public/` and copies `static/` into `dist/` for website deployment.
The repository itself is also public: files outside `dist/` are not private.
Keep internal context, review records and confidential material outside the
repository. Review asset metadata as well as visible content before publication.
Retain font and third-party licenses. Hex Mythica artwork is sourced from
GAMES.GG and its attribution remains in the UI.
