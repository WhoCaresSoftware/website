/* One link follows the mobile viewport, then returns to its footer position. */
(() => {
  const link = document.querySelector('.back-top');
  const slot = document.createElement('div');
  slot.className = 'back-top-slot';
  link.before(slot);
  slot.append(link);
  link.draggable = false;
  const mobile = matchMedia('(max-width: 800px)');
  let dismissed = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let interrupt = () => {};
  let scheduled = false;
  const update = () => {
    scheduled = false;
    // Use the reserved footer height, not the link's animated wrapping height.
    const floating = mobile.matches && slot.getBoundingClientRect().top + 44 > innerHeight - 20;
    if (!floating) interrupt();
    link.classList.toggle('is-floating', floating);
    link.classList.toggle('is-dismissed', floating && dismissed);
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  mobile.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(document.body);
  import('./vendor/use-gesture/vanilla-10.3.1.mjs').then(({ DragGesture }) => {
    let cancelDrag;
    let settling;
    const reset = (animate = true) => {
      const from = getComputedStyle(link).transform;
      link.style.transform = '';
      link.classList.remove('is-dragging');
      cancelDrag = null;
      settling?.cancel();
      settling = null;
      if (animate && !reduced.matches) settling = link.animate([
        { transform: from }, { transform: 'none' }
      ], { duration: 220, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
    interrupt = () => { cancelDrag?.(); reset(false); };
    window.addEventListener('pointerdown', event => { if (!event.isPrimary && cancelDrag) interrupt(); }, true);
    addEventListener('blur', interrupt);
    document.addEventListener('visibilitychange', () => { if (document.hidden) interrupt(); });
    new DragGesture(link, state => {
      const { first, active, last, canceled, event, movement, swipe, axis, cancel } = state;
      if (canceled || event.type === 'pointercancel' || event.type === 'lostpointercapture') { reset(); return; }
      if (!link.classList.contains('is-floating') || dismissed) { cancel(); return; }
      if (first) {
        settling?.cancel();
        cancelDrag = cancel;
        link.classList.add('is-dragging');
      }
      const index = axis === 'y' ? 1 : 0;
      const distance = movement[index];
      if (active) {
        const travel = distance > 0 ? distance : Math.max(-12, distance * .2);
        link.style.transform = reduced.matches ? 'none' : `translate${index ? 'Y' : 'X'}(${travel}px)`;
      }
      if (last) {
        if (distance >= 28 || swipe[index] > 0) {
          const from = getComputedStyle(link).transform;
          const bounds = link.getBoundingClientRect();
          const exit = Math.max(0, distance) + (index ? innerHeight - bounds.top : innerWidth - bounds.left) + 12;
          reset(false);
          if (reduced.matches) { dismissed = true; update(); }
          else {
            settling = link.animate([
              { transform: from, opacity: 1 },
              { transform: `translate${index ? 'Y' : 'X'}(${exit}px)`, opacity: 0 }
            ], { duration: 180, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });
            settling.onfinish = () => { dismissed = true; reset(false); update(); };
          }
          link.blur();
        } else reset();
      }
    }, {
      axis: 'lock', threshold: 6, axisThreshold: { mouse: 4, touch: 6, pen: 6 },
      filterTaps: true, tapsThreshold: 6, pointer: { capture: false, keys: false },
      swipe: { distance: 14, velocity: .25, duration: 350 }
    });
  }).catch(() => { /* The native back-to-top link remains usable. */ });
  update();
})();
