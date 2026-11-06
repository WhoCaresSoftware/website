import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? files(path) : [path];
});
const sources = [...files('public'), ...files('static'), ...(existsSync('docs') ? files('docs') : [])];
const output = files('dist');

test('source and deployment contain no production prompt files or image sidecars', () => {
  for (const path of [...sources, ...output]) {
    assert.doesNotMatch(path, /(?:[^/]*prompts[^/]*|[^/]*-generation|[^/]*\.(?:webp|png|jpe?g))\.json$/i, path);
  }
});

test('source and deployed artwork contain no embedded production prompts', () => {
  for (const path of [...sources, ...output].filter(path => /\.(?:png|webp)$/i.test(path))) {
    const data = readFileSync(path).toString('latin1');
    assert.doesNotMatch(data, /impeccable:prompt/i, path);
    // PNG text keywords remain readable even when their payload is compressed.
    if (path.endsWith('.png')) {
      const buffer = readFileSync(path);
      let offset = 8;
      while (offset + 12 <= buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        assert.ok(offset + length + 12 <= buffer.length, `Invalid PNG chunk: ${path}`);
        if (['tEXt', 'zTXt', 'iTXt'].includes(type)) {
          const keyword = buffer.subarray(offset + 8, offset + 8 + length).toString('latin1').split('\0')[0];
          assert.doesNotMatch(keyword, /prompt/i, path);
        }
        offset += length + 12;
      }
    }
  }
});

test('deployed text contains no workstation paths or local review references', () => {
  for (const path of output.filter(path => /\.(?:html|css|js|json|svg|txt)$/i.test(path))) {
    assert.doesNotMatch(readFileSync(path, 'utf8'), /\/Users\/|\/home\/|\/private\/var\/|\.impeccable\//, path);
  }
});
