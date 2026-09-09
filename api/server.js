// Ported from api/_bootstrap.php: session_start(), JSON header, CORS-for-credentials
// setup, and DB connection — now Express middleware instead of per-file PHP includes.
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath, pathToFileURL } from 'node:url';
import 'dotenv/config';

import authRoutes from './auth/index.js';
import memberRoutes from './members/index.js';
import attendanceRoutes from './attendance/index.js';
import eventRoutes from './events/index.js';
import communityRoutes from './community/index.js';
import pastorRoutes from './pastor/messages.js';
import galleryRoutes from './gallery/media.js';
import bibleRoutes from './bible/index.js';
import bookRoutes from './books/library.js';
import churchRoutes from './churches/search.js';
import budgetRoutes from './budget/index.js';
import settingsRoutes from './settings/index.js';
import adminStatsRoutes from './admin/stats.js';

export const app = express();

// Vercel routes requests through /api, while local development uses the route directly.
app.use((req, res, next) => {
  if (req.url === '/api' || req.url.startsWith('/api/')) {
    req.url = req.url.slice(4) || '/';
  }
  next();
});

export function getAvailablePort(startPort = Number(process.env.PORT) || 4000, host = '::') {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const tester = net.createServer();
      tester.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          const nextPort = port + 1;
          if (nextPort > port + 20) {
            reject(new Error(`No free port found starting from ${startPort}.`));
            return;
          }
          tryPort(nextPort);
          return;
        }
        reject(err);
      });
      tester.once('listening', () => {
        tester.close(() => resolve(port));
      });
      tester.listen(port, host);
    };

    tryPort(startPort);
  });
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 },
}));

app.use('/uploads', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads')));

app.use('/auth', authRoutes);
app.use('/members', memberRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/events', eventRoutes);
app.use('/community', communityRoutes);
app.use('/pastor', pastorRoutes);
app.use('/gallery', galleryRoutes);
app.use('/bible', bibleRoutes);
app.use('/books', bookRoutes);
app.use('/church', churchRoutes);
app.use('/budget', budgetRoutes);
app.use('/settings', settingsRoutes);
app.use('/admin', adminStatsRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

// Centralized error handler — ported from api/_bootstrap.php's try/catch-to-JSON pattern
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

export async function startServer() {
  const targetPort = Number(process.env.PORT) || 4000;
  const port = await getAvailablePort(targetPort);
  app.listen(port, () => {
    console.log(`sda-clubweb API listening on http://localhost:${port}`);
  });
  return port;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().catch((error) => {
    console.error('Failed to start API server:', error);
    process.exit(1);
  });
}
