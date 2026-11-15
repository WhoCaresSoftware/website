// Builds the static Greek pages (/el/ and /el/work/<slug>/) from the finished
// English HTML, so search engines index the Greek copy and the site works in
// Greek without JavaScript. English remains the single source document.
import { parseHTML } from 'linkedom';
import { projects } from './projects.mjs';
import { headMeta } from './seo.mjs';
import { greekHome, greekHomeAttributes } from './translations.mjs';

const swapHead = (document, lang, project) => {
  // Replace every tag headMeta owns, then insert the Greek set where the title was.
  const head = document.head;
  const owned = 'title, meta[name="description"], link[rel="canonical"], link[rel="alternate"][hreflang], link[rel="alternate"][type="text/markdown"], link[rel="describedby"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]';
  const anchor = head.querySelector('title');
  const marker = document.createComment('head-meta');
  anchor.before(marker);
  head.querySelectorAll(owned).forEach(node => node.remove());
  const template = document.createElement('template');
  template.innerHTML = headMeta(lang, project);
  marker.replaceWith(...template.content.childNodes);
};

// Same-site links stay inside the Greek site; anchors, assets and external links are untouched.
const localizeLinks = document => {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    if (link.closest('#language')) return;
    const href = link.getAttribute('href');
    if (href.startsWith('/el/') || href.startsWith('/assets/')) return;
    if (href === '/' || href.startsWith('/#') || href.startsWith('/work/')) link.setAttribute('href', `/el${href}`);
  });
};

const markLanguage = (document, lang) => {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('#language a').forEach(link => {
    if (link.getAttribute('hreflang') === lang) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

const applyGreek = (document, project) => {
  if (!project) applyHome(document);
  applyInline(document);
};

const applyHome = document => {
  for (const [selector, value] of Object.entries(greekHome)) {
    const node = document.querySelector(selector);
    if (!node) throw new Error(`Greek homepage selector matched nothing: ${selector}`);
    node.innerHTML = value;
  }
  for (const [selector, attribute, value] of greekHomeAttributes) {
    const node = document.querySelector(selector);
    if (!node) throw new Error(`Greek homepage attribute selector matched nothing: ${selector}`);
    node.setAttribute(attribute, value);
  }
  const cta = document.querySelector('.cta');
  if (cta) {
    const subject = 'Κάτι χρειάζεται να δουλεύει καλύτερα';
    const body = 'Γεια σας Mike και XRS,\r\n\r\nΜε τι ασχολούμαι: \r\nΤι με εμποδίζει: \r\n\r\nΕυχαριστώ,\r\n';
    cta.setAttribute('href', `mailto:whocaressoftware@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }
};

const applyInline = document => {
  // Inline data-el translations, used by project pages and shared footer items.
  document.querySelectorAll('[data-el]').forEach(node => {
    if (node.tagName === 'META') node.setAttribute('content', node.getAttribute('data-el'));
    else node.innerHTML = node.getAttribute('data-el');
    node.removeAttribute('data-el');
  });
  for (const [key, attribute] of [['aria', 'aria-label'], ['alt', 'alt'], ['title', 'title']]) {
    document.querySelectorAll(`[data-el-${key}]`).forEach(node => {
      node.setAttribute(attribute, node.getAttribute(`data-el-${key}`));
      node.removeAttribute(`data-el-${key}`);
    });
  }
};

// Translation never edits artwork, so put each source SVG back byte for byte;
// the parser would otherwise normalise supplied brand geometry (data-bar="").
const svgs = /<svg\b[\s\S]*?<\/svg>/g;
const serialize = (source, document) => {
  const doctype = source.match(/^<!doctype[^>]*>/i)?.[0] ?? '<!doctype html>';
  const output = `${doctype}\n${document.documentElement.outerHTML}\n`;
  const originals = source.match(svgs) ?? [];
  let index = 0;
  const restored = output.replace(svgs, () => originals[index++]);
  if (index !== originals.length) throw new Error('SVG count changed during translation');
  return restored;
};

// The English page is the authored source: mark the current language with a
// string edit so every other byte, including supplied brand geometry, is kept.
export const englishPage = html => {
  const marked = html.replace('hreflang="en" lang="en"', 'hreflang="en" lang="en" aria-current="page"');
  if (marked === html) throw new Error('English language link not found');
  return marked;
};

// The English-only first-visit redirect (see languageRedirect in vite.config.js).
const redirect = /try \{ if \(!localStorage\.getItem\('wcs-language'\)[^\n]*?catch \{\}/;

export const greekPage = (html, project) => {
  if (!redirect.test(html)) throw new Error('Language redirect not found in English page');
  const { document } = parseHTML(html.replace(redirect, ''));
  swapHead(document, 'el', project);
  applyGreek(document, project);
  localizeLinks(document);
  markLanguage(document, 'el');
  return serialize(html, document);
};

// Vite plugin: after the English pages are written, emit their Greek twins.
export function greekPagesPlugin() {
  return {
    name: 'website-greek-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const page of [{ file: 'index.html' }, ...projects.map(project => ({ file: `work/${project.slug}/index.html`, project }))]) {
        const asset = bundle[page.file];
        if (!asset) throw new Error(`Missing built page: ${page.file}`);
        const html = String(asset.source);
        asset.source = englishPage(html);
        this.emitFile({ type: 'asset', fileName: `el/${page.file}`, source: greekPage(html, page.project) });
      }
    }
  };
}
