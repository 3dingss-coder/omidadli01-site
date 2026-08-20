-- Optional: worker.js now creates these automatically on first API request,
-- so you do NOT have to run this manually. Keep it only as a reference, or
-- run it yourself if you'd rather control the initial admin PIN directly:
--
--   npx wrangler d1 execute omidadli01-site-db --remote --file=./schema.sql
--
-- If you run it yourself, replace REPLACE_WITH_SHA256_OF_YOUR_PIN with the
-- output of: echo -n "yourpin" | sha256sum

CREATE TABLE IF NOT EXISTS site_content (
  id INTEGER PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin_auth (
  id INTEGER PRIMARY KEY,
  pin_hash TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  expires_at TEXT NOT NULL
);

-- INSERT OR IGNORE INTO admin_auth (id, pin_hash) VALUES (1, 'REPLACE_WITH_SHA256_OF_YOUR_PIN');
