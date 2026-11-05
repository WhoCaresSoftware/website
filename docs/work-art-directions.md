# Project cover art

Editorial collage is the selected direction. All six projects have distinct
portrait covers used directly in the desktop tiles, mobile folder and project
dialogs. No preview URL, placeholder sketch, direction switcher, study text,
portrait comparison panel or AI disclosure is part of the website UI.

## Shared direction

Warm monochrome photographic fragments, deep teal overprints, analogue grain,
precise collage edges and amber routing lines. Cover subjects:

- Aigistos: worksites connected to digital records.
- Hex Mythica: invented deck-building cards and a fantasy world.
- Private LLM Gateway: team access to private models.
- Brand Image Pipelines: one brand asset across multiple scenes.
- Coding Agents: planning, coding, tests and review.
- AI Employees: legal and accounting workflows with human oversight.

These are conceptual illustrations, not actual client photographs or interfaces.
The existing Hex Mythica game gallery and its attribution remain unchanged.
Portfolio imagery retains baked-in colors in light and dark themes.

## Implementation

`public/assets/work-art.js` maps stable project IDs to the six selected WebPs and
creates images synchronously. `work.js` uses this same source for both browsing
views and dialogs. There are no preview imports or mutation observers. Legacy
`work-art` query parameters have no effect.

## Source history and provenance

Original PNGs and quality-88 WebPs live in
`public/assets/images/work-editorial/`. Matching `.webp.json` sidecars preserve
generation prompts and reference images. These covers were generated with the
harness-native OpenAI `gpt-image-2` tool.

The first five portrait prompts are recorded in
`public/assets/work-editorial-prompts.json`. The separate Coding Agents and AI
Employees prompts are in `public/assets/work-editorial-ai-prompts.json`; both use
the Brand Image Pipelines portrait as a style reference, avoiding the construction
imagery inherited by the earlier combined cover.

Earlier maquette/paper/editorial studies and the superseded combined AI cover are
retained as source history, not referenced or bundled for the site. Their prompts
remain in `public/assets/work-art-prompts-round-one.json` and
`public/assets/work-art-prompts.json`. Vite bundles only the six selected cover
WebPs, not original PNGs, unreferenced studies or provenance sidecars.
