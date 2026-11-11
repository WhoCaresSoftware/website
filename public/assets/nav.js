/* Marks the section in view and folds the header links into a menu on narrow screens. */
import { media } from './media.js';

(() => {
  'use strict';
  const header = document.querySelector('.top');
  const menu = document.querySelector('.header-menu');
  const links = [...menu.querySelectorAll('.site-nav a')];
  const sections = links.map(link => document.querySelector(link.hash));
  const backgrounds = [...document.querySelectorAll('main > section, footer')];
  const update = () => {
    // Measure where the header rests, not where its hide animation has moved it.
    const top = header.offsetTop - scrollY;
    const bounds = { top, bottom: top + header.offsetHeight, height: header.offsetHeight };
    const backgroundLine = bounds.top + bounds.height / 2;
    const backgroundSection = backgrounds.find(section => {
      const sectionBounds = section.getBoundingClientRect();
      return sectionBounds.top <= backgroundLine && sectionBounds.bottom > backgroundLine;
    });
    header.classList.toggle('over-band', Boolean(backgroundSection?.matches('.services, .approach')));
    // The current section is the last one whose top has passed the header.
    const line = bounds.top + parseFloat(getComputedStyle(sections[0]).scrollMarginTop);
    let current = -1;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= line) current = index; });
    if (Math.ceil(innerHeight + scrollY) >= document.documentElement.scrollHeight) current = sections.length - 1;
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(() => { scheduled = false; update(); }); }
  };
  let scrollTimeout;
  let scrollStart = null;
  const stopScrolling = () => {
    clearTimeout(scrollTimeout);
    scrollStart = null;
    update();
    header.classList.remove('is-scrolling');
  };
  const scheduleScrollEnd = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(stopScrolling, 320);
  };
  // Small nudges, such as a resting finger on a trackpad, leave the header in place.
  addEventListener('scroll', () => {
    if (!header.classList.contains('is-scrolling')) scrollStart ??= scrollY;
    if (scrollY <= 0) header.classList.remove('is-scrolling');
    else if (Math.abs(scrollY - scrollStart) > 6) header.classList.add('is-scrolling');
    scheduleScrollEnd();
    schedule();
  }, { passive: true });
  addEventListener('scrollend', scheduleScrollEnd);
  addEventListener('resize', schedule);
  const measureHeader = () => {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    if (header.classList.contains('menu-open')) {
      header.style.setProperty('--menu-top', `${header.getBoundingClientRect().bottom}px`);
    }
    schedule();
  };
  new ResizeObserver(measureHeader).observe(header);
  measureHeader();
  update();

  // Narrow screens fold the links behind a menu button; language and theme move
  // beside it and show only while the menu is open. The button precedes the menu
  // in the DOM so Tab moves from it into the open panel.
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-controls', menu.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path class="menu-line-top" d="M4 7h16"/><path class="menu-line-middle" d="M4 12h16"/><path class="menu-line-bottom" d="M4 17h16"/></svg>';
  const actions = document.createElement('div');
  actions.className = 'header-actions';
  actions.append(toggle);
  menu.before(actions);
  header.classList.add('has-menu');
  const narrow = matchMedia(media.navigation);
  const preferences = menu.querySelector('.preferences');
  // The open menu ends with the footer's social links, copied so they stay in one place.
  const social = document.querySelector('.footer-channels')?.cloneNode(true);
  if (social) { social.classList.add('menu-channels'); menu.append(social); }
  const placePreferences = () => {
    if (narrow.matches) actions.prepend(preferences);
    else menu.append(preferences);
  };
  // The open menu fills the screen beneath the header bar, so the page behind it
  // stops scrolling and leaves the focus order.
  const behind = [...document.querySelectorAll('main, footer')];
  const isOpen = () => menu.classList.contains('is-open');
  const setOpen = open => {
    if (open) {
      header.style.setProperty('--menu-top', `${header.getBoundingClientRect().bottom}px`);
    }
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-locked', open);
    behind.forEach(element => { element.inert = open; });
  };
  const localize = () => {
    const label = document.documentElement.lang === 'el' ? 'Μενού' : 'Menu';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  };
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', event => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  narrow.addEventListener('change', () => { setOpen(false); placePreferences(); });
  placePreferences();
  addEventListener('wcs:languagechange', localize);
  localize();
})();
