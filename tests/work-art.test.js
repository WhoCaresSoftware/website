import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const assets = new URL('../public/assets/', import.meta.url);
const source = readFileSync(new URL('work-art.js', assets), 'utf8');
const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const projects = [...html.matchAll(/<article class="project" id="([^"]+)"/g)].map(match => match[1]);
// Node cannot import Vite's WebP modules. Preserve their paths as the import values.
const executable = source.replace(/^import (\w+) from '([^']+)';$/gm,
  (_, name, path) => `const ${name} = ${JSON.stringify(path)};`)
  .replace('export function projectArtwork', 'function projectArtwork');
const context = vm.createContext({ Image: class {} });
vm.runInContext(executable, context);

test('every real project has a distinct, existing editorial cover', () => {
  assert.equal(projects.length, 6);
  const paths = projects.map(id => context.projectArtwork(id).src);
  assert.equal(new Set(paths).size, projects.length);
  paths.forEach(path => {
    assert.equal(typeof path, 'string');
    assert.ok(existsSync(new URL(path, assets)), `Missing cover: ${path}`);
  });
});

test('cover factory creates independent portrait images for cards and dialogs', () => {
  const card = context.projectArtwork('work-agents');
  const dialog = context.projectArtwork('work-agents', 'document-artwork');
  assert.notEqual(card, dialog);
  assert.equal(card.src, dialog.src);
  assert.equal(card.className, 'project-artwork');
  assert.equal(dialog.className, 'document-artwork');
  assert.equal(card.alt, '');
  assert.equal(card.width, 1024);
  assert.equal(card.height, 1536);
  assert.equal(card.decoding, 'async');
});

test('work uses direct artwork, without placeholder sketches or preview observers', () => {
  const work = readFileSync(new URL('work.js', assets), 'utf8');
  assert.doesNotMatch(work, /project-sketch|projectSketches|drawingCaptions|MutationObserver|work-art-preview|work-art-collection|location\.search/);
  assert.match(work, /visual\.append\(projectArtwork\(project\.id, 'document-artwork'\)\)/);
  assert.doesNotMatch(work, /AI-generated|Artwork study|uncropped portraits/);
  assert.doesNotMatch(html, /work-demo|Demo Project/);
});
