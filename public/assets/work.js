/* Progressive enhancement: the original project articles remain the content source. */
import { dragOptions, dragEdge, pageTurnDistance, pageFlickDistance } from './gestures.js';
import { media } from './media.js';
import { projectArtwork } from './work-art.js';
import { projectLinks } from './project-links.js';
(() => {
  'use strict';
  const section = document.querySelector('#work');
  if (!section) return;
  const projects = [...section.querySelectorAll('.project')];
  const folder = document.createElement('div');
  folder.className = 'work-folder';
  folder.innerHTML = '<div class="folder-back folder-back-far" aria-hidden="true"><span class="folder-tab"></span></div><div class="folder-back folder-back-near" aria-hidden="true"><span class="folder-tab"></span></div><div class="folder-tab" aria-hidden="true"></div><div class="folder-documents"></div>';
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
  const buttons = projects.map((project, index) => {
    const button = document.createElement('a');
    button.href = projectLinks[project.id];
    button.draggable = false;
    button.className = 'folder-document has-project-artwork';
    // Each card is a poster, a title and a subtitle.
    button.innerHTML = '<span class="document-name"></span><span class="document-kind"></span>';
    button.prepend(projectArtwork(project.id));
    folder.querySelector('.folder-documents').append(button);
    return button;
  });
  // Wider screens show every project as a bento of tiles, six per page; phones keep the folder.
  const grid = document.createElement('ul');
  grid.className = 'work-grid';
  const cards = buttons.map((button, index) => {
    const item = document.createElement('li');
    const card = document.createElement('a');
    card.href = projectLinks[projects[index].id];
    card.draggable = false;
    card.className = 'work-card has-project-artwork';
    card.innerHTML = '<span class="work-caption"><span class="document-name"></span><span class="document-kind"></span></span>';
    card.prepend(projectArtwork(projects[index].id));
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
  const phone = window.matchMedia(media.phone);
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
    folder.querySelector(':scope > .folder-tab').textContent = greek ? 'Η δουλειά μας' : 'Our work';
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
    buttons.forEach((button, index) => {
      button.querySelector('.document-name').textContent = projects[index].querySelector('h3').textContent;
      button.querySelector('.document-kind').textContent = projects[index].querySelector('.project-kind').textContent;
    });
    cards.forEach((card, index) => {
      card.querySelector('.document-name').textContent = projects[index].querySelector('h3').textContent;
      card.querySelector('.document-kind').textContent = projects[index].querySelector('.project-kind').textContent;
    });
    labelPager();
    browse();
  };
  section.querySelector('h2').after(stage);
  showView();
  projects.forEach(project => { project.hidden = true; });
  window.addEventListener('wcs:languagechange', localize);
  localize();
})();
