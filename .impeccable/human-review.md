# Human review implementation — 24 October 2026

Language-selector references:
- https://designsystem.digital.gov/patterns/select-a-language/two-languages/
- https://www.w3.org/International/questions/qa-navigation-select
- https://www.w3.org/WAI/ARIA/apg/patterns/radio/

The in-place preference uses native radios with stable EN / ΕΛ segments and
full accessible language names; an on/off switch would misrepresent the choice.

Verified in Chromium at 320, 390, 768 and 1440px in English and Greek: keyboard
language selection, desktop dialog centering, composer draft preservation,
constant folder height across all projects, icon-only close labels, video
expansion/removal, carousel navigation and no horizontal overflow or JS errors.
Also checked dark theme, automatic visible approach cycling and founder closing.
The actual YouTube embed loaded its thumbnail and play control successfully.
Playback and real-device keyboard/share-sheet checks remain human-review items.

Mechanical detector ran once. Section-padding warnings are false positives:
the rendered sections have 64px desktop / 48px mobile padding-block. Remaining
advisories concern existing component radius, shadow and type exceptions; the
new back-to-top bubble radius is documented. git diff --check passed.

Hero diagram is deferred at the user's request. Screenshots: review/human-*.png.
