import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync('public/assets/project.js', 'utf8').replace(/^import .*;\n/gm, '');

function setup() {
  const inputEvents = new Map(), formEvents = new Map(), windowEvents = new Map();
  const attributes = new Map();
  const input = {
    valueAsNumber: 100,
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: key => attributes.delete(key),
    addEventListener: (name, listener) => inputEvents.set(name, listener)
  };
  const result = { dataset: {}, textContent: '' };
  const form = {
    hidden: true, reportValidity: () => true,
    addEventListener: (name, listener) => formEvents.set(name, listener)
  };
  const fallback = { hidden: false };
  const document = {
    documentElement: { lang: 'en' },
    getElementById: id => ({ 'fuel-amount': input, 'fuel-result': result })[id] || null,
    querySelector: selector => selector === '.fuel-demo' ? form : selector === '.fuel-static' ? fallback : null,
    querySelectorAll: () => []
  };
  runInNewContext(source, {
    document, Intl, matchMedia: () => ({ matches: false }),
    window: { addEventListener: (name, listener) => windowEvents.set(name, listener) }
  });
  return {
    input, result, form, fallback, attributes,
    edit(amount) { input.valueAsNumber = amount; inputEvents.get('input')(); },
    submit() { formEvents.get('submit')({ preventDefault() {} }); },
    language(value) { document.documentElement.lang = value; windowEvents.get('wcs:languagechange')(); }
  };
}

test('fuel example enhances the static fallback and shows its initial review state', () => {
  const demo = setup();
  assert.equal(demo.form.hidden, false);
  assert.equal(demo.fallback.hidden, true);
  assert.equal(demo.result.dataset.state, 'review');
  assert.equal(demo.attributes.get('aria-invalid'), 'true');
});

test('changing language after editing never restores a stale checked amount', () => {
  const demo = setup();
  demo.edit(50);
  demo.language('el');
  assert.match(demo.result.textContent, /Πατήστε/);
  assert.doesNotMatch(demo.result.textContent, /100/);
  assert.equal(demo.attributes.has('aria-invalid'), false);
  assert.equal(demo.result.dataset.state, undefined);
  demo.language('en');
  assert.match(demo.result.textContent, /Check entry/);
});

test('checked results retain the current amount when translated', () => {
  const demo = setup();
  demo.edit(50);
  demo.submit();
  demo.language('el');
  assert.equal(demo.result.dataset.state, 'within-capacity');
  assert.equal(demo.attributes.get('aria-invalid'), 'false');
  assert.match(demo.result.textContent, /^50 L/);
});

test('invalid form submissions leave the edited amount unchecked', () => {
  const demo = setup();
  demo.edit(NaN);
  demo.form.reportValidity = () => false;
  demo.submit();
  assert.equal(demo.result.dataset.state, undefined);
  assert.match(demo.result.textContent, /Check entry/);
});
