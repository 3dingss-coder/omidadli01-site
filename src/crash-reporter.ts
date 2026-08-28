// src/crash-reporter.ts
//
// A blank white screen (as opposed to the ErrorBoundary's red crash
// screen) means the failure happened before React ever got a chance to
// mount — e.g. a top-level throw in an early-imported module, or the
// createRoot(...).render(...) call itself. React's ErrorBoundary cannot
// catch that class of error.
//
// This installs plain `window.addEventListener('error' | 'unhandledrejection')`
// listeners with zero dependencies (no React, nothing to import), so it can
// be the very first thing that runs in main.tsx and will still be able to
// report a failure even if every other module — including src/polyfills.ts,
// imported right after this one — throws while loading.
//
// It writes the real error message + stack directly into #root as plain
// HTML. Safe to leave installed permanently: it only ever touches #root if
// nothing has rendered anything into it yet, so it never interferes with a
// successful app mount.

function report(label: string, err: unknown) {
  try {
    const root = document.getElementById('root');
    if (!root || root.childElementCount > 0) return;
    const message = (err && typeof err === 'object' && 'stack' in err && (err as any).stack) ||
      (err && typeof err === 'object' && 'message' in err && (err as any).message) ||
      String(err);
    const escaped = String(message).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' } as Record<string, string>)[c]);
    root.innerHTML =
      '<div dir="ltr" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; ' +
      'white-space: pre-wrap; word-break: break-word; background:#1a0a0a; color:#ffb3b3; ' +
      'padding:16px; font-size:13px; line-height:1.6; min-height:100vh; box-sizing:border-box;">' +
      '<div style="color:#ff6b6b; font-weight:bold; margin-bottom:8px;">Site failed to start (' +
      label +
      ')</div>' +
      escaped +
      '</div>';
  } catch {
    // Never let the crash reporter itself crash.
  }
}

window.addEventListener('error', (event) => {
  report('window error', event.error ?? event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  report('unhandled promise rejection', event.reason);
});

export {};
