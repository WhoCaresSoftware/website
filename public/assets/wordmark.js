/* Enhance the original outlined artwork without substituting a live font. */
(async () => {
  const logo = document.querySelector('.logo');
  try {
    const response = await fetch(logo.querySelector('img').src);
    if (!response.ok) return;
    const source = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
    const paths = source.querySelector('path').getAttribute('d').split(/\s+(?=M)/);
    if (paths.length !== 8) return;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', source.documentElement.getAttribute('viewBox'));
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('wordmark');
    const letters = paths.map(d => {
      const group = document.createElementNS(ns, 'g');
      group.classList.add('wordmark-letter');
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      group.append(path);
      svg.append(group);
      return group;
    });
    logo.append(svg);
    letters.forEach(group => {
      const bounds = group.getBBox();
      const hit = document.createElementNS(ns, 'rect');
      hit.setAttribute('x', bounds.x - 25);
      hit.setAttribute('y', '-800');
      hit.setAttribute('width', bounds.width + 50);
      hit.setAttribute('height', '892');
      hit.setAttribute('fill', 'transparent');
      group.append(hit);
    });
    logo.classList.add('has-wordmark');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let interacting = false;
    let timer;
    const pulses = new Set();
    const hero = document.querySelector('.hero-graph');
    let heroProgress = Number(hero?.dataset.progress ?? 1);
    const loadingLayers = letters.map(letter => {
      const layer = letter.querySelector('path').cloneNode();
      layer.style.fill = 'var(--wcs-accent)';
      layer.style.pointerEvents = 'none';
      layer.style.opacity = '0';
      letter.append(layer);
      return layer;
    });
    const paintLoading = () => {
      const active = heroProgress < 1 && !reduced.matches && visible && !document.hidden && !interacting && !logo.contains(document.activeElement);
      const position = (1 - Math.cos(heroProgress * Math.PI * 4)) * 3.5;
      loadingLayers.forEach((layer, index) => {
        layer.style.opacity = active ? Math.max(0, 1 - Math.abs(index - position) / 1.65) : 0;
      });
    };
    document.addEventListener('wcs:hero-progress', event => {
      const wasLoading = heroProgress < 1;
      heroProgress = event.detail.progress;
      paintLoading();
      if (wasLoading && heroProgress === 1) schedule();
    });
    const stop = () => {
      clearTimeout(timer);
      pulses.forEach(pulse => pulse.layers.forEach(({ animation, layer }) => {
        animation.cancel();
        layer.remove();
      }));
      pulses.clear();
    };
    const hasClickPulse = () => [...pulses].some(pulse => pulse.triggered);
    const pulse = (origin, triggered = false) => {
      clearTimeout(timer);
      const wave = { triggered, layers: [] };
      pulses.add(wave);
      wave.layers = letters.map((letter, index) => {
        const path = letter.querySelector('path');
        // Independent orchid overlays let overlapping waves blend without
        // competing for the base letter's fill or interrupting its hover state.
        const layer = path.cloneNode();
        layer.style.fill = 'var(--wcs-accent)';
        layer.style.pointerEvents = 'none';
        layer.style.opacity = '0';
        letter.append(layer);
        const frames = triggered && index === origin
          ? [{ opacity: 1 }, { opacity: 1, offset: .15 }, { opacity: 0 }]
          : [{ opacity: 0 }, { opacity: 1, offset: triggered ? .18 : .45 }, { opacity: 0 }];
        const animation = layer.animate(frames, {
          duration: triggered ? 480 : 1000,
          delay: Math.abs(index - origin) * (triggered ? 45 : 110),
          easing: triggered ? 'linear' : 'ease-in-out'
        });
        return { layer, animation };
      });
      Promise.all(wave.layers.map(({ animation }) => animation.finished)).then(() => {
        wave.layers.forEach(({ layer }) => layer.remove());
        pulses.delete(wave);
        schedule();
      }).catch(() => {}); // Cancellation already removes every layer in stop().
    };
    const schedule = () => {
      paintLoading();
      if (hasClickPulse() && visible && !document.hidden && !reduced.matches) return;
      stop();
      if (heroProgress < 1 || reduced.matches || !visible || document.hidden || interacting || logo.contains(document.activeElement)) return;
      timer = setTimeout(() => {
        pulse(0);
      }, 4000);
    };
    const interruptIdle = () => { if (!hasClickPulse()) stop(); };
    logo.addEventListener('pointerenter', () => { interacting = true; paintLoading(); interruptIdle(); });
    logo.addEventListener('pointerleave', () => { interacting = false; schedule(); });
    logo.addEventListener('pointerdown', interruptIdle);
    logo.addEventListener('focusin', () => { paintLoading(); interruptIdle(); });
    logo.addEventListener('focusout', schedule);
    logo.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const origin = letters.indexOf(event.target.closest('.wordmark-letter'));
      interruptIdle();
      if (reduced.matches) return;
      pulse(origin < 0 ? 3 : origin, true);
    });
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(logo);
  } catch {
    // The original image remains the fallback if artwork cannot be loaded.
  }
})();
