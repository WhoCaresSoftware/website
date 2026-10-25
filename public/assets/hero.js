/* Three working bars become the approved shared-stroke WC, without a logo swap. */
(() => {
  const graph = document.querySelector('.hero-graph');
  if (!graph) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const bars = [...graph.querySelectorAll('[data-bar]')];
  const base = graph.querySelector('[data-base]');
  const cap = graph.querySelector('[data-cap]');
  const axes = graph.querySelector('.hero-axes');
  const guides = graph.querySelector('.hero-guides');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let elapsed = 0;
  let last = null;
  let frame;
  let visible = false;
  let complete = false;
  let magneticFrame;
  let magneticTime;
  let offsets = [0, 0, 0];
  let targets = [0, 0, 0];
  const paintOffsets = () => {
    bars.forEach((bar, i) => {
      const height = [70, 42, 70][i] + offsets[i];
      bar.setAttribute('y', 85 - height);
      bar.setAttribute('height', height);
    });
    cap.setAttribute('y', 15 - offsets[2]);
  };
  const resetMagnet = () => {
    cancelAnimationFrame(magneticFrame);
    magneticFrame = null;
    magneticTime = null;
    offsets = [0, 0, 0];
    targets = [0, 0, 0];
    cap.setAttribute('y', 15);
    if (complete) paintOffsets();
  };
  const settle = now => {
    const dt = magneticTime == null ? 16 : Math.min(now - magneticTime, 64);
    magneticTime = now;
    const follow = 1 - Math.exp(-dt / (targets.some(Boolean) ? 65 : 110));
    offsets = offsets.map((value, i) => Math.abs(targets[i] - value) < .005 ? targets[i] : mix(value, targets[i], follow));
    paintOffsets();
    magneticFrame = offsets.some((value, i) => value !== targets[i]) ? requestAnimationFrame(settle) : null;
    if (!magneticFrame) magneticTime = null;
  };
  const moveToward = values => {
    targets = values;
    if (!magneticFrame) magneticFrame = requestAnimationFrame(settle);
  };
  const duration = 3900;
  const ease = x => 1 - Math.pow(1 - x, 3);
  const mix = (a, b, t) => a + (b - a) * t;
  const clamp = x => Math.max(0, Math.min(1, x));
  const heights = [[25, 52, 36], [58, 25, 45], [38, 59, 28], [70, 42, 70]];
  const announce = progress => {
    graph.dataset.progress = progress;
    document.dispatchEvent(new CustomEvent('wcs:hero-progress', { detail: { progress } }));
  };
  const draw = progress => {
    const stage = Math.min(progress / .64 * 3, 3);
    const index = Math.min(Math.floor(stage), 2);
    const t = ease(stage - index);
    bars.forEach((bar, i) => {
      const height = mix(heights[index][i], heights[index + 1][i], t);
      bar.setAttribute('y', 85 - height);
      bar.setAttribute('height', height);
    });
    const join = ease(clamp((progress - .64) / .28));
    base.setAttribute('width', 78 * join);
    cap.setAttribute('width', 13 + 21 * join);
    cap.setAttribute('opacity', join);
    axes.style.opacity = mix(.65, .3, join);
    guides.style.opacity = mix(.55, .16, join);
    announce(progress);
  };
  const finish = () => {
    cancelAnimationFrame(frame);
    complete = true;
    draw(1);
    graph.dataset.state = 'complete';
  };
  const tick = now => {
    if (last !== null) elapsed += Math.min(now - last, 64);
    last = now;
    if (elapsed >= duration) { finish(); return; }
    draw(elapsed / duration);
    frame = requestAnimationFrame(tick);
  };
  const update = () => {
    resetMagnet();
    cancelAnimationFrame(frame);
    last = null;
    if (reduced.matches) { finish(); return; }
    if (!complete && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };
  if (reduced.matches) finish();
  else { graph.dataset.state = 'playing'; draw(0); }
  // Wait for the whole composition; a sliver below the fold must not spend the reveal.
  new IntersectionObserver(entries => {
    visible = entries[0].intersectionRatio >= .99;
    update();
  }, { threshold: [0, .99] }).observe(graph);
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  finePointer.addEventListener('change', resetMagnet);
  graph.addEventListener('pointermove', event => {
    if (!complete || reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const matrix = graph.querySelector('.hero-symbol').getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const proximity = clamp(1 - Math.max(0, 15 - point.y, point.y - 85) / 24);
    moveToward([17.5, 39.5, 61.5].map(x => 2.8 * Math.exp(-Math.pow((point.x - x) / 19, 2)) * proximity));
  });
  graph.addEventListener('pointerleave', () => { if (complete) moveToward([0, 0, 0]); });
  graph.addEventListener('pointercancel', resetMagnet);
})();
