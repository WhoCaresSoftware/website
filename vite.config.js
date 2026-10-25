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
const theme = JSON.parse(readFileSync(fileURLToPath(import.meta.resolve('@whocaressoftware/theme/website.json')), 'utf8'));

export default defineConfig(({ command }) => ({
  root: 'public',
  publicDir: '../static',
  resolve: {
    alias: {
      '/theme-assets': fileURLToPath(import.meta.resolve('@whocaressoftware/theme/css')).replace(/\/whocares\.css$/, '')
    }
  },
  plugins: [handlebars({
    helpers: { brandAsset: name => command === 'serve'
      ? `/@fs/${asset(websiteAsset(name))}`
      : relative(resolve('public'), asset(websiteAsset(name))) },
    context: {
      theme,
      symbolParts: readFileSync(asset('symbol-parts.svg'), 'utf8')
    }
  })],
  build: { outDir: '../dist', emptyOutDir: true, assetsInlineLimit: 0 },
  server: { port: 4174 },
  preview: { port: 4174 }
}));
