import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const DEFAULT_PIN = '1234';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// In-memory active sessions
const activeSessions = new Map<string, number>();

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(
      AUTH_FILE,
      JSON.stringify({ pinHash: sha256(DEFAULT_PIN), updatedAt: Date.now() }, null, 2),
      'utf-8'
    );
  }
}

function getStoredPinHash(): string {
  try {
    ensureDataStore();
    if (fs.existsSync(AUTH_FILE)) {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
      return data.pinHash || sha256(DEFAULT_PIN);
    }
  } catch (e) {
    console.error('Error reading auth file:', e);
  }
  return sha256(DEFAULT_PIN);
}

function setStoredPin(pin: string) {
  ensureDataStore();
  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify({ pinHash: sha256(pin), updatedAt: Date.now() }, null, 2),
    'utf-8'
  );
}

function getStoredContent(): any {
  try {
    ensureDataStore();
    if (fs.existsSync(CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading content file:', e);
  }
  return {};
}

function setStoredContent(content: any) {
  ensureDataStore();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const expiry = activeSessions.get(token);
  if (!expiry || expiry < Date.now()) {
    activeSessions.delete(token);
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
  next();
}

async function startServer() {
  ensureDataStore();
  const app = express();

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // GET /api/content
  app.get('/api/content', (req, res) => {
    const content = getStoredContent();
    res.json(content);
  });

  // POST /api/content
  app.post('/api/content', (req, res) => {
    // Check if authorization provided
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) {
      const expiry = activeSessions.get(token);
      if (expiry && expiry >= Date.now()) {
        setStoredContent(req.body);
        return res.json({ ok: true });
      }
    }
    // Also allow direct saving for local updates
    setStoredContent(req.body);
    res.json({ ok: true });
  });

  // POST /api/auth/login
  app.post('/api/auth/login', (req, res) => {
    const { pin } = req.body || {};
    if (!pin) {
      return res.status(400).json({ error: 'Missing pin' });
    }
    const currentHash = getStoredPinHash();
    if (sha256(pin) !== currentHash) {
      return res.status(401).json({ error: 'Invalid pin' });
    }
    const token = generateToken();
    activeSessions.set(token, Date.now() + SESSION_TTL_MS);
    res.json({ token });
  });

  // POST /api/auth/set-pin
  app.post('/api/auth/set-pin', requireAuth, (req, res) => {
    const { pin } = req.body || {};
    if (!pin || pin.length < 4) {
      return res.status(400).json({ error: 'Pin must be at least 4 characters' });
    }
    setStoredPin(pin);
    res.json({ ok: true });
  });

  // POST /api/auth/logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) {
      activeSessions.delete(token);
    }
    res.json({ ok: true });
  });

  // Vite Middleware or Static Production Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), 'vite.config.ts'),
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
