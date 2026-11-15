// Renders the 1200 × 630 link-preview cards into static/social/ with a local
// Chrome, so headlines use the site's own font and brand assets in both languages.
// Run after changing project names, kinds or artwork: `npm run social`.
// Requires Google Chrome and a dev dependency on puppeteer-core.
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { projects } from './projects.mjs';

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const file = path => new URL(`../${path}`, import.meta.url);
const dataUrl = (path, type) => `data:${type};base64,${readFileSync(path).toString('base64')}`;
const brand = name => fileURLToPath(import.meta.resolve(`@whocaressoftware/brand/${name}`));
const theme = JSON.parse(readFileSync(brand('theme.json'), 'utf8')).modes.light;
const font = weight => dataUrl(file(`public/assets/fonts/wcs-sans-${weight}.woff2`), 'font/woff2');
const symbol = readFileSync(brand('whocares-symbol.svg'), 'utf8');
const wordmark = dataUrl(brand('website-wordmark-light.svg'), 'image/svg+xml');

const home = {
  en: ['Custom software, automation and AI', 'for work that’s stuck.'],
  el: ['Λογισμικό στα μέτρα σας, αυτοματισμοί και AI', 'για δουλειά που έχει κολλήσει.']
};
const studio = { en: 'Independent software studio · Greece', el: 'Ανεξάρτητο στούντιο λογισμικού · Ελλάδα' };

const page = body => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "WCS Sans"; src: url(${font('regular')}); font-weight: 400; }
@font-face { font-family: "WCS Sans"; src: url(${font('semibold')}); font-weight: 600; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; font-family: "WCS Sans", sans-serif; color: ${theme.foreground}; background: ${theme['section-background']}; }
.art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.brand { position: absolute; display: flex; align-items: center; gap: 14px; }
.brand svg { width: 46px; height: 46px; color: ${theme['brand-symbol']}; }
.brand img { height: 30px; }
h1 { font-weight: 400; letter-spacing: -.02em; line-height: 1.04; text-wrap: balance; }
h1 .accent { display: block; color: ${theme.accent}; }
.meta { font-size: 24px; color: ${theme['foreground-muted']}; }
/* Home: the artwork's paper field runs on; words sit clear of the drawing. */
.home { position: absolute; inset: 0; background: #E0E6E4; }
.home .art { inset: 0 auto 0 -90px; width: auto; height: 100%; object-fit: contain; }
.home .brand { top: 56px; left: 790px; }
.home h1 { position: absolute; left: 790px; right: 48px; top: 140px; font-size: 44px; }
.home .meta { position: absolute; left: 790px; right: 48px; bottom: 52px; font-size: 22px; }
/* Projects: full-bleed cover, words on an opaque paper panel. */
.project .panel { position: absolute; left: 0; right: 0; bottom: 0; padding: 36px 56px 44px; background: ${theme['page-background']}; border-top: 6px solid ${theme.accent}; }
.project .brand { position: static; margin-bottom: 22px; }
.project .brand svg { width: 36px; height: 36px; } .project .brand img { height: 24px; }
.project h1 { font-size: 62px; font-weight: 600; letter-spacing: -.025em; }
.project .meta { margin-top: 10px; font-size: 28px; }
</style></head><body>${body}</body></html>`;

const brandMark = `<div class="brand">${symbol.replace(/<svg /, '<svg aria-hidden="true" ')}<img src="${wordmark}" alt=""></div>`;

const cards = [
  ...['en', 'el'].map(lang => ({
    name: `home-${lang}`,
    html: page(`<div class="home"><img class="art" src="${dataUrl(file('masters/social/home-art.png'), 'image/png')}" alt="">${brandMark}<h1>${home[lang][0]}<span class="accent">${home[lang][1]}</span></h1><p class="meta">${studio[lang]}</p></div>`)
  })),
  ...projects.flatMap(project => ['en', 'el'].map(lang => ({
    name: `${project.slug}-${lang}`,
    html: page(`<div class="project"><img class="art" style="height: 70%; object-position: center" src="${dataUrl(file(`public${project.hero}`), 'image/webp')}" alt=""><div class="panel">${brandMark}<h1>${project.name}</h1><p class="meta">${project.kind[lang]}</p></div></div>`)
  })))
];

mkdirSync(file('static/social'), { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
const tab = await browser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const card of cards) {
  await tab.setContent(card.html, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: fileURLToPath(file(`static/social/${card.name}.jpg`)), type: 'jpeg', quality: 85 });
}
await browser.close();
console.log(`Rendered ${cards.length} social cards into static/social/`);
