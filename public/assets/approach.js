/* A winding route that lights each step in turn, then keeps looping; the ordered list stays readable without JavaScript. */
(() => {
  'use strict';
  const section = document.querySelector('#approach');
  const timeline = section?.querySelector('.approach-timeline');
  if (!timeline) return;

  const items = [...timeline.children];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 6500;
  const svg = (className, body) => `<svg class="${className}" viewBox="0 0 360 190" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const sketches = [
    `<g class="sketch-note sketch-note-a"><path class="sketch-paper" d="M38 48h76v86H38z"/><path d="M52 66h38m-38 12h48m-48 12h28"/><path class="sketch-accent" d="m54 112 6 6 14-16"/></g>
     <g class="sketch-note sketch-note-b"><path class="sketch-paper" d="M130 34h76v86h-76z"/><path d="M144 52h40m-40 12h29m-29 12h46"/></g>
     <path class="sketch-connector" d="M116 145h54q18 0 18-18v-1m0 1 5 6m-5-6-5 6"/>
     <g class="sketch-note sketch-note-c"><path class="sketch-paper" d="M224 57h80v87h-80z"/><path d="M239 77h40m-40 12h49m-49 12h30"/><path class="sketch-accent" d="M238 122h36"/></g>
     <path class="sketch-accent" d="M216 45v-8h18m62 0h18v18m0 91v10h-18m-62 0h-18v-18"/>`,
    `<path class="sketch-accent" d="M110 95h38m64 0h38M180 64V38h70"/>
     <g><rect class="sketch-paper" x="46" y="64" width="64" height="62" rx="3"/><path d="M62 83h32m-32 12h23m-23 12h28"/></g>
     <g><rect class="sketch-paper" x="148" y="64" width="64" height="62" rx="3"/><path d="m164 95 10-10m-10 10 10 10m22-10-10-10m10 10-10 10"/></g>
     <g><rect class="sketch-paper" x="250" y="64" width="64" height="62" rx="3"/><path d="m268 96 9 9 19-21"/></g>
     <path class="sketch-connector" d="M46 148v7h268v-7"/><circle class="sketch-accent" cx="255" cy="38" r="5"/>`,
    `<path class="sketch-accent" d="M111 45h148q40 0 40 40v20m-6-7 6 7 6-7M249 151H101q-40 0-40-40V91m-6 7 6-7 6 7"/>
     <g><rect class="sketch-paper" x="111" y="69" width="138" height="58" rx="3"/><path d="M157 69v58m46-58v58m-77-29h16m31-5 7-7 7 7m-14 10 7 7 7-7m30-5 7 7 12-15"/></g>
     <g><circle class="sketch-paper" cx="95" cy="45" r="13"/><path d="m89 45 4 4 8-9"/></g>
     <g><circle class="sketch-paper" cx="265" cy="151" r="13"/><path d="M259 151h12m-6-6v12"/></g>`
  ];
  // Each sketch fills the space across the route from its step's copy.
  items.forEach((item, index) => item.querySelector('.timeline-marker').insertAdjacentHTML('afterend', `<div class="timeline-art" aria-hidden="true">${svg('route-sketch', sketches[index])}</div>`));
  // Normalise accent lengths so CSS can redraw them when the dot arrives.
  timeline.querySelectorAll('.sketch-accent').forEach(accent => accent.setAttribute('pathLength', 1));

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
