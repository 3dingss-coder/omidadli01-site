// Cloudflare Worker for omidadli01.site
// - Serves the built SPA (static assets via the ASSETS binding)
// - Exposes a small JSON API backed by Cloudflare D1:
//     GET  /api/content        -> current site content (public)
//     POST /api/content        -> save site content (requires a valid session token)
//     POST /api/auth/login     -> { pin } -> { token } on success
//     POST /api/auth/set-pin   -> { pin } -> change the admin pin (requires a valid session token)
//     POST /api/auth/logout    -> invalidate the current session token
//
// The schema is self-healing: on first request it creates the tables if they
// don't exist yet, and seeds a default pin (1234) if admin_auth is empty.

const DEFAULT_PIN = '1234';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

async function ensureSchema(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_json TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS admin_auth (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      pin_hash TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL
    )`),
  ]);

  // Defensive migration: these tables may already exist from an older/different
  // worker deployed on this same D1 database, with a different column layout.
  // If so, CREATE TABLE IF NOT EXISTS above was a no-op and queries below would
  // throw "no such column". Detect that and rebuild the table from scratch
  // (safe: it only ever holds a cache of the CMS content/auth, not source data).
  const tables = [
    { name: 'site_content', requiredCols: ['id', 'content_json', 'updated_at'] },
    { name: 'admin_auth', requiredCols: ['id', 'pin_hash', 'updated_at'] },
    { name: 'admin_sessions', requiredCols: ['token', 'created_at', 'expires_at'] },
  ];
  for (const t of tables) {
    const info = await db.prepare(`PRAGMA table_info(${t.name})`).all();
    const existingCols = (info.results || []).map((c) => c.name);
    const hasAllCols = t.requiredCols.every((c) => existingCols.includes(c));
    if (!hasAllCols) {
      await db.prepare(`DROP TABLE IF EXISTS ${t.name}`).run();
      if (t.name === 'site_content') {
        await db
          .prepare(
            `CREATE TABLE site_content (id INTEGER PRIMARY KEY CHECK (id = 1), content_json TEXT NOT NULL, updated_at INTEGER NOT NULL)`
          )
          .run();
      } else if (t.name === 'admin_auth') {
        await db
          .prepare(
            `CREATE TABLE admin_auth (id INTEGER PRIMARY KEY CHECK (id = 1), pin_hash TEXT NOT NULL, updated_at INTEGER NOT NULL)`
          )
          .run();
      } else if (t.name === 'admin_sessions') {
        await db
          .prepare(
            `CREATE TABLE admin_sessions (token TEXT PRIMARY KEY, created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL)`
          )
          .run();
      }
    }
  }

  const authRow = await db.prepare('SELECT id FROM admin_auth WHERE id = 1').first();
  if (!authRow) {
    const hash = await sha256(DEFAULT_PIN);
    await db
      .prepare('INSERT INTO admin_auth (id, pin_hash, updated_at) VALUES (1, ?, ?)')
      .bind(hash, Date.now())
      .run();
  }
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function newToken() {
  return crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
}

function json(data, init) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      ...(init && init.headers),
    },
  });
}

async function requireSession(request, db) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return false;
  const row = await db.prepare('SELECT expires_at FROM admin_sessions WHERE token = ?').bind(token).first();
  if (!row) return false;
  if (row.expires_at < Date.now()) {
    await db.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
    return false;
  }
  return true;
}

async function cleanupExpiredSessions(db) {
  await db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').bind(Date.now()).run();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return json({}, {
        status: 204,
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    if (url.pathname.startsWith('/api/')) {
      const db = env.DB;
      if (!db) {
        return json(
          { error: 'D1 Database binding (DB) is missing. Check wrangler.toml configuration.' },
          { status: 500 }
        );
      }
      try {
        await ensureSchema(db);
      } catch (e) {
        return json({ error: 'Database schema error', details: String((e && e.message) || e) }, { status: 500 });
      }

      try {
      // --- GET /api/content ---
      if (url.pathname === '/api/content' && request.method === 'GET') {
        const row = await db.prepare('SELECT content_json FROM site_content WHERE id = 1').first();
        if (!row) return json({});
        try {
          return json(JSON.parse(row.content_json));
        } catch (e) {
          return json({ error: 'Corrupt content in database' }, { status: 500 });
        }
      }

      // --- POST /api/content ---
      if (url.pathname === '/api/content' && request.method === 'POST') {
        const ok = await requireSession(request, db);
        if (!ok) return json({ error: 'Unauthorized' }, { status: 401 });
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return json({ error: 'Invalid JSON body' }, { status: 400 });
        }
        await db
          .prepare(
            `INSERT INTO site_content (id, content_json, updated_at) VALUES (1, ?, ?)
             ON CONFLICT(id) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at`
          )
          .bind(JSON.stringify(body), Date.now())
          .run();
        return json({ ok: true });
      }

      // --- POST /api/auth/login ---
      if (url.pathname === '/api/auth/login' && request.method === 'POST') {
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return json({ error: 'Invalid JSON body' }, { status: 400 });
        }
        const pin = (body && body.pin) || '';
        const row = await db.prepare('SELECT pin_hash FROM admin_auth WHERE id = 1').first();
        const hash = await sha256(pin);
        if (!row || row.pin_hash !== hash) {
          return json({ error: 'Invalid pin' }, { status: 401 });
        }
        await cleanupExpiredSessions(db);
        const token = newToken();
        await db
          .prepare('INSERT INTO admin_sessions (token, created_at, expires_at) VALUES (?, ?, ?)')
          .bind(token, Date.now(), Date.now() + SESSION_TTL_MS)
          .run();
        return json({ token });
      }

      // --- POST /api/auth/set-pin ---
      if (url.pathname === '/api/auth/set-pin' && request.method === 'POST') {
        const ok = await requireSession(request, db);
        if (!ok) return json({ error: 'Unauthorized' }, { status: 401 });
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return json({ error: 'Invalid JSON body' }, { status: 400 });
        }
        const newPin = (body && body.pin) || '';
        if (!newPin || newPin.length < 4) {
          return json({ error: 'Pin must be at least 4 characters' }, { status: 400 });
        }
        const hash = await sha256(newPin);
        await db
          .prepare(
            `INSERT INTO admin_auth (id, pin_hash, updated_at) VALUES (1, ?, ?)
             ON CONFLICT(id) DO UPDATE SET pin_hash = excluded.pin_hash, updated_at = excluded.updated_at`
          )
          .bind(hash, Date.now())
          .run();
        return json({ ok: true });
      }

      // --- POST /api/auth/logout ---
      if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
        const auth = request.headers.get('Authorization') || '';
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
        if (token) await db.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
        return json({ ok: true });
      }

      return json({ error: 'Not found' }, { status: 404 });
      } catch (e) {
        return json({ error: 'API error', details: String((e && e.message) || e) }, { status: 500 });
      }
    }

    // Everything else: serve the static SPA build.
    return env.ASSETS.fetch(request);
  },
};
