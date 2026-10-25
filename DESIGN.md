---
name: Who Cares Software
description: Independent, plain-spoken software engineering in a dark, muted identity.
colors:
  ink: "#0D0D10"
  paper: "#EAE9E6"
  orchid: "#B69ACB"
  secondary: "#B9B8B5"
  rule: "#38383A"
  light-ground: "#F3EEF4"
  light-paper: "#FFFFFF"
  light-surface: "#E9E2EC"
  light-ink: "#202020"
  light-orchid: "#75468F"
  light-secondary: "#625B65"
  light-rule: "#D6CDD9"
typography:
  display:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(44px, 5.56vw, 80px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(32px, 4vw, 40px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(24px, 2.6vw, 26px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  square: "0px"
  sketch: "3px"
  control: "4px"
  dialog: "8px"
  portrait: "24px"
  bubble: "28px"
spacing:
  paragraph: "14px"
  heading: "28px"
  section: "64px"
  gutter: "clamp(24px, 6.667vw, 96px)"
  column-gap: "clamp(32px, 5.56vw, 80px)"
components:
  action-primary:
    backgroundColor: "{colors.orchid}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  action-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
---

# Design System: Who Cares Software

## Overview

**Creative North Star: Independent and plain-spoken.**

Dark, muted and minimal, with warmth carried by real people, orchid emphasis and
direct language. Open composition and fine rules replace card shells. The outlined
DM Mono wordmark remains supplied artwork; it does not determine the UI typeface.

## Colors

### Approved release — October 2026

This snapshot takes precedence over historical component specifications below
and earlier `.impeccable` review briefs.

- Light page canvas is orchid-white `#F3EEF4` (`--page-background`); white
  papers and controls use `#FFFFFF` (`--wcs-background`). Folder covers use
  `#E9E2EC`, secondary text `#625B65`, and rules `#D6CDD9`. Dark colors are unchanged.
- Hero reads “Software that makes work easier.” with “Software” and “easier”
  in orchid, with equivalent Greek emphasis. Its short supporting copy describes
  custom software, practical AI and dependable platforms around the business.
- The 3.9-second graph reveal runs once and cannot be replayed by clicking.
  Completed artwork responds subtly to pointer movement and resets on leave.
   On mobile, the headline precedes the graph, then the supporting copy and CTA.
   The graph is capped at 320px and 36svh wide so the full reveal fits short
   portrait screens with browser controls present; gaps are 24px. Short landscape
   screens place headline and graph side by side, with copy and CTA below.
   The reveal waits/pauses until at least 99% of the graph is visible. Content
   remains in normal flow so enlarged text can scroll rather than clip.
- Header wordmark clicks create overlapping pulses without navigation or scrolling.
- Services retain their open layout with compact conceptual line illustrations:
   assembling software, connected tools and an alternative infrastructure route.
   Each animates once on entry; reduced motion keeps the finished illustration.
   Named EN/EL links open Aigistos, AI Workflows & Agents and Private LLM Gateway
   in the existing project dialog, returning focus to the originating link.
  Language selection is a native EN / ΕΛ radio toggle; no reset action is shown.
- Work uses the same `1fr 1.35fr` grid as adjacent sections, stacking at 800px.
  Folder ratios are 1.5 generally, 1.3 at 801–1000px, and 1.2 on phones, with
  container-relative internal spacing rather than fixed minimum sheet heights.
   Two quieter back folders carry localized “Internal” and “Top secret” tabs;
   the front tab reads “Client projects” / “Έργα πελατών”.
- Folder dragging uses locally vendored `@use-gesture/vanilla` 10.3.1 for axis
- Project papers share theme-aware drawings, localized captions and a thin-rule
  footer with the WC symbol and opening action. A faint localized drafting grid
  supports each visual: Aigistos worksites and a shared system; the real Hex
  Mythica environment; applications/gateway/private models; brand references and
  image production; tasks/tools/human review. Schematics are conceptual, not
  implementation documentation or real client outputs. The same visual appears
  larger beneath the deliverable in each reading dialog, with a visible caption.
  Grid IDs are unique across covers and the open dialog. At narrow phone widths
  the cover caption yields space to the drawing. Sheets have a 280px floor and
  grow together for longer translated content; the drawing reserves 100px.
  Brand Image Pipelines uses a reference board (motif, swatches and copy) feeding
  portrait and landscape product compositions. The recurring motif shows visual
  continuity. These are illustrative layouts, not actual client image outputs.
- Folder dragging uses locally vendored `@use-gesture/vanilla` 10.3.1 for axis
  locking, flick detection and tap filtering. Paper tracks horizontal movement
  with bounded resistance; the destination side sheet accents during dragging.
  Short flicks or a proportional-distance drag turn one page; incomplete and
  interrupted gestures settle back. Vertical scrolling and pinch zoom remain
  native. Reduced motion removes paper travel; supported touch devices may give
  an 8ms vibration on a successful turn (no vibration under reduced motion).
- Both founders wear charcoal shirts with orchid WC prints. Published WebPs
  preserve alpha transparency; supplied original and branded PNGs are retained
  as source material. XRS stays first/higher and Mike second/lower.
- Desktop contact composer is centered; mobile uses a bottom sheet. The localized
  “New message” title bar and icon-only close preserve drafts on dismissal.
  Hero CTA has uniform spacing, a static arrow and no helper text.

### Historical rationale

Canonical ink, paper and orchid tokens remain in `public/assets/whocares.css`. Website
overrides live in `public/assets/styles.css`. Neutral canvas, headings, supporting text,
project labels, list markers, links and rules carry most of the page. Orchid is
reserved for the primary contact CTA, focus/selection and the small founder
signoff. Headline emphasis spans inherit neutral text; hierarchy comes from
existing scale and spacing. Underlines identify neutral links. Scrollbars are
neutral too. Canonical brand/theme assets remain unchanged.

## Website themes and preferences

`public/assets/styles.css` scopes the website's light treatment: warm paper #F7F6F3,
ink #202020, orchid #75468F, secondary text #5E5D59, rules #D5D3CE and hover
surface #ECEBE7. Dark uses ink #0D0D10, paper text #EAE9E6, secondary #B9B8B5,
rules #38383A, hover surface #1B1B1D and orchid #B69ACB. The lavender canvas
and purple-tinted supporting text have been replaced with restrained neutrals.
Native controls inherit the active color scheme. The
approved ink SVG wordmark and WC symbol render in exact #0D0D10 on light,
without color filters. Dark mode uses the paper wordmark and orchid WC symbol.
CSS selects the artwork for explicit themes and no-JS system fallback. CTA hover
uses a deeper orchid in light mode and lighter orchid in dark mode.

Two compact native buttons sit beside the wordmark on mobile and at the header's
trailing edge on desktop. The EN / ΕΛ language button underlines and weights the
current language; the theme button shows a 22px stroked moon to switch to dark,
or sun to switch to light. Both have localized action names and title tooltips,
16px text, 44px targets, existing focus outlines and quiet surface hover fills.
These are action buttons with changing target labels, not ARIA pressed buttons.
A localized “Use system defaults” text button appears below them only after a
manual choice. It resets both settings and returns focus to the theme button.
The header contains only the wordmark on the left and preferences on the right;
section navigation links are omitted. Extra bottom padding makes room for the
reset row when visible. The hero retains the main project-discussion action.
Selections persist in `wcs-language` and `wcs-theme` localStorage keys; storage
exceptions leave in-session operation intact. Invalid values use defaults.
Auto detects only the primary browser language; Greek selects Greek, all other
languages English. System follows live color-scheme changes until overridden.
Language also follows browser `languagechange` in Auto mode.

The synchronous `public/assets/preferences.js` bootstrap runs before styles to apply
the stored/system theme. No content is hidden during startup. Greek text,
document language, title, descriptions, accessible labels and control copy are
translated together. English is the static HTML fallback; without JS, selectors
remain hidden and CSS still follows system appearance. Social crawlers that do
not execute JS receive the English metadata at the single canonical URL.

## Typography

Source Sans 3 is self-hosted in WOFF2 with regular and semibold weights and its
SIL OFL license. A rendered comparison against Manrope favored its compact,
humanist shapes and clearer real-weight hierarchy. Only used weights ship.
Font-display swap preserves visible fallback text; Arial is a fallback only.
Both existing files include Greek glyphs (verified against all authored Greek
copy and observed as custom Source Sans 3 in Chromium); no extra subset is needed.

Six semantic roles: fluid display 44–80px, section 32–40px, item 24–26px semibold,
lead 20px, body 18px and labels 16px. Item weight distinguishes it from section
titles without more arbitrary sizes. Captions use 20px semibold names and 16px
roles. Email uses 26px desktop and 20px mobile; the signoff uses 26px regular.
Headings balance; paragraphs use pretty wrapping. Body measure is capped at 65ch,
hero lead at 43ch. No UI text falls below 16px. Dark-field body leading is 1.6.

**The One Text Voice Rule:** use Source Sans 3 throughout the interface; the logo
is an asset. Introduce no extra decorative face or synthetic weight.

## Layout

1600px maximum page width with fluid 24–96px gutters. The text-only hero leads
with the value proposition and adjacent CTA: one 880px maximum copy block,
an 18ch desktop headline and 60px/80px vertical padding (28px/48px mobile).
Founder portraits appear later in #people, beneath the founder copy and WC signoff,
in a 520px maximum pair with 32px top spacing. The 1122 × 1402 transparent cutouts
are shared across themes, with native lazy loading and reserved 4:5 dimensions.
Each subject breaks above a neutral backing with 24px corners and a fine rule.
Earlier light/dark portrait variants remain in source but are not published.
XRS precedes Mike and sits higher;
Mike is offset 70px desktop, 28px mobile. Names and roles remain visible captions.
At 800px paired content becomes one column while the portraits remain a pair.
Sections use 64px vertical padding, 48px on mobile. Section and item alignment
remains consistent. No horizontal scrolling or fixed-height text containers.

## Components and behavior

### Human-review refinements — October 2026

These current decisions supersede older interaction specifications below:

- Hero prototype: an open two-column composition pairs the existing copy with
  a 460px-max SVG graph (centered below the CTA, 320px max, on mobile). Three
  upright bars change height, settle into the WC verticals, then grow the shared
  baseline and upper C arm. Their union reproduces the approved symbol exactly.
  The 3.9-second sequence runs once; unlabelled axes and dotted guides recede at
  completion. This is conceptual brand artwork, not measured business data.
  Header orchid loading light makes two back-and-forth journeys on the same
  timeline. Pointer/keyboard interaction takes priority; click ripples remain
  independent. Hidden/offscreen hero animation pauses; reduced motion and no JS
  show the completed symbol. The page and CTA remain usable throughout.
- Language uses native EN / ΕΛ radios styled as a segmented toggle, with checked,
  hover, active and keyboard-focus states. Browser/system defaults remain on
  first visit; the manual reset action is removed.
- Hero CTA: uniform 16px padding/gap, static 24px arrow, no helper text.
- “Our work” / “Η δουλειά μας” introduces the folder. Sheets share one grid cell,
  so the longest translated content sets a stable responsive height. Inactive
  sheets are invisible and inert; the browsing hint is removed.
  The desktop folder is capped at 640px with a 280px minimum sheet height
  (252px on phones), preserving a compact folder silhouette. Both tab corners
  use 16px radii. Page changes tuck the outgoing sheet back over 240ms while
  the incoming sheet lifts from the stack and settles over 460ms. Navigation
  can interrupt the sequence; reduced motion switches sheets immediately.
- Project dialogs show the project title beside an accessible icon-only close
  control. Desktop email shares the 720px paper surface, 8px corners and 40px
  inline padding, centered with viewport clearance. On both phone and desktop,
  a 64px mail-window title bar shows an orchid envelope icon, “New message” /
  “Νέο μήνυμα”, and a functional close button that preserves the draft. The
  title bar stays outside the scrolling body; the recipient begins that body.
  This replaces the earlier envelope seam. Phones retain the bottom-sheet layout.
  Profile close controls are also icon-only.
- Hex Mythica has an expanding YouTube embed loaded on request without autoplay,
  removed on collapse/close, and an external fallback. Images use a swipeable
  scroll-snap carousel with labeled controls and a counter. Reduced motion skips
  expansion and scrolling animation.
- Approach scenes cycle every 4.5 seconds while visible, without row controls.
  The matching step has a subtle orchid-tinted background, orchid heading and
  full-contrast description. Color transitions follow the scene changes without
  moving content, and are disabled under reduced motion.
  Reduced motion uses a static scene; all descriptions remain readable.
- Portrait borders respond to hover/focus and presses. Back-to-top uses a
  touch-friendly outlined bubble and arrow. External website links use new tabs.

### Approach working sketch

The three delivery steps remain visible in their ordered list. A compact authored
SVG beneath the section headline illustrates shared understanding (notes and a
focus frame), implementation (connected components), and ongoing ownership
(the same system within a support loop). Neutral strokes and a small orchid
accent follow both themes; captions and control labels support English and Greek.
Hover/focus previews a step; click or tap selects it. Leaving the list restores
the selected step unless a control retains keyboard focus. Native buttons cover
each row, with a small selection dot, 3px focus-surface corners and the shared
focus outline. Copy stays visible without JavaScript, with no inert controls.
Transitions take 180–460ms and are removed for reduced motion. The illustration
is at most 360px wide on desktop. At 800px and below, a compact 100px-high SVG
and caption stay at the top of the viewport while the steps are explored. The
sticky behavior ends with the section and is disabled on screens 500px high or
shorter. Assets are inline SVG in approach.js;
no external imagery is required. Evidence: .impeccable/review/approach-*.png.

### Interactive founder profiles

Founder names in homepage paragraphs and portrait captions are orchid, underlined
links to the same CV dialogs. Event delegation preserves their behavior when
language changes replace translated text; closing restores the clicked name’s
focus. The open profile and editable email greeting do not contain self-links.

Portraits and explicit localized “View profile” links open native, scrollable
CV-style reading dialogs. The profile hierarchy is name, role, business-oriented
summary, expertise, available experience, and external links. Sticky close controls,
Escape, backdrop dismissal and restored trigger focus support keyboard use.
Without dialog support the portraits link directly to the supplied LinkedIn pages.
Dialogs use the existing paper palette, 8px corners, 800px maximum width, and
280ms entrance motion; reduced motion skips it. English and Greek are supported.

The staggered XRS-first/Mike-second composition remains. Portraits lift 6px and
tilt 1 degree on fine-pointer hover, with no idle motion. Mike uses the supplied
transparent cutout over a neutral rounded backing starting 12% below the top;
his hair extends above that backing. XRS uses his supplied transparent cutout with
the same treatment. Both cutouts are shared across themes. Provenance and biography
sources are recorded in docs/assets/images/FOUNDER-PROVENANCE.md; LinkedIn career
history could not be read and is not represented as verified.

### Services

“How we help” uses three plain, short service headings: Custom software,
Automation & AI, and Cloud & reliability. Each has one concrete explanatory
sentence. The existing open two-column section remains; the list is capped at
56ch, with 8px between heading and copy and 36px between services. Greek uses
natural equivalent labels. Category clarity and reading rhythm carry this section.
The hero retains its text-only composition after both visual prototypes were
discarded; no diagrams, icons, cards or additional controls were adopted.

### Selected work folder

Selected work holds Aigistos, Hex Mythica, Private LLM Gateway, Brand Image
Pipelines, and AI Workflows & Agents. A 900px-max folder
shows one project at a time, with clickable exposed side sheets and a live
position count. Small chevrons and a localized pointer/touch hint explain browsing.
Touch swipes left/right turn pages; vertical scrolling and pinch zoom remain native.
Navigation wraps through all five projects. Side sheets are named native buttons;
Left/Right keys work within the folder, retaining focus on the current paper.
Horizontal drags suppress accidental project opening. Search was explicitly removed.
The selected paper is slightly
rotated and offset, with two differently tilted paper edges behind it. Page turns
use 280ms transform/opacity motion, skipped under reduced motion. All five existing
project documents, galleries and links retain their modal behavior. Mobile has
exposed side-sheet tap targets and a 252px minimum paper height, growing with content.

Titles and deliverable labels remain visible before opening. `public/assets/work.css`
owns the geometry; `public/assets/work.js` enhances the original project articles.

- Geometry: folder margin-top 52px, padding 17px, 1px rule and corners
  0/16/16/16px. The tab is 23px tall and 140px wide. The document area uses
  28px 64px 24px padding; the selected sheet has 24px padding and a 208px minimum
  height. Slight alternating tilts and offset back sheets create the stack.
- Depth: sheet shadow `0 8px 18px rgb(0 0 0 / .12)` and reading-dialog shadow
  `0 24px 80px rgb(0 0 0 / .24)`. The backdrop is black at 55% opacity.
- Reading overlay: a centered native modal dialog, at most 720px wide with 24px
  side clearance, maximum height `calc(100dvh - 64px)`, 8px corners and internal
  scrolling. Paper padding is 24px 40px 48px. Native modal focus containment,
  an autofocus close button (44px minimum height, 4px corners), Escape and backdrop
  dismissal support returning to the selected sheet; close restores its focus.
  Background scrolling is locked while reading. The toolbar stays sticky during
  internal scrolling so the labeled close action remains available through the
  gallery, including short landscape viewports. It uses an opaque theme background,
  z-index 2, 16px top padding and top offset −24px (−16px at 600px and below).
- Motion: the selected sheet expands from its measured position into the dialog
  over 440ms (`cubic-bezier(.16,1,.3,1)`) and returns over 220ms
  (`cubic-bezier(.4,0,1,1)`). Sheet transforms transition over 280ms and borders
  over 180ms. Reduced motion skips animations and transitions.
- At 600px and below, folder padding becomes 12px 6px, document-area padding
  24px 36px 20px, and sheet padding 18px with a 252px minimum height.
  The dialog has 12px viewport clearance and corners; paper padding becomes
  16px 24px with at least 32px bottom safe-area clearance. Its project heading
  uses a local 36px mobile exception to the section-title scale.
- Content remains sourced from the existing articles, including attribution and
  explicitly qualitative outcomes; no new claims. Hex Mythica imagery is documented below. Without
  JavaScript or native dialog support, the original English articles stay visible.
  English/Greek opening actions, accessible names, count, toolbar and close label
  follow the language preference; an open document refreshes from the translated
  source articles on language change.

### Contact composer

The composer uses a simple 10px neutral paper lip above the form. Only the
outer shell rises (520ms); it uses overflow:clip and never scrolls. The inner
paper is independently height-constrained, overflow-y:auto, with stable scrollbar
gutter and scroll padding. No inner transform can inflate its scroll extent.
Recipient occupies a full header row, including at 320px. Necessary scrolling
remains available in short/landscape viewports; focus can reveal footer controls.

Close settles down over 180ms using a cancellable animation; reduced motion is
immediate. With files, the primary action
reads “Open text in email app”; only activating it reveals the localized
attach-again notice. No claim is made that an external app opened or sent mail.

The hero CTA opens a native modal dialog anchored to the bottom, up to 760px wide
and 94dvh tall, internally scrollable, with 20px upper corners and safe-area
padding. The CTA arrow shifts only 3px, with no
tracking, launch, inset tile or activation delay. `public/assets/composer.css` owns the
component; `public/assets/composer.js` owns draft state and progressive enhancement.

Subject, message, local file picker/drop area, filenames/sizes/removal, recipient,
copy action and email handoff are fully English/Greek. Native dialog supplies
modal focus containment and Escape; close returns focus to the CTA. Drafts/files
stay in memory across close/reopen, theme and language changes. Only untouched
default fields translate. No persistence, uploads or backend sending.

Open in email app encodes subject/body in a native mailto. Selected files show
an explicit attach-again reminder. File-capable Web Share exposes a separate
Share draft with files action; the destination and recipient autofill are not
guaranteed. Cancel is silent; errors retain the draft and suggest email fallback.
Above a conservative 1800-character encoded URL, a visible explanation instructs
copy/paste and the link opens the recipient only. Copy failure exposes selectable
text. Static/no-dialog fallback remains the English mailto. Modifier clicks retain
native link behavior. The separate contact section remains available.

- Primary action: unified orchid link, 4px corners, 16px semibold label and
  60px minimum height. Hover/focus shifts the unboxed arrow 3px; press shifts 2px.
  Active fill is #633979 light / #CBB4DC dark. Reduced motion removes transforms.
  The localized helper describes drafting before opening an email app. The static
  mailto remains available without JavaScript and for native modifier clicks.
- Header: wordmark left, language/theme buttons right, document-flow positioning
  and keyboard skip link. All section anchors remain available; no section nav.
- Focus: 2px orchid outline, 7px offset. Text links have visible underlines.
- Email: selectable `whocaressoftware@gmail.com`, native mailto, safe wrapping.
- Work: the shared Selected work folder opens existing project articles in a native
  reading dialog; plain articles remain the progressive-enhancement fallback.
  Explicit deliverable labels and qualitative outcomes retain their factual wording.
- Process: semantic ordered list of three genuinely sequential steps.
- Founder signoff: approved 48px standalone orchid WC symbol beside “Who cares?
  We do.”, with a 16px gap. The symbol is decorative to assistive technology;
  the header keeps the supplied paper wordmark.
- Motion: native smooth fragment scrolling, auto under reduced motion. No content
  requires animation or JavaScript.

## Asset and publication rules

Hex Mythica's opened project document includes two locally hosted, uncropped
1280px WebP images sourced at the user's request from GAMES.GG: card/logo artwork
and an isometric game environment. A single-column gallery follows the project
copy, with localized alt text/captions and a source link. Images load only when
the project is opened; the closed folder remains text-only. Provenance is recorded
in `docs/assets/images/HEX-MYTHICA-PROVENANCE.md` and excluded from publication.

Use supplied SVGs without distortion. Final AI-restyled founder portraits were
supplied by the user via clipboard and converted with `cwebp -q 90`. The external
generator and exact prompt are unknown. Preserve both the studio PNG source files
and the earlier original portraits
in the sibling brand repository (`../../brand/brand_main/assets/source/website/`
for the website originals), with internal provenance in `docs/assets/`.
Publish `public/` directly, including
runtime assets and their licenses; keep strategy, review evidence and internal
documentation outside that directory. Local preview serves the same directory.
