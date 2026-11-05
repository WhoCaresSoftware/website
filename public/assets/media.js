// Shared by Vite's named @media expansion and browser matchMedia consumers.
const widths = { minimum: 340, caption: 360, narrow: 480, landscape: 560, phone: 600, stacked: 800, navigation: 1000 };
const shortHeight = 500;

export const media = {
  minimum: `(width <= ${widths.minimum}px)`,
  caption: `(width <= ${widths.caption}px)`,
  narrow: `(width <= ${widths.narrow}px)`,
  phone: `(width <= ${widths.phone}px)`,
  stacked: `(width <= ${widths.stacked}px)`,
  wide: `(width > ${widths.stacked}px)`,
  navigation: `(width <= ${widths.navigation}px)`,
  'services-stacked': `(width < ${widths.navigation}px)`,
  'services-columns': `(width >= ${widths.navigation}px)`,
  'short-stacked': `(width <= ${widths.stacked}px) and (height <= ${shortHeight}px)`,
  'short-landscape': `(width >= ${widths.landscape}px) and (width <= ${widths.navigation}px) and (height <= ${shortHeight}px)`
};
