import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = name => readFileSync(new URL(`../public/assets/${name}.js`, import.meta.url), 'utf8');

async function setup() {
  const observers = [];
  const frames = new Map();
  let frameId = 0;
  class Element extends EventTarget {
    constructor(attributes = {}) {
      super();
      this.attributes = attributes;
      this.dataset = {};
      this.style = {};
      this.children = [];
      this.classList = { add() {} };
    }
    getAttribute(name) { return this.attributes[name]; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    append(child) { this.children.push(child); }
    querySelector() { return this.children[0]; }
    cloneNode() { return new Element({ ...this.attributes }); }
    getBBox() { return { x: 0, width: 10 }; }
    contains() { return false; }
  }
  const graph = new Element();
  const bars = [40, 20, 50].map(height => new Element({ height, y: 10, width: 5 }));
  const parts = {
    '[data-base]': new Element({ width: 60 }),
    '[data-cap]': new Element({ width: 20, y: 10 }),
    '.hero-axes': new Element(),
    '.hero-guides': new Element()
  };
  graph.querySelectorAll = () => bars;
  graph.querySelector = selector => parts[selector];
  const logo = new Element();
  logo.querySelector = () => ({ src: '/wordmark.svg' });
  const document = new EventTarget();
  document.hidden = false;
  document.querySelector = selector => selector === '.logo' ? logo : graph;
  const reduced = new EventTarget();
  reduced.matches = false;
  const context = vm.createContext({
    document,
    matchMedia: () => reduced,
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(target) { this.target = target; }
    },
    CustomEvent: class extends Event {
      constructor(type, options) { super(type); this.detail = options.detail; }
    },
    fetch: async () => ({ ok: true, text: async () => '' }),
    DOMParser: class {
      parseFromString() {
        return {
          querySelector: () => new Element({ d: Array(8).fill('M0 0').join(' ') }),
          documentElement: new Element({ viewBox: '0 0 100 20' })
        };
      }
    },
    setTimeout: () => 1,
    clearTimeout() {}
  });
  document.createElementNS = (_, tag) => {
    const element = new Element();
    if (tag === 'svg') element.viewBox = { baseVal: { y: 0, height: 20 } };
    return element;
  };
  vm.runInContext(source('hero'), context);
  await vm.runInContext(source('wordmark'), context);
  const intersect = (target, ratio) => observers.find(observer => observer.target === target)
    .callback([{ intersectionRatio: ratio, isIntersecting: ratio > 0 }]);
  intersect(logo, 1);
  const tick = now => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(callback => callback(now));
  };
  const opacity = () => logo.children[0].children.map(letter => Number(letter.children[2].style.opacity));
  return { document, graph, reduced, intersect, tick, opacity };
}

test('paused hero clears header accent and resumes at the same progress', async () => {
  const { graph, intersect, tick, opacity } = await setup();
  assert.ok(opacity().every(value => value === 0));
  intersect(graph, 1);
  tick(0);
  tick(64);
  assert.ok(opacity().some(value => value > 0));
  const progress = graph.dataset.progress;
  intersect(graph, .5);
  assert.equal(graph.dataset.running, 'false');
  assert.ok(opacity().every(value => value === 0));
  tick(128);
  assert.equal(graph.dataset.progress, progress);
  intersect(graph, 1);
  assert.equal(graph.dataset.progress, progress);
  assert.ok(opacity().some(value => value > 0));
});

test('hidden document clears the accent; completed hero never restores loading', async () => {
  const { document, graph, intersect, tick, opacity } = await setup();
  intersect(graph, 1);
  tick(0);
  document.hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.ok(opacity().every(value => value === 0));
  document.hidden = false;
  document.dispatchEvent(new Event('visibilitychange'));
  for (let time = 64; time < 4200; time += 64) tick(time);
  assert.equal(graph.dataset.state, 'complete');
  assert.equal(graph.dataset.running, 'false');
  intersect(graph, 0);
  intersect(graph, 1);
  assert.ok(opacity().every(value => value === 0));
});

test('enabling reduced motion clears loading immediately', async () => {
  const { graph, reduced, intersect, opacity } = await setup();
  intersect(graph, 1);
  assert.ok(opacity().some(value => value > 0));
  reduced.matches = true;
  reduced.dispatchEvent(new Event('change'));
  assert.equal(graph.dataset.state, 'complete');
  assert.ok(opacity().every(value => value === 0));
});
