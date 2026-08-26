import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Global safety net for errors that happen outside React's render cycle
// (e.g. inside event handlers, async code, or before React even mounts).
// Without this, such errors just leave a blank page with nothing in the
// DOM and no way for a non-technical person to tell us what went wrong.
function showFatalOverlay(title: string, detail: string) {
  if (document.getElementById('fatal-error-overlay')) return;
  const el = document.createElement('div');
  el.id = 'fatal-error-overlay';
  el.setAttribute('dir', 'ltr');
  el.style.cssText =
    'position:fixed;inset:0;background:#1a0b2e;color:#f5f3ff;padding:24px;overflow:auto;' +
    'font-family:monospace;font-size:13px;line-height:1.6;z-index:999999;direction:ltr;text-align:left;';
  el.innerHTML =
    '<div style="color:#ff6b6b;font-weight:bold;font-size:16px;margin-bottom:12px;">⚠️ ' +
    title +
    '</div><pre style="white-space:pre-wrap;word-break:break-word;opacity:0.85;">' +
    detail.replace(/</g, '&lt;') +
    '</pre><div style="margin-top:12px;opacity:0.6;">User agent: ' +
    navigator.userAgent +
    '</div>';
  document.body.appendChild(el);
}

window.addEventListener('error', (e) => {
  showFatalOverlay('Site crashed — please screenshot this and send it', String(e.error?.stack || e.message));
});
window.addEventListener('unhandledrejection', (e) => {
  showFatalOverlay(
    'Site crashed (promise) — please screenshot this and send it',
    String((e.reason && e.reason.stack) || e.reason)
  );
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
