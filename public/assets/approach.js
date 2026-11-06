import { illustration } from './illustrations.js';

/* A winding route that lights each step in turn; the list works without JavaScript. */
(() => {
  'use strict';
  const section = document.querySelector('#approach');
  const timeline = section?.querySelector('.approach-timeline');
  if (!timeline) return;

  const items = [...timeline.children];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 6500;
  const sketches = ['clarify', 'build', 'delivery'];
  // Each sketch fills the space across the route from its step's copy.
  items.forEach((item, index) => item.querySelector('.timeline-marker').insertAdjacentHTML('afterend', `<div class="timeline-art" aria-hidden="true">${illustration(sketches[index], 'route-sketch')}</div>`));

  // The route as cubic segments in a 1000×100 box: dips to steps 1 and 3, rises to step 2.
  const segments = [
    [[0, 50], [90, 50], [90, 76], [166.67, 76]],
    [[166.67, 76], [243.33, 76], [400, 24], [500, 24]],
    [[500, 24], [600, 24], [760, 76], [833.33, 76]],
    [[833.33, 76], [906.67, 76], [930, 50], [1000, 50]]
  ];
  const d = `M${segments[0][0]}` + segments.map(([, a, b, c]) => `C${a} ${b} ${c}`).join('');
  const bezier = ([p0, p1, p2, p3], t) => [0, 1].map(axis => {
    const s = 1 - t;
    return s * s * s * p0[axis] + 3 * s * s * t * p1[axis] + 3 * s * t * t * p2[axis] + t * t * t * p3[axis];
  });
  // Sample by arc length in the SVG viewBox for approximately even travel.
  const samples = [{ length: 0, point: segments[0][0] }];
  const stepLengths = [];
  segments.forEach(segment => {
    for (let i = 1; i <= 48; i++) {
      const point = bezier(segment, i / 48), previous = samples.at(-1);
      samples.push({ length: previous.length + Math.hypot(point[0] - previous.point[0], point[1] - previous.point[1]), point });
    }
    stepLengths.push(samples.at(-1).length);
  });
  const total = samples.at(-1).length;
  const stops = stepLengths.slice(0, 3).map(length => length / total);
  const pointAt = progress => samples.find(sample => sample.length >= progress * total)?.point ?? samples.at(-1).point;

  const route = document.createElement('div');
  route.className = 'approach-route';
  route.setAttribute('aria-hidden', 'true');
  route.innerHTML = `<div class="route-canvas">
    <svg class="route-base" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="${d}"/></svg>
    <svg class="route-lit" viewBox="0 0 1000 100" preserveAspectRatio="none"><defs><linearGradient id="approach-route-gradient" x1="0" x2="1"><stop offset="0" style="stop-color:var(--wcs-plan)"/><stop offset=".5" style="stop-color:var(--wcs-build)"/><stop offset="1" style="stop-color:var(--wcs-run)"/></linearGradient></defs><path d="${d}" stroke="url(#approach-route-gradient)"/></svg>
    <span class="route-dot"></span></div>`;
  items[1].append(route);
  const dot = route.querySelector('.route-dot');
  const lit = route.querySelector('.route-lit');

  let visible = false;
  let elapsed = 0;
  let previousTime;
  let previousLap = 0;
  let frame;

  // Replay the marker ping and sketch entrance as the dot passes a step.
  function pass(item) {
    item.classList.remove('is-passing');
    void item.offsetWidth;
    item.classList.add('is-passing');
  }

  function show(progress) {
    timeline.style.setProperty('--route-progress', progress);
    // Fade the drawn line out at the end of a lap so the next lap starts cleanly.
    lit.style.opacity = reduced.matches ? 1 : Math.min(1, (1 - progress) / .04);
    const [x, y] = pointAt(progress);
    dot.style.left = `${x / 10}%`;
    dot.style.top = `${y}%`;
    dot.style.opacity = reduced.matches ? 0 : Math.min(1, progress / .04, (1 - progress) / .04);
    items.forEach((item, index) => {
      item.classList.toggle('is-reached', progress >= stops[index] - .005);
      const next = stops[index + 1];
      if (next) item.style.setProperty('--segment-progress', Math.min(Math.max((progress - stops[index]) / (next - stops[index]), 0), 1));
    });
  }

  // Every lap replays the whole route from the beginning.
  function advance(time) {
    if (reduced.matches) { schedule(); return; }
    if (previousTime !== undefined) elapsed += Math.min(time - previousTime, 100);
    previousTime = time;
    const lap = (elapsed % duration) / duration;
    stops.forEach((stop, index) => {
      if (lap < previousLap ? previousLap < stop || lap >= stop : previousLap < stop && lap >= stop) pass(items[index]);
    });
    previousLap = lap;
    show(lap);
    frame = requestAnimationFrame(advance);
  }

  function schedule() {
    cancelAnimationFrame(frame);
    previousTime = undefined;
    const running = visible && !document.hidden && !reduced.matches;
    timeline.classList.toggle('is-paused', !running);
    if (reduced.matches) {
      show(1);
    } else if (running) {
      frame = requestAnimationFrame(advance);
    }
  }

  show(reduced.matches ? 1 : 0);
  schedule();
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
    schedule();
  }, { threshold: 0.2 }).observe(section);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
})();
