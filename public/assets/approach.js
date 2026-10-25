/* A supporting sketch; the complete process remains readable without JavaScript. */
(() => {
  'use strict';
  const section = document.querySelector('#approach');
  const heading = section.querySelector('h2');
  const intro = document.createElement('div');
  intro.className = 'approach-intro';
  heading.before(intro);
  intro.append(heading);
  const sketch = document.createElement('div');
  sketch.className = 'approach-sketch';
  sketch.setAttribute('aria-hidden', 'true');
  sketch.innerHTML = `<svg viewBox="0 0 360 190" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <g class="sketch-scene" data-scene="0">
      <g class="sketch-note sketch-note-a"><path class="sketch-paper" d="M38 48h76v86H38z"/><path d="M52 66h38m-38 12h48m-48 12h28"/><path class="sketch-accent" d="m54 112 6 6 14-16"/></g>
      <g class="sketch-note sketch-note-b"><path class="sketch-paper" d="M130 34h76v86h-76z"/><path d="M144 52h40m-40 12h29m-29 12h46"/></g>
      <path class="sketch-connector" d="M116 145h54q18 0 18-18v-1m0 1 5 6m-5-6-5 6"/>
      <g class="sketch-note sketch-note-c"><path class="sketch-paper" d="M224 57h80v87h-80z"/><path d="M239 77h40m-40 12h49m-49 12h30"/><path class="sketch-accent" d="M238 122h36"/></g>
      <path class="sketch-frame sketch-accent" pathLength="1" d="M216 45v-8h18m62 0h18v18m0 91v10h-18m-62 0h-18v-18"/>
    </g>
    <g class="sketch-scene" data-scene="1">
      <path class="sketch-connection sketch-accent" pathLength="1" d="M110 95h38m64 0h38M180 64V38h70"/>
      <g class="sketch-part sketch-part-a"><rect class="sketch-paper" x="46" y="64" width="64" height="62" rx="3"/><path d="M62 83h32m-32 12h23m-23 12h28"/></g>
      <g class="sketch-part sketch-part-b"><rect class="sketch-paper" x="148" y="64" width="64" height="62" rx="3"/><path d="m164 95 10-10m-10 10 10 10m22-10-10-10m10 10-10 10"/></g>
      <g class="sketch-part sketch-part-c"><rect class="sketch-paper" x="250" y="64" width="64" height="62" rx="3"/><path d="m268 96 9 9 19-21"/></g>
      <path class="sketch-connector" d="M46 148v7h268v-7"/><circle class="sketch-accent" cx="255" cy="38" r="5"/>
    </g>
    <g class="sketch-scene" data-scene="2">
      <path class="sketch-loop sketch-accent" pathLength="1" d="M111 45h148q40 0 40 40v20m-6-7 6 7 6-7M249 151H101q-40 0-40-40V91m-6 7 6-7 6 7"/>
      <g class="sketch-system"><rect class="sketch-paper" x="111" y="69" width="138" height="58" rx="3"/><path d="M157 69v58m46-58v58m-77-29h16m31-5 7-7 7 7m-14 10 7 7 7-7m30-5 7 7 12-15"/></g>
      <circle class="sketch-paper" cx="95" cy="45" r="13"/><path d="m89 45 4 4 8-9"/>
      <circle class="sketch-paper" cx="265" cy="151" r="13"/><path d="M259 151h12m-6-6v12"/>
    </g>
  </svg><p class="sketch-caption"></p>`;
  intro.append(sketch);
  const items = [...section.querySelectorAll('.steps li')];
  let selected = 0;
  const captions = {
    en: ['A shared understanding.', 'The right pieces, working together.', 'A handover. And a way forward.'],
    el: ['Ξεκινάμε από τις ανάγκες σας.', 'Μια λύση που δουλεύει για εσάς.', 'Δίπλα σας και στη συνέχεια.']
  };
  function show(index) {
    section.dataset.approachStep = index;
    items.forEach((item, i) => {
      item.classList.toggle('is-current', i === index);
    });
    sketch.querySelector('.sketch-caption').textContent = captions[document.documentElement.lang === 'el' ? 'el' : 'en'][index];
  }
  const localize = () => show(selected);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let timer;
  const schedule = () => {
    clearInterval(timer);
    if (visible && !document.hidden && !reduced.matches) timer = setInterval(() => { selected = (selected + 1) % items.length; show(selected); }, 4500);
  };
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(section);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  section.classList.add('approach-interactive');
  window.addEventListener('wcs:languagechange', localize);
  localize();
})();
