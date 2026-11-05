import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { relative, resolve } from 'node:path';
import { media } from './public/assets/media.js';

const asset = name => fileURLToPath(import.meta.resolve(`@whocaressoftware/brand/${name}`));
const symbol = readFileSync(asset('whocares-symbol.svg'), 'utf8')
  .replace('role="img" aria-label="whocares symbol"', 'aria-hidden="true"');

export default defineConfig(({ command }) => ({
  root: 'public',
  publicDir: '../static',
  // CSS variables cannot be used in media conditions. Expand named conditions
  // from the same table used by JavaScript, in development and production.
  css: { postcss: { plugins: [{
    postcssPlugin: 'website-media',
    AtRule: { media(rule) {
      rule.params = rule.params.replace(/\(--([a-z-]+)\)/g, (_, name) => {
        if (!Object.hasOwn(media, name)) throw rule.error(`Unknown website media condition: ${name}`);
        return media[name];
      });
    } }
  }] } },
  plugins: [handlebars({
    helpers: { brandSymbol: (className, size) => symbol.replace('<svg ', `<svg class="${className}" width="${size}" height="${size}" `),
      brandAsset: name => command === 'serve'
      ? `/@fs/${asset(name)}`
      : relative(resolve('public'), asset(name)) },
    context: {
      theme: JSON.parse(readFileSync(asset('theme.json'), 'utf8')),
      symbolParts: readFileSync(asset('symbol-parts.html'), 'utf8')
    }
  })],
  build: { outDir: '../dist', emptyOutDir: true, assetsInlineLimit: 0 },
  server: { port: 4174 },
  preview: { port: 4174 }
}));
