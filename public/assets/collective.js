/* The roster stays in HTML: the native disclosure works without JavaScript. */
(() => {
  'use strict';
  const collective = document.querySelector('.collective');
  if (!collective) return;
  const stage = document.querySelector('.people-orbit');
  const readout = document.querySelector('.collective-readout');
  const caption = readout?.querySelector('.collective-caption-content');
  const list = collective.querySelector('.collective-members');
  if (!stage || !list || !caption) return;
  const members = [...collective.querySelectorAll('.collective-member')];
  const reset = [];
  const leave = [];
  let active;
  const revealCaption = () => readout.scrollIntoView({
    block: 'nearest',
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });

  members.forEach(member => {
    const button = member.querySelector('.collective-person');
    const role = document.getElementById(button.getAttribute('aria-controls'));
    const slot = role.parentElement;
    const name = button.querySelector('span');
    button.setAttribute('aria-label', name.textContent);
    button.setAttribute('aria-describedby', role.id);
    name.className = 'collective-name';
    slot.prepend(name);
    caption.append(slot);
    let pinned = false;
    const show = visible => {
      if (visible && active && active !== member) reset.forEach(clear => clear());
      if (visible) active = member;
      else if (active === member) active = undefined;
      button.setAttribute('aria-expanded', String(visible));
      slot.hidden = !visible;
    };
    reset.push(() => { pinned = false; show(false); });
    leave.push(() => { if (!pinned && !button.matches(':focus-visible')) show(false); });
    show(false);
    member.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') show(true);
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) { show(true); revealCaption(); }
    });
    button.addEventListener('blur', () => {
      pinned = false;
      show(false);
    });
    button.addEventListener('click', () => {
      pinned = !pinned;
      show(pinned);
      if (pinned) revealCaption();
    });
  });
  stage.parentElement.addEventListener('pointerleave', () => {
    leave.forEach(clear => clear());
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') reset.forEach(clear => clear());
  });

  stage.append(list);
  stage.classList.add('collective-enhanced');
  // Keep the caption in flow: its grid track eases to zero instead of display:none.
  readout.hidden = false;
  const summary = collective.querySelector('summary');
  summary.setAttribute('aria-controls', list.id);
  let generation = 0;
  let animations = [];
  const cancel = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
  };
  const fromTab = button => {
    const origin = summary.getBoundingClientRect();
    const bubble = button.getBoundingClientRect();
    return `translate(${origin.x + origin.width / 2 - bubble.x - bubble.width / 2}px, ${origin.y + origin.height / 2 - bubble.y - bubble.height / 2}px) scale(.15)`;
  };
  const sync = (animate = false) => {
    const current = ++generation;
    cancel();
    const motion = animate && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!collective.open) {
      reset.forEach(clear => clear());
      const hide = () => {
        if (current !== generation || collective.open) return;
        list.hidden = true;
        readout.setAttribute('aria-hidden', 'true');
        stage.classList.remove('collective-open');
        cancel();
      };
      if (!motion || list.hidden) { hide(); return; }
      animations = members.map((member, index) => {
        const button = member.querySelector('.collective-person');
        return button.animate([
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: fromTab(button) }
        ], { duration: 240, delay: index * 12, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });
      });
      Promise.allSettled(animations.map(animation => animation.finished)).then(hide);
      return;
    }
    list.hidden = false;
    readout.setAttribute('aria-hidden', 'false');
    stage.classList.add('collective-open');
    if (!motion) return;
    animations = members.map((member, index) => {
      const button = member.querySelector('.collective-person');
      return button.animate([
        { opacity: 0, transform: fromTab(button), offset: 0 },
        { opacity: 1, transform: 'scale(1.08)', offset: .78 },
        { opacity: 1, transform: 'none', offset: 1 }
      ], { duration: 580, delay: index * 38, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    });
  };
  collective.addEventListener('toggle', () => sync(true));
  sync();
})();
