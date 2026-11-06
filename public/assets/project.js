import './preferences.js';
import './back-top.js';

const greek = () => document.documentElement.lang === 'el';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// This is deliberately an illustrative, local-only check. Nothing is submitted.
const demo = document.querySelector('.fuel-demo');
if (demo) {
  const input = document.getElementById('fuel-amount');
  const result = document.getElementById('fuel-result');
  let checkedAmount = 100;
  let checked = true;
  const renderResult = () => {
    if (!checked) {
      input.removeAttribute('aria-invalid');
      result.textContent = greek() ? 'Πατήστε «Έλεγχος καταχώρισης» για να ελέγξετε την ποσότητα.' : 'Choose “Check entry” to check this amount.';
      delete result.dataset.state;
      return;
    }
    const over = checkedAmount > 80;
    const amount = new Intl.NumberFormat(greek() ? 'el-GR' : 'en-GB').format(checkedAmount);
    result.dataset.state = over ? 'review' : 'within-capacity';
    result.textContent = greek()
      ? (over ? `${amount} L ξεπερνούν τη χωρητικότητα των 80 L. Η καταχώριση χρειάζεται έλεγχο.` : `${amount} L είναι εντός χωρητικότητας. Ο έλεγχος ολοκληρώθηκε.`)
      : (over ? `${amount} L exceeds the 80 L capacity. This entry needs review.` : `${amount} L is within capacity. Check passed.`);
    input.setAttribute('aria-invalid', String(over));
  };
  demo.hidden = false;
  document.querySelector('.fuel-static').hidden = true;
  demo.addEventListener('submit', event => {
    event.preventDefault();
    if (!demo.reportValidity()) return;
    checkedAmount = input.valueAsNumber;
    checked = true;
    renderResult();
  });
  input.addEventListener('input', () => {
    checked = false;
    renderResult();
  });
  window.addEventListener('wcs:languagechange', renderResult);
  renderResult();
}

const film = document.getElementById('load-film');
if (film) {
  const container = document.getElementById('development-film');
  film.hidden = false;
  film.addEventListener('click', () => {
    const open = film.getAttribute('aria-expanded') !== 'true';
    film.setAttribute('aria-expanded', String(open));
    container.hidden = !open;
    container.replaceChildren();
    if (!open) return;
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/r5dA7W-qCfE';
    frame.title = greek() ? 'Hex Mythica — Η πορεία ανάπτυξης' : 'Hex Mythica — Development journey';
    frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    container.append(frame);
  });
  window.addEventListener('wcs:languagechange', () => {
    const frame = container.querySelector('iframe');
    if (frame) frame.title = greek() ? 'Hex Mythica — Η πορεία ανάπτυξης' : 'Hex Mythica — Development journey';
  });
}

// The route always has native anchors; the observer only adds reading position.
const index = [...document.querySelectorAll('.case-index a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      index.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  index.forEach(link => observer.observe(document.querySelector(link.hash)));
}

// One authored moment: the amber thread connects the illustrated fuel entry.
const study = document.querySelector('.erp-study');
if (study && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    study.classList.toggle('thread-arrives', !reduced.matches);
    observer.disconnect();
  }, { threshold: .35 });
  observer.observe(study);
}
