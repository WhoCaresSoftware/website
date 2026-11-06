import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const read = path => readFileSync(path, 'utf8');
const json = path => JSON.parse(read(path));
const brand = name => read(new URL(import.meta.resolve(`@whocaressoftware/brand/${name}`)));
const html = read('dist/index.html');
const theme = JSON.parse(brand('theme.json'));
const outputs = readdirSync('dist/assets');

test('website pins one registry release, including its lockfile integrity', () => {
  const { dependencies } = json('package.json');
  const lock = json('package-lock.json');
  const version = dependencies['@whocaressoftware/brand'];
  assert.match(version, /^\d+\.\d+\.\d+$/);
  assert.equal(dependencies['@whocaressoftware/theme'], undefined);
  assert.equal(lock.packages[''].dependencies['@whocaressoftware/brand'], version);
  const entry = lock.packages['node_modules/@whocaressoftware/brand'];
  assert.equal(entry.version, version);
  assert.ok(entry.resolved.startsWith('https://npm.pkg.github.com/'));
  assert.match(entry.integrity, /^sha512-/);
});

test('both browser theme colors come from the selected brand release', () => {
  for (const mode of ['light', 'dark']) {
    assert.ok(html.includes(`content="${theme.modes[mode]['page-background']}" media="(prefers-color-scheme: ${mode})"`));
  }
  assert.doesNotMatch(html, /\{\{|\/@fs\/|node_modules/);
});

test('favicon and both wordmarks ship unchanged from the brand package', () => {
  for (const name of ['favicon', 'website-wordmark-light', 'website-wordmark-dark']) {
    const output = outputs.find(file => file.startsWith(`${name}-`) && file.endsWith('.svg'));
    assert.ok(output, `Missing bundled ${name}`);
    assert.equal(read(`dist/assets/${output}`), brand(`${name}.svg`));
    assert.ok(html.includes(`/assets/${output}`), `Missing HTML reference to ${name}`);
  }
  assert.ok(html.includes(brand('symbol-parts.html').trim()), 'Missing brand hero geometry');
});

test('all authored brand color roles exist in the supplied theme', () => {
  const css = brand('theme.css');
  const declared = new Set([...css.matchAll(/(--wcs-[\w-]+)\s*:/g)].map(match => match[1]));
  for (const file of readdirSync('public/assets').filter(file => file.endsWith('.css'))) {
    for (const [, name] of read(`public/assets/${file}`).matchAll(/var\((--wcs-[\w-]+)/g)) {
      assert.ok(declared.has(name), `${file} consumes unknown brand role ${name}`);
    }
  }
  const bundled = outputs.filter(file => file.endsWith('.css')).map(file => read(`dist/assets/${file}`)).join('\n');
  for (const name of ['--wcs-page-background', '--wcs-foreground', '--wcs-accent']) {
    assert.ok(bundled.includes(`${name}:`), `Theme CSS missing ${name}`);
  }
});
