import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { parseHTML } from 'linkedom';
import { allPages } from './seo.mjs';
import { pageUrl } from './site.mjs';

const pages = allPages().map(page => {
  const file = `dist${page.path}index.html`;
  return { ...page, file, document: parseHTML(readFileSync(file, 'utf8')).document };
});
const attr = (document, selector, name) => document.querySelector(selector)?.getAttribute(name);

test('every page declares its language, its own canonical URL and reciprocal hreflang', () => {
  for (const { lang, project, document, file } of pages) {
    assert.equal(document.documentElement.getAttribute('lang'), lang, file);
    assert.equal(attr(document, 'link[rel="canonical"]', 'href'), pageUrl(lang, project?.slug), file);
    for (const [hreflang, target] of [['en', 'en'], ['el', 'el'], ['x-default', 'en']]) {
      assert.equal(attr(document, `link[rel="alternate"][hreflang="${hreflang}"]`, 'href'), pageUrl(target, project?.slug), `${file} ${hreflang}`);
    }
  }
});

test('titles and descriptions are present, unique and a sensible length', () => {
  const titles = new Set(), descriptions = new Set();
  for (const { document, file } of pages) {
    const title = document.querySelector('title')?.textContent ?? '';
    const description = attr(document, 'meta[name="description"]', 'content') ?? '';
    assert.ok(title.length >= 20 && title.length <= 80, `${file} title length ${title.length}`);
    assert.ok(description.length >= 70 && description.length <= 220, `${file} description length ${description.length}`);
    assert.ok(!titles.has(title), `${file} duplicate title`);
    assert.ok(!descriptions.has(description), `${file} duplicate description`);
    titles.add(title); descriptions.add(description);
    assert.equal(document.querySelectorAll('h1').length, 1, `${file} h1 count`);
  }
});

test('Greek pages contain Greek copy, link within the Greek site and never redirect', () => {
  for (const { lang, document, file } of pages.filter(page => page.lang === 'el')) {
    const text = document.body.textContent;
    assert.match(document.querySelector('h1').textContent + text, /[α-ω]{4,}/, file);
    assert.doesNotMatch(document.documentElement.outerHTML, /data-el(?:-aria|-alt|-title)?=/, `${file} keeps untranslated data-el`);
    assert.doesNotMatch(document.documentElement.outerHTML, /wcs-language/, `${file} carries the language redirect`);
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const href = link.getAttribute('href');
      if (link.closest('#language')) continue;
      assert.ok(href.startsWith('/el/'), `${file} links out of the Greek site: ${href}`);
    }
    assert.equal(attr(document, '#language a[aria-current="page"]', 'hreflang'), lang, file);
  }
});

test('language links on every page lead to the same page in each language', () => {
  for (const { project, document, file } of pages) {
    for (const lang of ['en', 'el']) {
      assert.equal(new URL(attr(document, `#language a[hreflang="${lang}"]`, 'href'), 'https://whocaressoftware.com').href, pageUrl(lang, project?.slug), `${file} ${lang}`);
    }
  }
});

test('structured data parses and names the organization', () => {
  for (const { document, file, project } of pages) {
    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    assert.equal(scripts.length, 1, file);
    const graph = JSON.parse(scripts[0].textContent)['@graph'];
    const organization = graph.find(node => node['@type'] === 'Organization');
    assert.equal(organization?.name, 'Who Cares Software', file);
    assert.ok(graph.some(node => node['@type'] === (project ? 'WebPage' : 'WebSite')), file);
  }
});

test('preview images, the logo and machine-readable files ship', () => {
  for (const { document, file } of pages) {
    const image = attr(document, 'meta[property="og:image"]', 'content');
    assert.ok(existsSync(`dist${new URL(image).pathname}`), `${file} missing ${image}`);
    assert.equal(attr(document, 'meta[name="twitter:card"]', 'content'), 'summary_large_image', file);
    const markdown = attr(document, 'link[rel="alternate"][type="text/markdown"]', 'href');
    assert.ok(existsSync(`dist${markdown}`), `${file} missing ${markdown}`);
  }
  assert.ok(existsSync('dist/whocares-logo-512.png'));
  const llms = readFileSync('dist/llms.txt', 'utf8');
  assert.match(llms, /^# .+/m);
  assert.match(llms, /^> .+/m);
  for (const [, url] of llms.matchAll(/\]\((https:\/\/whocaressoftware\.com[^)]*)\)/g)) {
    assert.ok(existsSync(`dist${new URL(url).pathname}`), `llms.txt links to missing ${url}`);
  }
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const { lang, project } of pages) assert.ok(sitemap.includes(`<loc>${pageUrl(lang, project?.slug)}</loc>`), `sitemap misses ${lang} ${project?.slug ?? 'home'}`);
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /^Sitemap: https:\/\/whocaressoftware\.com\/sitemap\.xml$/m);
});
