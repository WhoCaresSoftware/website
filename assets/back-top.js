/* One link follows the mobile viewport, then returns to its footer position. */
(() => {
  const link = document.querySelector('.back-top');
  const slot = document.createElement('div');
  slot.className = 'back-top-slot';
  link.before(slot);
  slot.append(link);
  link.draggable = false;
  const mobile = matchMedia('(max-width: 800px)');
  let dismissed = false;
  let gesture;
  let suppressClickUntil = 0;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const floating = mobile.matches && slot.getBoundingClientRect().bottom > innerHeight - 20;
    link.classList.toggle('is-floating', floating);
    link.classList.toggle('is-dismissed', floating && dismissed);
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  mobile.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(document.body);
  link.addEventListener('pointerdown', event => {
    if (!event.isPrimary || !link.classList.contains('is-floating')) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    link.setPointerCapture(event.pointerId);
  });
  link.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      link.setPointerCapture(event.pointerId);
      link.style.translate = `${dx}px 0`;
    }
  });
  const end = event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (event.type === 'pointerup' && Math.abs(dx) >= 36 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      dismissed = true;
      suppressClickUntil = performance.now() + 500;
      link.blur();
    }
    gesture = null;
    link.style.translate = '';
    update();
  };
  link.addEventListener('pointerup', end);
  link.addEventListener('pointercancel', end);
  link.addEventListener('lostpointercapture', end);
  link.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) event.preventDefault();
  });
  update();
})();
