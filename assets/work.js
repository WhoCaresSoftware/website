/* Progressive enhancement: the original project articles remain the content source. */
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
  const buttons = projects.map((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'folder-document';
    button.setAttribute('aria-haspopup', 'dialog');
    button.innerHTML = '<span class="document-name"></span><span class="document-kind"></span><span class="document-open"><span></span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span>';
    button.addEventListener('click', () => open(index));
    folder.querySelector('.folder-documents').append(button);
    return button;
  });
  const browse = () => {
    buttons.forEach((button, index) => {
      button.classList.toggle('is-current', index === current);
      button.inert = index !== current;
      button.setAttribute('aria-hidden', String(index !== current));
    });
    const greek = document.documentElement.lang === 'el';
    folder.querySelector('.folder-back-far .folder-tab').textContent = greek ? 'Άκρως απόρρητο' : 'Top secret';
    folder.querySelector('.folder-back-near .folder-tab').textContent = greek ? 'Εσωτερικά' : 'Internal';
    [previous, next].forEach((button, index) => {
      const neighbor = (current + (index ? 1 : -1) + projects.length) % projects.length;
      const label = `${greek ? (index ? 'Επόμενο έργο' : 'Προηγούμενο έργο') : (index ? 'Next project' : 'Previous project')}: ${projects[neighbor].querySelector('h3').textContent}`;
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    position.textContent = `${current + 1} / ${projects.length}`;
  };
  const turn = direction => {
    const restoreFocus = document.activeElement === buttons[current];
    const outgoing = buttons[current];
    const outgoingTransform = getComputedStyle(outgoing).transform;
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
        { transform: `translate(${direction * -12}px, 10px) rotate(${direction * -2}deg) scale(.97)`, opacity: 0 }
      ], { duration: 240, easing: 'cubic-bezier(.4,0,1,1)' });
      retreat.onfinish = () => outgoing.classList.remove('is-leaving');
      button.animate([
        { transform: `translate(${direction * 18}px, 12px) rotate(${direction * 2}deg) scale(.96)`, opacity: 0, offset: 0 },
        { transform: `translate(${direction * 12}px, -24px) rotate(${direction * 1.2}deg) scale(1.01)`, opacity: 1, offset: .48 },
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
  let gesture;
  let suppressClickUntil = 0;
  documents.addEventListener('pointerdown', event => {
    if (!event.isPrimary) { gesture = null; return; }
    if (event.pointerType === 'mouse') return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
  });
  documents.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesture = null; return; }
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      gesture.horizontal = true;
      documents.setPointerCapture(event.pointerId);
      if (!reduced.matches) buttons[current].style.translate = `${Math.max(-24, Math.min(24, dx * .25))}px 0`;
    }
  });
  const endGesture = event => {
    buttons[current].style.translate = '';
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    if (gesture.horizontal) {
      suppressClickUntil = performance.now() + 400;
      if (event.type === 'pointerup' && Math.abs(dx) >= 40) turn(dx < 0 ? 1 : -1);
    }
    gesture = null;
  };
  documents.addEventListener('pointerup', endGesture);
  documents.addEventListener('pointercancel', endGesture);
  documents.addEventListener('lostpointercapture', event => {
    if (event.target === documents) endGesture(event);
  });
  documents.addEventListener('click', event => {
    if (event.detail !== 0 && performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  const localize = () => {
    const greek = document.documentElement.lang === 'el';
    const label = greek ? 'Δείτε το έργο' : 'Open project';
    buttons.forEach((button, index) => {
      button.querySelector('.document-name').textContent = projects[index].querySelector('h3').textContent;
      button.querySelector('.document-kind').textContent = projects[index].querySelector('.project-kind').textContent;
      button.querySelector('.document-open span').textContent = label;
      button.setAttribute('aria-label', `${label}: ${projects[index].querySelector('h3').textContent}`);
    });
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
    content.append(project.querySelector('.project-kind').cloneNode(true), project.querySelector('.project-copy').cloneNode(true));
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
    const from = buttons[selected].getBoundingClientRect();
    const to = dialog.getBoundingClientRect();
    return `translate(${from.x + from.width / 2 - to.x - to.width / 2}px, ${from.y + from.height / 2 - to.y - to.height / 2}px) scale(${Math.min(from.width / to.width, .96)}, ${Math.min(from.height / to.height, .96)})`;
  };
  const open = index => {
    if (dialog.open) return;
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
    buttons[selected]?.focus({ preventScroll: true });
    closing = false;
  });
  section.querySelector('h2').after(folder);
  projects.forEach(project => { project.hidden = true; });
  window.addEventListener('wcs:languagechange', localize);
  localize();
})();
