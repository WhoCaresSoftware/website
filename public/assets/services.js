/* Small conceptual sketches; project documents supply the real evidence. */
(() => {
  const articles = [...document.querySelectorAll('.service-list article')];
  const sketches = [
    '<rect x="10" y="14" width="84" height="62" rx="4"/><path d="M10 29h84M20 22h2m5 0h2"/><g class="service-pieces"><rect x="20" y="39" width="20" height="27" rx="2"/><path d="M49 41h34M49 51h24M49 61h30"/></g>',
    `<path d="M12 48h36v52H12zM20 60h20m-20 9h14m-14 9h20m-20 9h10"/>
     <path class="service-guide" d="M48 74h24m40 0h15V34h17m-17 40v40h17"/>
     <path class="automation-input service-accent" pathLength="1" d="M48 74h24"/>
     <g class="automation-process"><rect x="72" y="54" width="40" height="40" rx="3"/><path d="M81 46v8m11-8v8m11-8v8m-22 40v8m11-8v8m11-8v8M64 63h8m-8 11h8m-8 11h8m40-22h8m-8 11h8m-8 11h8"/><path class="service-accent" d="M83 81V67l9 7 9-7v14"/></g>
     <path class="automation-output service-accent" pathLength="1" d="M112 74h15V34h17m-17 40v40h17"/>
     <rect x="144" y="12" width="44" height="44" rx="3"/><path d="M144 24h44m-34-16v8m24-8v8"/>
     <rect x="144" y="92" width="44" height="44" rx="3"/><path d="M152 103h27m-27 8h10m-10 9h10"/>
     <path class="automation-done service-accent" pathLength="1" d="m156 38 6 6 13-14m-8 87 5 5 9-11"/>`,
    `<rect x="10" y="50" width="48" height="48" rx="3"/><path d="M10 62h48m-39-6h2m5 0h2M22 73h24m-24 8h16"/>
     <path class="service-guide" d="M58 74h25V30h37M83 74v44h37"/>
     <path class="cloud-primary service-accent" pathLength="1" d="M58 74h25V30h37"/>
     <path class="cloud-backup service-accent" pathLength="1" d="M58 74h25v44h37"/>
     <g class="cloud-server-primary"><rect x="120" y="12" width="66" height="36" rx="3"/><path d="M130 23h28m-28 12h18"/><circle cx="175" cy="30" r="3"/></g>
     <rect x="120" y="100" width="66" height="36" rx="3"/><path d="M130 111h28m-28 12h18"/><circle class="service-accent" cx="175" cy="118" r="3"/>
     <g class="cloud-update"><path d="M143 70a11 11 0 0 1 20-3l2 3m0-7v7h-7M165 78a11 11 0 0 1-20 3l-2-3m0 7v-7h7"/></g>
     <path class="service-accent" d="m23 111 6 6 12-14"/>`
  ];
  const labels = {
    en: ['Explore Aigistos', 'Explore AI workflows', 'Explore the LLM gateway'],
    el: ['Δείτε το Aigistos', 'Δείτε αυτοματισμούς με AI', 'Δείτε την πύλη LLM']
  };
  const links = articles.map((article, index) => {
    const sketch = document.createElement('div');
    sketch.className = 'service-sketch';
    if (index > 0) sketch.classList.add('service-story', index === 1 ? 'automation-story' : 'cloud-story');
    sketch.setAttribute('aria-hidden', 'true');
    sketch.innerHTML = `<svg viewBox="${index ? '0 0 200 148' : '0 0 104 96'}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${sketches[index]}</svg>`;
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
    if (entry.isIntersecting) entry.target.classList.add('is-revealed');
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  }), { threshold: .8 });
  articles.forEach(article => observer.observe(article.querySelector('.service-sketch')));
  document.addEventListener('visibilitychange', () => {
    articles.forEach(article => article.querySelector('.service-sketch').classList.toggle('is-paused', document.hidden));
  });
})();
