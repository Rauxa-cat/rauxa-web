import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

// MapLibre 6 starts its worker from a file beside the library, and no Next
// bundler emits it intact: the worker imports its `maplibre-gl-shared.mjs`
// sibling, so both are served side by side from public/. Copied on every dev
// and build to match the installed version.
const dist = path.join(
  path.dirname(
    createRequire(import.meta.url).resolve('maplibre-gl/package.json'),
  ),
  'dist',
);
const dest = path.join(process.cwd(), 'public', 'maps', 'maplibre');

mkdirSync(dest, { recursive: true });
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(path.join(dist, file), path.join(dest, file));
}
