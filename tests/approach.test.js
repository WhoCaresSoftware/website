import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

function setup(reducedMotion = false) {
  const frames = new Map();
  let frameId = 0;
  let intersect;
  const element = () => {
    const classes = new Set();
    return {
      style: { setProperty(name, value) { this[name] = value; } },
      classList: {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        contains: name => classes.has(name),
        toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name)
      },
      setAttribute() {},
      insertAdjacentHTML() {},
      append() {}
    };
  };
  const dot = element();
  const lit = element();
  const route = element();
  route.querySelector = selector => selector === '.route-dot' ? dot : lit;
  const timeline = element();
  timeline.children = Array.from({ length: 3 }, () => {
    const item = element();
    item.querySelector = () => element();
    return item;
  });
  timeline.querySelectorAll = () => [];
  const section = { querySelector: () => timeline };
  const document = new EventTarget();
  document.hidden = false;
  document.querySelector = () => section;
  document.createElement = () => route;
  const reduced = new EventTarget();
  reduced.matches = reducedMotion;
  vm.runInNewContext(readFileSync(new URL('../public/assets/approach.js', import.meta.url), 'utf8'), {
    document,
    matchMedia: () => reduced,
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback) { intersect = ratio => callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]); }
      observe() {}
    }
  });
  const tick = time => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(callback => callback(time));
  };
  return { timeline, document, reduced, frames, intersect, tick, dot, lit };
}

test('flow pauses below its visibility threshold and in hidden tabs', () => {
  const { timeline, document, frames, intersect, tick } = setup();
  intersect(.1);
  assert.equal(frames.size, 0);
  intersect(.2);
  tick(0);
  tick(100);
  const progress = timeline.style['--route-progress'];
  assert.ok(progress > 0);
  intersect(0);
  assert.equal(frames.size, 0);
  intersect(1);
  tick(500);
  assert.equal(timeline.style['--route-progress'], progress);
  document.hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(frames.size, 0);
  assert.ok(timeline.classList.contains('is-paused'));
});

test('flow reaches every step and starts a new lap', () => {
  const { timeline, intersect, tick } = setup();
  intersect(1);
  for (let time = 0; time <= 6400; time += 100) tick(time);
  assert.ok(timeline.children.every(item => item.classList.contains('is-reached')));
  tick(6500);
  assert.equal(timeline.style['--route-progress'], 0);
  assert.ok(timeline.children.every(item => !item.classList.contains('is-reached')));
});

test('reduced motion shows the completed route without scheduling frames', () => {
  for (const initiallyReduced of [false, true]) {
    const { timeline, reduced, frames, intersect, dot, lit } = setup(initiallyReduced);
    intersect(1);
    reduced.matches = true;
    reduced.dispatchEvent(new Event('change'));
    assert.equal(frames.size, 0);
    assert.equal(timeline.style['--route-progress'], 1);
    assert.ok(timeline.children.every(item => item.classList.contains('is-reached')));
    assert.equal(dot.style.opacity, 0);
    assert.equal(lit.style.opacity, 1);
  }
});
