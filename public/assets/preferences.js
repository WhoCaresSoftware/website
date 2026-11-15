/* Runs before styles: resolve the theme without hiding the document. */
(() => {
  'use strict';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const read = (key, allowed, fallback) => {
    try {
      const value = localStorage.getItem(`wcs-${key}`);
      return allowed.includes(value) ? value : fallback;
    } catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(`wcs-${key}`, value); } catch { /* Session choice still works. */ }
  };
  let theme = read('theme', ['system', 'light', 'dark'], 'system');
  let updateControls = () => {};
  // Each meta tag already carries its scheme's color, so only a manual theme
  // needs to override them; system mode restores the authored values without
  // forcing a style recalculation during load.
  const authored = new Map();
  const applyTheme = () => {
    const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
    root.dataset.wcsTheme = resolved;
    const updateChrome = () => {
      const metas = document.querySelectorAll('meta[name="theme-color"]');
      metas.forEach(meta => { if (!authored.has(meta)) authored.set(meta, meta.getAttribute('content')); });
      if (theme === 'system') { metas.forEach(meta => meta.setAttribute('content', authored.get(meta))); return; }
      const color = getComputedStyle(root).getPropertyValue('--wcs-page-background').trim();
      if (color) metas.forEach(meta => meta.setAttribute('content', color));
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateChrome, { once: true });
    else updateChrome();
    updateControls();
  };
  applyTheme();
  media.addEventListener('change', applyTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Each language has its own static page; the build writes the Greek copy.
    // Remember an explicit choice so the first-visit redirect never overrides it.
    const languageControl = document.getElementById('language');
    languageControl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => save('language', link.hreflang));
    });
    const themeControl = document.getElementById('theme');
    updateControls = () => {
      const el = root.lang === 'el';
      const dark = root.dataset.wcsTheme === 'dark';
      const themeLabel = el
        ? (dark ? 'Αλλαγή σε φωτεινή εμφάνιση' : 'Αλλαγή σε σκοτεινή εμφάνιση')
        : (dark ? 'Switch to light theme' : 'Switch to dark theme');
      themeControl.setAttribute('aria-label', themeLabel);
      themeControl.title = themeLabel;
    };
    themeControl.addEventListener('click', () => {
      theme = root.dataset.wcsTheme === 'dark' ? 'light' : 'dark';
      save('theme', theme);
      applyTheme();
    });
    updateControls();
    document.querySelector('.preferences').hidden = false;
    document.querySelectorAll('a[href^="https://"]').forEach(link => { link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  });
})();
