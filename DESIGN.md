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
  32–40px and display 44–80px. Body measure is capped at 65ch.
- **Responsive behavior:** `public/assets/media.js` defines named conditions
  shared by CSS and JavaScript; Vite expands CSS conditions. Scripts measure
  actual layout where needed; `gestures.js` shares pointer thresholds.
- **Enforcement:** Stylelint rejects literal colors and color recipes, plus
  length units outside foundations. `npm run check` also builds and checks
  brand pinning, metadata, bundled artwork and consumed theme roles.

## Homepage

The marketing page helps visitors assess fit and start a conversation:
offer → services → work → approach → founders → contact.

- Header uses the WC symbol and wordmark, section navigation and language/theme
  controls. Narrow layouts use a full-screen menu; its background is inert and
  scroll-locked while open.
- Hero pairs the value proposition and contact action with a graph that resolves
  into the exact supplied WC symbol. The reveal runs once; reduced motion and
  no JavaScript show the completed symbol. The action remains usable throughout.
- Services and approach use theme-supplied supporting hues and conceptual line
  illustrations. Neutral section bands establish rhythm without generic card shells.
- Work supports folder and grid views. Project dialogs retain factual copy,
  attribution and localized captions. Schematics are conceptual, not client outputs.
  Folder dragging must preserve native vertical scrolling and pinch zoom.
- Founder portraits remain XRS first, then Mike. Preserve supplied artwork and
  alpha transparency; decode lazy-loaded portraits before review screenshots.
  Portrait shirt prints and portfolio imagery retain their baked-in colors.
- Contact opens a native draft composer: centered on desktop, bottom sheet on
  phones. Dismissal preserves the in-memory draft. No backend sends messages or
  uploads files; email attachments require reattachment, and Web Share is optional.

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

Vite builds `public/` and copies `static/` into `dist/`; only `dist/` is published.
Keep review material and internal context outside the published assets. Retain
font and third-party licenses. Brand sources preserve portrait originals; Hex
Mythica artwork is sourced from GAMES.GG and its attribution remains in the UI.
Historical palettes and superseded design notes are available in Git history.
