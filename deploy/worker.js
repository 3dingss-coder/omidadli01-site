// Cloudflare Worker: serves the static SPA and a small JSON API backed by D1.
// Routes:
//   GET  /api/content        -> public read of the site's current content JSON
//   POST /api/login          -> { pin } -> { token } on success
//   POST /api/content        -> requires Authorization: Bearer <token>; saves content JSON
//   POST /api/change-pin     -> requires Authorization: Bearer <token>; { oldPin, newPin }
//   POST /api/logout         -> requires Authorization: Bearer <token>; invalidates session
//   *                        -> falls through to static assets (env.ASSETS.fetch)
//
// FIX (2026-08-14): the D1 database had no schema — site_content / admin_auth /
// admin_sessions never existed, so every POST /api/content silently failed
// (worker caught the "no such table" error and returned it as a normal error
// response), while the GET on next page load kept returning empty/old content
// and overwrote the locally-cached edit. ensureSchema() below creates the
// tables (IF NOT EXISTS, so it's a no-op once they exist) and seeds a default
// admin PIN the very first time, so the dashboard actually persists to D1.

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const DEFAULT_ADMIN_PIN = '1234'; // CHANGE THIS immediately after first login via "تغییر پین‌کد"

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

let schemaReady = false; // per-isolate cache so we don't re-check on every request

async function ensureSchema(env) {
  if (schemaReady) return;

  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS site_content (
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS admin_auth (
        id INTEGER PRIMARY KEY,
        pin_hash TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        token TEXT PRIMARY KEY,
        expires_at TEXT NOT NULL
      )
    `),
  ]);

  // Seed a default admin PIN the very first time, only if no row exists yet.
  // This never overwrites a PIN you've already set.
  const existing = await env.DB.prepare('SELECT id FROM admin_auth WHERE id = 1').first();
  if (!existing) {
    const hash = await sha256Hex(DEFAULT_ADMIN_PIN);
    await env.DB.prepare(
      `INSERT INTO admin_auth (id, pin_hash, updated_at) VALUES (1, ?, datetime('now'))`
    )
      .bind(hash)
      .run();
  }

  schemaReady = true;
}

async function getTokenFromRequest(request) {
  const auth = request.headers.get('Authorization') || '';
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

async function requireAuth(request, env) {
  const token = await getTokenFromRequest(request);
  if (!token) return false;
  const row = await env.DB.prepare(
    'SELECT expires_at FROM admin_sessions WHERE token = ?'
  )
    .bind(token)
    .first();
  if (!row) return false;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await env.DB.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
    return false;
  }
  return true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Basic CORS for same-origin usage (site + API share the same domain, but keep it permissive/simple)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
      });
    }

    try {
      if (pathname.startsWith('/api/')) {
        await ensureSchema(env);
      }

      if (pathname === '/api/content' && request.method === 'GET') {
        const row = await env.DB.prepare('SELECT content, updated_at FROM site_content WHERE id = 1').first();
        if (!row) return json({ content: null });
        return json({ content: JSON.parse(row.content), updatedAt: row.updated_at });
      }

      if (pathname === '/api/content' && request.method === 'POST') {
        const authed = await requireAuth(request, env);
        if (!authed) return json({ error: 'unauthorized' }, 401);

        const body = await request.json();
        if (!body || typeof body !== 'object' || !body.content) {
          return json({ error: 'invalid_body' }, 400);
        }
        const contentStr = JSON.stringify(body.content);
        await env.DB.prepare(
          `INSERT INTO site_content (id, content, updated_at) VALUES (1, ?, datetime('now'))
           ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at`
        )
          .bind(contentStr)
          .run();
        return json({ success: true });
      }

      if (pathname === '/api/login' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const pin = String(body.pin || '');
        if (!pin) return json({ error: 'missing_pin' }, 400);

        const row = await env.DB.prepare('SELECT pin_hash FROM admin_auth WHERE id = 1').first();
        if (!row) return json({ error: 'not_configured' }, 500);

        const hash = await sha256Hex(pin);
        if (hash !== row.pin_hash) {
          return json({ error: 'invalid_pin' }, 401);
        }

        const token = crypto.randomUUID() + crypto.randomUUID();
        const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
        await env.DB.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)')
          .bind(token, expiresAt)
          .run();

        return json({ token, expiresAt });
      }

      if (pathname === '/api/change-pin' && request.method === 'POST') {
        const authed = await requireAuth(request, env);
        if (!authed) return json({ error: 'unauthorized' }, 401);

        const body = await request.json().catch(() => ({}));
        const oldPin = String(body.oldPin || '');
        const newPin = String(body.newPin || '');
        if (!oldPin || !newPin || newPin.length < 4) {
          return json({ error: 'invalid_input' }, 400);
        }

        const row = await env.DB.prepare('SELECT pin_hash FROM admin_auth WHERE id = 1').first();
        const oldHash = await sha256Hex(oldPin);
        if (!row || oldHash !== row.pin_hash) {
          return json({ error: 'wrong_old_pin' }, 401);
        }

        const newHash = await sha256Hex(newPin);
        await env.DB.prepare(
          `UPDATE admin_auth SET pin_hash = ?, updated_at = datetime('now') WHERE id = 1`
        )
          .bind(newHash)
          .run();

        return json({ success: true });
      }

      if (pathname === '/api/logout' && request.method === 'POST') {
        const token = await getTokenFromRequest(request);
        if (token) {
          await env.DB.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
        }
        return json({ success: true });
      }
    } catch (err) {
      return json({ error: 'server_error', message: String(err) }, 500);
    }

    // Everything else: serve the static SPA
    return env.ASSETS.fetch(request);
  },
};
