# SVG art direction

These guidelines cover website-owned SVG illustrations and functional icons.
Preserve brand identity geometry, factual content, raster work covers and
third-party marks.

## Visual language

The six service and approach illustrations form one editorial family: layered,
slightly rotated paper silhouettes, solid Deep Teal overprints, open tinted
fields and a fine amber thread. Use a 240 × 160 canvas, non-scaling line weights
and supplied theme roles.

Show software assembled around work, automation connecting inputs to outputs,
resilient infrastructure, clarification, building and continued ownership.
These are conceptual illustrations, not product screenshots.

Services use open 192px-wide compositions; approach uses 240px compositions.
Narrow layouts preserve copy order with smaller, legible artwork.

Only the amber thread animates on reveal; paper stays still. A gently paced
1800ms shaft reveal precedes a 320ms arrowhead draw from tip to wings.
Scaling alpha masks reveal non-scaling ink without dash gaps or static tips.
Reduced motion displays the completed artwork immediately.

## Implementation

- `public/assets/illustrations.js` owns all six vector compositions.
- `public/assets/illustrations.css` owns their shared material and stroke grammar.
- Functional glyphs use a 24 × 24 canvas, 1.5-unit strokes, round caps and joins.
- Do not add grain filters, raster textures, artwork labels or custom color recipes.
- Imagery remains decorative; adjacent localized text carries the meaning.
