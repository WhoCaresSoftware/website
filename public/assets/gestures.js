// Pointer thresholds are physical CSS pixels, independent of text/space scaling.
// Visual dimensions and animation travel belong to foundations.css.
export const dragOptions = {
  threshold: 6,
  axisThreshold: { mouse: 4, touch: 6, pen: 6 },
  filterTaps: true,
  tapsThreshold: 6,
  pointer: { capture: false, keys: false }
};

export const dragEdge = 12;
export const dismissDistance = 28;
export const dismissSwipe = { distance: 14, velocity: .25, duration: 350 };
export const pageTurnDistance = 40;
export const pageFlickDistance = 16;
