// scripts/test-jsdom.mjs
//
// Reproduce-then-fix proof for the legacy-browser crash described in the
// task. jsdom naturally lacks IntersectionObserver, queueMicrotask,
// AbortController, and the PointerEvent constructor — the same gaps as
// Safari <= 12 / old Android WebView — so it's a reasonable stand-in for
// "old browser" here. We stub only window.fetch and window.matchMedia,
// which are jsdom-specific gaps that exist in every real browser (including
// old Safari 12), so stubbing them doesn't hide anything the real bug fix
// needs to address.
//
// Usage:
//   node scripts/test-jsdom.mjs before   # bundles WITHOUT the polyfill import, expects a crash
//   node scripts/test-jsdom.mjs after    # bundles WITH the polyfill import, expects a clean mount

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const mode = process.argv[2];
if (mode !== 'before' && mode !== 'after') {
  console.error('Usage: node scripts/test-jsdom.mjs <before|after>');
  process.exit(2);
}

const repoRoot = path.resolve(new URL('.', import.meta.url).pathname, '..');
const workDir = mkdtempSync(path.join(tmpdir(), 'compat-test-'));

try {
  let entrySource = readFileSync(path.join(repoRoot, 'src/main.tsx'), 'utf-8');
  if (mode === 'before') {
    // Simulate "the bug is not fixed yet" by stripping the polyfill import,
    // without touching the real src/main.tsx on disk.
    entrySource = entrySource.replace(/^import\s+['"]\.\/polyfills['"];\s*\n/m, '');
    if (entrySource.includes("'./polyfills'")) {
      throw new Error('Failed to strip the polyfills import for the "before" run');
    }
  }

  const entryPath = path.join(repoRoot, 'src', '__compat_test_entry__.tsx');
  writeFileSync(entryPath, entrySource);

  const bundlePath = path.join(workDir, 'bundle.js');
  try {
    execSync(
      [
        'npx esbuild',
        JSON.stringify(entryPath),
        '--bundle',
        '--format=iife',
        '--define:process.env.NODE_ENV=\'"production"\'',
        '--jsx=automatic',
        '--loader:.css=empty',
        `--outfile=${JSON.stringify(bundlePath)}`,
      ].join(' '),
      { cwd: repoRoot, stdio: 'pipe' }
    );
  } finally {
    rmSync(entryPath, { force: true });
  }

  const bundleCode = readFileSync(bundlePath, 'utf-8');

  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    runScripts: 'outside-only',
    url: 'https://omidadli01.site/',
  });
  const { window } = dom;

  // jsdom-specific gaps that exist in every real browser too (including old
  // Safari) — stub them so the app's own (unrelated) use of fetch/matchMedia
  // doesn't produce noise unrelated to this bug.
  window.fetch = async () => ({ ok: true, json: async () => ({}) });
  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
  // requestAnimationFrame is another jsdom-only gap (real Safari has had it
  // since iOS 6) — stub it the same way as fetch/matchMedia above so it
  // doesn't produce noise unrelated to Bugs 1-4.
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
  window.cancelAnimationFrame = (id) => clearTimeout(id);

  const uncaughtErrors = [];
  window.addEventListener('error', (event) => {
    uncaughtErrors.push((event.error && event.error.stack) || event.message || String(event));
  });
  process.on('unhandledRejection', (reason) => {
    uncaughtErrors.push(String(reason));
  });

  // Confirm the environment really is missing these APIs, i.e. it's a valid
  // stand-in for an old browser, before we even run the app bundle.
  const missing = ['IntersectionObserver', 'queueMicrotask', 'AbortController', 'PointerEvent'].filter(
    (name) => typeof window[name] === 'undefined'
  );
  console.log(`[${mode}] jsdom is missing (like old Safari): ${missing.join(', ') || '(none)'}`);

  dom.window.eval(bundleCode);

  // Give React + the polyfill's ~100ms interval a few ticks to settle.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const root = window.document.getElementById('root');
  const innerHTML = root ? root.innerHTML : '';
  const crashScreenShown = /سایت.*(کرش|خطا)|site crashed/i.test(innerHTML);

  console.log(`[${mode}] uncaught errors: ${uncaughtErrors.length}`);
  for (const err of uncaughtErrors.slice(0, 5)) {
    console.log(`  - ${String(err).split('\n')[0]}`);
  }
  console.log(`[${mode}] #root innerHTML length: ${innerHTML.length}`);
  console.log(`[${mode}] crash screen detected: ${crashScreenShown}`);

  if (mode === 'before') {
    const crashed = uncaughtErrors.some((e) => /IntersectionObserver is not defined/i.test(String(e))) || crashScreenShown;
    console.log(`\nRESULT: ${crashed ? 'PASS (bug reproduced — app crashed as expected without the fix)' : 'FAIL (expected a crash, app did not crash)'}`);
    process.exit(crashed ? 0 : 1);
  } else {
    const healthy = uncaughtErrors.length === 0 && innerHTML.length > 100 * 1024 && !crashScreenShown;
    console.log(`\nRESULT: ${healthy ? 'PASS (app mounted cleanly with zero uncaught errors)' : 'FAIL'}`);
    process.exit(healthy ? 0 : 1);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
