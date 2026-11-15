// Shared by Vite's named @media expansion and browser matchMedia consumers.
// min-/max- syntax rather than range syntax, which Safari before 16.4 ignores.
// Exclusive bounds step by .02px, below any device-pixel ratio's resolution.
const widths = { minimum: 340, caption: 360, narrow: 480, landscape: 560, phone: 600, stacked: 800, navigation: 1000, work: 1200 };
const shortHeight = 500;
const upTo = width => `(max-width: ${width}px)`;
const above = width => `(min-width: ${width + .02}px)`;
const below = width => `(max-width: ${width - .02}px)`;
const from = width => `(min-width: ${width}px)`;

export const media = {
  minimum: upTo(widths.minimum),
  caption: upTo(widths.caption),
  narrow: upTo(widths.narrow),
  phone: upTo(widths.phone),
  stacked: upTo(widths.stacked),
  wide: above(widths.stacked),
  navigation: upTo(widths.navigation),
  'work-stacked': upTo(widths.work),
  'work-tablet': `${above(widths.phone)} and ${upTo(widths.work)}`,
  'services-stacked': below(widths.navigation),
  'services-columns': from(widths.navigation),
  'short-stacked': `${upTo(widths.stacked)} and (max-height: ${shortHeight}px)`,
  'short-landscape': `${from(widths.landscape)} and ${upTo(widths.navigation)} and (max-height: ${shortHeight}px)`
};
