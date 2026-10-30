import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { relative, resolve } from 'node:path';

const asset = name => fileURLToPath(import.meta.resolve(`@whocaressoftware/brand/${name}`));
const websiteAsset = name => ({
  'whocares-symbol-ink.svg': 'website-symbol-light.svg',
  'whocares-symbol-orchid.svg': 'website-symbol-dark.svg',
  'whocares-wordmark-ink.svg': 'website-wordmark-light.svg',
  'whocares-wordmark-paper.svg': 'website-wordmark-dark.svg'
}[name] || name);
const symbol = readFileSync(asset('website-symbol-light.svg'), 'utf8')
  .replace('role="img" aria-label="whocares symbol"', 'aria-hidden="true"')
  .replace(/fill="#[A-Fa-f0-9]+"/g, 'fill="currentColor"');

export default defineConfig(({ command }) => ({
  root: 'public',
  publicDir: '../static',
  resolve: {
    alias: {
      '/theme-assets': fileURLToPath(import.meta.resolve('@whocaressoftware/theme/css')).replace(/\/whocares\.css$/, '')
    }
  },
  plugins: [handlebars({
    helpers: { brandSymbol: (className, size) => symbol.replace('<svg ', `<svg class="${className}" width="${size}" height="${size}" `),
      brandAsset: name => command === 'serve'
      ? `/@fs/${asset(websiteAsset(name))}`
      : relative(resolve('public'), asset(websiteAsset(name))) },
    context: {
      symbolParts: readFileSync(asset('symbol-parts.html'), 'utf8')
    }
  })],
  build: { outDir: '../dist', emptyOutDir: true, assetsInlineLimit: 0 },
  server: { port: 4174 },
  preview: { port: 4174 }
}));
