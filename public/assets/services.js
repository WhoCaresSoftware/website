import { illustration } from './illustrations.js';
import { projectLinks } from './project-links.js';

/* Conceptual artwork; project documents supply the real evidence. */
(() => {
  const articles = [...document.querySelectorAll('.service-list article')];
  const sketches = ['software', 'automation', 'cloud'];
  const labels = {
    en: ['Explore Aigistos', 'Explore AI Employees', 'Explore the LLM gateway'],
    el: ['Δείτε το Aigistos', 'Δείτε το AI Employees', 'Δείτε την πύλη LLM']
  };
  const links = articles.map((article, index) => {
    const sketch = document.createElement('div');
    sketch.className = 'service-sketch';
    sketch.setAttribute('aria-hidden', 'true');
    sketch.innerHTML = illustration(sketches[index]);
    article.prepend(sketch);
    const link = document.createElement('a');
    link.className = 'service-work-link';
    link.href = projectLinks[['work-aigistos', 'work-employees', 'work-llm'][index]];
    link.innerHTML = '<span></span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
    article.append(link);
    return link;
  });
  const localize = () => links.forEach((link, index) => {
    link.querySelector('span').textContent = labels[document.documentElement.lang === 'el' ? 'el' : 'en'][index];
  });
  localize();
  window.addEventListener('wcs:languagechange', localize);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-revealed');
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  }), { threshold: .8 });
  articles.forEach(article => observer.observe(article.querySelector('.service-sketch')));
  document.addEventListener('visibilitychange', () => {
    articles.forEach(article => article.querySelector('.service-sketch').classList.toggle('is-paused', document.hidden));
  });
})();
