/* Marks the section in view and folds the header links into a menu on narrow screens. */
(() => {
  'use strict';
  const header = document.querySelector('.top');
  const menu = document.querySelector('.header-menu');
  const links = [...menu.querySelectorAll('.site-nav a')];
  const sections = links.map(link => document.querySelector(link.hash));
  const update = () => {
    // The current section is the last one whose top has passed the header.
    const line = header.getBoundingClientRect().bottom + 24;
    let current = -1;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= line) current = index; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(() => { scheduled = false; update(); }); }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();

  // Narrow screens fold links and settings behind a menu button. It precedes the
  // menu in the DOM so Tab moves from the button into the open panel.
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-controls', menu.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path class="menu-line-top" d="M4 9h16"/><path class="menu-line-bottom" d="M8 15h12"/></svg>';
  menu.before(toggle);
  header.classList.add('has-menu');
  const narrow = matchMedia('(max-width: 1000px)');
  const isOpen = () => menu.classList.contains('is-open');
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
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
  narrow.addEventListener('change', () => setOpen(false));
  addEventListener('wcs:languagechange', localize);
  localize();
})();
