/* Progressive enhancement: the original project articles remain the content source. */
import { dragOptions, dragEdge, pageTurnDistance, pageFlickDistance } from './gestures.js';
(() => {
  'use strict';
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const section = document.querySelector('#work');
  const projects = [...section.querySelectorAll('.project')];
  const folder = document.createElement('div');
  folder.className = 'work-folder';
  folder.innerHTML = '<div class="folder-back folder-back-far" aria-hidden="true"><span class="folder-tab"></span></div><div class="folder-back folder-back-near" aria-hidden="true"><span class="folder-tab"></span></div><div class="folder-tab" aria-hidden="true"></div><div class="folder-documents"></div>';
  const dialog = document.createElement('dialog');
  dialog.className = 'work-dialog';
  dialog.setAttribute('aria-labelledby', 'work-document-title');
  dialog.innerHTML = '<div class="work-document"><header class="document-toolbar"><h2 id="work-document-title"></h2><button type="button" class="document-close" autofocus><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="document-content"></div></div>';
  document.body.append(dialog);
  let selected = -1;
  let trigger;
  let closing = false;
  let animation;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  const navigation = document.createElement('div');
  navigation.className = 'folder-navigation';
  const previous = document.createElement('button');
  const next = document.createElement('button');
  previous.type = next.type = 'button';
  previous.className = 'folder-side folder-side-previous';
  next.className = 'folder-side folder-side-next';
  [previous, next].forEach((button, index) => {
    button.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${index ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'}"/></svg>`;
  });
  const documents = folder.querySelector('.folder-documents');
  documents.append(previous, next);
  folder.setAttribute('role', 'group');
  folder.setAttribute('aria-labelledby', 'work-title');
  const position = document.createElement('span');
  position.setAttribute('aria-live', 'polite');
  position.setAttribute('aria-atomic', 'true');
  navigation.append(position);
  folder.append(navigation);
  const drawingCaptions = {
    en: ['Worksites. One shared system.', 'A world built to play.', 'Applications. Gateway. Private models.', 'Brand references into imagery.', 'Tasks, tools and human review.', 'Demo placeholder.', 'Demo placeholder.'],
    el: ['Εργοτάξια σε ένα κοινό σύστημα.', 'Ένας κόσμος για παιχνίδι.', 'Εφαρμογές, πύλη, ιδιωτικά μοντέλα.', 'Από το υλικό της μάρκας σε εικόνες.', 'Εργασίες, εργαλεία και ανθρώπινος έλεγχος.', 'Δοκιμαστικό έργο.', 'Δοκιμαστικό έργο.']
  };
  // Concept sketches communicate the work, without claiming implementation detail.
  const projectSketches = [null,
    `<image href="assets/images/hex-mythica-environment.webp" x="62" y="10" width="276" height="157" preserveAspectRatio="xMidYMid meet"/>
     <path class="drawing-connections" d="M54 28V2h26m240 0h26v26M54 150v26h26m240 0h26v-26"/>`,
    `<g class="drawing-paper"><rect x="24" y="24" width="64" height="48" rx="2"/><rect x="24" y="108" width="64" height="48" rx="2"/><path d="M24 38h64m-54-7h3m-3 19h23m-23 10h40M24 122h64m-54-7h3m-3 19h23m-23 10h40"/></g>
     <g class="drawing-connections"><path d="M88 48h35v42h37m-72 42h35V90m117 0h38V48h34m-34 42v42h34"/><circle cx="123" cy="90" r="3"/><circle cx="278" cy="90" r="3"/></g>
     <path class="drawing-paper" d="M160 42h80v96h-80z"/><path d="M171 53h58m-58 74h58"/>
     <g class="drawing-connections"><path d="m200 65 19 8v18c0 13-19 24-19 24s-19-11-19-24V73Z"/><path d="m191 89 6 6 12-14"/></g>
     <g class="drawing-paper"><path d="m312 33 26-13 36 18v30l-26 13-36-18Zm0 84 26-13 36 18v30l-26 13-36-18Z"/><path d="m312 33 36 18 26-13m-26 13v30m-36 36 36 18 26-13m-26 13v30"/></g>`,
    `<g class="drawing-paper"><rect x="22" y="30" width="108" height="120" rx="2"/></g>
     <path class="drawing-guides" d="M22 101h108M80 30v71"/>
     <g class="drawing-connections"><path d="M38 79V63a13 13 0 0 1 26 0v16H51V65"/>
        <path class="drawing-swatch" d="M92 48h24v12H92z"/><path class="drawing-swatch-muted" d="M92 70h24v12H92z"/></g>
     <path d="M36 116h72m-72 9h52m-52 9h34"/>
     <g class="drawing-connections"><path d="M130 90h34m0 0V58h38m-38 32v70h166v-10m-134-97 6 5-6 5m123 91 5-6 5 6"/><circle cx="164" cy="90" r="3"/></g>
     <rect class="drawing-paper" x="202" y="20" width="70" height="112" rx="2"/>
      <path class="drawing-connections-muted" d="M211 86V54a25 25 0 0 1 50 0v32"/>
     <path class="drawing-guides" d="M210 101h54"/>
     <g class="drawing-paper"><path d="M230 52h14v10l5 7v27h-24V69l5-7Z"/></g>
     <path d="M230 58h14m-19 15h24m-24 16h24"/>
     <path class="drawing-connections" d="M234 85v-5a3 3 0 0 1 6 0v5h-3v-4"/>
     <path d="M214 113h31m-31 7h20"/>
     <rect class="drawing-paper" x="282" y="74" width="96" height="76" rx="2"/>
      <path class="drawing-connections-muted" d="M333 139v-35a17 17 0 0 1 34 0v35"/>
     <path class="drawing-guides" d="M290 139h80"/>
     <g class="drawing-paper"><path d="M344 99h12v9l4 6v22h-20v-22l4-6Z"/></g>
     <path d="M344 104h12m-16 14h20m-20 12h20M292 91h26m-26 8h19"/>
     <path class="drawing-connections" d="M347 127v-4a3 3 0 0 1 6 0v4h-3v-3"/>`,
    `<path class="drawing-paper" d="M22 57h62v78H22z"/><path d="M34 72h38m-38 12h26m-26 12h38m-38 12h21"/>
     <g class="drawing-connections"><path d="M84 96h44V46h38m-38 50v50h38m55-100h36v50h35m-71 50h36V96"/><circle cx="128" cy="96" r="3"/><circle cx="257" cy="96" r="3"/></g>
     <g class="drawing-paper"><path d="M166 24h55v44h-55zM166 124h55v44h-55z"/></g>
     <path d="m182 38-8 8 8 8m23-16 8 8-8 8m-10-19-4 22M180 136h27m-27 9h19m-19 10h27"/>
     <circle class="drawing-paper" cx="327" cy="90" r="35"/><circle cx="327" cy="80" r="10"/><path d="M308 109v-6c0-13 38-13 38 0v6"/>
     <g class="drawing-connections"><path d="m349 120 7 7 14-16M327 132v28h-70"/><path d="m263 154-6 6 6 6"/></g>`
  ];
  // DEMO posters: one shared concept for every project — flat geometric shapes in the project's colour
  // and the text colour — until real project artwork exists. The detailed drawings stay in the reading view.
  const posterColours = ['--wcs-accent', '--wcs-palette-amber', '--wcs-palette-blue', '--wcs-palette-rose', '--wcs-palette-green'];
  // Every composition stays inside the centre of the poster, so no tile shape crops it.
  const compositions = [
    '<circle class="poster-line" cx="200" cy="160" r="92"/><circle class="poster-a" cx="200" cy="160" r="70"/><rect class="poster-b" x="110" y="222" width="180" height="14" rx="7"/>',
    '<path class="poster-a" d="M120 225a80 80 0 0 1 160 0Z"/><circle class="poster-b" cx="276" cy="122" r="18"/><path class="poster-line" d="M100 240h200"/>',
    '<rect class="poster-a" x="115" y="105" width="46" height="135" rx="23"/><rect class="poster-b" x="177" y="135" width="46" height="105" rx="23"/><rect class="poster-a poster-soft" x="239" y="160" width="46" height="80" rx="23"/>',
    '<path class="poster-a" d="M130 240V110a130 130 0 0 1 130 130Z"/><rect class="poster-line" x="222" y="100" width="62" height="62" rx="3"/><circle class="poster-b" cx="154" cy="216" r="12"/>',
    '<circle class="poster-a" cx="168" cy="170" r="62"/><circle class="poster-b poster-soft" cx="232" cy="170" r="62"/>',
    '<path class="poster-a" d="M200 96 284 240H116Z"/><circle class="poster-b" cx="200" cy="192" r="28"/>',
    '<circle class="poster-line" cx="200" cy="170" r="88"/><circle class="poster-a" cx="200" cy="170" r="64"/><path class="poster-b" d="M122 163h156v14H122z"/>'
  ];
  const poster = index => `<svg class="project-poster" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="--c: var(${posterColours[index % posterColours.length]})"><rect class="poster-bg" width="400" height="400"/><g class="poster-art">${compositions[index % compositions.length]}</g></svg>`;
  const sketches = [];
  const buttons = projects.map((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'folder-document';
    button.setAttribute('aria-haspopup', 'dialog');
    // Each card is a poster, a title and a subtitle.
    button.innerHTML = '<span class="document-name"></span><span class="document-kind"></span>';
    {
      // Conceptual worksite drawing, not a map of the client's implementation.
      const drawing = document.createElement('span');
      drawing.innerHTML = `<svg class="aigistos-drawing" viewBox="0 0 400 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
        <defs><pattern id="aigistos-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path class="drawing-grid-line" d="M20 0H0V20" fill="none" stroke-width=".5"/></pattern></defs>
        <path class="drawing-grid" fill="url(#aigistos-grid)" stroke="none" d="M10 0h380v180H10z"/>
        <g class="drawing-guides"><path d="M10 10h8m-4-4v8m368-4h8m-4-4v8M10 170h8m-4-4v8m368-4h8m-4-4v8"/></g>
        <g class="drawing-sites">
          <path class="drawing-paper" d="m26 31 32-16 42 21v30L68 82 26 61Z"/>
          <path d="m26 31 42 21 32-16M68 52v30M40 38v30m14-23v30M78 47v16l12-6V41"/>
          <path class="drawing-paper" d="m90 94 32-16 42 21v30l-32 16-42-21Z"/>
          <path d="m90 94 42 21 32-16m-32 16v30m-28-44v30m14-23v30m24-28v16l12-6v-16"/>
          <path class="drawing-paper" d="m24 126 24-12 32 16v24l-24 12-32-16Z"/>
          <path d="m24 126 32 16 24-12m-24 12v24m-20-34v24m30-19v12l7-4v-12"/>
        </g>
        <g class="drawing-connections"><path d="M100 51h94v39h48M164 114h30V90M80 146h114v-32"/><circle cx="194" cy="90" r="3"/><circle cx="194" cy="114" r="3"/></g>
        <g class="drawing-system">
          <rect class="drawing-paper" x="242" y="35" width="130" height="110" rx="2"/>
          <path d="M242 57h130m-118-11h3m6 0h3M279 57v88"/>
          <path class="drawing-guides" d="M252 71h17m-17 12h12m-12 12h17m-17 12h12M291 113h68m-68 12h42"/>
          <g class="drawing-connections"><path d="M291 72h18v25h-18zM316 72h18v25h-18zM341 72h18v25h-18z"/><path d="m296 84 3 3 5-6m17 3 3 3 5-6m17 3 3 3 5-6"/></g>
        </g>
      </svg>`;
      const svg = drawing.querySelector('svg');
      svg.classList.replace('aigistos-drawing', 'project-sketch');
      const gridID = `project-grid-${index}`;
      svg.querySelector('pattern').id = gridID;
      svg.querySelector('.drawing-grid').setAttribute('fill', `url(#${gridID})`);
      if (projectSketches[index]) {
        svg.querySelectorAll('.drawing-sites, .drawing-system, :scope > .drawing-connections').forEach(element => element.remove());
        svg.insertAdjacentHTML('beforeend', projectSketches[index]);
      }
      svg.setAttribute('aria-hidden', 'true');
      sketches.push(svg);
      button.insertAdjacentHTML('afterbegin', poster(index));
    }
    button.addEventListener('click', () => open(index));
    folder.querySelector('.folder-documents').append(button);
    return button;
  });
  // Wider screens show every project as a bento of tiles, six per page; phones keep the folder.
  const grid = document.createElement('ul');
  grid.className = 'work-grid';
  const cards = buttons.map((button, index) => {
    const item = document.createElement('li');
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'work-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.innerHTML = '<span class="document-name"></span><span class="document-kind"></span>';
    card.insertAdjacentHTML('afterbegin', poster(index));
    card.addEventListener('click', () => open(index, card));
    item.append(card);
    grid.append(item);
    return card;
  });
  const overview = document.createElement('div');
  overview.className = 'work-overview';
  overview.setAttribute('role', 'group');
  overview.setAttribute('aria-labelledby', 'work-title');
  const perPage = 6;
  const pages = Math.ceil(cards.length / perPage);
  let page = 0;
  const announcement = document.createElement('span');
  announcement.className = 'work-announcement';
  announcement.setAttribute('aria-live', 'polite');
  // Paging sits under the tiles: progress on the left, arrows on the right.
  const progress = document.createElement('div');
  progress.className = 'work-progress';
  progress.setAttribute('aria-hidden', 'true');
  const segments = Array.from({ length: pages }, (_, index) => {
    const segment = document.createElement('button');
    segment.type = 'button';
    segment.tabIndex = -1;
    segment.addEventListener('click', () => showPage(index));
    return segment;
  });
  progress.append(...segments);
  const pageButtons = [-1, 1].map(direction => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${direction < 0 ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}"/></svg>`;
    button.addEventListener('click', () => showPage(page + direction));
    return button;
  });
  const pager = document.createElement('div');
  pager.className = 'work-pager';
  pager.hidden = pages < 2;
  pager.append(progress, ...pageButtons);
  overview.append(grid, pager, announcement);
  // Each page lays its tiles out as one large, one tall, two small and two wide.
  const showPage = (target, quiet = false) => {
    const previousPage = page;
    page = Math.max(0, Math.min(target, pages - 1));
    [...grid.children].forEach((item, index) => {
      item.hidden = Math.floor(index / perPage) !== page;
      item.dataset.slot = index % perPage;
    });
    pageButtons[0].disabled = page === 0;
    pageButtons[1].disabled = page === pages - 1;
    segments.forEach((segment, index) => segment.classList.toggle('is-current', index === page));
    if (quiet || page === previousPage) return;
    const greek = document.documentElement.lang === 'el';
    announcement.textContent = `${greek ? 'Σελίδα' : 'Page'} ${page + 1} / ${pages}`;
    if (reduced.matches) return;
    // The new page slides in from the side it was asked for, tile by tile.
    const direction = Math.sign(page - previousPage);
    [...grid.children].filter(item => !item.hidden).forEach((item, index) => {
      item.firstElementChild.animate([
        { opacity: 0, transform: `translateX(${direction * 40}px)` },
        { opacity: 1, transform: 'none' }
      ], { duration: 520, delay: index * 40, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    });
  };
  const labelPager = () => {
    const greek = document.documentElement.lang === 'el';
    pageButtons[0].setAttribute('aria-label', greek ? 'Προηγούμενη σελίδα' : 'Previous page');
    pageButtons[1].setAttribute('aria-label', greek ? 'Επόμενη σελίδα' : 'Next page');
  };
  overview.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showPage(page + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let dragged = false;
  // A swipe turns the page and never also opens the tile it started on.
  grid.addEventListener('click', event => {
    if (!dragged) return;
    dragged = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  grid.addEventListener('dragstart', event => event.preventDefault());
  if (pages > 1) import('./vendor/use-gesture/vanilla-10.3.1.mjs').then(({ DragGesture }) => {
    new DragGesture(grid, ({ last, tap, movement: [dx] }) => {
      if (tap || !last || Math.abs(dx) <= 40) return;
      dragged = true;
      showPage(page - Math.sign(dx));
    }, { axis: 'x', filterTaps: true, pointer: { capture: false, keys: false } });
  }).catch(() => { /* Arrows and keyboard still turn the page. */ });
  const stage = document.createElement('div');
  stage.className = 'work-stage';
  stage.append(folder, overview);
  // Phones get the folder; wider screens get the bento, opened on the folder's current project.
  const phone = window.matchMedia('(max-width: 600px)');
  const showView = () => {
    folder.hidden = !phone.matches;
    overview.hidden = phone.matches;
    if (!phone.matches) showPage(Math.floor(current / perPage), true);
  };
  phone.addEventListener('change', showView);
  const browse = () => {
    buttons.forEach((button, index) => {
      button.classList.toggle('is-current', index === current);
      button.inert = index !== current;
      button.setAttribute('aria-hidden', String(index !== current));
    });
    const greek = document.documentElement.lang === 'el';
    folder.querySelector('.folder-back-far .folder-tab').textContent = greek ? 'Άκρως απόρρητο' : 'Top secret';
    folder.querySelector('.folder-back-near .folder-tab').textContent = greek ? 'Εσωτερικά' : 'Internal';
    folder.querySelector(':scope > .folder-tab').textContent = greek ? 'Έργα πελατών' : 'Client projects';
    [previous, next].forEach((button, index) => {
      const neighbor = (current + (index ? 1 : -1) + projects.length) % projects.length;
      const label = `${greek ? (index ? 'Επόμενο έργο' : 'Προηγούμενο έργο') : (index ? 'Next project' : 'Previous project')}: ${projects[neighbor].querySelector('h3').textContent}`;
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    position.textContent = `${current + 1} / ${projects.length}`;
  };
  const turn = (direction, dragTransform) => {
    const restoreFocus = document.activeElement === buttons[current];
    const outgoing = buttons[current];
    const outgoingTransform = dragTransform || getComputedStyle(outgoing).transform;
    buttons.forEach(button => {
      button.getAnimations().forEach(effect => effect.cancel());
      button.classList.remove('is-leaving');
    });
    current = (current + direction + projects.length) % projects.length;
    browse();
    const button = buttons[current];
    if (restoreFocus) button.focus({ preventScroll: true });
    if (button && !reduced.matches) {
      outgoing.classList.add('is-leaving');
      const retreat = outgoing.animate([
        { transform: outgoingTransform, opacity: 1 },
        { transform: `translate(calc(${-direction} * var(--folder-turn-x)), var(--folder-turn-y)) rotate(${direction * -2}deg) scale(.97)`, opacity: 0 }
      ], { duration: 240, easing: 'cubic-bezier(.4,0,1,1)' });
      retreat.onfinish = () => outgoing.classList.remove('is-leaving');
      button.animate([
        { transform: `translate(calc(${direction} * var(--folder-enter-x)), var(--folder-turn-x)) rotate(${direction * 2}deg) scale(.96)`, opacity: 0, offset: 0 },
        { transform: `translate(calc(${direction} * var(--folder-turn-x)), calc(-1 * var(--travel-enter))) rotate(${direction * 1.2}deg) scale(1.01)`, opacity: 1, offset: .48 },
        { transform: getComputedStyle(button).transform, opacity: 1, offset: 1 }
      ], { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  };
  previous.addEventListener('click', () => turn(-1));
  next.addEventListener('click', () => turn(1));
  folder.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    turn(event.key === 'ArrowRight' ? 1 : -1);
  });
  // The library owns pointer tracking, axis intent and tap filtering.
  // Keep normal project buttons available even if the optional module fails to load.
  import('./vendor/use-gesture/vanilla-10.3.1.mjs').then(({ DragGesture }) => {
    let dragged;
    let cancelDrag;
    let dragLimit = 1;
    let dragSamples = [];
    const resetDrag = (settle = true) => {
      if (!dragged) return;
      const button = dragged;
      const from = getComputedStyle(button).transform;
      button.style.transform = '';
      documents.classList.remove('is-dragging');
      delete documents.dataset.direction;
      dragged = null;
      cancelDrag = null;
      dragSamples = [];
      if (settle && !reduced.matches) button.animate([
        { transform: from }, { transform: getComputedStyle(button).transform }
      ], { duration: 240, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
    const interrupt = () => { cancelDrag?.(); resetDrag(); };
    // A second finger belongs to browser zoom, never to project navigation.
    documents.addEventListener('pointerdown', event => {
      if (!event.isPrimary) interrupt();
    }, true);
    window.addEventListener('blur', interrupt);
    document.addEventListener('visibilitychange', () => { if (document.hidden) interrupt(); });
    new DragGesture(documents, state => {
      const { active, first, last, canceled, event, movement: [dx], cancel } = state;
      if (canceled || event.type === 'pointercancel' || event.type === 'lostpointercapture') {
        resetDrag();
        return;
      }
      if (first) {
        buttons.forEach(button => {
          button.getAnimations().forEach(effect => effect.cancel());
          button.classList.remove('is-leaving');
        });
        dragged = buttons[current];
        const bounds = dragged.getBoundingClientRect();
        dragLimit = Math.max(dragEdge, Math.min(dragged.clientWidth * .38, bounds.left - dragEdge, innerWidth - bounds.right - dragEdge));
        cancelDrag = cancel;
        dragSamples = [{ x: 0, time: event.timeStamp }];
        documents.classList.add('is-dragging');
      }
      if (!dragged) return;
      // Measure the recent motion, including the release pause, rather than
      // requiring a fast final pointer event or a full-width pull.
      dragSamples = dragSamples.filter(sample => event.timeStamp - sample.time <= 100);
      dragSamples.push({ x: dx, time: event.timeStamp });
      if (active) {
        const limit = dragLimit;
        const travel = limit * Math.tanh(dx / limit);
        // Direct finger feedback with gentle resistance before the sheet leaves its folder.
        dragged.style.transform = reduced.matches ? 'none' : `translateX(${travel}px) rotate(${travel / limit * 3}deg)`;
        documents.dataset.direction = dx < 0 ? 'next' : 'previous';
      }
      if (last) {
        const threshold = Math.min(pageTurnDistance, dragged.clientWidth * .12);
        const sample = dragSamples[0];
        const elapsed = event.timeStamp - sample.time;
        const velocity = elapsed > 0 ? (dx - sample.x) / elapsed : 0;
        const flick = Math.abs(dx) >= pageFlickDistance && Math.abs(velocity) >= .15 && Math.sign(velocity) === Math.sign(dx);
        const direction = Math.abs(dx) >= threshold || flick ? Math.sign(dx) : 0;
        const from = getComputedStyle(dragged).transform;
        resetDrag(!direction);
        if (direction) {
          turn(-direction, from);
          if (event.pointerType === 'touch' && !reduced.matches) navigator.vibrate?.(8);
        }
      }
    }, {
      ...dragOptions, axis: 'x'
    });
  }).catch(() => { /* Side buttons and keyboard navigation remain available. */ });
  const localize = () => {
    const greek = document.documentElement.lang === 'el';
    const label = greek ? 'Δείτε το έργο' : 'Open project';
    buttons.forEach((button, index) => {
      button.querySelector('.document-name').textContent = projects[index].querySelector('h3').textContent;
      button.querySelector('.document-kind').textContent = projects[index].querySelector('.project-kind').textContent;
      button.setAttribute('aria-label', `${label}: ${projects[index].querySelector('h3').textContent}`);
    });
    cards.forEach((card, index) => {
      card.querySelector('.document-name').textContent = projects[index].querySelector('h3').textContent;
      card.querySelector('.document-kind').textContent = projects[index].querySelector('.project-kind').textContent;
      card.setAttribute('aria-label', `${label}: ${projects[index].querySelector('h3').textContent}`);
    });
    labelPager();
    browse();
    dialog.querySelector('.document-close').setAttribute('aria-label', greek ? 'Κλείσιμο' : 'Close');
    if (selected !== -1) renderDocument();
  };
  const renderDocument = () => {
    const project = projects[selected];
    const content = dialog.querySelector('.document-content');
    content.replaceChildren();
    const heading = dialog.querySelector('#work-document-title');
    heading.textContent = project.querySelector('h3').textContent;
    const visual = document.createElement('figure');
    visual.className = 'document-visual';
    const sketch = sketches[selected].cloneNode(true);
    sketch.setAttribute('aria-hidden', 'true');
    sketch.querySelector('pattern').id = 'document-grid';
    sketch.querySelector('.drawing-grid').setAttribute('fill', 'url(#document-grid)');
    const caption = document.createElement('figcaption');
    caption.textContent = drawingCaptions[document.documentElement.lang === 'el' ? 'el' : 'en'][selected];
    visual.append(sketch, caption);
    content.append(project.querySelector('.project-kind').cloneNode(true), visual, project.querySelector('.project-copy').cloneNode(true));
    if (selected === 0) {
      const greek = document.documentElement.lang === 'el';
      const links = document.createElement('div');
      links.className = 'project-links';
      [
        ['https://www.aigistos.gr', greek ? 'Ιστότοπος Aigistos' : 'Aigistos website'],
        ['https://www.facebook.com/p/%CE%91%CE%99%CE%93%CE%99%CE%A3%CE%A4%CE%9F%CE%A3-%CE%91%CE%95-100042718853927/', greek ? 'Aigistos στο Facebook' : 'Aigistos on Facebook']
      ].forEach(([href, label]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        links.append(link);
      });
      content.append(links);
    }
    if (selected === 1) {
      const greek = document.documentElement.lang === 'el';
      const gallery = document.createElement('div');
      gallery.className = 'project-gallery';
      gallery.setAttribute('role', 'region');
      gallery.setAttribute('aria-label', greek ? 'Εικόνες του Hex Mythica' : 'Hex Mythica images');
      const track = document.createElement('div');
      track.className = 'gallery-track';
      gallery.append(track);
      const images = [
        ['artwork', 728, greek ? 'Εικαστικό του Hex Mythica με τρεις κάρτες και το λογότυπο του παιχνιδιού.' : 'Hex Mythica artwork featuring three illustrated cards and the game logo.', greek ? 'Εικαστικό παιχνιδιού' : 'Game artwork'],
        ['environment', 727, greek ? 'Ισομετρικό περιβάλλον του Hex Mythica με βιβλιοθήκες, τζάκι και έναν χαρακτήρα.' : 'An isometric Hex Mythica environment with bookshelves, a fireplace and a character.', greek ? 'Περιβάλλον παιχνιδιού' : 'Game environment']
      ];
      images.forEach(([name, height, alt, caption]) => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = `assets/images/hex-mythica-${name}.webp`;
        image.width = 1280;
        image.height = height;
        image.alt = alt;
        image.decoding = 'async';
        const label = document.createElement('figcaption');
        label.textContent = caption;
        figure.append(image, label);
        track.append(figure);
      });
      const controls = document.createElement('div');
      controls.className = 'gallery-controls';
      const count = document.createElement('span');
      count.setAttribute('aria-live', 'polite');
      count.textContent = '1 / 2';
      let slide = 0;
      [-1, 1].forEach(direction => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', greek ? (direction < 0 ? 'Προηγούμενη εικόνα' : 'Επόμενη εικόνα') : (direction < 0 ? 'Previous image' : 'Next image'));
        button.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${direction < 0 ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}"/></svg>`;
        button.addEventListener('click', () => track.scrollTo({ left: ((slide + direction + 2) % 2) * track.clientWidth, behavior: reduced.matches ? 'instant' : 'smooth' }));
        controls.append(button);
      });
      controls.insertBefore(count, controls.lastChild);
      track.addEventListener('scroll', () => { slide = Math.round(track.scrollLeft / track.clientWidth); count.textContent = `${slide + 1} / 2`; });
      gallery.append(controls);
      const videoLink = content.querySelector('.text-link');
      const videoID = new URL(videoLink.href).searchParams.get('v');
      const disclosure = document.createElement('button');
      disclosure.type = 'button';
      disclosure.className = 'video-toggle';
      disclosure.textContent = greek ? 'Δείτε την πορεία ανάπτυξης' : 'Watch the development journey';
      disclosure.setAttribute('aria-expanded', 'false');
      disclosure.setAttribute('aria-controls', 'project-video');
      const video = document.createElement('div');
      video.className = 'project-video';
      video.id = 'project-video';
      video.inert = true;
      video.innerHTML = '<div class="video-inner"></div>';
      disclosure.addEventListener('click', () => {
        const expanded = disclosure.getAttribute('aria-expanded') !== 'true';
        disclosure.setAttribute('aria-expanded', String(expanded));
        video.classList.toggle('is-open', expanded);
        video.inert = !expanded;
        const inner = video.firstElementChild;
        inner.replaceChildren();
        if (expanded) {
          const frame = document.createElement('iframe');
          frame.src = `https://www.youtube-nocookie.com/embed/${videoID}`;
          frame.title = 'Hex Mythica — ' + (greek ? 'Η πορεία ανάπτυξης' : 'Development journey');
          frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
          frame.allowFullscreen = true;
          frame.referrerPolicy = 'strict-origin-when-cross-origin';
          inner.append(frame);
        }
      });
      videoLink.replaceWith(disclosure, video);
      const videoFallback = document.createElement('a');
      videoFallback.href = `https://www.youtube.com/watch?v=${videoID}`;
      videoFallback.className = 'video-fallback';
      videoFallback.textContent = greek ? 'Αν δεν εμφανίζεται το βίντεο, δείτε το στο YouTube' : 'Video not loading? Watch on YouTube';
      video.after(videoFallback);
      const source = document.createElement('a');
      source.href = 'https://games.gg/hex-mythica/';
      source.className = 'gallery-source';
      source.textContent = greek ? 'Πηγή εικόνων: GAMES.GG' : 'Image source: GAMES.GG';
      gallery.append(source);
      content.append(gallery);
    }
    content.querySelectorAll('a[href^="https://"]').forEach(link => { link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  };
  const origin = () => {
    const from = (trigger || buttons[selected]).getBoundingClientRect();
    const to = dialog.getBoundingClientRect();
    return `translate(${from.x + from.width / 2 - to.x - to.width / 2}px, ${from.y + from.height / 2 - to.y - to.height / 2}px) scale(${Math.min(from.width / to.width, .96)}, ${Math.min(from.height / to.height, .96)})`;
  };
  const open = (index, source = buttons[index]) => {
    if (dialog.open) return;
    trigger = source;
    selected = index;
    renderDocument();
    dialog.showModal();
    document.documentElement.classList.add('work-reading');
    dialog.scrollTop = 0;
    buttons[index].classList.add('is-selected');
    if (!reduced.matches) animation = dialog.animate([
      { transform: origin(), opacity: .35 },
      { transform: 'none', opacity: 1 }
    ], { duration: 440, easing: 'cubic-bezier(.16,1,.3,1)' });
  };
  const close = async () => {
    if (closing || !dialog.open) return;
    closing = true;
    animation?.cancel();
    if (!reduced.matches) {
      animation = dialog.animate([{ transform: 'none', opacity: 1 }, { transform: origin(), opacity: 0 }], { duration: 220, easing: 'cubic-bezier(.4,0,1,1)' });
      await animation.finished.catch(() => {});
    }
    dialog.close();
  };
  dialog.querySelector('.document-close').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  let backdropPress = false;
  dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
  dialog.addEventListener('click', event => { if (backdropPress && event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    dialog.querySelectorAll('iframe').forEach(frame => frame.remove());
    animation?.cancel();
    document.documentElement.classList.remove('work-reading');
    buttons[selected]?.classList.remove('is-selected');
    trigger?.focus({ preventScroll: true });
    closing = false;
  });
  section.querySelector('h2').after(stage);
  showView();
  projects.forEach(project => { project.hidden = true; });
  window.addEventListener('wcs:languagechange', localize);
  document.addEventListener('click', event => {
    const link = event.target.closest('.service-work-link[data-project-index]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const index = Number(link.dataset.projectIndex);
    if (!projects[index]) return;
    event.preventDefault();
    open(index, link);
  });
  localize();
})();
