/* Small conceptual sketches; project documents supply the real evidence. */
(() => {
  const articles = [...document.querySelectorAll('.service-list article')];
  const sketches = [
    '<rect x="10" y="14" width="84" height="62" rx="4"/><path d="M10 29h84M20 22h2m5 0h2"/><g class="service-pieces"><rect x="20" y="39" width="20" height="27" rx="2"/><path d="M49 41h34M49 51h24M49 61h30"/></g>',
    '<rect x="6" y="32" width="23" height="28" rx="3"/><rect x="75" y="12" width="23" height="28" rx="3"/><rect x="75" y="58" width="23" height="28" rx="3"/><path d="M29 46h18m12-8 16-12M59 54l16 18"/><path class="service-route" pathLength="1" d="M18 46h35l33-20"/><path class="service-accent" d="m53 34 12 12-12 12-12-12Z"/>',
    '<rect x="5" y="34" width="22" height="26" rx="3"/><rect x="77" y="34" width="22" height="26" rx="3"/><path d="M27 47h50" stroke-dasharray="3 5"/><path d="M27 47V15h50v32M27 47v32h50V47"/><path class="service-route" pathLength="1" d="M16 47h11V15h50v32h11"/><path class="service-accent" d="m44 75 5 5 10-11"/>'
  ];
  const labels = {
    en: ['Explore Aigistos', 'Explore AI workflows', 'Explore the LLM gateway'],
    el: ['Δείτε το Aigistos', 'Δείτε αυτοματισμούς με AI', 'Δείτε την πύλη LLM']
  };
  const links = articles.map((article, index) => {
    const sketch = document.createElement('div');
    sketch.className = 'service-sketch';
    sketch.setAttribute('aria-hidden', 'true');
    sketch.innerHTML = `<svg viewBox="0 0 104 96" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${sketches[index]}</svg>`;
    article.prepend(sketch);
    const link = document.createElement('a');
    link.className = 'service-work-link';
    link.href = '#work';
    link.dataset.projectIndex = [0, 4, 2][index];
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
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-revealed');
    observer.unobserve(entry.target);
  }), { threshold: .8 });
  articles.forEach(article => observer.observe(article.querySelector('.service-sketch')));
})();
